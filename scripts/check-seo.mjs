import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

// Inspect the built HTML without running JavaScript, like a non-rendering crawler.
const html = await readFile("dist/index.html", "utf8");
const { document } = new JSDOM(html).window;
const canonical = document.querySelector('link[rel="canonical"]')?.href;
assert(canonical?.startsWith("https://"), "An absolute HTTPS canonical URL is required.");
assert.equal(document.querySelectorAll("h1").length, 1, "Use one descriptive main heading.");
assert.match(document.querySelector("h1").textContent, /Esteban de Santiago/);
assert.match(document.querySelector("main").textContent, /Soy Esteban de Santiago/);
assert.match(document.querySelector("main").textContent, /Zacatecas/);
assert.equal(document.querySelectorAll(".project-row").length, 3);
for (const row of document.querySelectorAll(".project-row")) {
  assert(row.querySelector(".project-panel>p")?.textContent.length > 40, "Every project needs a description in the initial HTML.");
  assert(row.querySelector('a[href^="https://"]'), "Each project must have a crawlable link.");
}
assert(document.querySelector('meta[name="description"]')?.content.length > 60);
const data = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
for (const type of ["Person", "WebSite", "ProfilePage", "ItemList"]) {
  assert(data["@graph"].some(item => item["@type"] === type), `Missing ${type} structured data.`);
}
assert.equal(data["@graph"].find(item => item["@type"] === "Person").url, canonical);
const sitemap = new JSDOM(await readFile("dist/sitemap.xml", "utf8"), { contentType: "text/xml" }).window.document;
const urls = [...sitemap.querySelectorAll("loc")].map(node => node.textContent);
assert.deepEqual(urls, [canonical], "List actual pages, not same-page fragments, in the sitemap.");
assert.match(await readFile("dist/robots.txt", "utf8"), /Allow: \//);
assert(await readFile("dist/googleae84c33b17674730.html", "utf8"), "Preserve the existing Google verification file.");
console.log("SEO checks passed: readable HTML, project descriptions, metadata, structured data and sitemap.");
