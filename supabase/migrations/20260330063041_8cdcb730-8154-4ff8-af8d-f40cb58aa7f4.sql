
-- Drop permissive write policies
DROP POLICY "Portfolio is publicly writable" ON public.portfolio_config;
DROP POLICY "Portfolio allows insert" ON public.portfolio_config;

-- Only authenticated users can write
CREATE POLICY "Authenticated users can update portfolio"
  ON public.portfolio_config FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert portfolio"
  ON public.portfolio_config FOR INSERT
  TO authenticated
  WITH CHECK (true);
