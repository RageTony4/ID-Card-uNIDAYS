import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Image Proxy endpoint to avoid CORS issues with cross-origin images
  app.get("/api/proxy-image", async (req, res) => {
    try {
      const imageUrl = req.query.url as string;
      if (!imageUrl) {
        res.status(400).json({ error: "Missing url parameter" });
        return;
      }

      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        res.status(response.status).send(`Failed to fetch image: ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get("content-type") || "image/png";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err: any) {
      console.error("Proxy image error:", err);
      res.status(500).json({ error: err.message || "Failed to proxy image" });
    }
  });

  // AI Mockup Generation Route
  app.post("/api/generate-mockup", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        res.status(400).json({ error: "GEMINI_API_KEY is not configured on the server." });
        return;
      }

      const { cardBase64, referenceBase64, referenceMimeType = 'image/jpeg' } = req.body;
      if (!cardBase64 || !referenceBase64) {
        res.status(400).json({ error: "Missing card or reference image data." });
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      // Model priority list for image-to-image mockup generation
      const modelsToTry = ['gemini-2.5-flash-image', 'gemini-2.5-flash', 'gemini-3.1-flash-image-preview', 'gemini-2.0-flash'];
      let lastError: any = null;
      let generatedImageUrl: string | null = null;

      for (const model of modelsToTry) {
        try {
          console.log(`[AI Mockup] Requesting content generation with model: ${model}`);
          const aiRes = await ai.models.generateContent({
            model,
            config: {
              temperature: 0.4,
              topP: 0.9,
            },
            contents: {
              parts: [
                { inlineData: { mimeType: referenceMimeType, data: referenceBase64 } },
                { inlineData: { mimeType: 'image/png', data: cardBase64 } },
                { text: "The first image is a real photo scene containing an ID card. The second image is a flat digital ID card design. Meticulously replace the visual content of the ID card in the first image with the design from the second image. Preserve the lighting, shadows, reflection, angle, and perspective of the original scene. Ensure high realism." }
              ]
            }
          });

          if (aiRes.candidates?.[0]?.content?.parts) {
            for (const part of aiRes.candidates[0].content.parts) {
              if (part.inlineData?.data) {
                generatedImageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
                break;
              }
            }
          }

          if (generatedImageUrl) {
            console.log(`[AI Mockup] Successfully generated image with model ${model}`);
            break;
          }
        } catch (err: any) {
          console.warn(`[AI Mockup] Model ${model} failed:`, err.message);
          lastError = err;
        }
      }

      if (generatedImageUrl) {
        res.json({ imageUrl: generatedImageUrl });
      } else {
        const errorMsg = lastError?.message || "AI returned no image output. Please try a different scene or retry.";
        res.status(500).json({ error: errorMsg });
      }
    } catch (err: any) {
      console.error("[AI Mockup Server Error]", err);
      res.status(500).json({ error: err.message || "Server error while generating mockup." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
