#!/usr/bin/env node
/**
 * MuBro wrapper script for OpenClaw skill integration
 * Usage: node scripts/mubro.mjs <command> [args]
 */

import { execSync, spawn } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CLI = resolve(ROOT, "dist", "cli", "index.js");
const MAIN = resolve(ROOT, "dist", "electron", "main.js");

const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === "help") {
  console.log(`
🦞 MuBro — AI-First Browser

Commands:
  start [--port N]      Start MuBro (Electron + ACP)
  nav <url>             Navigate to URL
  extract [--selector]  Extract page content
  snap [--output file]  Take screenshot
  status                Check server status
  help                  Show this help
`);
  process.exit(0);
}

if (cmd === "start") {
  const port = args.includes("--port") ? args[args.indexOf("--port") + 1] : "9870";
  const electronBin = resolve(ROOT, "node_modules", ".bin", "electron");

  console.log(`🦞 Starting MuBro on port ${port}...`);
  const child = spawn(electronBin, [MAIN], {
    env: { ...process.env, MUBRO_PORT: port },
    stdio: "inherit",
    shell: true,
  });

  child.on("error", (err) => {
    console.error("❌ Failed to start:", err.message);
    process.exit(1);
  });
} else {
  // Forward to compiled CLI
  try {
    execSync(`node "${CLI}" ${args.join(" ")}`, {
      stdio: "inherit",
      cwd: ROOT,
    });
  } catch {
    process.exit(1);
  }
}
