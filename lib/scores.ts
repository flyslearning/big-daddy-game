export type Match={id:string;sport:'cricket'|'football';title:string;competition:string;status:string;live:boolean;detail:string;time:string;homeLogo?:string;awayLogo?:string};
function safeText(v:unknown){return typeof v==='string'?v:''}
export async function cricketMatches():Promise<Match[]>{
 const key=process.env.CRICKETDATA_API_KEY;if(!key)return [];
 const url=`https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(key)}&offset=0`;
 const r=await fetch(url,{next:{revalidate:60}});if(!r.ok)throw new Error('Cricket API unavailable');
 const j=await r.json();if(!Array.isArray(j.data))throw new Error('Unexpected cricket API response');
 return j.data.slice(0,40).map((m:any):Match=>({id:String(m.id),sport:'cricket',title:safeText(m.name)||[...(m.teams||[])].join(' vs '),competition:safeText(m.matchType).toUpperCase()||'Cricket',status:safeText(m.status)||'Scheduled',live:!!m.matchStarted&&!m.matchEnded,detail:Array.isArray(m.score)?m.score.map((s:any)=>`${s.inning||''}: ${s.r??'-'}/${s.w??'-'} (${s.o??'-'} ov)`).join(' • '):'',time:safeText(m.dateTimeGMT)}));
}
export async function footballMatches():Promise<Match[]>{
 const key=process.env.APIFOOTBALL_API_KEY;if(!key)return [];
 const headers={'x-apisports-key':key};
 const live=await fetch('https://v3.football.api-sports.io/fixtures?live=all',{headers,next:{revalidate:60}});
 if(!live.ok)throw new Error('Football API unavailable');
 const liveJson=await live.json();if(!Array.isArray(liveJson.response))throw new Error('Unexpected football API response');
 let fixtures:any[]=liveJson.response;
 if(!fixtures.length){const date=new Date().toISOString().slice(0,10);
 const next=await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}&timezone=Asia%2FKolkata`,{headers,next:{revalidate:300}});
 if(next.ok){const j=await next.json();if(Array.isArray(j.response))fixtures=j.response;}}
 return fixtures.slice(0,40).map((f:any):Match=>({id:String(f.fixture.id),sport:'football',title:`${f.teams.home.name} vs ${f.teams.away.name}`,competition:f.league.name||'Football',status:f.fixture.status.short||'NS',live:['1H','2H','ET','BT','P','HT','LIVE'].includes(f.fixture.status.short),detail:`${f.teams.home.name} ${f.goals.home??'-'} : ${f.goals.away??'-'} ${f.teams.away.name}`,time:f.fixture.date||'',homeLogo:f.teams.home.logo,awayLogo:f.teams.away.logo}));
}
