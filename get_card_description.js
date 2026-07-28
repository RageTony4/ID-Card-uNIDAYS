import { GoogleGenAI } from "@google/genai";

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const imageUrl = "https://any-link-me.lovable.app/f/480p176x2g.png";

  console.log("Fetching image...");
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  const base64Data = Buffer.from(buffer).toString("base64");

  console.log("Analyzing image with Gemini...");
  const aiResponse = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Data,
        },
      },
      "Describe this ID card in high detail. I need to replicate this EXACTLY using React and Tailwind CSS. Please provide: 1. Dimensions/Aspect ratio. 2. Color palette (backgrounds, gradients, borders, font colors). 3. Header design (logos, title, layout, spacing). 4. Body content: position of photo, student name, expiry date, school name, card details (labels, values, fonts). 5. Barcode or any identifiers, QR codes, icons, badges. 6. Any other decorations (stripes, background watermarks, shapes). Please be precise and detailed so I can implement it beautifully."
    ],
  });

  console.log("\n--- GEMINI ANALYSIS ---");
  console.log(aiResponse.text);
}

run().catch(console.error);
