-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tenant_id UUID;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    'user'
  );

  -- Create default tenant for the user
  INSERT INTO public.tenants (owner_user_id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'name', 'My Organization'))
  RETURNING id INTO tenant_id;

  -- Add user as admin member of their own tenant
  INSERT INTO public.memberships (tenant_id, user_id, role, accepted_at)
  VALUES (tenant_id, NEW.id, 'admin', NOW());

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
