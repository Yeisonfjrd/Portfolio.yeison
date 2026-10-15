// Agrega o actualiza un proyecto en src/data/projects.json a partir de su repo de GitHub.
//
//   node scripts/add-project.mjs Rental-cars
//   node scripts/add-project.mjs docsearch-api --featured
//   node scripts/add-project.mjs Short-url-backend --demo https://otra-url.vercel.app
//   node scripts/add-project.mjs garmin-coach-mcp --image-only      solo rehace la imagen
//
// Toma descripción, lenguajes, año y demo del repo. La imagen es una captura de la demo; si el repo
// no tiene demo (una API, un MCP), arma una portada con el nombre, el stack y `cover` del JSON.
// Lo escrito a mano (title, summary, highlights, cover, order) no se pisa al volver a correrlo.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "src", "data", "projects.json");
const IMG_DIR = path.join(ROOT, "public", "projects");
const OWNER = "Yeisonfjrd";

const args = process.argv.slice(2);
const opt = (name) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : undefined);
const repo = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--demo");
if (!repo) {
  console.error("uso: node scripts/add-project.mjs <repo> [--featured] [--demo <url>] [--image-only]");
  process.exit(1);
}

/**
 * El lanzador de Edge le pasa la orden a otro proceso y sale enseguida, así que a veces no saca nada.
 * El headless shell de Playwright corre la captura en el mismo proceso y siempre espera.
 */
function findBrowser() {
  const pw = path.join(process.env.LOCALAPPDATA ?? "", "ms-playwright");
  if (existsSync(pw)) {
    for (const dir of readdirSync(pw).filter((d) => d.startsWith("chromium_headless_shell")).sort().reverse()) {
      for (const sub of readdirSync(path.join(pw, dir))) {
        const exe = path.join(pw, dir, sub, "chrome-headless-shell.exe");
        if (existsSync(exe)) return exe;
      }
    }
  }
  return process.env.CHROME_EXE;
}

function screenshot(url, file, size = "1280,800") {
  const browser = findBrowser();
  if (!browser) throw new Error("no encontré Chromium: corré `npx playwright install chromium-headless-shell` o pasá CHROME_EXE");
  execFileSync(browser, ["--hide-scrollbars", `--window-size=${size}`, "--virtual-time-budget=8000", `--screenshot=${file}`, url], {
    stdio: "ignore",
    timeout: 90_000,
  });
  if (!existsSync(file)) throw new Error(`no se generó ${file}`);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Portada para proyectos sin interfaz: mismos colores que el portfolio (slate + violeta). */
function coverHtml(p) {
  return `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;width:1280px;height:800px;font-family:"Segoe UI",system-ui,sans-serif;color:#e2e8f0;
    background:radial-gradient(circle at 85% 10%,rgba(139,92,246,.35),transparent 45%),radial-gradient(circle at 0% 100%,rgba(99,102,241,.25),transparent 50%),#0f0f1a;
    display:flex;flex-direction:column;justify-content:center;padding:0 110px;box-sizing:border-box}
  .kind{font:600 26px/1 Consolas,monospace;color:#a78bfa;letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px}
  h1{font-size:92px;line-height:1;margin:0 0 30px;color:#fff;letter-spacing:-.02em}
  .term{font:30px/1.5 Consolas,monospace;background:rgba(15,23,42,.85);border:1px solid rgba(139,92,246,.35);border-radius:16px;padding:26px 34px;color:#cbd5e1;max-width:1000px}
  .term b{color:#4ade80;font-weight:400}
  .tags{display:flex;gap:14px;margin-top:40px}
  .tags span{font-size:26px;padding:8px 20px;border-radius:999px;background:rgba(76,29,149,.5);color:#c4b5fd;border:1px solid rgba(109,40,217,.5)}
</style><body>
  <div class="kind">${esc(p.cover?.kind ?? "backend")}</div>
  <h1>${esc(p.title.split(" — ")[0])}</h1>
  <div class="term"><b>$</b> ${esc(p.cover?.line ?? p.summary)}</div>
  <div class="tags">${p.tags.slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
</body>`;
}

async function gh(p) {
  const res = await fetch(`https://api.github.com/${p}`, { headers: { "User-Agent": "portfolio-add-project" } });
  if (!res.ok) throw new Error(`GitHub ${res.status} en ${p}`);
  return res.json();
}

const info = await gh(`repos/${OWNER}/${repo}`);
const languages = Object.keys(await gh(`repos/${OWNER}/${repo}/languages`));
const projects = existsSync(DATA) ? JSON.parse(readFileSync(DATA, "utf8")) : [];
const slug = repo.toLowerCase();
const prev = projects.find((p) => p.slug === slug) ?? {};

const entry = {
  ...prev, // campos escritos a mano (bug, diff, discipline) se conservan
  slug,
  title: prev.title ?? repo.replace(/-/g, " "),
  summary: prev.summary ?? info.description ?? "",
  highlights: prev.highlights ?? [],
  tags: prev.tags ?? languages.filter((l) => !["CSS", "HTML", "Dockerfile", "Procfile", "Shell"].includes(l)).slice(0, 4),
  year: prev.year ?? Number(info.created_at.slice(0, 4)),
  github: info.private ? null : info.html_url,
  link: opt("demo") ?? ("link" in prev ? prev.link : info.homepage || null),
  image: prev.image ?? null,
  cover: prev.cover,
  featured: args.includes("--featured") || prev.featured || false,
  order: prev.order ?? projects.length + 1,
};

mkdirSync(IMG_DIR, { recursive: true });
const file = path.join(IMG_DIR, `${slug}.png`);
// Con `cover` manda la portada: una demo con login o caída no sirve de foto
if (entry.link && !entry.cover) {
  screenshot(entry.link, file);
} else {
  const html = path.join(os.tmpdir(), `cover-${slug}.html`);
  writeFileSync(html, coverHtml(entry));
  screenshot(pathToFileURL(html).href, file);
}
entry.image = `/projects/${slug}.png`;

const next = [...projects.filter((p) => p.slug !== slug), entry].sort((a, b) => a.order - b.order);
writeFileSync(DATA, JSON.stringify(next, null, 2) + "\n");
console.log(`${prev.slug ? "actualizado" : "agregado"}: ${entry.title} → ${entry.image}`);
if (!entry.highlights.length) console.log("  falta: 1 o 2 highlights en src/data/projects.json (qué problema resolviste y cómo)");
