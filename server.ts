import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  app.post('/api/gemini/avatar', async (req, res) => {
    try {
      const { prompt } = req.body || {};
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Missing or invalid prompt' });
        return;
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const dataUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          res.json({ dataUrl });
          return;
        }
      }

      res.status(502).json({ error: 'No image data returned from Gemini model' });
    } catch (err: any) {
      console.error('Server /api/gemini/avatar error:', err);
      res.status(500).json({ error: err?.message || 'Failed to generate avatar image' });
    }
  });

  app.post('/api/gemini/mockup', async (req, res) => {
    try {
      const {
        referenceBase64,
        referenceMimeType = 'image/jpeg',
        cardBase64,
        cardMimeType = 'image/png',
        prompt,
      } = req.body || {};

      if (!referenceBase64 || !cardBase64 || !prompt) {
        res.status(400).json({ error: 'Missing required image or prompt payload' });
        return;
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { mimeType: referenceMimeType, data: referenceBase64 } },
            { inlineData: { mimeType: cardMimeType, data: cardBase64 } },
            { text: prompt },
          ],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const dataUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          res.json({ dataUrl });
          return;
        }
      }

      res.status(502).json({ error: 'No mockup image data returned from Gemini model' });
    } catch (err: any) {
      console.error('Server /api/gemini/mockup error:', err);
      res.status(500).json({ error: err?.message || 'Failed to generate AI mockup' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
