const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const exportDirectory = path.join(projectRoot, "out");
const indexFile = path.join(exportDirectory, "index.html");

if (!fs.existsSync(indexFile)) {
  throw new Error("Next.js export is missing. Run `npm run build` first.");
}

for (const entry of fs.readdirSync(exportDirectory)) {
  fs.cpSync(
    path.join(exportDirectory, entry),
    path.join(projectRoot, entry),
    { recursive: true, force: true }
  );
}
