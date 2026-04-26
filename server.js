// Soccer RPG Backend — Render-ready Node.js server
// Serves both the Phaser game (static) and API endpoints

const express = require('express');
const path = require('path');
const cors = require('cors');

// Load .env only if present (Render uses env vars dashboard instead)
try { require('dotenv').config(); } catch(e) {}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Serve static files (Phaser game)
app.use(express.static(path.join(__dirname)));

// In-memory leaderboard (replace with Supabase/PostgreSQL in production)
const leaderboard = [];

// ==================== API ROUTES ====================

// Health check — Render uses this for uptime monitoring
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Record match result
// In production: verify match hash to prevent spoofing
app.post('/api/match/end', (req, res) => {
  const { winner, scoreT0, scoreT1, matchHash, walletAddress } = req.body;

  if (!walletAddress || !matchHash) {
    return res.status(400).json({ error: 'Missing wallet or match hash' });
  }

  const entry = {
    id: leaderboard.length + 1,
    wallet: walletAddress,
    winner,
    score: `${scoreT0}-${scoreT1}`,
    hash: matchHash,
    timestamp: Date.now()
  };
  leaderboard.push(entry);

  // TODO: Trigger SPL token reward via Solana Web3.js
  // const { Connection, PublicKey, Transaction } = require('@solana/web3.js');
  // const connection = new Connection(process.env.SOLANA_RPC || 'https://api.devnet.solana.com');

  res.json({ success: true, entry });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const sorted = leaderboard
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 50);
  res.json(sorted);
});

// Wallet verification stub
app.post('/api/wallet/verify', (req, res) => {
  const { message, signature, publicKey } = req.body;
  // TODO: Use @solana/web3.js or tweetnacl to verify signature
  res.json({ verified: true, publicKey });
});

// Fallback: serve index.html for any unknown route (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Soccer RPG server running on port ${PORT}`);
  console.log(`Game URL: http://localhost:${PORT}`);
  console.log(`API health: http://localhost:${PORT}/api/health`);
});
