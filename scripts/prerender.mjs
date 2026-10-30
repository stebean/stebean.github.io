import { build } from "vite";
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const output = path.resolve("dist-ssr");
try {
  await build({ build: { ssr: "src/entry-server.tsx", outDir: output, emptyOutDir: true, minify: false } });
  const { render } = await import(pathToFileURL(path.join(output, "entry-server.js")).href);
  const file = path.resolve("dist/index.html");
  const template = await readFile(file, "utf8");
  const html = render();
  if (!html.includes("Soy Esteban de Santiago") || !html.includes("Casa Calavera")) {
    throw new Error("Prerender did not include the portfolio's main content.");
  }
  await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log("Prerendered portfolio: identity, projects and contact are available in the initial HTML.");
} finally {
  // This directory is a disposable build output, never the source checkout.
  await rm(output, { recursive: true, force: true });
}
