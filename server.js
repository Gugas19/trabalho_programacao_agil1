import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Webhook proxy endpoint
app.post('/api/webhook', async (req, res) => {
  try {
    const webhookUrl = process.env.VITE_MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: 'Webhook URL not configured' });
    }

    console.log('📡 Proxying request to Make.com webhook');
    console.log('📦 Data:', req.body);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log('✅ Response from Make.com:', response.status);

    return res.status(response.status).json({
      success: response.ok,
      data: data,
    });
  } catch (error) {
    console.error('❌ Webhook proxy error:', error);
    return res.status(500).json({
      error: 'Failed to forward request',
      details: error.message
    });
  }
});

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle client-side routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
