import { createClient } from '@supabase/supabase-js';

// URL y clave de tu proyecto en Supabase
const supabaseUrl = 'https://pojsouizkkvpmzknwpwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvanNvdWl6a2t2cG16a253cHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NzM3NDksImV4cCI6MjA1MzA0OTc0OX0.yENKsjSPlKrrbI040j9VlVkRR8aKMkqzBNOREapM-S4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Definimos el tipo para los proyectos
export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: Array<{ name: string; class: string; icon: any }>;
  link: string | null;
  github: string | null;
}

// Función para obtener proyectos desde Supabase
export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from('projects').select('*');

  console.log("Datos desde Supabase:", data); // Depuración
  console.error("Error desde Supabase:", error); // Depuración

  if (error) {
    console.error('Error al obtener los proyectos: ', error);
    return [];
  }
  return data;
};

export default supabase;