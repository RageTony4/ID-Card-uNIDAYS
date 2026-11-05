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

// Track per-model quota cooldowns so we don't repeatedly hit 429 RESOURCE_EXHAUSTED
const modelCooldownUntil = new Map<string, number>();
const IMAGE_MODELS = ['gemini-2.5-flash-image', 'gemini-3.1-flash-image-preview'];

function isQuotaOrRateLimitError(err: any): boolean {
  const msg = String(err?.message || err || '');
  const status = err?.status || err?.code || err?.error?.code;
  return (
    status === 429 ||
    status === 'RESOURCE_EXHAUSTED' ||
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('Quota exceeded')
  );
}

function markModelQuotaCooldown(model: string, err: any) {
  const msg = String(err?.message || '');
  const isZeroLimit = msg.includes('limit: 0');
  const cooldownMs = isZeroLimit ? 15 * 60 * 1000 : 60 * 1000;
  modelCooldownUntil.set(model, Date.now() + cooldownMs);
}

async function generateImageWithFallback(contents: any): Promise<string | null> {
  let ai: GoogleGenAI;
  try {
    ai = getAiClient();
  } catch {
    return null;
  }

  const now = Date.now();
  for (const model of IMAGE_MODELS) {
    const cooldown = modelCooldownUntil.get(model) || 0;
    if (now < cooldown) {
      continue;
    }

    try {
      const response = await ai.models.generateContent({
        model,
        contents,
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }
    } catch (err: any) {
      if (isQuotaOrRateLimitError(err)) {
        markModelQuotaCooldown(model, err);
        console.warn(`[Gemini Image] Quota/rate limit reached for ${model}; using studio v4 avatar fallback.`);
      } else {
        markModelQuotaCooldown(model, err);
        console.warn(`[Gemini Image] Model ${model} error (${err?.status || 'unknown'}):`, err?.message || err);
      }
    }
  }

  return null;
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

      const dataUrl = await generateImageWithFallback({
        parts: [{ text: prompt }],
      });

      if (dataUrl) {
        res.json({ dataUrl });
        return;
      }

      // Return 200 with fallback flag so client seamlessly uses the v4 studio avatar generator
      res.status(200).json({
        dataUrl: null,
        fallback: true,
        reason: 'Image generation quota reached on current API key tier; using studio v4 avatar.',
      });
    } catch (err: any) {
      res.status(200).json({
        dataUrl: null,
        fallback: true,
        reason: err?.message || 'Using studio v4 avatar fallback.',
      });
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

      const dataUrl = await generateImageWithFallback({
        parts: [
          { inlineData: { mimeType: referenceMimeType, data: referenceBase64 } },
          { inlineData: { mimeType: cardMimeType, data: cardBase64 } },
          { text: prompt },
        ],
      });

      if (dataUrl) {
        res.json({ dataUrl });
        return;
      }

      // Return 200 with fallback flag so client uses Calibrated 3D Holder Fit seamlessly
      res.status(200).json({
        dataUrl: null,
        fallback: true,
        reason: 'Image generation quota reached on current API key tier; using calibrated 3D compositor.',
      });
    } catch (err: any) {
      res.status(200).json({
        dataUrl: null,
        fallback: true,
        reason: err?.message || 'Using calibrated 3D compositor fallback.',
      });
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
