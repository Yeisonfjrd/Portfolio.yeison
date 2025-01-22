import { createClient } from '@supabase/supabase-js';
import type { Project } from './src/types/index';

const supabaseUrl = 'https://pojsouizkkvpmzknwpwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvanNvdWl6a2t2cG16a253cHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NzM3NDksImV4cCI6MjA1MzA0OTc0OX0.yENKsjSPlKrrbI040j9VlVkRR8aKMkqzBNOREapM-S4';

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*');

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return (data as Project[]) || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export default supabase;