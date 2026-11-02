/** One-time server-only Supabase account setup. NEVER commit real secrets. */
import {createClient} from '@supabase/supabase-js';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
const email=process.env.BOOTSTRAP_EMAIL;
const password=process.env.BOOTSTRAP_PASSWORD;
if(!url||!key||!email||!password){console.error('Missing NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, BOOTSTRAP_EMAIL or BOOTSTRAP_PASSWORD');process.exit(1)}
if(password.length<12){console.error('Use a password of at least 12 characters');process.exit(1)}
const sb=createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false}});
const {data,error}=await sb.auth.admin.createUser({email,password,email_confirm:true});
if(error){console.error('Account setup failed:',error.message);process.exit(1)}
console.log('Account created:',data.user?.email);
