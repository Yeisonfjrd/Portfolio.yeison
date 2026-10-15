// Los proyectos viven en projects.json. Para sumar uno: node scripts/add-project.mjs <repo> [--featured]
import data from "./projects.json";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  year: number;
  github: string | null;
  link: string | null;
  image: string | null;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [...data].sort((a, b) => a.order - b.order);
export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
