-- Drop the old constraint that limits to 10 prompts
ALTER TABLE lovable_prompts DROP CONSTRAINT lovable_prompts_prompt_index_check;

-- Add new constraint that allows 20 prompts
ALTER TABLE lovable_prompts ADD CONSTRAINT lovable_prompts_prompt_index_check 
  CHECK (prompt_index >= 1 AND prompt_index <= 20);