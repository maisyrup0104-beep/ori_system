-- Create settings table
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  revenue_goal DECIMAL(12, 2),
  current_revenue DECIMAL(12, 2) DEFAULT 0,
  days_remaining INTEGER,
  current_focus TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  event_type TEXT,
  event_subtype TEXT,
  segment TEXT,
  visibility_target TEXT,
  strength TEXT,
  notes TEXT,
  proof_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create personal_states table
CREATE TABLE personal_states (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  authority INTEGER,
  trust INTEGER,
  momentum INTEGER,
  authenticity INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create ori_states table
CREATE TABLE ori_states (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  capability INTEGER,
  credibility INTEGER,
  proof TEXT,
  relevance INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  segment TEXT,
  stage TEXT,
  contact_name TEXT,
  contact_method TEXT,
  contact_value TEXT,
  notes TEXT,
  last_contact_date TIMESTAMP,
  next_followup_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Create clients table
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  segment TEXT,
  package_name TEXT,
  price DECIMAL(12, 2),
  payment_status TEXT,
  delivery_status TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create production_items table
CREATE TABLE production_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  stage TEXT,
  asset_links TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);
