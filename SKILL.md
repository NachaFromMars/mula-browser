# 🦞 MuBro — Mula Browser Skill

AI-First Browser with Human DNA. Anti-detect fingerprinting + human behavior simulation + token-efficient extraction (~500-800 tokens/page). Built on Electron + Hono ACP server.

## Quick Start

```bash
# Start MuBro (Electron window + ACP server on port 9870)
node scripts/mubro.mjs start

# Navigate to URL
node scripts/mubro.mjs nav https://example.com

# Extract page as AI-friendly JSON (~500-800 tokens)
node scripts/mubro.mjs extract

# Screenshot
node scripts/mubro.mjs snap --output page.png

# Check health
node scripts/mubro.mjs status

# MCP server (stdio mode for Claude/Cursor)
node dist/server/mcp.js
```

## ACP API (REST)

Base: `http://127.0.0.1:9870/api`

### Navigation
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/status` | GET | — | Server health + browser status |
| `/api/navigate` | POST | `{ url, waitFor? }` | Navigate to URL |
| `/api/back` | POST | — | Go back |
| `/api/forward` | POST | — | Go forward |
| `/api/refresh` | POST | — | Reload page |

### Extraction (Auto-detect site type)
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/extract` | POST | `{ selector?, mode? }` | DOM → token-efficient JSON |

**Sites**: Facebook, Twitter/X, Google Search, YouTube, Forms, Tables, Generic.
**Modes**: `auto` (default), `generic`, `social`, `search`, `video`, `form`, `table`.

**Response format:**
```json
{
  "url": "https://example.com",
  "title": "Example",
  "text": "Cleaned visible text (~500 tokens)",
  "actions": [
    { "id": "a0", "tag": "a", "text": "Click me", "href": "/page" },
    { "id": "a1", "tag": "input", "type": "text", "name": "q" }
  ],
  "meta": { "lang": "en", "h1": "Welcome" },
  "tokens_est": 450
}
```

### Interaction (Human DNA)
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/click` | POST | `{ target, x?, y?, profile? }` | Click with Bézier mouse movement |
| `/api/type` | POST | `{ target, text, clear?, profile? }` | Type with variable delay + typos |
| `/api/scroll` | POST | `{ direction, amount?, target?, profile? }` | Scroll with momentum |
| `/api/wait` | POST | `{ for, target?, ms?, timeout? }` | Wait for element/navigation/time |

Profiles: `casual` (default), `fast`, `careful`.

### Screenshots
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/screenshot` | POST | `{ mode?, selector?, format?, quality? }` | Capture viewport/fullpage/element |

### Tabs
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/tabs` | GET | — | List all tabs |
| `/api/tabs` | POST | `{ url? }` | Open new tab |
| `/api/tabs/:id/activate` | POST | — | Switch to tab |
| `/api/tabs/:id/navigate` | POST | `{ url }` | Navigate specific tab |
| `/api/tabs/:id` | DELETE | — | Close tab |

### Profiles
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/profiles` | GET | — | List profiles |
| `/api/profiles` | POST | `{ name, seed? }` | Create profile |
| `/api/profiles/:id/activate` | POST | — | Load profile (inject fingerprint) |
| `/api/profiles/:id/export` | GET | — | Export as JSON |
| `/api/profiles/:id` | DELETE | — | Delete profile |

### File Operations
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/upload` | POST | `{ selector, files[] }` | Set files on file input |
| `/api/download` | POST | `{ url, savePath }` | Download URL to local path |

### Dialogs
| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/dialog/pending` | GET | — | Check for pending dialog |
| `/api/dialog/handle` | POST | `{ accept, text? }` | Accept/dismiss dialog |
| `/api/dialog/auto` | POST | `{ autoAccept }` | Auto-respond to all dialogs |

## WebSocket

Connect: `ws://127.0.0.1:9870/ws`

Events: `connected`, `navigated`, `tab_opened`, `tab_closed`, `tab_switched`,
`file_uploaded`, `download_complete`, `dialog`, `dialog_handled`,
`retry`, `recovery`, `circuit_breaker`.

Ping: `{ "type": "ping" }` → `{ "type": "pong" }`

## MCP Tools (Claude/Cursor)

```json
{
  "mcpServers": {
    "mula-browser": {
      "command": "node",
      "args": ["path/to/mula-browser/dist/server/mcp.js"]
    }
  }
}
```

| Tool | Input | Description |
|------|-------|-------------|
| `mula_navigate` | `url`, `waitFor?` | Navigate to URL |
| `mula_extract` | `selector?`, `mode?` | Extract page → JSON |
| `mula_click` | `target`, `button?` | Click (human-like) |
| `mula_type` | `target`, `text`, `clear?` | Type (human-like) |
| `mula_screenshot` | `scope`, `target?`, `format?` | Screenshot |
| `mula_scroll` | `direction`, `target?`, `amount?` | Scroll (momentum) |
| `mula_wait` | `for`, `target?`, `ms?`, `timeout?` | Wait for condition |
| `mula_tabs` | `operation`, `url?`, `tabId?` | Tab management |
| `mula_profile` | `operation`, `name?` | Profile management |

## CLI Commands

```bash
mubro start [-p|--port]          # Start browser + ACP server
mubro status                     # Server health
mubro navigate|nav <url>         # Navigate to URL
mubro extract [-s|--selector]    # Extract page content
mubro screenshot|snap [options]  # Take screenshot
mubro profile create <name>      # Create profile
mubro profile list               # List profiles
mubro profile activate <id>      # Load profile
mubro profile delete <id>        # Delete profile
mubro profile export <id>        # Export profile
mubro tab list                   # List tabs
mubro tab create [url]           # Open tab
mubro tab close <id>             # Close tab
mubro tab activate <id>          # Switch tab
```

## Key Features

- **Human DNA**: Bézier mouse, variable keyboard, momentum scroll, session lifecycle, organic browsing
- **Fingerprint**: Canvas, WebGL, Audio, Navigator, Screen, WebRTC, Fonts spoofing (seeded per profile)
- **Extraction**: 500-800 tokens/page (300x compression), auto-detect site type
- **Error Recovery**: Exponential backoff, circuit breaker, auto-recovery

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MUBRO_PORT` | `9870` | ACP server port |
| `MUBRO_FP_SEED` | `default` | Fingerprint seed |
| `MUBRO_MAX_TABS` | `10` | Max concurrent tabs |
| `MUBRO_LOG_LEVEL` | `info` | Log level |

## Requirements

- Node.js 20+
- Electron 40+ (auto-installed)
- Windows / macOS / Linux
