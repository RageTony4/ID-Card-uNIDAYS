import crypto from 'crypto';
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

const RECRAFT_FREE_CUTOFF = new Date("2026-11-27T00:00:00Z");
const OPENROUTER_RECRAFT_FREE_MODEL = "recraft/recraft-v4.1-flash-v2:free";

const POLLINATIONS_ETHNICITIES = [
  'European Caucasian',
  'East Asian',
  'South Asian Indian',
  'Black African-Diaspora',
  'Hispanic Latino',
  'Middle Eastern Mediterranean',
  'Southeast Asian',
  'Multiracial mixed-heritage',
];

const POLLINATIONS_MALE_HAIRSTYLES = [
  'neatly styled short tapered haircut with natural texture',
  'modern textured crop with clean side part',
  'natural wavy medium-length hair parted neatly',
  'short curly hair with a clean academic look',
  'classic side-parted brush-back hairstyle',
  'clean short crew cut with natural hairline',
];

const POLLINATIONS_FEMALE_HAIRSTYLES = [
  'shoulder-length wavy hair worn down naturally',
  'neat high bun with soft framing strands',
  'long straight hair parted in the middle',
  'natural curly hair styled neatly around the shoulders',
  'sleek low ponytail with a clean side part',
  'chin-length bob haircut tucked behind the ears',
];

const POLLINATIONS_MALE_CLOTHES = [
  'a navy blue everyday university polo shirt',
  'a crisp light-blue oxford button-down shirt',
  'a heather grey crewneck university sweater over a collared shirt',
  'a forest green smart-casual polo shirt',
  'a burgundy knit crewneck sweater',
  'a classic plaid button-down university shirt',
];

const POLLINATIONS_FEMALE_CLOTHES = [
  'a clean white everyday university blouse',
  'a soft navy knit university sweater',
  'a light blue button-down oxford shirt',
  'a burgundy smart-casual polo shirt',
  'a cream cable-knit crewneck sweater',
  'a sage green everyday blouse with a neat collar',
];

function pickRandomServerItem<T>(items: T[]): T {
  return items[crypto.randomInt(0, items.length)];
}

function buildPassportAvatarPrompt(rawGender?: string, rawBgColor?: string): {
  gender: 'male' | 'female';
  bgColor: 'white' | 'blue';
  seed: number;
  prompt: string;
} {
  const normalizedGender = String(rawGender || '').toLowerCase();
  const normalizedBg = String(rawBgColor || '').toLowerCase();

  const gender: 'male' | 'female' =
    normalizedGender === 'male' || normalizedGender === 'female'
      ? normalizedGender
      : crypto.randomInt(0, 2) === 0
      ? 'male'
      : 'female';

  const bgColor: 'white' | 'blue' =
    normalizedBg === 'blue' || normalizedBg === 'white'
      ? normalizedBg
      : 'white';

  const age = crypto.randomInt(19, 24); // 19 to 23 inclusive
  const ethnicity = pickRandomServerItem(POLLINATIONS_ETHNICITIES);
  const hairstyle =
    gender === 'male'
      ? pickRandomServerItem(POLLINATIONS_MALE_HAIRSTYLES)
      : pickRandomServerItem(POLLINATIONS_FEMALE_HAIRSTYLES);
  const clothing =
    gender === 'male'
      ? pickRandomServerItem(POLLINATIONS_MALE_CLOTHES)
      : pickRandomServerItem(POLLINATIONS_FEMALE_CLOTHES);
  const bgDescription =
    bgColor === 'blue'
      ? 'a solid #3B82F6 blue background'
      : 'a solid #FFFFFF white background';

  const seed = crypto.randomInt(1, 2147483647);

  const prompt = `Photorealistic university student ID passport photo of a ${age}-year-old ${ethnicity} ${gender} university student with ${hairstyle}, wearing ${clothing}, normal neutral expression, mouth closed, front-facing head-and-shoulders framing, studio lighting, natural skin texture, against ${bgDescription}, no text, no watermark, official biometric student ID portrait.`;

  return { gender, bgColor, seed, prompt };
}

async function fetchPollinationsImageBuffer(
  prompt: string,
  model: string,
  seed: number,
  apiKey?: string
): Promise<Buffer> {
  const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=${encodeURIComponent(model)}&width=600&height=600&seed=${seed}&nologo=true`;
  const headers: Record<string, string> = {
    Accept: 'image/jpeg,image/png,image/*,*/*',
  };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`Pollinations model ${model} returned HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.length === 0) {
    throw new Error(`Pollinations model ${model} returned an empty image buffer`);
  }
  return buffer;
}

