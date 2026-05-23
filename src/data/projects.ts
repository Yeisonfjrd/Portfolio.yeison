export const projects = [
  {
    title: "RoadEra — Car Rental Platform",
    description:
      "Plataforma fullstack de alquiler de coches de lujo. Autenticación de usuarios, panel de administración, disponibilidad en tiempo real e integración de pagos con Stripe. TypeScript end-to-end, base de datos relacional, diseño responsive.",
    image: "https://pojsouizkkvpmzknwpwc.supabase.co/storage/v1/object/public/Images//926shots_so.png",
    tags: ["TypeScript", "Node.js", "Stripe", "PostgreSQL"],
    link: "https://rental-cars-three.vercel.app/",
    github: "https://github.com/Yeisonfjrd/rental-cars",
  },
  {
    title: "X Clone — Social API",
    description:
      "Backend completo de red social: registro y autenticación de usuarios, gestión de sesiones con JWT, publicaciones y sistema de comentarios. API REST con Node.js y Express, persistencia en MongoDB.",
    image: "/projects/twitter.webp",
    tags: ["Node.js", "MongoDB", "Express", "JWT"],
    link: "https://x-json-kha7.vercel.app/",
    github: "https://github.com/Yeisonfjrd/Xjson",
  },
] as const;
