-- Create capacitor_configs table
CREATE TABLE public.capacitor_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_index INTEGER NOT NULL,
  config_text TEXT NOT NULL DEFAULT ''::text,
  config_label TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT capacitor_configs_unique_user_index UNIQUE(user_id, config_index),
  CONSTRAINT capacitor_configs_config_index_check CHECK (config_index >= 1 AND config_index <= 30)
);

-- Enable Row Level Security
ALTER TABLE public.capacitor_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own configs" 
ON public.capacitor_configs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own configs" 
ON public.capacitor_configs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configs" 
ON public.capacitor_configs 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configs" 
ON public.capacitor_configs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_capacitor_configs_updated_at
BEFORE UPDATE ON public.capacitor_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();