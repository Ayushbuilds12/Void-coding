-- Supabase migration for Void

-- Enable extensions (pgcrypto for gen_random_uuid if not available)
-- Run this SQL in Supabase SQL editor for your project

create extension if not exists pgcrypto;

-- profiles table (one row per user)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- domains table
create table if not exists domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  domain text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security and add policies
alter table profiles enable row level security;
create policy "Profiles owner access" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

alter table projects enable row level security;
create policy "Projects owner access" on projects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table domains enable row level security;
create policy "Domains owner access" on domains
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
