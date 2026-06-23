create extension if not exists "pgcrypto";

create type public.user_role as enum ('teacher', 'parent', 'admin');
create type public.material_status as enum ('pending', 'approved', 'rejected');
create type public.content_audience as enum ('teacher', 'parent', 'both');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role public.user_role not null,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teacher_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  branch text,
  school_name text,
  city text,
  district text,
  license_package text default 'free_trial',
  bep_quota integer not null default 5,
  document_quota integer not null default 10,
  license_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.parent_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  city text,
  district text,
  child_count integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  birth_date date,
  grade_level text,
  school_name text,
  student_status text,
  diagnosis_info text,
  education_need text,
  parent_name text,
  parent_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bep_documents (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid references public.students(id) on delete set null,
  title text not null,
  document_type text not null,
  status text not null default 'draft',
  content_json jsonb not null default '{}'::jsonb,
  file_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.generated_documents (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid references public.students(id) on delete set null,
  document_type text not null,
  title text not null,
  content_json jsonb not null default '{}'::jsonb,
  file_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  target_age text,
  target_skill text,
  file_url text,
  uploaded_by uuid references auth.users(id) on delete set null,
  status public.material_status not null default 'pending',
  is_premium boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  message text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.law_contents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  audience public.content_audience not null default 'both',
  content text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  bep_quota integer not null default 0,
  document_quota integer not null default 0,
  material_access_level text not null default 'basic',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_role public.user_role;
begin
  selected_role := case
    when new.raw_user_meta_data->>'role' = 'parent' then 'parent'::public.user_role
    when new.raw_user_meta_data->>'role' = 'admin' then 'admin'::public.user_role
    else 'teacher'::public.user_role
  end;

  insert into public.profiles (user_id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.email, ''),
    selected_role
  )
  on conflict (user_id) do nothing;

  if selected_role = 'teacher' then
    insert into public.teacher_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  elsif selected_role = 'parent' then
    insert into public.parent_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.teacher_profiles enable row level security;
alter table public.parent_profiles enable row level security;
alter table public.students enable row level security;
alter table public.bep_documents enable row level security;
alter table public.generated_documents enable row level security;
alter table public.materials enable row level security;
alter table public.support_tickets enable row level security;
alter table public.law_contents enable row level security;
alter table public.packages enable row level security;

create policy "profiles own select" on public.profiles for select using (user_id = auth.uid() or public.is_admin());
create policy "profiles own insert" on public.profiles for insert with check (user_id = auth.uid());
create policy "profiles own update" on public.profiles for update using (user_id = auth.uid() or public.is_admin());

create policy "teacher profiles own" on public.teacher_profiles for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "parent profiles own" on public.parent_profiles for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

create policy "students teacher owns" on public.students for all using (teacher_id = auth.uid() or public.is_admin()) with check (teacher_id = auth.uid() or public.is_admin());
create policy "bep documents teacher owns" on public.bep_documents for all using (teacher_id = auth.uid() or public.is_admin()) with check (teacher_id = auth.uid() or public.is_admin());
create policy "generated documents teacher owns" on public.generated_documents for all using (teacher_id = auth.uid() or public.is_admin()) with check (teacher_id = auth.uid() or public.is_admin());

create policy "approved materials readable" on public.materials for select using (status = 'approved' or uploaded_by = auth.uid() or public.is_admin());
create policy "materials owner insert" on public.materials for insert with check (uploaded_by = auth.uid() or public.is_admin());
create policy "materials owner update" on public.materials for update using (uploaded_by = auth.uid() or public.is_admin());

create policy "support tickets own" on public.support_tickets for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "law contents published readable" on public.law_contents for select using (status = 'published' or public.is_admin());
create policy "law contents admin manage" on public.law_contents for all using (public.is_admin()) with check (public.is_admin());
create policy "active packages readable" on public.packages for select using (is_active = true or public.is_admin());
create policy "packages admin manage" on public.packages for all using (public.is_admin()) with check (public.is_admin());

insert into public.packages (name, description, price, bep_quota, document_quota, material_access_level)
values
  ('Ücretsiz Deneme', 'MVP başlangıç paketi', 0, 5, 10, 'basic'),
  ('Bireysel Öğretmen Paketi', 'Tek öğretmen için genişletilmiş kullanım', 0, 50, 100, 'standard'),
  ('Kurum Paketi', 'Kurum ve ekip kullanımı için altyapı', 0, 500, 1000, 'institution'),
  ('Premium Materyal Paketi', 'Premium materyal erişimi için hazırlık', 0, 0, 0, 'premium');
