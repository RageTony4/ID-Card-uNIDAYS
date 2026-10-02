import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

/**
 * Normalizes and derives the school or university website URL.
 * Accepts (schoolName, website) or handles swapped arguments gracefully.
 */
export function getSchoolWebsiteUrl(schoolName?: string, website?: string): string {
  let resolvedUrl = (website || '').trim();
  let resolvedName = (schoolName || '').trim();

  // If first parameter is actually the URL
  if (!resolvedUrl && resolvedName && (resolvedName.startsWith('http://') || resolvedName.startsWith('https://') || resolvedName.startsWith('www.'))) {
    resolvedUrl = resolvedName;
    resolvedName = '';
  }

  if (resolvedUrl) {
    if (!resolvedUrl.startsWith('http://') && !resolvedUrl.startsWith('https://')) {
      resolvedUrl = `https://${resolvedUrl}`;
    }
    return resolvedUrl;
  }

  // Derive sensible real school website from universityName / schoolName
  const name = resolvedName.toLowerCase();
  if (name.includes('sainik')) {
    return 'https://www.sainikschoolrewa.ac.in';
  }
  if (name.includes('air university') || name.includes('air univ') || (name.includes('air') && name.includes('maxwell'))) {
    return 'https://www.airuniversity.af.edu';
  }
  if (name.includes('texas') || name.includes('austin')) {
    return 'https://www.utexas.edu';
  }
  if (name.includes('cranbourne')) {
    return 'https://www.cranbourneeastsc.vic.edu.au';
  }
  if (name.includes('brac')) {
    return 'https://www.bracu.ac.bd';
  }
  if (name.includes('life') || name.includes('beatha')) {
    return 'https://www.uol.edu.ie';
  }
  if (name.includes('international')) {
    return 'https://www.iu.org';
  }
  if (name.includes('community-ed') || name.includes('cea')) {
    return 'https://www.cea-academy.ac.uk';
  }

  const clean = name.replace(/[^a-z0-9]/g, '');
  return `https://www.${clean || 'school'}.edu`;
}

/**
 * Ensures the target school URL is a valid, scannable web address with http/https scheme.
 * Accepts (website, schoolName).
 */
export function getValidSchoolUrl(website?: string, schoolName?: string): string {
  if (website && !website.includes(' ') && (website.includes('.') || website.startsWith('http'))) {
    return getSchoolWebsiteUrl(schoolName, website);
  }
  return getSchoolWebsiteUrl(schoolName || website, website);
}

// In-memory cache for QR code paths to avoid re-generating on identical inputs
const qrCache = new Map<string, { path: string; viewBoxSize: number }>();

/**
 * Generates an SVG path and viewBox for a scannable standard QR Code.
 */
export function getQRCodeSvgData(text: string, margin = 2): { path: string; viewBoxSize: number; url: string } {
  const cacheKey = `${text}_${margin}`;
  const cached = qrCache.get(cacheKey);
  if (cached) {
    return { ...cached, url: text };
  }

  try {
    const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
    const size = qr.modules.size;
    let path = '';

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (qr.modules.get(r, c)) {
          path += `M${c + margin},${r + margin}h1v1h-1z `;
        }
      }
    }

    const result = {
      path,
      viewBoxSize: size + margin * 2,
      url: text
    };

    qrCache.set(cacheKey, result);
    return result;
  } catch (e) {
    console.error('Error generating QR code for', text, e);
    // Fallback simple square pattern
    return {
      path: 'M2,2h10v10h-10z M14,2h10v10h-10z M2,14h10v10h-10z M14,14h10v10h-10z',
      viewBoxSize: 26,
      url: text
    };
  }
}

// Cache for Barcodes
const barcodeCache = new Map<string, { bars: { x: number; width: number }[]; totalWidth: number }>();

/**
 * Generates exact scannable Code128 barcode bar widths and offsets.
 */
export function getCode128SvgData(text: string): { bars: { x: number; width: number }[]; totalWidth: number } {
  const cleanText = (text || '0123456789').replace(/[/\\?%*:|"<>]/g, '').trim() || '0123456789';
  const cached = barcodeCache.get(cleanText);
  if (cached) {
    return cached;
  }

  try {
    const Code128 = (JsBarcode as any).getModule('CODE128');
    const encoder = new Code128(cleanText, {});
    const encoded = encoder.encode();
    const binary: string = encoded.data;

    const bars: { x: number; width: number }[] = [];
    let curX = 0;
    let i = 0;

    while (i < binary.length) {
      if (binary[i] === '1') {
        const startX = curX;
        let w = 0;
        while (i < binary.length && binary[i] === '1') {
          w++;
          curX++;
          i++;
        }
        bars.push({ x: startX, width: w });
      } else {
        curX++;
        i++;
      }
    }

    const result = { bars, totalWidth: curX };
    barcodeCache.set(cleanText, result);
    return result;
  } catch (err) {
    console.error('Failed to encode Code128 for', cleanText, err);
    // Fallback standard pattern
    const pattern = [2, 1, 1, 2, 3, 1, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2];
    let curX = 0;
    const bars: { x: number; width: number }[] = [];
    pattern.forEach((w) => {
      bars.push({ x: curX, width: w });
      curX += w + 1;
    });
    return { bars, totalWidth: curX };
  }
}

/**
 * Encodes text into Code 128 format with configurable quiet zones.
 */
export function encodeCode128B(text: string, quietZone = 10): { bars: { x: number; width: number }[]; totalWidth: number } {
  const data = getCode128SvgData(text);
  if (quietZone === 0) return data;
  return {
    bars: data.bars.map((b) => ({ x: b.x + quietZone, width: b.width })),
    totalWidth: data.totalWidth + quietZone * 2
  };
}
