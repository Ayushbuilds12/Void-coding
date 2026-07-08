-- Add business_type column to projects table
alter table projects add column if not exists business_type text;
