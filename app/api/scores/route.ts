import {NextResponse} from 'next/server';import {cricketMatches,footballMatches} from '@/lib/scores';
export const runtime='nodejs';
export async function GET(req:Request){
 const sport=new URL(req.url).searchParams.get('sport');if(sport!=='cricket'&&sport!=='football')return NextResponse.json({error:'Invalid sport'},{status:400});
 const configured=sport==='cricket'?!!process.env.CRICKETDATA_API_KEY:!!process.env.APIFOOTBALL_API_KEY;
 if(!configured)return NextResponse.json({configured:false,items:[],message:`Set ${sport==='cricket'?'CRICKETDATA_API_KEY':'APIFOOTBALL_API_KEY'} to enable real feeds`});
 try{const items= sport==='cricket'?await cricketMatches():await footballMatches();return NextResponse.json({configured:true,items,updatedAt:new Date().toISOString()});}
 catch(e){return NextResponse.json({configured:true,items:[],error:e instanceof Error?e.message:'Score provider error'},{status:502});}
}
