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
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.20
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
    lightingBlend: 0.14
  },
  {
    id: 'scene_11',
    matchKeys: ['243o6m301q', 'scene_11'],
    tl: [0.0110, 0.1845],
    tr: [0.8545, 0.1865],
    br: [0.8645, 0.8780],
    bl: [0.0075, 0.9195],
    cornerRadius: 0.048,
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.16,
    foregroundPolygons: [
      {
        // Bottom thumb supporting lower-center edge of card
        points: [
          [0.312, 0.903],
          [0.365, 0.896],
          [0.455, 0.893],
          [0.545, 0.892],
          [0.585, 0.908],
          [0.312, 0.915]
        ],
        castShadow: true,
        featherPx: 1.5
      }
    ]
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
    lightingBlend: 0.14
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
    lightingBlend: 0.14,
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
        featherPx: 2.5
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
    lightingBlend: 0.14,
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
    tl: [0.0055, 0.3235],
    tr: [0.9620, 0.3165],
    br: [0.9765, 0.6525],
    bl: [0.0105, 0.6650],
    cornerRadius: 0.046,
    maskExpand: 0.0045,
    hasPlasticSleeve: false,
    lightingBlend: 0.20,
    foregroundPolygons: [
      {
        // Left palm / thumb base supporting bottom-left corner of card
        points: [
          [0.002, 0.660],
          [0.045, 0.663],
          [0.098, 0.667],
          [0.102, 0.688],
          [0.002, 0.688]
        ],
        castShadow: true,
        featherPx: 1.4
      },
      {
        // Index finger pad supporting lower-left/center weight of card
        points: [
          [0.142, 0.663],
          [0.245, 0.660],
          [0.355, 0.658],
          [0.436, 0.656],
          [0.438, 0.682],
          [0.140, 0.682]
        ],
        castShadow: true,
        featherPx: 1.4
      },
      {
        // Middle finger pad supporting lower-center/right weight of card
        points: [
          [0.452, 0.656],
          [0.545, 0.653],
          [0.648, 0.651],
          [0.652, 0.678],
          [0.450, 0.678]
        ],
        castShadow: true,
        featherPx: 1.4
      }
    ]
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
    lightingBlend: 0.14
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
    lightingBlend: 0.14
  },
  {
    id: 'scene_18',
    matchKeys: ['6q2k3h3j5y', 'scene_18'],
    tl: [0.1580, 0.2490],
    tr: [0.8405, 0.2815],
    br: [0.8415, 0.8395],
    bl: [0.1515, 0.8610],
    cornerRadius: 0.046,
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.18,
    foregroundPolygons: [
      {
        // Top-left index finger pad pinching top edge
        points: [
          [0.145, 0.242],
          [0.215, 0.252],
          [0.268, 0.250],
          [0.272, 0.235],
          [0.145, 0.235]
        ],
        castShadow: true,
        featherPx: 1.6
      },
      {
        // Bottom-left thumb pad supporting lower edge
        points: [
          [0.148, 0.866],
          [0.215, 0.847],
          [0.310, 0.845],
          [0.385, 0.855],
          [0.408, 0.874],
          [0.148, 0.874]
        ],
        castShadow: true,
        featherPx: 1.8
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
    lightingBlend: 0.14
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
    lightingBlend: 0.14,
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
    lightingBlend: 0.12
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
    lightingBlend: 0.14,
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
        featherPx: 2.0
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
    lightingBlend: 0.10
  },
  {
    id: 'scene_seton_656u69492z',
    matchKeys: ['656u69492z', 'scene_seton'],
    tl: [0.1375, 0.1780],
    tr: [0.8115, 0.1675],
    br: [0.8225, 0.4910],
    bl: [0.1410, 0.4960],
    cornerRadius: 0.046,
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.16,
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
        featherPx: 2.0
      },
      {
        // Supporting finger contact along bottom-left edge
        points: [
          [0.215, 0.494],
          [0.310, 0.493],
          [0.412, 0.493],
          [0.415, 0.508],
          [0.215, 0.508]
        ],
        castShadow: true,
        featherPx: 1.4
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
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.16,
    foregroundPolygons: [
      {
        // Top-right index finger gripping upper-right edge
        points: [
          [0.640, 0.225],
          [0.720, 0.244],
          [0.835, 0.246],
          [0.915, 0.234],
          [0.915, 0.218],
          [0.640, 0.218]
        ],
        castShadow: true,
        featherPx: 1.8
      },
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
        featherPx: 2.0
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
    lightingBlend: 0.16
  },
  {
    id: 'scene_hws_170p6e501a',
    matchKeys: ['170p6e501a', 'scene_hws'],
    tl: [0.0375, 0.2155],
    tr: [0.9985, 0.2075],
    br: [0.9985, 0.8185],
    bl: [0.0485, 0.8265],
    cornerRadius: 0.044,
    maskExpand: 0.005,
    hasPlasticSleeve: false,
    lightingBlend: 0.18,
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
        featherPx: 2.0
      }
    ]
  },
  {
    id: 'scene_utas_1i5g121y6m',
    matchKeys: ['1i5g121y6m', 'scene_utas'],
    tl: [0.1245, 0.1175],
    tr: [0.8185, 0.0615],
    br: [0.8195, 0.6985],
    bl: [0.1375, 0.6755],
    cornerRadius: 0.046,
    maskExpand: 0.0045,
    hasPlasticSleeve: false,
    lightingBlend: 0.18,
    foregroundPolygons: [
      {
        // Supporting thumb/palm along bottom edge of card
        points: [
          [0.372, 0.683],
          [0.485, 0.688],
          [0.645, 0.694],
          [0.785, 0.698],
          [0.785, 0.720],
          [0.372, 0.720]
        ],
        castShadow: true,
        featherPx: 1.5
      }
    ]
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
    lightingBlend: 0.16
  },
  {
    id: 'scene_52426q1b6r',
    matchKeys: ['52426q1b6r', 'scene_52426q1b6r'],
    tl: [0.0520, 0.0335],
    tr: [0.9635, 0.1145],
    br: [0.9225, 0.8965],
    bl: [0.0175, 0.8155],
    cornerRadius: 0.048,
    maskExpand: 0.006,
    hasPlasticSleeve: false,
    lightingBlend: 0.16
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
    ['3350531a5z', '/assets/mockups/scene_usu_3350531a5z.jpg'],
    ['52426q1b6r', '/assets/mockups/scene_52426q1b6r.png']
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
      const minX = w * 0.14;
      const maxX = w * 0.86;
      const minY = h * 0.18;
      const maxY = h * 0.82;

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
          lightingBlend: 0.14
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
    lightingBlend: 0.14
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
 * Offsets a triangle's 3 vertices outward so every edge moves perpendicularly outward
 * by `padPx` pixels. This eliminates sub-pixel anti-aliasing seams along acute diagonals.
 */
function expandTrianglePerpendicular(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  padPx: number = 1.45
): [number, number, number, number, number, number] {
  const signedArea2 = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
  const orient = signedArea2 >= 0 ? 1 : -1;

  const edgeNormal = (ax: number, ay: number, bx: number, by: number): [number, number] => {
    const ex = bx - ax;
    const ey = by - ay;
    const len = Math.hypot(ex, ey) || 1;
    // Outward normal for given winding
    return [(ey / len) * orient, (-ex / len) * orient];
  };

  const [n01x, n01y] = edgeNormal(x0, y0, x1, y1);
  const [n12x, n12y] = edgeNormal(x1, y1, x2, y2);
  const [n20x, n20y] = edgeNormal(x2, y2, x0, y0);

  const offsetVertex = (
    vx: number,
    vy: number,
    nAx: number,
    nAy: number,
    nBx: number,
    nBy: number
  ): [number, number] => {
    let bx = nAx + nBx;
    let by = nAy + nBy;
    const bLen = Math.hypot(bx, by);
    if (bLen < 1e-4) {
      return [vx + nAx * padPx, vy + nAy * padPx];
    }
    bx /= bLen;
    by /= bLen;
    const cosHalf = Math.max(0.32, Math.abs(bx * nAx + by * nAy));
    const dist = Math.min(padPx * 3.0, padPx / cosHalf);
    return [vx + bx * dist, vy + by * dist];
  };

  const [ox0, oy0] = offsetVertex(x0, y0, n20x, n20y, n01x, n01y);
  const [ox1, oy1] = offsetVertex(x1, y1, n01x, n01y, n12x, n12y);
  const [ox2, oy2] = offsetVertex(x2, y2, n12x, n12y, n20x, n20y);
  return [ox0, oy0, ox1, oy1, ox2, oy2];
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
  const [ex0, ey0, ex1, ey1, ex2, ey2] = expandTrianglePerpendicular(
    dx0,
    dy0,
    dx1,
    dy1,
    dx2,
    dy2,
    1.45
  );

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
  shadowTintR: number;
  shadowTintG: number;
  shadowTintB: number;
  gamma: number;
  saturation: number;
  directionalGrid: number[][]; // 4 rows x 6 cols of local illumination multipliers [0.64..1.10]
  lightDirX: number; // Normalized primary light direction X in [-1..1]
  lightDirY: number; // Normalized primary light direction Y in [-1..1]
  peakS: number; // Normalized horizontal highlight focal coordinate [0..1]
  peakT: number; // Normalized vertical highlight focal coordinate [0..1]
  contrastSpan: number; // Scene directional brightness contrast [0.12..0.42]
}

/**
 * Analyzes the reference scene's ambient exposure, white point, shadow floor (black point),
 * color temperature/tint cast, and 2D spatial directional illumination across BOTH the card quad
 * and the surrounding background (fingers, denim, surface).
 * This ensures the rendered card's brightness variation matches the surrounding hand and fabric.
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
    shadowTintR: 22,
    shadowTintG: 26,
    shadowTintB: 34,
    gamma: 1.04,
    saturation: 0.92,
    directionalGrid: [
      [1.06, 1.04, 1.00, 0.95, 0.90, 0.86],
      [1.04, 1.02, 0.98, 0.93, 0.88, 0.83],
      [0.98, 0.96, 0.93, 0.89, 0.84, 0.79],
      [0.92, 0.91, 0.88, 0.84, 0.80, 0.75],
    ],
    lightDirX: -0.65,
    lightDirY: -0.55,
    peakS: 0.24,
    peakT: 0.26,
    contrastSpan: 0.26,
  };

  try {
    const AW = 192;
    const AH = 192;
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

    // 1. Sample interior of the card AND surrounding peripheral background on a 6x4 grid
    const gridRows = 4;
    const gridCols = 6;
    const cardSamples: Array<[number, number, number, number]> = [];
    const cellCombinedLums: number[][] = [];

    for (let gr = 0; gr < gridRows; gr++) {
      const rowLums: number[] = [];
      for (let gc = 0; gc < gridCols; gc++) {
        const innerSamples: Array<[number, number, number, number]> = [];
        const outerSamples: Array<[number, number, number, number]> = [];

        for (let sy = 0; sy < 5; sy++) {
          for (let sx = 0; sx < 5; sx++) {
            const uNorm = (gc + (sx + 0.5) / 5) / gridCols;
            const vNorm = (gr + (sy + 0.5) / 5) / gridRows;

            // Interior card point
            const sIn = 0.04 + uNorm * 0.92;
            const tIn = 0.04 + vNorm * 0.92;
            const [pxIn, pyIn] = project(sIn, tIn);
            const spIn = samplePixel(pxIn, pyIn);
            innerSamples.push(spIn);
            cardSamples.push(spIn);

            // Surrounding background point just outside the card edge in the same direction
            const sOut = -0.16 + uNorm * 1.32;
            const tOut = -0.16 + vNorm * 1.32;
            const [pxOut, pyOut] = project(sOut, tOut);
            outerSamples.push(samplePixel(pxOut, pyOut));
          }
        }

        innerSamples.sort((a, b) => a[3] - b[3]);
        outerSamples.sort((a, b) => a[3] - b[3]);

        // 84th percentile of inner card cell (captures local PVC illumination)
        const inP84 = innerSamples[Math.min(innerSamples.length - 1, Math.floor(innerSamples.length * 0.84))][3];
        // 75th percentile of outer environment cell (captures adjacent finger/denim brightness falloff)
        const outP75 = outerSamples[Math.min(outerSamples.length - 1, Math.floor(outerSamples.length * 0.75))][3];

        // Blend inner card lighting with surrounding background lighting variation so the card
        // reflects the same directional falloff as the fingers and denim
        rowLums.push(inP84 * 0.58 + outP75 * 0.42);
      }
      cellCombinedLums.push(rowLums);
    }

    // 2. Sample ambient environment ring outside the card quad
    const envSamples: Array<[number, number, number, number]> = [];
    const ringOffsets = [-0.22, -0.11, 1.11, 1.22];
    for (let i = 0; i <= 20; i++) {
      const u = i / 20;
      for (const off of ringOffsets) {
        const [x1, y1] = project(u, off);
        envSamples.push(samplePixel(x1, y1));
        const [x2, y2] = project(off, u);
        envSamples.push(samplePixel(x2, y2));
      }
    }
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

    const cardWeight = cLum > 140 ? 0.68 : 0.30;
    const envWeight = 1 - cardWeight;

    const rawWpR = cR * cardWeight + eR * envWeight;
    const rawWpG = cG * cardWeight + eG * envWeight;
    const rawWpB = cB * cardWeight + eB * envWeight;

    // Preserve the scene's color temperature/tint cast while keeping white point in a natural photographic range [174..234]
    const rawWpLum = Math.max(1, 0.299 * rawWpR + 0.587 * rawWpG + 0.114 * rawWpB);
    const targetWpLum = Math.max(176, Math.min(232, rawWpLum * 0.94));
    const wpScale = targetWpLum / rawWpLum;

    const wpR = Math.max(166, Math.min(238, Math.round(rawWpR * wpScale)));
    const wpG = Math.max(166, Math.min(238, Math.round(rawWpG * wpScale)));
    const wpB = Math.max(166, Math.min(238, Math.round(rawWpB * wpScale)));

    // Compute scene black point (shadow floor) and ambient shadow tint (e.g. denim blue or warm shadow)
    const bStart = Math.floor(envSamples.length * 0.05);
    const bEnd = Math.max(bStart + 1, Math.floor(envSamples.length * 0.18));
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

    const bpR = Math.max(10, Math.min(26, Math.round(sR * 0.44 + 8)));
    const bpG = Math.max(10, Math.min(26, Math.round(sG * 0.44 + 8)));
    const bpB = Math.max(10, Math.min(28, Math.round(sB * 0.44 + 9)));

    const shadowTintR = Math.max(12, Math.min(48, Math.round(sR)));
    const shadowTintG = Math.max(12, Math.min(48, Math.round(sG)));
    const shadowTintB = Math.max(12, Math.min(54, Math.round(sB)));

    // Compute directional illumination grid with realistic dynamic contrast matching fingers/denim
    const flatCells = cellCombinedLums.flat().slice().sort((a, b) => a - b);
    const refLow = Math.max(25, flatCells[1] || 95);
    const refHigh = Math.max(refLow + 20, flatCells[flatCells.length - 2] || 205);
    const rawSpan = Math.max(0.16, Math.min(0.45, (refHigh - refLow) / refHigh));
    // Ensure a meaningful directional brightness gradient (at least ~22% falloff across the card)
    const contrastSpan = Math.max(0.22, Math.min(0.36, rawSpan * 1.15));

    let weightedS = 0;
    let weightedT = 0;
    let weightSum = 0;
    let gradX = 0;
    let gradY = 0;

    const directionalGrid = cellCombinedLums.map((row, rIdx) =>
      row.map((val, cIdx) => {
        const sNorm = (cIdx + 0.5) / gridCols;
        const tNorm = (rIdx + 0.5) / gridRows;
        const normPos = Math.max(0, Math.min(1, (val - refLow) / Math.max(1, refHigh - refLow)));

        const w = Math.pow(normPos, 2) + 0.05;
        weightedS += sNorm * w;
        weightedT += tNorm * w;
        weightSum += w;

        gradX += (sNorm - 0.5) * (normPos - 0.5);
        gradY += (tNorm - 0.5) * (normPos - 0.5);

        // Map [0..1] relative brightness into [1.06 - contrastSpan .. 1.06]
        const mult = 1.06 - contrastSpan * (1 - normPos);
        return Math.max(0.64, Math.min(1.08, mult));
      })
    );

    const peakS = weightSum > 0 ? Math.max(0.08, Math.min(0.92, weightedS / weightSum)) : 0.25;
    const peakT = weightSum > 0 ? Math.max(0.08, Math.min(0.92, weightedT / weightSum)) : 0.25;

    const gradLen = Math.hypot(gradX, gradY);
    const lightDirX = gradLen > 1e-3 ? gradX / gradLen : -0.65;
    const lightDirY = gradLen > 1e-3 ? gradY / gradLen : -0.55;

    const gamma = targetWpLum < 205 ? 1.08 : 1.04;
    const saturation = targetWpLum < 205 ? 0.88 : 0.91;

    return {
      wpR,
      wpG,
      wpB,
      bpR,
      bpG,
      bpB,
      shadowTintR,
      shadowTintG,
      shadowTintB,
      gamma,
      saturation,
      directionalGrid,
      lightDirX,
      lightDirY,
      peakS,
      peakT,
      contrastSpan,
    };
  } catch {
    return defaultProfile;
  }
}

/**
 * Prepares a rounded-corner version of the captured live ID card and grades its
 * exposure, white point, black point, color temperature, multi-zone directional shading,
 * anisotropic semi-matte PVC surface reflection (visible on both light and dark card areas),
 * and realistic die-cut PVC edge bevel & micro-wear.
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
  const sat = photometrics ? 1 - (1 - photometrics.saturation) * blendStrength : 0.92;
  const blurPx = Math.max(0.38, Math.min(0.68, w * 0.00048)) * blendStrength;
  try {
    ctx.filter = `blur(${blurPx.toFixed(2)}px) saturate(${sat.toFixed(3)})`;
  } catch {
    // fallback if filter unsupported
  }
  ctx.drawImage(cardCanvas, 0, 0, w, h);
  ctx.filter = 'none';

  // 2. Apply smooth 2D spatial directional shading map + semi-matte PVC specular response in card space
  if (photometrics && blendStrength > 0) {
    const grid = photometrics.directionalGrid;
    const gRows = grid.length;
    const gCols = grid[0].length;
    const effStrength = Math.min(1.35, blendStrength);

    // 2A. Multiplicative Diffuse Illumination Map (darkens shadow zones to match denim/finger falloff)
    const tinyC = document.createElement('canvas');
    tinyC.width = gCols;
    tinyC.height = gRows;
    const tCtx = tinyC.getContext('2d');
    if (tCtx) {
      const tImg = tCtx.createImageData(gCols, gRows);
      for (let r = 0; r < gRows; r++) {
        for (let c = 0; c < gCols; c++) {
          const cellMult = grid[r][c];
          const mult = 1 - (1 - cellMult) * effStrength;
          const shadowFactor = Math.max(0, Math.min(1, (0.98 - cellMult) * 2.2)) * effStrength;

          // Subtly shift shadow cells toward the scene's ambient shadow tint (e.g. denim cool shadow or warm indoor shadow)
          const baseV = Math.max(0, Math.min(255, Math.round(mult * 255)));
          const tintShiftR = (photometrics.shadowTintR - 28) * 0.35 * shadowFactor;
          const tintShiftG = (photometrics.shadowTintG - 28) * 0.35 * shadowFactor;
          const tintShiftB = (photometrics.shadowTintB - 28) * 0.35 * shadowFactor;

          const idx = (r * gCols + c) * 4;
          tImg.data[idx] = Math.max(0, Math.min(255, Math.round(baseV + tintShiftR)));
          tImg.data[idx + 1] = Math.max(0, Math.min(255, Math.round(baseV + tintShiftG)));
          tImg.data[idx + 2] = Math.max(0, Math.min(255, Math.round(baseV + tintShiftB)));
          tImg.data[idx + 3] = 255;
        }
      }
      tCtx.putImageData(tImg, 0, 0);

      const shadeC = document.createElement('canvas');
      shadeC.width = 256;
      shadeC.height = 160;
      const sCtx = shadeC.getContext('2d');
      if (sCtx) {
        sCtx.imageSmoothingEnabled = true;
        sCtx.imageSmoothingQuality = 'high';
        try {
          sCtx.filter = 'blur(20px)';
        } catch {
          // ignore
        }
        sCtx.drawImage(tinyC, -18, -18, 256 + 36, 160 + 36);
        sCtx.filter = 'none';

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(shadeC, 0, 0, w, h);
        ctx.restore();
      }
    }

    // 2B. Semi-Matte PVC Directional Surface Reflection (Screen + Soft-Light Lobe)
    // Crucial for dark headers/cards (e.g. MILA UNIVERSITY) so dark PVC shows pronounced directional
    // brightness variation matching the fingers and denim rather than looking flatly illuminated.
    const peakX = photometrics.peakS * w;
    const peakY = photometrics.peakT * h;
    const outerRadius = Math.hypot(w, h) * 0.95;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const sheenAlpha = Math.min(0.20, (0.09 + photometrics.contrastSpan * 0.22) * effStrength);
    const radGrad = ctx.createRadialGradient(
      peakX,
      peakY,
      w * 0.04,
      peakX - photometrics.lightDirX * w * 0.25,
      peakY - photometrics.lightDirY * h * 0.25,
      outerRadius
    );
    radGrad.addColorStop(0, `rgba(${photometrics.wpR}, ${photometrics.wpG}, ${photometrics.wpB}, ${sheenAlpha.toFixed(3)})`);
    radGrad.addColorStop(0.42, `rgba(${photometrics.wpR}, ${photometrics.wpG}, ${photometrics.wpB}, ${(sheenAlpha * 0.42).toFixed(3)})`);
    radGrad.addColorStop(0.78, `rgba(${photometrics.wpR}, ${photometrics.wpG}, ${photometrics.wpB}, ${(sheenAlpha * 0.08).toFixed(3)})`);
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Directional linear light-to-shadow gradient across the entire card plane
    const l0x = w * (0.5 + photometrics.lightDirX * 0.55);
    const l0y = h * (0.5 + photometrics.lightDirY * 0.55);
    const l1x = w * (0.5 - photometrics.lightDirX * 0.55);
    const l1y = h * (0.5 - photometrics.lightDirY * 0.55);

    ctx.save();
    ctx.globalCompositeOperation = 'soft-light';
    const linGrad = ctx.createLinearGradient(l0x, l0y, l1x, l1y);
    const hlAlpha = Math.min(0.26, 0.16 * effStrength);
    const shAlpha = Math.min(0.32, 0.22 * effStrength);
    linGrad.addColorStop(0, `rgba(${photometrics.wpR}, ${photometrics.wpG}, ${photometrics.wpB}, ${hlAlpha.toFixed(3)})`);
    linGrad.addColorStop(0.48, 'rgba(128, 128, 128, 0)');
    linGrad.addColorStop(1, `rgba(${photometrics.bpR}, ${photometrics.bpG}, ${photometrics.bpB}, ${shAlpha.toFixed(3)})`);
    ctx.fillStyle = linGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  // 3. Per-pixel Photometric Grading + Matte PVC Micro-Texture & Organic Edge Wear
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

      const lutR = new Uint8Array(256);
      const lutG = new Uint8Array(256);
      const lutB = new Uint8Array(256);

      for (let i = 0; i < 256; i++) {
        const norm = i / 255;
        const curved = Math.pow(norm, gamma);
        const rolloff = curved - 0.038 * s * Math.pow(norm, 3.4);
        const t = Math.max(0, Math.min(1, rolloff));

        lutR[i] = Math.max(0, Math.min(255, Math.round(bpR + t * (wpR - bpR))));
        lutG[i] = Math.max(0, Math.min(255, Math.round(bpG + t * (wpG - bpG))));
        lutB[i] = Math.max(0, Math.min(255, Math.round(bpB + t * (wpB - bpB))));
      }

      let seed = 1337;
      const grainAmp = 2.6 * Math.min(1.05, s);
      const edgeBandPx = Math.max(4, Math.round(w * 0.008));

      for (let y = 0; y < h; y++) {
        const distY = Math.min(y, h - 1 - y);
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          if (d[i + 3] === 0) continue;

          seed = (seed * 1664525 + 1013904223) | 0;
          const r1 = ((seed >>> 16) & 255) / 127.5 - 1.0;
          seed = (seed * 1664525 + 1013904223) | 0;
          const r2 = ((seed >>> 16) & 255) / 255.0;

          let noise = r1 * grainAmp;

          // Subtle physical edge micro-wear & matte bevel texture in the outer edgeBandPx
          // Replaces the overly clean digital border look with realistic die-cut PVC edge variation
          const distX = Math.min(x, w - 1 - x);
          const distEdge = Math.min(distX, distY);
          if (distEdge < edgeBandPx) {
            const edgeFactor = 1 - distEdge / edgeBandPx;
            // Low-frequency spatial modulation along the perimeter for natural edge wear
            const wave =
              Math.sin(x * 0.07 + y * 0.05) * 0.5 +
              Math.cos(x * 0.23 - y * 0.19) * 0.5;
            const wearScuff = edgeFactor * (wave * 7.5 + (r2 - 0.42) * 9.0) * Math.min(1.0, s);
            noise += wearScuff;
          }

          d[i] = Math.max(0, Math.min(255, lutR[d[i]] + noise));
          d[i + 1] = Math.max(0, Math.min(255, lutG[d[i + 1]] + noise));
          d[i + 2] = Math.max(0, Math.min(255, lutB[d[i + 2]] + noise));
        }
      }

      ctx.putImageData(imgData, 0, 0);
    } catch {
      // Fallback if getImageData fails
    }
  }

  // 4. Soften any built-in CSS template border around the outer perimeter so it doesn't look like a clean vector box
  const edgeAoAlpha = 0.12 * Math.min(1.2, blendStrength);
  if (edgeAoAlpha > 0.01) {
    ctx.save();
    ctx.strokeStyle = `rgba(16, 14, 12, ${edgeAoAlpha.toFixed(3)})`;
    ctx.lineWidth = Math.max(3, w * 0.008);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  // Sample average graded edge color from `out`
  const rimR = photometrics ? photometrics.wpR : 220;
  const rimG = photometrics ? photometrics.wpG : 218;
  const rimB = photometrics ? photometrics.wpB : 214;
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
  const pts = sampleRoundedPerspectivePerimeter(project, sMin, tMin, sMax, tMax, cornerRadiusRatio);
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i];
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/**
 * Returns ordered perimeter points `[x, y, s, t]` around the rounded perspective quad.
 */
function sampleRoundedPerspectivePerimeter(
  project: (s: number, t: number) => [number, number],
  sMin: number,
  tMin: number,
  sMax: number,
  tMax: number,
  cornerRadiusRatio: number
): Array<[number, number, number, number]> {
  const rx = cornerRadiusRatio * (sMax - sMin);
  const ry = cornerRadiusRatio * 1.58 * (tMax - tMin);
  const stepsPerEdge = 20;
  const stepsPerCorner = 10;
  const pts: Array<[number, number, number, number]> = [];

  const pushPt = (s: number, t: number) => {
    const [x, y] = project(s, t);
    pts.push([x, y, s, t]);
  };

  // Top edge
  for (let i = 0; i <= stepsPerEdge; i++) {
    const s = sMin + rx + ((sMax - sMin - 2 * rx) * i) / stepsPerEdge;
    pushPt(s, tMin);
  }
  // Top-right corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = -Math.PI / 2 + (Math.PI / 2) * (i / stepsPerCorner);
    pushPt(sMax - rx + Math.cos(ang) * rx, tMin + ry + Math.sin(ang) * ry);
  }
  // Right edge
  for (let i = 1; i <= stepsPerEdge; i++) {
    const t = tMin + ry + ((tMax - tMin - 2 * ry) * i) / stepsPerEdge;
    pushPt(sMax, t);
  }
  // Bottom-right corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = 0 + (Math.PI / 2) * (i / stepsPerCorner);
    pushPt(sMax - rx + Math.cos(ang) * rx, tMax - ry + Math.sin(ang) * ry);
  }
  // Bottom edge
  for (let i = 1; i <= stepsPerEdge; i++) {
    const s = sMax - rx - ((sMax - sMin - 2 * rx) * i) / stepsPerEdge;
    pushPt(s, tMax);
  }
  // Bottom-left corner
  for (let i = 1; i <= stepsPerCorner; i++) {
    const ang = Math.PI / 2 + (Math.PI / 2) * (i / stepsPerCorner);
    pushPt(sMin + rx + Math.cos(ang) * rx, tMax - ry + Math.sin(ang) * ry);
  }
  // Left edge
  for (let i = 1; i <= stepsPerEdge; i++) {
    const t = tMax - ry - ((tMax - tMin - 2 * ry) * i) / stepsPerEdge;
    pushPt(sMin, t);
  }
  // Top-left corner
  for (let i = 1; i < stepsPerCorner; i++) {
    const ang = Math.PI + (Math.PI / 2) * (i / stepsPerCorner);
    pushPt(sMin + rx + Math.cos(ang) * rx, tMin + ry + Math.sin(ang) * ry);
  }

  return pts;
}

