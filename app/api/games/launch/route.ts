import {NextResponse} from 'next/server';import {createClient} from '@supabase/supabase-js';import {games} from '@/lib/catalog';
export async function POST(req:Request){
 const header=req.headers.get('authorization')||'';const token=header.startsWith('Bearer ')?header.slice(7):'';
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key)return NextResponse.json({error:'Auth not configured'},{status:503});
 const sb=createClient(url,key);const {data:{user},error}=await sb.auth.getUser(token);
 if(error||!user)return NextResponse.json({error:'Sign in required'},{status:401});
 let body:{gameId?:string};try{body=await req.json()}catch{return NextResponse.json({error:'Invalid body'},{status:400})}
 const game=games.find(x=>x.id===body.gameId);if(!game)return NextResponse.json({error:'Game not found'},{status:404});
 // Provider contracts differ: DO NOT invent a launch URL or treat a catalogue image as a playable game.
 // Configure a licensed provider endpoint that accepts this authenticated launch request.
 const base=process.env.GAME_AGGREGATOR_API_BASE,apiKey=process.env.GAME_AGGREGATOR_API_KEY;
 if(!base||!apiKey)return NextResponse.json({error:'Game provider credentials are not configured',code:'PROVIDER_NOT_CONFIGURED'},{status:503});
 try{const upstream=await fetch(`${base.replace(/\/$/,'')}/launch`,{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${apiKey}`},body:JSON.stringify({gameId:game.id,userId:user.id,currency:'INR',platform:'web'}) ,cache:'no-store'});
 const data=await upstream.json();if(!upstream.ok||!data.launchUrl)return NextResponse.json({error:'Provider launch unavailable'},{status:502});
 const launch=new URL(data.launchUrl);if(launch.protocol!=='https:')throw new Error('Provider must return HTTPS launch URL');
 return NextResponse.json({launchUrl:launch.toString()});
 }catch{return NextResponse.json({error:'Provider integration failed'},{status:502})}
}
