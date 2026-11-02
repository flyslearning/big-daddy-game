-- Big Daddy Game: user profiles only. Real-money wallet tables and settlement require your certified provider's signed webhook contract.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "read-own-profile" on public.profiles for select to authenticated using (auth.uid()=id);
create policy "update-own-profile" on public.profiles for update to authenticated using (auth.uid()=id) with check (auth.uid()=id);
create or replace function public.create_profile() returns trigger language plpgsql security definer set search_path='' as $$
begin insert into public.profiles(id) values(new.id) on conflict do nothing; return new; end $$;
drop trigger if exists on_signup_profile on auth.users;
create trigger on_signup_profile after insert on auth.users for each row execute function public.create_profile();
insert into public.profiles(id) select id from auth.users on conflict do nothing;