/**
 * Renders physically realistic die-cut PVC card edges:
 * 1. Subtle 3D CR80 PVC core thickness on camera-facing edges
 * 2. Light-direction-dependent specular bevel reflection (brighter where facing the scene light source,
 *    darker shadow bevel on the opposite side, never a uniform digital outline)
 * 3. Organic micro-wear / surface reflection variation along the edge and corners
 */
function renderPhysicalCardEdges(
  ctx: CanvasRenderingContext2D,
  project: (s: number, t: number) => [number, number],
  sMin: number,
  tMin: number,
  sMax: number,
  tMax: number,
  cornerRadius: number,
  photometrics: ScenePhotometrics,
  W: number,
  H: number,
  hasPlasticSleeve: boolean,
  blendStrength: number
) {
  const pts = sampleRoundedPerspectivePerimeter(project, sMin, tMin, sMax, tMax, cornerRadius);
  if (pts.length < 4) return;

  const baseWidth = Math.max(1.2, W * 0.0016);

  // 1. Subtle 0.76mm PVC core thickness along the bottom/camera-facing rim
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i < pts.length; i++) {
    const [x0, y0, s0, t0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const segLen = Math.hypot(dx, dy);
    if (segLen < 0.5) continue;

    // Outward normal for clockwise perimeter in screen coords
    const nx = dy / segLen;
    const ny = -dx / segLen;

    // Alignment with scene light source vector
    const lightAlign = nx * photometrics.lightDirX + ny * photometrics.lightDirY;

    // Organic micro-variation along the die-cut edge so reflection isn't mathematically uniform
    const microVar =
      0.78 +
      0.22 * Math.sin(i * 0.63 + s0 * 11.0 + t0 * 7.0) +
      0.14 * Math.cos(i * 1.73 - s0 * 19.0);

    // Local brightness from directional grid
    const gRows = photometrics.directionalGrid.length;
    const gCols = photometrics.directionalGrid[0].length;
    const gr = Math.max(0, Math.min(gRows - 1, Math.floor(Math.max(0, Math.min(0.999, t0)) * gRows)));
    const gc = Math.max(0, Math.min(gCols - 1, Math.floor(Math.max(0, Math.min(0.999, s0)) * gCols)));
    const localMult = photometrics.directionalGrid[gr][gc];

    if (lightAlign > -0.15) {
      // Lit bevel edge: catches directional specular highlight from the scene light source
      const specFactor = Math.max(0, Math.min(1, (lightAlign + 0.15) / 1.15)) * microVar * localMult;
      const alpha = (hasPlasticSleeve ? 0.34 : 0.26) * specFactor * Math.min(1.2, blendStrength);
      const r = Math.min(245, Math.round(photometrics.wpR * (0.94 + 0.08 * specFactor)));
      const g = Math.min(245, Math.round(photometrics.wpG * (0.94 + 0.08 * specFactor)));
      const b = Math.min(245, Math.round(photometrics.wpB * (0.94 + 0.08 * specFactor)));

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
      ctx.lineWidth = baseWidth * (0.85 + 0.45 * specFactor);
      ctx.stroke();
    } else {
      // Away-facing bevel edge: soft matte PVC core edge with shadow falloff
      const shadeFactor = Math.max(0, Math.min(1, (-lightAlign - 0.15) / 0.85)) * microVar;
      // Subtle matte PVC core thickness (off-white/grey core in shadow) + outer dark crevice
      const coreR = Math.round(photometrics.wpR * 0.62 * localMult);
      const coreG = Math.round(photometrics.wpG * 0.62 * localMult);
      const coreB = Math.round(photometrics.wpB * 0.64 * localMult);
      const coreAlpha = 0.18 * (0.7 + 0.3 * microVar);

      ctx.beginPath();
      ctx.moveTo(x0 + nx * 0.6, y0 + ny * 0.6);
      ctx.lineTo(x1 + nx * 0.6, y1 + ny * 0.6);
      ctx.strokeStyle = `rgba(${coreR}, ${coreG}, ${coreB}, ${coreAlpha.toFixed(3)})`;
      ctx.lineWidth = baseWidth * 0.95;
      ctx.stroke();

      const darkAlpha = 0.24 * shadeFactor * Math.min(1.2, blendStrength);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = `rgba(${photometrics.bpR}, ${photometrics.bpG}, ${photometrics.bpB}, ${darkAlpha.toFixed(3)})`;
      ctx.lineWidth = baseWidth * 0.9;
      ctx.stroke();
    }
  }

  ctx.restore();
}

