// Crea src/content/projects/<repo>.md con los datos del repo en GitHub, para completar a mano.
//
//   node scripts/add-project.mjs Short-url-backend
//   node scripts/add-project.mjs garmin-coach-mcp --featured
//
// Lee nombre, descripción, año, lenguaje y demo con `gh`. La historia (el cuerpo del .md) y las
// capturas las escribo yo: nada de portadas generadas, solo pantallas reales en public/projects/.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "src", "content", "projects");
const args = process.argv.slice(2);
const repo = args.find((a) => !a.startsWith("--"));
const featured = args.includes("--featured");
if (!repo) {
  console.error("uso: node scripts/add-project.mjs <repo> [--featured]");
  process.exit(1);
}

const info = JSON.parse(
  execFileSync("gh", ["repo", "view", `Yeisonfjrd/${repo}`, "--json",
    "name,description,createdAt,primaryLanguage,homepageUrl,url,visibility"], { encoding: "utf8" }),
);
const slug = repo.toLowerCase();
const file = path.join(DIR, `${slug}.md`);
if (existsSync(file)) {
  console.error(`ya existe ${path.relative(ROOT, file)}`);
  process.exit(1);
}
const order = readdirSync(DIR).filter((f) => f.endsWith(".md")).length + 1;
const isPublic = info.visibility === "PUBLIC";
const q = (s) => JSON.stringify(s ?? "");

const lines = [
  "---",
  `title: ${q(info.name)}`,
  `year: ${new Date(info.createdAt).getFullYear()}`,
  `order: ${order}`,
  `featured: ${featured}`,
  `stack: [${q(info.primaryLanguage?.name ?? "")}]`,
  `summary: ${q(info.description)}`,
  isPublic ? `github: ${q(info.url)}` : `privateNote: "Privado"`,
  ...(info.homepageUrl ? ["links:", `  - { label: Demo, href: ${q(info.homepageUrl)} }`] : []),
  ...(featured ? ["figures: []  # pantallas reales: { kind: shot | phones, caption, screens: [{ src, alt, width, height }] }"] : []),
  "---",
  "",
  featured ? "Por qué lo hice y qué me sorprendió al hacerlo, en primera persona.\n" : "",
];
writeFileSync(file, lines.join("\n"));
console.log(`creado ${path.relative(ROOT, file)}: completá stack, historia y capturas`);
