const email = "andresfajardo1606@gmail.com";

// Opens Gmail's compose window in a new tab, with my address and a subject already filled in
const gmail = (subject: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;

export const siteConfig = {
  name: "Yeison Fajardo",
  role: "Desarrollador backend junior",
  description:
    "Yeison Fajardo, desarrollador backend junior en Ezeiza, Buenos Aires. Java, Spring Boot y PostgreSQL. Proyectos reales, código y cómo los hice.",
  url: "https://portfolio-yeison.vercel.app",
  email,
  links: {
    github: "https://github.com/Yeisonfjrd",
    linkedin: "https://www.linkedin.com/in/yeison-fajardo",
    cv: "/cv-yeison-fajardo.pdf",
    gmail: gmail("Contacto desde tu portfolio"),
  },
} as const;
