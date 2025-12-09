-- Add unique constraints to config tables (only if not exists)

-- Check and add for general_configs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'general_configs_user_id_config_index_key'
  ) THEN
    ALTER TABLE public.general_configs 
    ADD CONSTRAINT general_configs_user_id_config_index_key 
    UNIQUE (user_id, config_index);
  END IF;
END $$;

-- Check and add for odoo_customization_configs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'odoo_customization_configs_user_id_config_index_key'
  ) THEN
    ALTER TABLE public.odoo_customization_configs 
    ADD CONSTRAINT odoo_customization_configs_user_id_config_index_key 
    UNIQUE (user_id, config_index);
  END IF;
END $$;

-- Check and add for capacitor_configs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'capacitor_configs_user_id_config_index_key'
  ) THEN
    ALTER TABLE public.capacitor_configs 
    ADD CONSTRAINT capacitor_configs_user_id_config_index_key 
    UNIQUE (user_id, config_index);
  END IF;
END $$;

-- Check and add for flutter_webview_configs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'flutter_webview_configs_user_id_config_index_key'
  ) THEN
    ALTER TABLE public.flutter_webview_configs 
    ADD CONSTRAINT flutter_webview_configs_user_id_config_index_key 
    UNIQUE (user_id, config_index);
  END IF;
END $$;

-- Check and add for lovable_prompts
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'lovable_prompts_user_id_prompt_index_key'
  ) THEN
    ALTER TABLE public.lovable_prompts 
    ADD CONSTRAINT lovable_prompts_user_id_prompt_index_key 
    UNIQUE (user_id, prompt_index);
  END IF;
END $$;