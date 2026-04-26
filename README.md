# Soccer RPG Prototype — Phaser 4 Grid Edition

A tactical soccer RPG simulation built with Phaser 4, featuring grid-based movement, spatial passing analysis, AI formations, and cinematic clash resolution.

## Setup (Local / GitHub)

1. **Download Phaser 4.0.0**
   - Go to https://phaser.io/download
   - Download the **minified build** (`phaser.min.js`)
   - Place it in the **same folder** as `index.html`

2. **Run locally**
   ```bash
   # Simple Python server (or any static server)
   python3 -m http.server 8000
   # Then open http://localhost:8000
   ```

3. **Deploy to GitHub Pages**
   ```bash
   git init
   git add index.html phaser.min.js
   git commit -m "soccer rpg v1"
   git remote add origin https://github.com/YOURNAME/soccer-rpg.git
   git push -u origin main
   ```
   Then: **Repo Settings → Pages → Source: main branch**

## Controls

| Key | Action |
|-----|--------|
| **WASD / Arrows** | Move selected player one grid cell |
| **Mouse Click** | Move to clicked cell |
| **Tab** | Switch which player you control |
| **Space** | Quick pass (or shoot if near goal) |
| **G** | Toggle grid overlay |
| **A** | Toggle Auto-Pilot (AI controls all 22 players) |

## How it works

- **Default**: You control 1 player (blue team forward). The other 21 players are AI.
- **Auto-Pilot (A)**: AI controls all 22 players. The game simulates itself like Football Manager. Toggle off anytime to take manual control.
- **Clash**: When you carry the ball into a defender's cell, slow-mo triggers. Pick Pass → hover the 8 directions to see spatial analysis (green=clean, red=blocked, yellow=marked). The live success rate updates based on defenders in the lane, shadows, and marking pressure.

## Architecture

```
Frontend (Phaser 4)          Backend (Node.js)                Blockchain
-----------------            ----------------                 ----------
index.html                   server.js (Express)              Solana Web3.js
phaser.min.js  ---------->   API endpoints                    Phantom Wallet
Grid logic                   Match validation                 SPL Tokens
Clash system                 Leaderboard / history            NFT Rosters
```

## Hosting Requirements

### For Phaser Frontend Only (GitHub Pages / Netlify / Vercel)
- **Static file hosting** (HTML + JS + assets)
- **HTTPS** required for WebGL and wallet adapters
- **CORS headers** if loading assets from external domains
- **No server-side runtime needed**

### For Node.js Backend (Required for blockchain features)
You need a host that runs **Node.js server-side code**, not just static files:

| Host | Free Tier | Node.js | Good For |
|------|-----------|---------|----------|
| **Render** | Yes | 512MB RAM, sleeps after 15min | Full-stack apps, persistent server |
| **Railway** | Yes (500hrs/mo) | Auto-scaling | Fast deploy from GitHub |
| **Fly.io** | Yes ($5 credit) | Docker/Node | Global edge deployment |
| **Heroku** | Limited | Dynos | Easy but expensive to scale |
| **DigitalOcean App Platform** | Yes ($200 credit) | Node.js | Production-grade |
| **AWS Lambda + API Gateway** | 1M requests/mo | Serverless | Pay-per-request API |

### Blockchain-Specific Requirements
1. **HTTPS everywhere** — Wallet adapters (Phantom, Solflare) refuse `http://` origins.
2. **Outbound RPC access** — Your Node.js server must reach Solana RPC nodes (QuickNode, Helius, or public endpoints).
3. **Environment variables** — Store private keys / RPC URLs in `.env`, never in client code.
4. **CORS configured** — If frontend and backend are on different domains, backend must allow `Access-Control-Allow-Origin`.
5. **Rate limiting** — Protect RPC endpoints from spam (use `express-rate-limit`).

### Recommended Stack for Full Game + Blockchain

```
Frontend:    GitHub Pages or Vercel  (free, fast CDN)
Backend:     Render or Railway       (free Node.js hosting)
Database:    Supabase or MongoDB Atlas (free tier for match history)
Blockchain:  Solana Devnet → Mainnet via QuickNode/Helius RPC
Wallet:      @solana/wallet-adapter   (Phantom/Solflare/Backpack)
```

## Next Steps

1. Lock the core gameplay loop (clash balance, AI depth)
2. Add offside enforcement and fatigue system
3. Connect Phantom wallet for NFT roster loading
4. Add SPL token rewards on match end (server-side validation)
5. Build leaderboard using a simple Node.js API + Supabase

## License

MIT — prototype for indie crypto-gaming development.