async function generateWithPollinationsFallback(
  prompt: string,
  seed: number
): Promise<{ base64DataUri: string; modelUsed: string }> {
  const apiKey = process.env.POLLINATIONS_API_KEY;
  const primaryModel = 'community/scriptsnsenses-sys/flux-2-dev-free';
  const fallbackModel = 'black-forest-labs/flux.1-schnell';

  let imageBuffer: Buffer;
  let modelUsed = primaryModel;

  try {
    imageBuffer = await fetchPollinationsImageBuffer(prompt, primaryModel, seed, apiKey);
  } catch (primaryErr: any) {
    console.warn(
      `[Pollinations] Primary model (${primaryModel}) failed or timed out (${primaryErr?.message || primaryErr}). Retrying with fallback (${fallbackModel})...`
    );
    modelUsed = fallbackModel;
    imageBuffer = await fetchPollinationsImageBuffer(prompt, fallbackModel, seed, apiKey);
  }

  const base64DataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
  return { base64DataUri, modelUsed };
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

  app.post('/api/generate-avatar-pollinations', async (req, res) => {
    try {
      const { seed, prompt } = buildPassportAvatarPrompt(req.body?.gender, req.body?.bgColor);
      const { base64DataUri, modelUsed } = await generateWithPollinationsFallback(prompt, seed);

      res.set('Cache-Control', 'no-store');
      res.json({
        success: true,
        image: base64DataUri,
        modelUsed,
      });
    } catch (err: any) {
      console.error('[Pollinations] Avatar generation error:', err?.message || err);
      res.status(502).json({
        success: false,
        error: err?.message || 'Failed to generate avatar via Pollinations.',
      });
    }
  });

  app.post('/api/generate-avatar-openrouter', async (req, res) => {
    const { bgColor, seed, prompt } = buildPassportAvatarPrompt(req.body?.gender, req.body?.bgColor);

    res.set('Cache-Control', 'no-store');

    // Strict Pre-Expiration Kill-Switch (2026-11-27T00:00:00Z, 1 day before Nov 28 expiration)
    if (Date.now() >= RECRAFT_FREE_CUTOFF.getTime()) {
      console.log('Recraft free model disabled ahead of Nov 28 expiration');
      try {
        const fallback = await generateWithPollinationsFallback(prompt, seed);
        res.json({
          success: true,
          image: fallback.base64DataUri,
          provider: 'pollinations-fallback',
          modelUsed: fallback.modelUsed,
        });
        return;
      } catch (fallbackErr: any) {
        res.status(502).json({
          success: false,
          error: fallbackErr?.message || 'Fallback avatar generation failed.',
        });
        return;
      }
    }

    // Ensure model strictly ends with :free so it can never call a paid endpoint
    if (!OPENROUTER_RECRAFT_FREE_MODEL.endsWith(':free')) {
      console.warn('Blocked non-free OpenRouter model configuration; routing to fallback.');
      try {
        const fallback = await generateWithPollinationsFallback(prompt, seed);
        res.json({
          success: true,
          image: fallback.base64DataUri,
          provider: 'pollinations-fallback',
          modelUsed: fallback.modelUsed,
        });
        return;
      } catch (fallbackErr: any) {
        res.status(502).json({
          success: false,
          error: fallbackErr?.message || 'Fallback avatar generation failed.',
        });
        return;
      }
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
      try {
        const backgroundRgbColor = bgColor === 'blue' ? [59, 130, 246] : [255, 255, 255];

        const orResponse = await fetch('https://openrouter.ai/api/v1/images', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: OPENROUTER_RECRAFT_FREE_MODEL,
            prompt,
            aspect_ratio: '1:1',
            provider: { allow_fallbacks: false },
            image_config: {
              background_rgb_color: backgroundRgbColor,
            },
          }),
          signal: AbortSignal.timeout(20000),
        });

        if (orResponse.ok) {
          const result: any = await orResponse.json();
          const b64Json = result?.data?.[0]?.b64_json;
          if (b64Json && typeof b64Json === 'string') {
            const dataUri = b64Json.startsWith('data:image/')
              ? b64Json
              : `data:image/png;base64,${b64Json}`;
            res.json({
              success: true,
              image: dataUri,
              provider: 'openrouter-recraft-free',
              modelUsed: OPENROUTER_RECRAFT_FREE_MODEL,
            });
            return;
          }
        } else {
          console.warn(
            `[OpenRouter] Recraft free returned HTTP ${orResponse.status}; falling back to Pollinations.`
          );
        }
      } catch (orErr: any) {
        console.warn(
          `[OpenRouter] Request failed (${orErr?.message || orErr}); falling back to Pollinations.`
        );
      }
    } else {
      console.warn('[OpenRouter] OPENROUTER_API_KEY not set; falling back to Pollinations.');
    }

    // Seamless fallback to Pollinations / Flux.1-schnell if 429, 402, 404, or any error occurs
    try {
      const fallback = await generateWithPollinationsFallback(prompt, seed);
      res.json({
        success: true,
        image: fallback.base64DataUri,
        provider: 'pollinations-fallback',
        modelUsed: fallback.modelUsed,
      });
    } catch (fallbackErr: any) {
      console.error('[OpenRouter Fallback] Avatar generation error:', fallbackErr?.message || fallbackErr);
      res.status(502).json({
        success: false,
        error: fallbackErr?.message || 'Failed to generate avatar via OpenRouter and fallback.',
      });
    }
  });

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