/**
 * Main calibrated 4-corner perspective homography compositor.
 * Replaces 100% of the underlying card in the scene with the exact live ID card preview,
 * applies scene-adaptive photometric color grading, white-point matching, directional shading,
 * plastic holder shadows/reflections, physical die-cut edge bevels, and restores overlapping
 * foreground thumbs/fingers with realistic weight-bearing contact physics.
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
  const maskExpand = cfg.maskExpand ?? 0.0055;

  // Analyze scene photometrics (white point, black point, color cast, 2D directional shading & light vector)
  const photometrics = analyzeScenePhotometrics(sceneImg, cfg);

  // Prepare rounded & photometrically graded live card canvas
  const { canvas: roundedCard, edgeColor } = prepareRoundedCardCanvas(
    cardCanvas,
    cornerRadius,
    photometrics,
    blendStrength
  );

  // 2. Mask out 100% of the old underlying card and render directional contact shadow
  // Notice: when fingers support the bottom edge (foregroundPolygons present), we keep downward
  // shadow offset tight so it never obscures the finger contact line.
  const hasFingerSupport = Boolean(cfg.foregroundPolygons && cfg.foregroundPolygons.length > 0);
  ctx.save();
  traceRoundedPerspectiveQuad(
    ctx,
    project,
    -maskExpand,
    -maskExpand * 1.25,
    1 + maskExpand,
    1 + maskExpand * (hasFingerSupport ? 0.85 : 1.25),
    cornerRadius
  );
  ctx.shadowColor = hasFingerSupport ? 'rgba(0, 0, 0, 0.28)' : 'rgba(0, 0, 0, 0.42)';
  ctx.shadowBlur = Math.max(3, Math.round(W * (hasFingerSupport ? 0.004 : 0.0065)));
  ctx.shadowOffsetX = Math.round(-photometrics.lightDirX * W * 0.0018);
  ctx.shadowOffsetY = hasFingerSupport
    ? Math.max(0, Math.round(H * 0.0008))
    : Math.max(1, Math.round(H * 0.0024));
  ctx.fillStyle = edgeColor;
  ctx.fill();
  ctx.restore();

  // 3. Warp the live ID card into the exact 4-corner perspective using a seam-free 28x20 projective mesh
  ctx.save();
  traceRoundedPerspectiveQuad(
    ctx,
    project,
    -maskExpand * 0.5,
    -maskExpand * 0.65,
    1 + maskExpand * 0.5,
    1 + maskExpand * (hasFingerSupport ? 0.45 : 0.65),
    cornerRadius
  );
  ctx.clip();

  const cols = 28;
  const rows = 20;
  const sw = roundedCard.width;
  const sh = roundedCard.height;

  const botExpand = hasFingerSupport ? maskExpand * 0.45 : maskExpand * 0.65;
  const topExpand = maskExpand * 0.65;

  // Draw a 2-triangle coarse base pass of roundedCard first so sub-pixel AA never sees a contrasting background color
  {
    const [bx00, by00] = project(-maskExpand * 0.5, -topExpand);
    const [bx10, by10] = project(1 + maskExpand * 0.5, -topExpand);
    const [bx11, by11] = project(1 + maskExpand * 0.5, 1 + botExpand);
    const [bx01, by01] = project(-maskExpand * 0.5, 1 + botExpand);
    drawTexturedTriangle(ctx, roundedCard, 0, 0, sw, 0, sw, sh, bx00, by00, bx10, by10, bx11, by11);
    drawTexturedTriangle(ctx, roundedCard, 0, 0, sw, sh, 0, sh, bx00, by00, bx11, by11, bx01, by01);
  }

  for (let r = 0; r < rows; r++) {
    const t0 = r / rows;
    const t1 = (r + 1) / rows;
    const sy0 = t0 * sh;
    const sy1 = t1 * sh;

    const mt0 = -topExpand + t0 * (1 + topExpand + botExpand);
    const mt1 = -topExpand + t1 * (1 + topExpand + botExpand);

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

  // 4. Transfer low-frequency ambient lighting & color mood from the surrounding scene
  const baseLightingBlend = cfg.lightingBlend ?? 0.15;
  const effectiveLightingBlend = baseLightingBlend * Math.max(0.6, blendStrength);
  if (effectiveLightingBlend > 0) {
    try {
      const lightC = document.createElement('canvas');
      lightC.width = W;
      lightC.height = H;
      const lCtx = lightC.getContext('2d');
      if (lCtx) {
        const blurPx = Math.max(46, Math.round(W * 0.075));
        lCtx.filter = `blur(${blurPx}px) saturate(0.45)`;
        lCtx.drawImage(sceneImg, 0, 0, W, H);
        ctx.save();
        ctx.globalCompositeOperation = 'soft-light';
        ctx.globalAlpha = Math.min(0.36, effectiveLightingBlend * 1.55);
        ctx.drawImage(lightC, 0, 0);
        ctx.restore();
      }
    } catch {
      // Ignore if canvas filter unsupported
    }
  }

  // 5. Add physical PVC surface response & optional plastic badge sleeve sheen using scene light vector
  const wpColor = `${photometrics.wpR}, ${photometrics.wpG}, ${photometrics.wpB}`;
  const [cX, cY] = project(0.5, 0.5);
  const [eX, eY] = project(0.5 + photometrics.lightDirX * 0.55, 0.5 + photometrics.lightDirY * 0.55);
  const [oX, oY] = project(0.5 - photometrics.lightDirX * 0.55, 0.5 - photometrics.lightDirY * 0.55);

  if (cfg.hasPlasticSleeve) {
    const sheenGrad = ctx.createLinearGradient(eX, eY, oX, oY);
    sheenGrad.addColorStop(0, `rgba(${wpColor}, 0.12)`);
    sheenGrad.addColorStop(0.32, `rgba(${wpColor}, 0.03)`);
    sheenGrad.addColorStop(0.48, `rgba(${wpColor}, 0.13)`);
    sheenGrad.addColorStop(0.58, `rgba(${wpColor}, 0.01)`);
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.11)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, W, H);
  } else {
    // Realistic matte/satin PVC surface reflection & shadow falloff aligned with the scene light vector
    const matteGrad = ctx.createLinearGradient(eX, eY, oX, oY);
    matteGrad.addColorStop(0, `rgba(${wpColor}, 0.07)`);
    matteGrad.addColorStop(0.45, 'rgba(0, 0, 0, 0)');
    matteGrad.addColorStop(1, 'rgba(0, 0, 0, 0.11)');
    ctx.fillStyle = matteGrad;
    ctx.fillRect(0, 0, W, H);
  }

  // Restore clip before drawing physical perimeter bevels
  ctx.restore();

  // 5B. Render directional, light-reactive physical PVC edge bevel & micro-wear
  renderPhysicalCardEdges(
    ctx,
    project,
    -maskExpand * 0.45,
    -topExpand * 0.92,
    1 + maskExpand * 0.45,
    1 + botExpand * 0.92,
    cornerRadius,
    photometrics,
    W,
    H,
    Boolean(cfg.hasPlasticSleeve),
    blendStrength
  );

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

  // 7. Restore foreground occlusions (thumbs, supporting fingers, clips) with physical weight-contact shading
  if (cfg.foregroundPolygons && cfg.foregroundPolygons.length > 0) {
    for (const poly of cfg.foregroundPolygons) {
      if (!poly.points || poly.points.length < 3) continue;

      // Compute polygon centroid to determine direction from finger contact into the card interior
      let polyCx = 0;
      let polyCy = 0;
      for (const [u, v] of poly.points) {
        polyCx += u * W;
        polyCy += v * H;
      }
      polyCx /= poly.points.length;
      polyCy /= poly.points.length;

      const toCardX = cX - polyCx;
      const toCardY = cY - polyCy;
      const toCardLen = Math.hypot(toCardX, toCardY) || 1;
      const inNx = toCardX / toCardLen;
      const inNy = toCardY / toCardLen;

      if (poly.castShadow) {
        ctx.save();
        traceRoundedPerspectiveQuad(
          ctx,
          project,
          -maskExpand * 0.5,
          -topExpand,
          1 + maskExpand * 0.5,
          1 + botExpand,
          cornerRadius
        );
        ctx.clip();

        // Layer A: Broad soft ambient occlusion where finger/thumb approaches the card surface
        ctx.beginPath();
        poly.points.forEach(([u, v], idx) => {
          const px = u * W;
          const py = v * H;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.shadowColor = 'rgba(12, 8, 6, 0.34)';
        ctx.shadowBlur = Math.max(5, Math.round(W * 0.0065));
        ctx.shadowOffsetX = inNx * Math.max(1.5, W * 0.0022);
        ctx.shadowOffsetY = inNy * Math.max(1.5, H * 0.0022);
        ctx.fillStyle = 'rgba(12, 8, 6, 0.22)';
        ctx.fill();

        // Layer B: Tight high-precision contact crevice line (1.5px-2.5px) right at the finger-to-card weight-bearing boundary
        ctx.shadowColor = 'rgba(8, 5, 4, 0.52)';
        ctx.shadowBlur = Math.max(1.5, Math.round(W * 0.0018));
        ctx.shadowOffsetX = inNx * Math.max(0.8, W * 0.001);
        ctx.shadowOffsetY = inNy * Math.max(0.8, H * 0.001);
        ctx.strokeStyle = 'rgba(15, 10, 8, 0.38)';
        ctx.lineWidth = Math.max(1.4, W * 0.0018);
        ctx.stroke();
        ctx.restore();
      }

      // Composite the original scene's thumb/finger pixels with a crisp feathered mask so the skin contact edge is clearly visible
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = W;
      maskCanvas.height = H;
      const mCtx = maskCanvas.getContext('2d')!;
      const feather = poly.featherPx ?? 1.6;
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

      mCtx.filter = 'none';
      mCtx.globalCompositeOperation = 'source-in';
      mCtx.drawImage(sceneImg, 0, 0, W, H);

      ctx.drawImage(maskCanvas, 0, 0);
    }
  }

  return outCanvas.toDataURL('image/jpeg', 0.94);
}

