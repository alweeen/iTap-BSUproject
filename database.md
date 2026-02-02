# Database Configuration

## Table: profiles
- id: uuid (primary key)
- full_name: text
- age: int
- address: text
- contact_number: text
- relationship_status: text
- email: text
- social_links: jsonb (to store multiple social platforms)
- updated_at: timestamp

## Security
- Enable Row Level Security (RLS).
- Public: Read-only access to the profile.
- Admin: Full CRUD access via authenticated user.