async function resolveShareUrl(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const match = html.match(/https:\/\/app\.reve\.com\/api\/project\/[^\s"'\\]+/);
    if (match) {
      console.log("Found:", url, "->", match[0]);
    } else {
      console.log("No match found in HTML for:", url);
      // find any og:image or img src
      const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || html.match(/"(https:\/\/[^"]+)"/g);
      console.log("ogMatch:", ogMatch ? ogMatch.slice(0, 5) : "none");
    }
  } catch (e) {
    console.error("Error fetching:", url, e.message);
  }
}

resolveShareUrl("https://app.reve.com/share/1bd96d77-e423-417d-8bd1-521b344b66ed");
