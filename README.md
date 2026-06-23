# mula-browser — AI-first anti-detect browser with token-efficient extraction

> An AI-first browser combining anti-detect fingerprinting with human behavior simulation. Drive it via CLI, REST API, or MCP server — and extract pages in ~500–800 tokens.

[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blueviolet)](https://github.com/NachaFromMars)

## Overview
mula-browser (mubro) is an AI-first browser built on Electron with a Hono ACP server on port 9870. It pairs anti-detect fingerprinting with human behavior simulation to browse naturally, while keeping page extraction token-efficient (~500–800 tokens/page). Control it through a CLI script, a local REST API, or an MCP stdio server for Claude/Cursor integration.

## Features
- **Anti-detect fingerprinting** + human behavior simulation
- **Token-efficient extraction** — ~500–800 tokens/page
- **REST API** at `http://127.0.0.1:9870/api` — status, navigate, back, forward, refresh, extract, click, screenshot
- **MCP server** — `node dist/server/mcp.js` (stdio mode)

## Usage / Quick Start
```bash
node scripts/mubro.mjs start       # launch browser + ACP server
node scripts/mubro.mjs nav <url>   # navigate
node scripts/mubro.mjs extract     # extract page (~500-800 tokens)
node scripts/mubro.mjs snap        # screenshot
node scripts/mubro.mjs status      # health check

# MCP mode (Claude/Cursor)
node dist/server/mcp.js
```

## Trigger Keywords (OpenClaw)
mubro, mula browser, AI browser, anti-detect browser, human browser, browser extraction

## Related Skills
- [crawl-for-ai](https://github.com/NachaFromMars/crawl-for-ai) — Crawl4AI JS-rendering scraper

---
Part of the [NachaFromMars](https://github.com/NachaFromMars) OpenClaw skill ecosystem.
