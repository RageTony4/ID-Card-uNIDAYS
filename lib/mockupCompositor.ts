export type Point2D = [number, number]; // Normalized [u, v] in 0..1

export interface CalibratedSceneConfig {
  id: string;
  matchKeys: string[];
  tl: Point2D;
  tr: Point2D;
  br: Point2D;
  bl: Point2D;
  cornerRadius?: number; // Relative to card width (default ~0.046)
  maskExpand?: number; // Outward expansion in normalized card space to cover 100% of old card
  hasPlasticSleeve?: boolean;
  lightingBlend?: number; // 0..0.25 low-frequency illumination transfer
  slotPunch?: {
    u1: number;
    v1: number;
    u2: number;
    v2: number;
  };
  foregroundPolygons?: Array<{
    points: Point2D[];
    castShadow?: boolean;
    featherPx?: number;
  }>;
}

export const CALIBRATED_SCENES: CalibratedSceneConfig[] = [
  {
    id: 'scene_01',
    matchKeys: ['021b0u', 'scene_01'],
    tl: [0.2005, 0.3985],
    tr: [0.7045, 0.4345],
    br: [0.6960, 0.9305],
    bl: [0.1875, 0.8990],
    cornerRadius: 0.048,
    maskExpand: 0.008,
    hasPlasticSleeve: true,
    lightingBlend: 0.10
  },
  {
    id: 'scene_02',
    matchKeys: ['6rjppv', 'scene_02'],
    tl: [0.0735, 0.1625],
    tr: [0.9365, 0.1635],
    br: [0.9495, 0.7135],
    bl: [0.0665, 0.7135],
    cornerRadius: 0.048,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.12,
    foregroundPolygons: [
      {
        // Left thumb holding the edge of the card
        points: [
          [0.060, 0.438],
          [0.082, 0.452],
          [0.097, 0.478],
          [0.100, 0.512],
          [0.096, 0.546],
          [0.082, 0.568],
          [0.060, 0.578]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_03',
    matchKeys: ['j9s890', 'scene_03'],
    tl: [0.3355, 0.3585],
    tr: [0.6975, 0.3585],
    br: [0.6980, 0.6525],
    bl: [0.3350, 0.6525],
    cornerRadius: 0.032,
    maskExpand: 0.005,
    hasPlasticSleeve: true,
    lightingBlend: 0.10,
    foregroundPolygons: [
      {
        // Left thumb overlapping bottom-left corner
        points: [
          [0.330, 0.596],
          [0.352, 0.598],
          [0.369, 0.610],
          [0.373, 0.630],
          [0.372, 0.658],
          [0.330, 0.658]
        ],
        castShadow: true,
        featherPx: 2.5
      },
      {
        // Right thumb overlapping bottom-right corner
        points: [
          [0.702, 0.588],
          [0.680, 0.592],
          [0.667, 0.606],
          [0.665, 0.628],
          [0.667, 0.658],
          [0.702, 0.658]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_04',
    matchKeys: ['0nk6tf', 'scene_04'],
    tl: [0.3170, 0.2715],
    tr: [0.7100, 0.2725],
    br: [0.7125, 0.6005],
    bl: [0.3150, 0.6005],
    cornerRadius: 0.038,
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.18,
    foregroundPolygons: [
      {
        // Left thumb overlapping bottom-left corner
        points: [
          [0.310, 0.530],
          [0.336, 0.534],
          [0.354, 0.550],
          [0.359, 0.576],
          [0.356, 0.606],
          [0.310, 0.606]
        ],
        castShadow: true,
        featherPx: 2.5
      },
      {
        // Right thumb overlapping bottom-right corner
        points: [
          [0.716, 0.532],
          [0.694, 0.536],
          [0.678, 0.552],
          [0.674, 0.578],
          [0.676, 0.606],
          [0.716, 0.606]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_05',
    matchKeys: ['jkxmsd', 'scene_05'],
    tl: [0.3710, 0.3650],
    tr: [0.7720, 0.3715],
    br: [0.7975, 0.7125],
    bl: [0.3555, 0.7050],
    cornerRadius: 0.044,
    maskExpand: 0.006,
    hasPlasticSleeve: true,
    lightingBlend: 0.10,
    slotPunch: {
      u1: 0.508,
      v1: 0.379,
      u2: 0.638,
      v2: 0.408
    }
  },
  {
    id: 'scene_06',
    matchKeys: ['mdd3ye', 'scene_06'],
    tl: [0.2655, 0.2965],
    tr: [0.8400, 0.3065],
    br: [0.8800, 0.7855],
    bl: [0.2285, 0.7735],
    cornerRadius: 0.045,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.16
  },
  {
    id: 'scene_07',
    matchKeys: ['2n4y4c1h3m', 'scene_07'],
    // Fits directly inside the inner card pocket of the frosted badge holder (below the top slot)
    tl: [0.3350, 0.4110],
    tr: [0.7105, 0.4085],
    br: [0.7225, 0.7445],
    bl: [0.3300, 0.7465],
    cornerRadius: 0.025,
    maskExpand: 0.005,
    hasPlasticSleeve: true,
    lightingBlend: 0.12
  },
  {
    id: 'scene_08',
    matchKeys: ['5p6r5h5n01', 'scene_08'],
    tl: [0.2005, 0.3465],
    tr: [0.8795, 0.3420],
    br: [0.8960, 0.9430],
    bl: [0.1890, 0.9335],
    cornerRadius: 0.046,
    maskExpand: 0.007,
    hasPlasticSleeve: false,
    lightingBlend: 0.12
  },
  {
    id: 'scene_09',
    matchKeys: ['000v4c1d4e', 'scene_09'],
    tl: [0.1805, 0.1055],
    tr: [0.7675, 0.1115],
    br: [0.8165, 0.8510],
    bl: [0.1605, 0.8950],
    cornerRadius: 0.048,
    maskExpand: 0.007,
    hasPlasticSleeve: false,
    lightingBlend: 0.12
  },
  {
    id: 'scene_10',
    matchKeys: ['6l3b513840', 'scene_10'],
    tl: [0.1165, 0.1835],
    tr: [0.8330, 0.2005],
    br: [0.8205, 0.7845],
    bl: [0.1115, 0.7635],
    cornerRadius: 0.038,
    maskExpand: 0.006,
    hasPlasticSleeve: true,
    lightingBlend: 0.12
  },
  {
    id: 'scene_11',
    matchKeys: ['243o6m301q', 'scene_11'],
    tl: [0.0110, 0.1845],
    tr: [0.8545, 0.1865],
    br: [0.8645, 0.8780],
    bl: [0.0075, 0.9195],
    cornerRadius: 0.048,
    maskExpand: 0.007,
    hasPlasticSleeve: false,
    lightingBlend: 0.12
  },
  {
    id: 'scene_12',
    matchKeys: ['4n6f2g4720', 'scene_12'],
    tl: [0.2400, 0.3025],
    tr: [0.7350, 0.3110],
    br: [0.7360, 0.7950],
    bl: [0.2335, 0.7860],
    cornerRadius: 0.042,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10
  },
  {
    id: 'scene_13',
    matchKeys: ['5e27000y3s', 'scene_13'],
    tl: [0.0125, 0.3840],
    tr: [0.8820, 0.3805],
    br: [0.8635, 0.7920],
    bl: [0.0265, 0.7700],
    cornerRadius: 0.042,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10,
    foregroundPolygons: [
      {
        // Thumb holding bottom-right of card over snow
        points: [
          [0.478, 0.782],
          [0.525, 0.732],
          [0.585, 0.700],
          [0.655, 0.678],
          [0.725, 0.668],
          [0.785, 0.672],
          [0.830, 0.692],
          [0.862, 0.730],
          [0.870, 0.798]
        ],
        castShadow: true,
        featherPx: 3.0
      }
    ]
  },
  {
    id: 'scene_14',
    matchKeys: ['3y512p0g01', 'scene_14'],
    tl: [0.3065, 0.3150],
    tr: [0.7330, 0.3085],
    br: [0.7485, 0.7035],
    bl: [0.3025, 0.7100],
    cornerRadius: 0.044,
    maskExpand: 0.006,
    hasPlasticSleeve: true,
    lightingBlend: 0.12,
    slotPunch: {
      u1: 0.486,
      v1: 0.333,
      u2: 0.561,
      v2: 0.355
    }
  },
  {
    id: 'scene_15',
    matchKeys: ['2i55155k27', 'scene_15'],
    tl: [0.0050, 0.3235],
    tr: [0.9620, 0.3165],
    br: [0.9780, 0.6575],
    bl: [0.0105, 0.6705],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10
  },
  {
    id: 'scene_16',
    matchKeys: ['4e411e195u', 'scene_16'],
    tl: [0.0490, 0.2200],
    tr: [0.9720, 0.2190],
    br: [0.9805, 0.6605],
    bl: [0.0450, 0.6585],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10
  },
  {
    id: 'scene_17',
    matchKeys: ['30416n5j5f', 'scene_17'],
    tl: [0.0165, 0.3075],
    tr: [0.9985, 0.3315],
    br: [0.9990, 0.6845],
    bl: [0.0030, 0.6785],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10
  },
  {
    id: 'scene_18',
    matchKeys: ['6q2k3h3j5y', 'scene_18'],
    tl: [0.1580, 0.2490],
    tr: [0.8405, 0.2815],
    br: [0.8415, 0.8395],
    bl: [0.1515, 0.8640],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.16,
    foregroundPolygons: [
      {
        // Bottom-left thumb edge
        points: [
          [0.148, 0.868],
          [0.215, 0.850],
          [0.310, 0.848],
          [0.385, 0.858],
          [0.405, 0.872]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_19',
    matchKeys: ['6n6e3m654l', 'scene_19'],
    tl: [0.0185, 0.3075],
    tr: [0.9400, 0.3025],
    br: [0.9590, 0.7425],
    bl: [0.0175, 0.7565],
    cornerRadius: 0.048,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10
  },
  {
    id: 'scene_20',
    matchKeys: ['0p5117681p', 'scene_20'],
    tl: [0.0735, 0.4010],
    tr: [0.9175, 0.4155],
    br: [0.9235, 0.8175],
    bl: [0.0565, 0.8135],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10,
    slotPunch: {
      u1: 0.832,
      v1: 0.538,
      u2: 0.862,
      v2: 0.635
    }
  },
  {
    id: 'natural_view_19',
    matchKeys: ['3k0t4v194f', 'natural_view_19'],
    tl: [0.0955, 0.1815],
    tr: [0.8455, 0.1815],
    br: [0.8455, 0.8405],
    bl: [0.0955, 0.8405],
    cornerRadius: 0.048,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.08
  },
  {
    id: 'scene_22',
    matchKeys: ['1p23565p63', 'scene_22'],
    tl: [0.0020, 0.4645],
    tr: [0.9545, 0.4695],
    br: [0.9475, 0.8075],
    bl: [0.0005, 0.8025],
    cornerRadius: 0.045,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.10,
    foregroundPolygons: [
      {
        // Thumb on bottom-right corner
        points: [
          [0.868, 0.812],
          [0.882, 0.768],
          [0.912, 0.752],
          [0.956, 0.728],
          [0.958, 0.812]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'natural_view_21',
    matchKeys: ['58086o0p28', 'natural_view_21'],
    tl: [0.0705, 0.0965],
    tr: [0.9275, 0.0965],
    br: [0.9305, 0.9090],
    bl: [0.0685, 0.9090],
    cornerRadius: 0.046,
    maskExpand: 0.004,
    hasPlasticSleeve: true,
    lightingBlend: 0.06
  },
  {
    id: 'scene_seton_656u69492z',
    matchKeys: ['656u69492z', 'scene_seton'],
    tl: [0.1375, 0.1780],
    tr: [0.8115, 0.1675],
    br: [0.8225, 0.4910],
    bl: [0.1410, 0.4960],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.12,
    foregroundPolygons: [
      {
        // Left thumb with French manicure overlapping left edge of card
        points: [
          [0.132, 0.285],
          [0.158, 0.292],
          [0.173, 0.308],
          [0.171, 0.342],
          [0.162, 0.376],
          [0.146, 0.402],
          [0.132, 0.415]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_byu_6o4f1c3r4o',
    matchKeys: ['6o4f1c3r4o', 'scene_byu'],
    tl: [0.0245, 0.2375],
    tr: [0.9380, 0.2315],
    br: [0.9355, 0.7955],
    bl: [0.0355, 0.8065],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.12,
    foregroundPolygons: [
      {
        // Bottom-right thumb overlapping lower-right edge
        points: [
          [0.668, 0.804],
          [0.715, 0.774],
          [0.790, 0.764],
          [0.875, 0.764],
          [0.942, 0.775],
          [0.942, 0.808]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_durham_303r4n681v',
    matchKeys: ['303r4n681v', 'scene_durham'],
    tl: [0.1775, 0.2475],
    tr: [0.8585, 0.2555],
    br: [0.8695, 0.8225],
    bl: [0.1775, 0.8525],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.12
  },
  {
    id: 'scene_hws_170p6e501a',
    matchKeys: ['170p6e501a', 'scene_hws'],
    tl: [0.0375, 0.2155],
    tr: [0.9985, 0.2075],
    br: [0.9985, 0.8185],
    bl: [0.0485, 0.8265],
    cornerRadius: 0.044,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.14,
    foregroundPolygons: [
      {
        // Bottom-left thumb edge
        points: [
          [0.042, 0.785],
          [0.115, 0.792],
          [0.185, 0.808],
          [0.215, 0.830],
          [0.042, 0.830]
        ],
        castShadow: true,
        featherPx: 2.5
      }
    ]
  },
  {
    id: 'scene_utas_1i5g121y6m',
    matchKeys: ['1i5g121y6m', 'scene_utas'],
    tl: [0.1245, 0.1175],
    tr: [0.8185, 0.0615],
    br: [0.8195, 0.7025],
    bl: [0.1375, 0.6785],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.14
  },
  {
    id: 'scene_usu_3350531a5z',
    matchKeys: ['3350531a5z', 'scene_usu'],
    tl: [0.0555, 0.2175],
    tr: [0.9785, 0.2315],
    br: [0.9745, 0.8085],
    bl: [0.0485, 0.8085],
    cornerRadius: 0.046,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.12
  }
];

/**
 * Resolves a scene URL (remote or local) to its local mirror if available.
 */
export function resolveLocalSceneUrl(sceneUrl: string): string {
  if (!sceneUrl) return sceneUrl;
  const clean = sceneUrl.trim();
  const map: Array<[string, string]> = [
    ['021b0u', '/assets/mockups/scene_01.png'],
    ['6rjppv', '/assets/mockups/scene_02.jpg'],
    ['j9s890', '/assets/mockups/scene_03.png'],
    ['0nk6tf', '/assets/mockups/scene_04.png'],
    ['jkxmsd', '/assets/mockups/scene_05.png'],
    ['mdd3ye', '/assets/mockups/scene_06.png'],
    ['2n4y4c1h3m', '/assets/mockups/scene_07.png'],
    ['5p6r5h5n01', '/assets/mockups/scene_08.webp'],
    ['000v4c1d4e', '/assets/mockups/scene_09.jpg'],
    ['6l3b513840', '/assets/mockups/scene_10.webp'],
    ['243o6m301q', '/assets/mockups/scene_11.jpg'],
    ['4n6f2g4720', '/assets/mockups/scene_12.jpg'],
    ['5e27000y3s', '/assets/mockups/scene_13.webp'],
    ['3y512p0g01', '/assets/mockups/scene_14.png'],
    ['2i55155k27', '/assets/mockups/scene_15.jpg'],
    ['4e411e195u', '/assets/mockups/scene_16.jpg'],
    ['30416n5j5f', '/assets/mockups/scene_17.jpg'],
    ['6q2k3h3j5y', '/assets/mockups/scene_18.jpg'],
    ['6n6e3m654l', '/assets/mockups/scene_19.jpg'],
    ['0p5117681p', '/assets/mockups/scene_20.jpg'],
    ['3k0t4v194f', '/assets/mockups/natural_view_19.jpg'],
    ['natural_view_19', '/assets/mockups/natural_view_19.jpg'],
    ['1p23565p63', '/assets/mockups/scene_22.jpg'],
    ['58086o0p28', '/assets/mockups/natural_view_21.jpg'],
    ['natural_view_21', '/assets/mockups/natural_view_21.jpg'],
    ['656u69492z', '/assets/mockups/scene_seton_656u69492z.jpg'],
    ['6o4f1c3r4o', '/assets/mockups/scene_byu_6o4f1c3r4o.jpg'],
    ['303r4n681v', '/assets/mockups/scene_durham_303r4n681v.jpg'],
    ['170p6e501a', '/assets/mockups/scene_hws_170p6e501a.jpg'],
    ['1i5g121y6m', '/assets/mockups/scene_utas_1i5g121y6m.jpg'],
    ['3350531a5z', '/assets/mockups/scene_usu_3350531a5z.jpg']
  ];
  for (const [key, localPath] of map) {
    if (clean.includes(key)) return localPath;
  }
  return clean;
}

/**
 * Finds the calibrated scene configuration for a given scene URL, or detects
 * card boundaries automatically for custom user-uploaded scene photos.
 */
export function getCalibratedSceneConfig(
  sceneUrl: string,
  sceneImg: HTMLImageElement
): CalibratedSceneConfig {
  const clean = (sceneUrl || '').toLowerCase();
  for (const cfg of CALIBRATED_SCENES) {
    if (cfg.matchKeys.some((k) => clean.includes(k.toLowerCase()))) {
      return cfg;
    }
  }
  return detectCustomSceneQuad(sceneImg);
}

/**
 * Automatic card boundary detector for custom user-uploaded scene photos.
 */
function detectCustomSceneQuad(sceneImg: HTMLImageElement): CalibratedSceneConfig {
  try {
    const w = 240;
    const h = Math.max(120, Math.round((sceneImg.naturalHeight || sceneImg.height) * (w / (sceneImg.naturalWidth || sceneImg.width || 1))));
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.drawImage(sceneImg, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      // Compute edge energy map inside central region
      let minX = w * 0.14;
      let maxX = w * 0.86;
      let minY = h * 0.18;
      let maxY = h * 0.82;

      // Scan rows/cols for strong rectangular contrast
      const rowEnergy = new Float32Array(h);
      const colEnergy = new Float32Array(w);
      for (let y = Math.floor(h * 0.08); y < Math.floor(h * 0.92); y++) {
        for (let x = Math.floor(w * 0.08); x < Math.floor(w * 0.92); x++) {
          const idx = (y * w + x) * 4;
          const idxR = (y * w + Math.min(w - 1, x + 2)) * 4;
          const idxD = (Math.min(h - 1, y + 2) * w + x) * 4;
          const gx = Math.abs(data[idx] - data[idxR]) + Math.abs(data[idx + 1] - data[idxR + 1]) + Math.abs(data[idx + 2] - data[idxR + 2]);
          const gy = Math.abs(data[idx] - data[idxD]) + Math.abs(data[idx + 1] - data[idxD + 1]) + Math.abs(data[idx + 2] - data[idxD + 2]);
          rowEnergy[y] += gy;
          colEnergy[x] += gx;
        }
      }

      // Find top/bottom peaks in upper and lower halves
      let bestTopY = minY, maxTopE = 0;
      for (let y = Math.floor(h * 0.08); y < Math.floor(h * 0.42); y++) {
        if (rowEnergy[y] > maxTopE) { maxTopE = rowEnergy[y]; bestTopY = y; }
      }
      let bestBotY = maxY, maxBotE = 0;
      for (let y = Math.floor(h * 0.58); y < Math.floor(h * 0.92); y++) {
        if (rowEnergy[y] > maxBotE) { maxBotE = rowEnergy[y]; bestBotY = y; }
      }
      let bestLeftX = minX, maxLeftE = 0;
      for (let x = Math.floor(w * 0.05); x < Math.floor(w * 0.40); x++) {
        if (colEnergy[x] > maxLeftE) { maxLeftE = colEnergy[x]; bestLeftX = x; }
      }
      let bestRightX = maxX, maxRightE = 0;
      for (let x = Math.floor(w * 0.60); x < Math.floor(w * 0.95); x++) {
        if (colEnergy[x] > maxRightE) { maxRightE = colEnergy[x]; bestRightX = x; }
      }

      const u1 = Math.max(0.05, Math.min(0.35, bestLeftX / w));
      const u2 = Math.max(0.65, Math.min(0.95, bestRightX / w));
      const v1 = Math.max(0.08, Math.min(0.40, bestTopY / h));
      const v2 = Math.max(0.60, Math.min(0.92, bestBotY / h));

      if (u2 - u1 > 0.35 && v2 - v1 > 0.25) {
        return {
          id: 'custom_detected',
          matchKeys: [],
          tl: [u1, v1],
          tr: [u2, v1],
          br: [u2, v2],
          bl: [u1, v2],
          cornerRadius: 0.046,
          maskExpand: 0.005,
          hasPlasticSleeve: false,
          lightingBlend: 0.10
        };
      }
    }
  } catch {
    // Fallback below
  }

  return {
    id: 'custom_default',
    matchKeys: [],
    tl: [0.14, 0.20],
    tr: [0.86, 0.20],
    br: [0.86, 0.80],
    bl: [0.14, 0.80],
    cornerRadius: 0.046,
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.10
  };
}

/**
 * Solves the 3x3 2D projective homography matrix H mapping unit square (s, t) in [0, 1]^2
 * to the 4 destination corners (x0, y0), (x1, y1), (x2, y2), (x3, y3) in pixel coordinates.
 */
function computeUnitSquareHomography(
  tl: [number, number],
  tr: [number, number],
  br: [number, number],
  bl: [number, number]
): (s: number, t: number) => [number, number] {
  const [x0, y0] = tl;
  const [x1, y1] = tr;
  const [x2, y2] = br;
  const [x3, y3] = bl;

  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;

  const det = dx1 * dy2 - dx2 * dy1;
  if (Math.abs(det) < 1e-10) {
    // Fallback bilinear if degenerate
    return (s: number, t: number) => {
      const topX = x0 + (x1 - x0) * s;
      const topY = y0 + (y1 - y0) * s;
      const botX = x3 + (x2 - x3) * s;
      const botY = y3 + (y2 - y3) * s;
      return [topX + (botX - topX) * t, topY + (botY - topY) * t];
    };
  }

  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const h = (dx1 * dy3 - dx3 * dy1) / det;
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + h * x3;
  const c = x0;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + h * y3;
  const f = y0;

  return (s: number, t: number) => {
    const denom = g * s + h * t + 1;
    return [(a * s + b * t + c) / denom, (d * s + e * t + f) / denom];
  };
}

/**
 * Draws a single textured triangle from source canvas (sx0, sy0)..(sx2, sy2)
 * to destination canvas (dx0, dy0)..(dx2, dy2) using exact affine transformation.
 */
function drawTexturedTriangle(
  ctx: CanvasRenderingContext2D,
  src: HTMLCanvasElement,
  sx0: number,
  sy0: number,
  sx1: number,
  sy1: number,
  sx2: number,
  sy2: number,
  dx0: number,
  dy0: number,
  dx1: number,
  dy1: number,
  dx2: number,
  dy2: number
) {
  // Expand triangle vertices slightly outward from centroid to prevent sub-pixel seam lines
  const cx = (dx0 + dx1 + dx2) / 3;
  const cy = (dy0 + dy1 + dy2) / 3;
  const expand = (x: number, y: number) => {
    const vx = x - cx;
    const vy = y - cy;
    const len = Math.hypot(vx, vy) || 1;
    return [x + (vx / len) * 0.65, y + (vy / len) * 0.65];
  };
  const [ex0, ey0] = expand(dx0, dy0);
  const [ex1, ey1] = expand(dx1, dy1);
  const [ex2, ey2] = expand(dx2, dy2);

  const denom = sx0 * (sy1 - sy2) + sx1 * (sy2 - sy0) + sx2 * (sy0 - sy1);
  if (Math.abs(denom) < 1e-8) return;

  const m11 = (dx0 * (sy1 - sy2) + dx1 * (sy2 - sy0) + dx2 * (sy0 - sy1)) / denom;
  const m12 = (dy0 * (sy1 - sy2) + dy1 * (sy2 - sy0) + dy2 * (sy0 - sy1)) / denom;
  const m21 = (dx0 * (sx2 - sx1) + dx1 * (sx0 - sx2) + dx2 * (sx1 - sx0)) / denom;
  const m22 = (dy0 * (sx2 - sx1) + dy1 * (sx0 - sx2) + dy2 * (sx1 - sx0)) / denom;
  const dx =
    (dx0 * (sx1 * sy2 - sx2 * sy1) +
      dx1 * (sx2 * sy0 - sx0 * sy2) +
      dx2 * (sx0 * sy1 - sx1 * sy0)) /
    denom;
  const dy =
    (dy0 * (sx1 * sy2 - sx2 * sy1) +
      dy1 * (sx2 * sy0 - sx0 * sy2) +
      dy2 * (sx0 * sy1 - sx1 * sy0)) /
    denom;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ex0, ey0);
  ctx.lineTo(ex1, ey1);
  ctx.lineTo(ex2, ey2);
  ctx.closePath();
  ctx.clip();
  ctx.transform(m11, m12, m21, m22, dx, dy);
  ctx.drawImage(src, 0, 0);
  ctx.restore();
}

interface ScenePhotometrics {
  wpR: number;
  wpG: number;
  wpB: number;
  bpR: number;
  bpG: number;
  bpB: number;
  gamma: number;
  saturation: number;
  directionalGrid: number[][]; // 3 rows x 4 cols of local illumination multipliers [0.74..1.05]
}

/**
 * Analyzes the reference scene's ambient exposure, white point, shadow floor (black point),
 * color temperature/tint cast, and 2D spatial directional illumination across the card quad.
 * Uses high-percentile (80th-92nd) sampling inside each sub-cell so only the bare PVC lighting
 * gradient is captured and zero dark text/graphics from the placeholder card ever influence the map.
 */
function analyzeScenePhotometrics(
  sceneImg: HTMLImageElement,
  cfg: CalibratedSceneConfig
): ScenePhotometrics {
  const defaultProfile: ScenePhotometrics = {
    wpR: 222,
    wpG: 220,
    wpB: 216,
    bpR: 14,
    bpG: 14,
    bpB: 16,
    gamma: 1.04,
    saturation: 0.92,
    directionalGrid: [
      [1.0, 1.0, 0.98, 0.96],
      [0.99, 0.99, 0.97, 0.95],
      [0.96, 0.96, 0.94, 0.92],
    ],
  };

  try {
    const AW = 160;
    const AH = 160;
    const c = document.createElement('canvas');
    c.width = AW;
    c.height = AH;
    const ctx = c.getContext('2d');
    if (!ctx) return defaultProfile;

    ctx.drawImage(sceneImg, 0, 0, AW, AH);
    const imgData = ctx.getImageData(0, 0, AW, AH).data;

    const tl: [number, number] = [cfg.tl[0] * AW, cfg.tl[1] * AH];
    const tr: [number, number] = [cfg.tr[0] * AW, cfg.tr[1] * AH];
    const br: [number, number] = [cfg.br[0] * AW, cfg.br[1] * AH];
    const bl: [number, number] = [cfg.bl[0] * AW, cfg.bl[1] * AH];
    const project = computeUnitSquareHomography(tl, tr, br, bl);

    const samplePixel = (x: number, y: number): [number, number, number, number] => {
      const ix = Math.max(0, Math.min(AW - 1, Math.round(x)));
      const iy = Math.max(0, Math.min(AH - 1, Math.round(y)));
      const idx = (iy * AW + ix) * 4;
      const r = imgData[idx];
      const g = imgData[idx + 1];
      const b = imgData[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      return [r, g, b, lum];
    };

    // 1. Sample interior of the card on a 4x3 grid (each cell sampled 6x6 = 36 points)
    const gridRows = 3;
    const gridCols = 4;
    const cardSamples: Array<[number, number, number, number]> = [];
    const cellWhiteLums: number[][] = [];

    for (let gr = 0; gr < gridRows; gr++) {
      const rowLums: number[] = [];
      for (let gc = 0; gc < gridCols; gc++) {
        const cellSamples: Array<[number, number, number, number]> = [];
        for (let sy = 0; sy < 6; sy++) {
          for (let sx = 0; sx < 6; sx++) {
            const s = 0.05 + ((gc + (sx + 0.5) / 6) / gridCols) * 0.90;
            const t = 0.05 + ((gr + (sy + 0.5) / 6) / gridRows) * 0.90;
            const [px, py] = project(s, t);
            const sp = samplePixel(px, py);
            cellSamples.push(sp);
            cardSamples.push(sp);
          }
        }
        cellSamples.sort((a, b) => a[3] - b[3]);
        // 82nd percentile in this cell represents the local lit white PVC surface
        const p82Idx = Math.min(cellSamples.length - 1, Math.floor(cellSamples.length * 0.82));
        rowLums.push(cellSamples[p82Idx][3]);
      }
      cellWhiteLums.push(rowLums);
    }

    // 2. Sample ambient environment ring outside the card quad
    const envSamples: Array<[number, number, number, number]> = [];
    const ringOffsets = [-0.18, -0.09, 1.09, 1.18];
    for (let i = 0; i <= 16; i++) {
      const u = i / 16;
      for (const off of ringOffsets) {
        const [x1, y1] = project(u, off);
        envSamples.push(samplePixel(x1, y1));
        const [x2, y2] = project(off, u);
        envSamples.push(samplePixel(x2, y2));
      }
    }
    // Also sample broader scene background
    for (let y = 8; y < AH; y += 16) {
      for (let x = 8; x < AW; x += 16) {
        envSamples.push(samplePixel(x, y));
      }
    }

    cardSamples.sort((a, b) => a[3] - b[3]);
    envSamples.sort((a, b) => a[3] - b[3]);

    // Average 78th to 92nd percentile of card samples for the photographed card's white point
    const cStart = Math.floor(cardSamples.length * 0.78);
    const cEnd = Math.max(cStart + 1, Math.floor(cardSamples.length * 0.92));
    let cR = 0, cG = 0, cB = 0, cLum = 0;
    for (let i = cStart; i < cEnd; i++) {
      cR += cardSamples[i][0];
      cG += cardSamples[i][1];
      cB += cardSamples[i][2];
      cLum += cardSamples[i][3];
    }
    const cCount = cEnd - cStart;
    cR /= cCount;
    cG /= cCount;
    cB /= cCount;
    cLum /= cCount;

    // Average 75th to 90th percentile of environment samples for scene ambient light
    const eStart = Math.floor(envSamples.length * 0.75);
    const eEnd = Math.max(eStart + 1, Math.floor(envSamples.length * 0.90));
    let eR = 0, eG = 0, eB = 0;
    for (let i = eStart; i < eEnd; i++) {
      eR += envSamples[i][0];
      eG += envSamples[i][1];
      eB += envSamples[i][2];
    }
    const eCount = eEnd - eStart;
    eR /= eCount;
    eG /= eCount;
    eB /= eCount;

    // If the underlying placeholder card had a white/light surface (cLum > 125), trust its white point strongly
    const cardWeight = cLum > 135 ? 0.74 : 0.35;
    const envWeight = 1 - cardWeight;

    let rawWpR = cR * cardWeight + eR * envWeight;
    let rawWpG = cG * cardWeight + eG * envWeight;
    let rawWpB = cB * cardWeight + eB * envWeight;

    // Preserve the scene's color temperature/tint cast while keeping white point in a natural photographic range [176..238]
    // Never allow 255 pure digital white so the card never outshines the scene!
    const rawWpLum = Math.max(1, 0.299 * rawWpR + 0.587 * rawWpG + 0.114 * rawWpB);
    const targetWpLum = Math.max(178, Math.min(234, rawWpLum * 0.95));
    const wpScale = targetWpLum / rawWpLum;

    const wpR = Math.max(168, Math.min(240, Math.round(rawWpR * wpScale)));
    const wpG = Math.max(168, Math.min(240, Math.round(rawWpG * wpScale)));
    const wpB = Math.max(168, Math.min(240, Math.round(rawWpB * wpScale)));

    // Compute scene black point (shadow floor) from 5th-14th percentile of scene + card
    const bStart = Math.floor(envSamples.length * 0.05);
    const bEnd = Math.max(bStart + 1, Math.floor(envSamples.length * 0.14));
    let sR = 0, sG = 0, sB = 0;
    for (let i = bStart; i < bEnd; i++) {
      sR += envSamples[i][0];
      sG += envSamples[i][1];
      sB += envSamples[i][2];
    }
    const bCount = bEnd - bStart;
    sR /= bCount;
    sG /= bCount;
    sB /= bCount;

    // Lift blacks to match real photographic shadow floor [10..26]
    const bpR = Math.max(10, Math.min(26, Math.round(sR * 0.45 + 9)));
    const bpG = Math.max(10, Math.min(26, Math.round(sG * 0.45 + 9)));
    const bpB = Math.max(10, Math.min(28, Math.round(sB * 0.45 + 10)));

    // Normalize the 4x3 directional illumination grid relative to the brightest cell
    const flatCells = cellWhiteLums.flat().slice().sort((a, b) => a - b);
    const refHigh = Math.max(110, flatCells[flatCells.length - 1] || 210);

    const directionalGrid = cellWhiteLums.map(row =>
      row.map(val => {
        const ratio = val / refHigh;
        // Smoothly compress ratio into [0.78..1.02] so directional shading is natural and cohesive
        return Math.max(0.78, Math.min(1.02, 0.35 + 0.65 * ratio));
      })
    );

    // Slightly warmer/moodier gamma when scene is darker
    const gamma = targetWpLum < 205 ? 1.08 : 1.03;
    const saturation = targetWpLum < 205 ? 0.88 : 0.92;

    return {
      wpR,
      wpG,
      wpB,
      bpR,
      bpG,
      bpB,
      gamma,
      saturation,
      directionalGrid,
    };
  } catch {
    return defaultProfile;
  }
}

/**
 * Prepares a rounded-corner version of the captured live ID card and grades its
 * exposure, white point, black point, color temperature, directional shading, optical
 * softness, and fine sensor grain so it blends like a real photograph in the scene.
 */
function prepareRoundedCardCanvas(
  cardCanvas: HTMLCanvasElement,
  cornerRadiusRatio: number = 0.046,
  photometrics?: ScenePhotometrics,
  blendStrength: number = 1.0
): { canvas: HTMLCanvasElement; edgeColor: string } {
  const w = cardCanvas.width;
  const h = cardCanvas.height;
  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  const ctx = out.getContext('2d')!;

  const radius = Math.round(w * cornerRadiusRatio);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius);
  ctx.closePath();
  ctx.clip();

  // 1. Apply subtle optical lens softness & slight desaturation so vector DOM capture matches real camera lens MTF
  const sat = photometrics ? 1 - (1 - photometrics.saturation) * blendStrength : 0.93;
  const blurPx = Math.max(0.35, Math.min(0.65, w * 0.00045)) * blendStrength;
  try {
    ctx.filter = `blur(${blurPx.toFixed(2)}px) saturate(${sat.toFixed(3)})`;
  } catch {
    // fallback if filter unsupported
  }
  ctx.drawImage(cardCanvas, 0, 0, w, h);
  ctx.filter = 'none';

  // 2. Apply smooth 2D spatial directional shading map in card space before perspective warp
  if (photometrics && blendStrength > 0) {
    const grid = photometrics.directionalGrid;
    const gRows = grid.length;
    const gCols = grid[0].length;

    const tinyC = document.createElement('canvas');
    tinyC.width = gCols;
    tinyC.height = gRows;
    const tCtx = tinyC.getContext('2d');
    if (tCtx) {
      const tImg = tCtx.createImageData(gCols, gRows);
      for (let r = 0; r < gRows; r++) {
        for (let c = 0; c < gCols; c++) {
          // Interpolate cell multiplier with 1.0 by blendStrength
          const mult = 1 - (1 - grid[r][c]) * Math.min(1.25, blendStrength);
          const v = Math.max(0, Math.min(255, Math.round(mult * 255)));
          const idx = (r * gCols + c) * 4;
          tImg.data[idx] = v;
          tImg.data[idx + 1] = v;
          tImg.data[idx + 2] = v;
          tImg.data[idx + 3] = 255;
        }
      }
      tCtx.putImageData(tImg, 0, 0);

      // Upscale onto a blurred shading canvas so transitions are ultra-smooth
      const shadeC = document.createElement('canvas');
      shadeC.width = 256;
      shadeC.height = 160;
      const sCtx = shadeC.getContext('2d');
      if (sCtx) {
        sCtx.imageSmoothingEnabled = true;
        sCtx.imageSmoothingQuality = 'high';
        try {
          sCtx.filter = 'blur(22px)';
        } catch {
          // ignore
        }
        // Draw slightly oversized so blur doesn't darken edges prematurely
        sCtx.drawImage(tinyC, -16, -16, 256 + 32, 160 + 32);
        sCtx.filter = 'none';

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(shadeC, 0, 0, w, h);
        ctx.restore();
      }
    }
  }

  // 3. Per-pixel Photometric Grading (White-point scaling, Lifted Blacks, Color Cast & Photographic ISO Grain)
  if (photometrics && blendStrength > 0) {
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      const s = Math.min(1.25, Math.max(0, blendStrength));
      const wpR = 255 + (photometrics.wpR - 255) * s;
      const wpG = 255 + (photometrics.wpG - 255) * s;
      const wpB = 255 + (photometrics.wpB - 255) * s;

      const bpR = photometrics.bpR * s;
      const bpG = photometrics.bpG * s;
      const bpB = photometrics.bpB * s;

      const gamma = 1 + (photometrics.gamma - 1) * s;

      // Precompute 256-entry LUTs for R, G, B for instant grading
      const lutR = new Uint8Array(256);
      const lutG = new Uint8Array(256);
      const lutB = new Uint8Array(256);

      for (let i = 0; i < 256; i++) {
        const norm = i / 255;
        // Subtle filmic highlight shoulder roll-off so bright whites never clip harshly
        const curved = Math.pow(norm, gamma);
        const rolloff = curved - 0.035 * s * Math.pow(norm, 3.5);
        const t = Math.max(0, Math.min(1, rolloff));

        lutR[i] = Math.max(0, Math.min(255, Math.round(bpR + t * (wpR - bpR))));
        lutG[i] = Math.max(0, Math.min(255, Math.round(bpG + t * (wpG - bpG))));
        lutB[i] = Math.max(0, Math.min(255, Math.round(bpB + t * (wpB - bpB))));
      }

      // Deterministic fast PRNG for fine photographic sensor grain
      let seed = 1337;
      const grainAmp = 2.2 * Math.min(1.0, s);

      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] === 0) continue;
        seed = (seed * 1664525 + 1013904223) | 0;
        const noise = (((seed >>> 16) & 255) / 127.5 - 1.0) * grainAmp;

        d[i] = Math.max(0, Math.min(255, lutR[d[i]] + noise));
        d[i + 1] = Math.max(0, Math.min(255, lutG[d[i + 1]] + noise));
        d[i + 2] = Math.max(0, Math.min(255, lutB[d[i + 2]] + noise));
      }

      ctx.putImageData(imgData, 0, 0);
    } catch {
      // Fallback if getImageData fails
    }
  }

  // 4. Inner Edge Ambient Occlusion (recessed badge holder / contact vignette around the perimeter)
  const edgeAoAlpha = 0.14 * Math.min(1.2, blendStrength);
  if (edgeAoAlpha > 0.01) {
    ctx.save();
    ctx.strokeStyle = `rgba(12, 10, 8, ${edgeAoAlpha.toFixed(3)})`;
    ctx.lineWidth = Math.max(4, w * 0.012);
    ctx.stroke();
    ctx.restore();
  }

  // 5. Scene-adapted physical PVC card edge rim (never brighter than the scene's white point)
  const rimR = photometrics ? photometrics.wpR : 225;
  const rimG = photometrics ? photometrics.wpG : 223;
  const rimB = photometrics ? photometrics.wpB : 218;
  ctx.strokeStyle = `rgba(${rimR}, ${rimG}, ${rimB}, 0.22)`;
  ctx.lineWidth = Math.max(1.5, w * 0.0025);
  ctx.stroke();
  ctx.restore();

  // Sample average graded edge color from `out` so the mask under-fill matches the graded card border
  let rSum = rimR, gSum = rimG, bSum = rimB;
  try {
    const sampleC = document.createElement('canvas');
    sampleC.width = 16;
    sampleC.height = 16;
    const sCtx = sampleC.getContext('2d');
    if (sCtx) {
      sCtx.drawImage(out, 0, 0, 16, 16);
      const d = sCtx.getImageData(0, 0, 16, 16).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < 16; i++) {
        const idxTop = i * 4;
        const idxBot = ((15 * 16) + i) * 4;
        r += d[idxTop] + d[idxBot];
        g += d[idxTop + 1] + d[idxBot + 1];
        b += d[idxTop + 2] + d[idxBot + 2];
        count += 2;
      }
      rSum = Math.round(r / count);
      gSum = Math.round(g / count);
      bSum = Math.round(b / count);
    }
  } catch {
    // default graded edge
  }
  const edgeColor = `rgb(${rSum}, ${gSum}, ${bSum})`;

  return { canvas: out, edgeColor };
}

/**
 * Traces a smooth rounded quadrilateral path on a 2D canvas given 4 perspective corners.
 */
function traceRoundedPerspectiveQuad(
  ctx: CanvasRenderingContext2D,
  project: (s: number, t: number) => [number, number],
  sMin: number,
  tMin: number,
  sMax: number,
  tMax: number,
  cornerRadiusRatio: number
) {
  const rx = cornerRadiusRatio * (sMax - sMin);
  const ry = cornerRadiusRatio * 1.58 * (tMax - tMin);
  const stepsPerEdge = 16;
  const stepsPerCorner = 10;

  ctx.beginPath();
  let first = true;
  const moveOrLine = (s: number, t: number) => {
    const [x, y] = project(s, t);
    if (first) {
      ctx.moveTo(x, y);
      first = false;
    } else {
      ctx.lineTo(x, y);
    }
  };

  // Top edge: (sMin + rx, tMin) -> (sMax - rx, tMin)
  for (let i = 0; i <= stepsPerEdge; i++) {
    const s = sMin + rx + ((sMax - sMin - 2 * rx) * i) / stepsPerEdge;
    moveOrLine(s, tMin);
  }
  // Top-right corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = -Math.PI / 2 + (Math.PI / 2) * (i / stepsPerCorner);
    moveOrLine(sMax - rx + Math.cos(ang) * rx, tMin + ry + Math.sin(ang) * ry);
  }
  // Right edge
  for (let i = 1; i <= stepsPerEdge; i++) {
    const t = tMin + ry + ((tMax - tMin - 2 * ry) * i) / stepsPerEdge;
    moveOrLine(sMax, t);
  }
  // Bottom-right corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = 0 + (Math.PI / 2) * (i / stepsPerCorner);
    moveOrLine(sMax - rx + Math.cos(ang) * rx, tMax - ry + Math.sin(ang) * ry);
  }
  // Bottom edge
  for (let i = 1; i <= stepsPerEdge; i++) {
    const s = sMax - rx - ((sMax - sMin - 2 * rx) * i) / stepsPerEdge;
    moveOrLine(s, tMax);
  }
  // Bottom-left corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = Math.PI / 2 + (Math.PI / 2) * (i / stepsPerCorner);
    moveOrLine(sMin + rx + Math.cos(ang) * rx, tMax - ry + Math.sin(ang) * ry);
  }
  // Left edge
  for (let i = 1; i <= stepsPerEdge; i++) {
    const t = tMax - ry - ((tMax - tMin - 2 * ry) * i) / stepsPerEdge;
    moveOrLine(sMin, t);
  }
  // Top-left corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = Math.PI + (Math.PI / 2) * (i / stepsPerCorner);
    moveOrLine(sMin + rx + Math.cos(ang) * rx, tMin + ry + Math.sin(ang) * ry);
  }
  ctx.closePath();
}

/**
 * Main calibrated 4-corner perspective homography compositor.
 * Replaces 100% of the underlying card in the scene with the exact live ID card preview,
 * applies scene-adaptive photometric color grading, white-point matching, directional shading,
 * plastic holder shadows/reflections, and restores overlapping foreground thumbs/fingers and slot holes.
 */
export function compositeCalibratedMockup(
  sceneImg: HTMLImageElement,
  cardCanvas: HTMLCanvasElement,
  sceneUrl: string,
  blendStrength: number = 1.0
): string {
  const cfg = getCalibratedSceneConfig(sceneUrl, sceneImg);

  const natW = sceneImg.naturalWidth || sceneImg.width || 1200;
  const natH = sceneImg.naturalHeight || sceneImg.height || 900;
  // Cap output resolution to 1600px on longest side for fast, crisp rendering
  const maxDim = 1600;
  const scale = Math.min(1, maxDim / Math.max(natW, natH));
  const W = Math.max(1, Math.round(natW * scale));
  const H = Math.max(1, Math.round(natH * scale));

  const outCanvas = document.createElement('canvas');
  outCanvas.width = W;
  outCanvas.height = H;
  const ctx = outCanvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw base scene image
  ctx.drawImage(sceneImg, 0, 0, W, H);

  // Convert normalized corners to pixel coordinates
  const tl: [number, number] = [cfg.tl[0] * W, cfg.tl[1] * H];
  const tr: [number, number] = [cfg.tr[0] * W, cfg.tr[1] * H];
  const br: [number, number] = [cfg.br[0] * W, cfg.br[1] * H];
  const bl: [number, number] = [cfg.bl[0] * W, cfg.bl[1] * H];

  const project = computeUnitSquareHomography(tl, tr, br, bl);
  const cornerRadius = cfg.cornerRadius ?? 0.046;
  const maskExpand = cfg.maskExpand ?? 0.006;

  // Analyze scene photometrics (white point, black point, color cast, 2D directional shading)
  const photometrics = analyzeScenePhotometrics(sceneImg, cfg);

  // Prepare rounded & photometrically graded live card canvas
  const { canvas: roundedCard, edgeColor } = prepareRoundedCardCanvas(
    cardCanvas,
    cornerRadius,
    photometrics,
    blendStrength
  );

  // 2. Mask out 100% of the old underlying card (slightly expanded by maskExpand)
  // and render realistic contact shadow against the surface/holder
  ctx.save();
  traceRoundedPerspectiveQuad(
    ctx,
    project,
    -maskExpand,
    -maskExpand * 1.35,
    1 + maskExpand,
    1 + maskExpand * 1.35,
    cornerRadius
  );
  ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
  ctx.shadowBlur = Math.max(4, Math.round(W * 0.006));
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(1, Math.round(H * 0.002));
  ctx.fillStyle = edgeColor;
  ctx.fill();
  ctx.restore();

  // 3. Warp the live ID card into the exact 4-corner perspective using a 28x20 projective mesh
  ctx.save();
  traceRoundedPerspectiveQuad(
    ctx,
    project,
    -maskExpand * 0.5,
    -maskExpand * 0.65,
    1 + maskExpand * 0.5,
    1 + maskExpand * 0.65,
    cornerRadius
  );
  ctx.clip();

  const cols = 28;
  const rows = 20;
  const sw = roundedCard.width;
  const sh = roundedCard.height;

  for (let r = 0; r < rows; r++) {
    const t0 = r / rows;
    const t1 = (r + 1) / rows;
    const sy0 = t0 * sh;
    const sy1 = t1 * sh;

    // Map slightly beyond [0..1] to cover the expanded mask seamlessly
    const mt0 = -maskExpand * 0.5 + t0 * (1 + maskExpand);
    const mt1 = -maskExpand * 0.5 + t1 * (1 + maskExpand);

    for (let c = 0; c < cols; c++) {
      const s0 = c / cols;
      const s1 = (c + 1) / cols;
      const sx0 = s0 * sw;
      const sx1 = s1 * sw;

      const ms0 = -maskExpand * 0.5 + s0 * (1 + maskExpand);
      const ms1 = -maskExpand * 0.5 + s1 * (1 + maskExpand);

      const [x00, y00] = project(ms0, mt0);
      const [x10, y10] = project(ms1, mt0);
      const [x11, y11] = project(ms1, mt1);
      const [x01, y01] = project(ms0, mt1);

      drawTexturedTriangle(ctx, roundedCard, sx0, sy0, sx1, sy0, sx1, sy1, x00, y00, x10, y10, x11, y11);
      drawTexturedTriangle(ctx, roundedCard, sx0, sy0, sx1, sy1, sx0, sy1, x00, y00, x11, y11, x01, y01);
    }
  }

  // 4. Transfer low-frequency ambient lighting & color mood from the original scene
  // (heavily blurred so zero text or details from the old card ever bleed through)
  const baseLightingBlend = cfg.lightingBlend ?? 0.12;
  const effectiveLightingBlend = baseLightingBlend * Math.max(0.5, blendStrength);
  if (effectiveLightingBlend > 0) {
    try {
      const lightC = document.createElement('canvas');
      lightC.width = W;
      lightC.height = H;
      const lCtx = lightC.getContext('2d');
      if (lCtx) {
        const blurPx = Math.max(42, Math.round(W * 0.065));
        lCtx.filter = `blur(${blurPx}px) saturate(0.35)`;
        lCtx.drawImage(sceneImg, 0, 0, W, H);
        ctx.save();
        ctx.globalCompositeOperation = 'soft-light';
        ctx.globalAlpha = Math.min(0.28, effectiveLightingBlend * 1.35);
        ctx.drawImage(lightC, 0, 0);
        ctx.restore();
      }
    } catch {
      // Ignore if canvas filter unsupported
    }
  }

  // 5. Add physical PVC surface response & optional plastic badge sleeve sheen using scene white point
  const wpColor = `${photometrics.wpR}, ${photometrics.wpG}, ${photometrics.wpB}`;
  const [p0x, p0y] = project(0, 0);
  const [p2x, p2y] = project(1, 1);

  if (cfg.hasPlasticSleeve) {
    const sheenGrad = ctx.createLinearGradient(p0x, p0y, p2x, p2y);
    sheenGrad.addColorStop(0, `rgba(${wpColor}, 0.09)`);
    sheenGrad.addColorStop(0.32, `rgba(${wpColor}, 0.02)`);
    sheenGrad.addColorStop(0.48, `rgba(${wpColor}, 0.11)`);
    sheenGrad.addColorStop(0.56, `rgba(${wpColor}, 0.01)`);
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, W, H);
  } else {
    // Subtle satin/matte directional surface falloff even without a plastic sleeve
    const matteGrad = ctx.createLinearGradient(p0x, p0y, p2x, p2y);
    matteGrad.addColorStop(0, `rgba(${wpColor}, 0.04)`);
    matteGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    matteGrad.addColorStop(1, 'rgba(0, 0, 0, 0.06)');
    ctx.fillStyle = matteGrad;
    ctx.fillRect(0, 0, W, H);
  }

  // Inner edge contact shadow & subtle bevel around the warped card so edges tuck into the holder/surface
  traceRoundedPerspectiveQuad(
    ctx,
    project,
    -maskExpand * 0.45,
    -maskExpand * 0.6,
    1 + maskExpand * 0.45,
    1 + maskExpand * 0.6,
    cornerRadius
  );
  ctx.strokeStyle = cfg.hasPlasticSleeve
    ? `rgba(${wpColor}, 0.24)`
    : 'rgba(15, 15, 15, 0.22)';
  ctx.lineWidth = Math.max(1.4, W * 0.0018);
  ctx.stroke();
  ctx.restore();

  // 6. Restore lanyard slot punch hole if present in this scene
  if (cfg.slotPunch) {
    const sp = cfg.slotPunch;
    const sx = sp.u1 * W;
    const sy = sp.v1 * H;
    const swSlot = (sp.u2 - sp.u1) * W;
    const shSlot = (sp.v2 - sp.v1) * H;
    const rSlot = Math.min(swSlot, shSlot) * 0.48;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(sx, sy, swSlot, shSlot, rSlot);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(sceneImg, 0, 0, W, H);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.lineWidth = Math.max(1.5, W * 0.002);
    ctx.stroke();
    ctx.restore();
  }

  // 7. Restore foreground occlusions (thumbs, fingers, clips) on top of the card
  if (cfg.foregroundPolygons && cfg.foregroundPolygons.length > 0) {
    for (const poly of cfg.foregroundPolygons) {
      if (!poly.points || poly.points.length < 3) continue;

      // First draw a soft contact shadow cast by the thumb/finger onto the card
      if (poly.castShadow) {
        ctx.save();
        traceRoundedPerspectiveQuad(
          ctx,
          project,
          -maskExpand,
          -maskExpand,
          1 + maskExpand,
          1 + maskExpand,
          cornerRadius
        );
        ctx.clip();

        ctx.beginPath();
        poly.points.forEach(([u, v], idx) => {
          const px = u * W;
          const py = v * H;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.42)';
        ctx.shadowBlur = Math.max(6, Math.round(W * 0.008));
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = -Math.max(1, Math.round(H * 0.002));
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fill();
        ctx.restore();
      }

      // Now composite the original scene's thumb/finger pixels with a smooth feathered mask
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = W;
      maskCanvas.height = H;
      const mCtx = maskCanvas.getContext('2d')!;
      const feather = poly.featherPx ?? 2.0;
      try {
        mCtx.filter = `blur(${feather}px)`;
      } catch {
        // fallback no blur
      }
      mCtx.beginPath();
      poly.points.forEach(([u, v], idx) => {
        const px = u * W;
        const py = v * H;
        if (idx === 0) mCtx.moveTo(px, py);
        else mCtx.lineTo(px, py);
      });
      mCtx.closePath();
      mCtx.fillStyle = '#ffffff';
      mCtx.fill();

      // Composite sceneImg using maskCanvas
      mCtx.filter = 'none';
      mCtx.globalCompositeOperation = 'source-in';
      mCtx.drawImage(sceneImg, 0, 0, W, H);

      ctx.drawImage(maskCanvas, 0, 0);
    }
  }

  return outCanvas.toDataURL('image/jpeg', 0.94);
}
