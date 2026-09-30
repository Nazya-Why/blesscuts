// Публікує сайт на GitHub Pages: збирає його під адресу https://<owner>.github.io/<repo>/
// і відправляє вміст dist/ у гілку gh-pages репозиторію origin.
// Запуск: npm run deploy:pages
import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const run = (cmd, args, options = {}) => execFileSync(cmd, args, { stdio: "inherit", ...options });

const remote = execFileSync("git", ["remote", "get-url", "origin"], { encoding: "utf8" }).trim();
const match = remote.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/);
if (!match) throw new Error(`origin не схожий на GitHub-репозиторій: ${remote}`);
const [, owner, repo] = match;
const url = `https://${owner.toLowerCase()}.github.io/${repo}/`;

run(process.execPath, ["node_modules/astro/bin/astro.mjs", "build"], {
  env: { ...process.env, SITE_URL: `https://${owner.toLowerCase()}.github.io`, BASE_PATH: `/${repo}` },
});

// Без цього файлу GitHub Pages пропускає через Jekyll і не віддає папку _astro
writeFileSync("dist/.nojekyll", "");

const git = (...args) => run("git", args, { cwd: "dist" });
rmSync("dist/.git", { recursive: true, force: true });
git("init", "-q", "-b", "gh-pages");
git("add", "-A");
git("commit", "-q", "-m", process.env.DEPLOY_MESSAGE ?? "Deploy to GitHub Pages");
git("push", "-q", "--force", remote, "gh-pages");
rmSync("dist/.git", { recursive: true, force: true });

console.log(`\nОпубліковано: ${url}`);
