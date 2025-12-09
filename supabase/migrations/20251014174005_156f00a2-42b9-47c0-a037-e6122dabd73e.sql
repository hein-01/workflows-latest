-- Create general_configs table
CREATE TABLE public.general_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_index INTEGER NOT NULL,
  config_label TEXT,
  config_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.general_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own configs"
  ON public.general_configs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own configs"
  ON public.general_configs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configs"
  ON public.general_configs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configs"
  ON public.general_configs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_general_configs_updated_at
  BEFORE UPDATE ON public.general_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add constraint for config_index (1 to 30)
ALTER TABLE public.general_configs
  ADD CONSTRAINT general_configs_index_range CHECK (config_index >= 1 AND config_index <= 30);