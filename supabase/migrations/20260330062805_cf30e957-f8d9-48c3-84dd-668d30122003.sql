
-- Single-row table to store all portfolio config as JSON
CREATE TABLE public.portfolio_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read the portfolio
CREATE POLICY "Portfolio is publicly readable"
  ON public.portfolio_config FOR SELECT
  USING (true);

-- Anyone can update (we'll add auth later for protection)
CREATE POLICY "Portfolio is publicly writable"
  ON public.portfolio_config FOR UPDATE
  USING (true);

CREATE POLICY "Portfolio allows insert"
  ON public.portfolio_config FOR INSERT
  WITH CHECK (true);

-- Insert default data
INSERT INTO public.portfolio_config (id, data) VALUES (1, '{
  "name": "Your Name",
  "greeting": "hi. i''m",
  "bio": "I''m a designer, video editor & visual storyteller — crafting compelling narratives through motion, visuals, and thoughtful design.",
  "email": "hello@example.com",
  "projects": [
    {"id": "1", "title": "Brand Film", "subtitle": "Video Production & Editing", "imageUrl": "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop", "link": "#", "featured": true},
    {"id": "2", "title": "Visual Identity", "subtitle": "Brand Design", "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop", "link": "#", "featured": true},
    {"id": "3", "title": "Motion Reel", "subtitle": "Motion Graphics", "imageUrl": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop", "link": "#", "featured": false},
    {"id": "4", "title": "Documentary Short", "subtitle": "Storytelling & Direction", "imageUrl": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop", "link": "#", "featured": false}
  ],
  "writings": [
    {"id": "1", "title": "The art of visual storytelling", "url": "#", "date": "2025"},
    {"id": "2", "title": "Color grading as emotion", "url": "#", "date": "2024"}
  ],
  "socialLinks": [
    {"label": "Instagram", "url": "https://instagram.com"},
    {"label": "Behance", "url": "https://behance.net"},
    {"label": "Vimeo", "url": "https://vimeo.com"},
    {"label": "LinkedIn", "url": "https://linkedin.com"}
  ]
}'::jsonb);
