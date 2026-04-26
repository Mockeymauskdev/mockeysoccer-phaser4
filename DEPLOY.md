# Quick Deploy Guide

## 1. Download Phaser 4
- Go to https://phaser.io/download
- Download **Phaser 4.0.0 minified** (`phaser.min.js`)
- Place it in this folder (same level as `index.html`)

## 2. Push to GitHub
```bash
git init
git add .
git commit -m "soccer rpg v1"
git remote add origin https://github.com/YOURNAME/soccer-rpg.git
git push -u origin main
```

## 3. Deploy to Render (Free)
### Option A: One-Click Blueprint
1. Push `render.yaml` to your repo
2. Go to https://dashboard.render.com/blueprints
3. Click **New Blueprint Instance**
4. Connect your GitHub repo
5. Click **Apply**

### Option B: Manual Web Service
1. https://dashboard.render.com → **New Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
4. Add Environment Variables:
   - `SOLANA_RPC` = `https://api.devnet.solana.com`
5. Click **Create Web Service**

## 4. Live URL
- Game: `https://soccer-rpg.onrender.com`
- API: `https://soccer-rpg.onrender.com/api/health`

## Files in this ZIP
| File | Purpose |
|------|---------|
| `index.html` | Phaser 4 game (frontend) |
| `phaser.min.js` | **You must download this** from phaser.io |
| `server.js` | Node.js API backend |
| `package.json` | Dependencies for Render |
| `render.yaml` | One-click Render blueprint |
| `.env.example` | Config template (copy to `.env` locally) |
| `.gitignore` | Prevents committing secrets/node_modules |
| `README.md` | Full documentation |
| `DEPLOY.md` | This file — quick reference |
