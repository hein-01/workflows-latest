-- Create vibe_coding_configs table (same structure as general_configs)
CREATE TABLE public.vibe_coding_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_index INTEGER NOT NULL,
  config_label TEXT,
  config_text TEXT NOT NULL DEFAULT ''::text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, config_index)
);

-- Enable RLS
ALTER TABLE public.vibe_coding_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (same as general_configs)
CREATE POLICY "Users can view their own configs" 
ON public.vibe_coding_configs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own configs" 
ON public.vibe_coding_configs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configs" 
ON public.vibe_coding_configs 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configs" 
ON public.vibe_coding_configs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_vibe_coding_configs_updated_at
BEFORE UPDATE ON public.vibe_coding_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();