import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const buffer = fs.readFileSync("./t3_card.jpg");
  const base64Data = buffer.toString("base64");

  console.log("Analyzing image with Gemini flash...");
  const aiResponse = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data,
        },
      },
      "Describe this ID card in meticulous detail so I can recreate it perfectly in React with Tailwind CSS.\n" +
      "1. Card dimensions / aspect ratio / orientation (horizontal or vertical?)\n" +
      "2. Color scheme: exact hex colors or closest CSS colors for each section (header strip, main body, borders, accents).\n" +
      "3. Top Header: Exact text, font weights, logo description, layout, background color.\n" +
      "4. Left side accent / strip: What is on the left? (e.g. vertical text 'STUDENT', font, color, background, orientation, etc.)\n" +
      "5. Photo: Placement (left/right/center), dimensions, aspect ratio, frame, border radius, background, sample person.\n" +
      "6. Student Details: Exactly what fields are shown, exact text, labels and values, typography (font size, weight, letter spacing, font style), alignment, colors.\n" +
      "7. Background patterns, watermarks, holograms, security markings, seals, icons: describe every single decorative element in detail.\n" +
      "8. Is there a back side shown in the image or is it single-sided front only?\n" +
      "9. Transcribe all text verbatim.\n" +
      "10. Suggest React + Tailwind JSX markup structure."
    ],
  });

  fs.writeFileSync("t3_analysis.txt", aiResponse.text);
  console.log("Saved to t3_analysis.txt!");
}

run().catch(console.error);
