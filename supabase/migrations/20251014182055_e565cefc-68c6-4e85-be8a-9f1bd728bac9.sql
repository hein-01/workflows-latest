-- Create sales_workflows_configs table
CREATE TABLE public.sales_workflows_configs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  config_index integer NOT NULL,
  config_text text NOT NULL DEFAULT ''::text,
  config_label text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sales_workflows_configs_user_id_config_index_key UNIQUE (user_id, config_index)
);

-- Enable Row Level Security
ALTER TABLE public.sales_workflows_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own configs" 
ON public.sales_workflows_configs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own configs" 
ON public.sales_workflows_configs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configs" 
ON public.sales_workflows_configs 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configs" 
ON public.sales_workflows_configs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sales_workflows_configs_updated_at
BEFORE UPDATE ON public.sales_workflows_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();