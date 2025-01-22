export interface Project {
  id: number;
  github: string | null;
  image: string;
  tags: string[];
  title: string;
  description: string;
  link: string | null;
}