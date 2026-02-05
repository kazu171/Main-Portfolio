-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_overview TEXT NOT NULL,
  current_challenges TEXT,
  tools_used TEXT,
  preferred_contact_method TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
