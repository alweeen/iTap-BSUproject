# Supabase Database Setup Instructions

## Step 1: Create the profiles table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
create table profiles (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  full_name text not null,
  age int,
  address text,
  contact_number text,
  relationship_status text,
  email text,
  social_links jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Public read access (anyone can view profiles)
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

-- Authenticated users can insert any profile (for user management)
create policy "Authenticated users can insert profiles"
  on profiles for insert
  with check (auth.role() = 'authenticated');

-- Authenticated users can update any profile (for user management)
create policy "Authenticated users can update any profile"
  on profiles for update
  using (auth.role() = 'authenticated');

-- Authenticated users can delete any profile (for user management)
create policy "Authenticated users can delete any profile"
  on profiles for delete
  using (auth.role() = 'authenticated');

-- Create index on username for faster lookups
create index profiles_username_idx on profiles(username);
```

## Step 2: Create an admin user

1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user" > "Create new user"
3. Enter an email and password for your admin account
4. Click "Create user"

## Step 3: Create your first profile (Optional)

You can either:
- Log in to the admin dashboard and create your profile through the UI
- Or run this SQL to create a demo profile:

```sql
-- Replace 'YOUR_USER_ID' with the actual user ID from Step 2
insert into profiles (id, username, full_name, email, age, address, contact_number, relationship_status, social_links)
values (
  'YOUR_USER_ID',
  'demo',
  'Demo User',
  'demo@example.com',
  25,
  'San Francisco, CA',
  '+1 234 567 8900',
  'Single',
  '[
    {"platform": "Instagram", "url": "https://instagram.com/demo"},
    {"platform": "LinkedIn", "url": "https://linkedin.com/in/demo"},
    {"platform": "GitHub", "url": "https://github.com/demo"}
  ]'::jsonb
);
```

## Notes

- The `profiles.id` is now auto-generated UUID (not linked to auth.users)
- This allows creating multiple profiles from one admin account
- RLS policies allow any authenticated user to manage all profiles
- Public can view all profiles (read-only)
- For production, you may want to add role-based access control to restrict profile management to admins only

## Updating Existing Database

If you already created the table with the old schema, run this SQL to update it:

```sql
-- Drop old policies
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Users can delete their own profile" on profiles;

-- Drop the foreign key constraint
alter table profiles drop constraint if exists profiles_id_fkey;

-- Change id to auto-generate
alter table profiles alter column id set default gen_random_uuid();

-- Create new policies
create policy "Authenticated users can insert profiles"
  on profiles for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update any profile"
  on profiles for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete any profile"
  on profiles for delete
  using (auth.role() = 'authenticated');
```
