import React, { useId } from 'react';

/** Original academic emblem, drawn as vectors so card exports stay sharp. */
export const UniversityCrest = ({ className = '', monochrome = false }: { className?: string; monochrome?: boolean }) => {
  const id = useId().replace(/:/g, '');
  const gold = monochrome ? 'currentColor' : `url(#${id}-gold)`;
  const ivory = monochrome ? 'currentColor' : '#FFF5D9';
  const navy = monochrome ? 'none' : '#093951';
  return (
    <svg className={className} viewBox="0 0 100 116" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="University crest with an open book, bridge and laurel wreath">
      <defs>
        <linearGradient id={`${id}-gold`} x1="18" y1="12" x2="82" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A77B2C" /><stop offset=".28" stopColor="#F5DE99" /><stop offset=".55" stopColor="#CDA64F" /><stop offset=".8" stopColor="#F1D58A" /><stop offset="1" stopColor="#AA7C2E" />
        </linearGradient>
      </defs>
      {/* Paired laurel branches with individually shaped leaves. */}
      {[false, true].map(mirror => (
        <g key={String(mirror)} transform={mirror ? 'translate(100 0) scale(-1 1)' : undefined}>
          <path d="M41 97C16 83 8 58 20 29" stroke={gold} strokeWidth="1.8" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map(i => (
            <g key={i} transform={`translate(${[19, 15, 14, 16, 21, 28][i]} ${[34, 44, 54, 65, 76, 86][i]}) rotate(${[-20, -8, 8, 24, 38, 50][i]})`}>
              <path d="M0 4C-7 0-10-6-8-12C-2-9 1-3 0 4Z" fill={gold} />
              <path d="M1 6C7 2 10-4 8-9C2-6 0 0 1 6Z" fill={gold} />
            </g>
          ))}
        </g>
      ))}
      {/* Raised rim and inset enamel field. */}
      <path d="M50 12C61 18 72 19 80 19V56C80 75 68 88 50 98C32 88 20 75 20 56V19C28 19 39 18 50 12Z" fill={navy} stroke={gold} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M50 18C60 23 68 24 74 24V56C74 71 64 82 50 91C36 82 26 71 26 56V24C32 24 40 23 50 18Z" stroke={gold} strokeWidth=".9" />
      <path d="M31 30H69" stroke={gold} strokeWidth=".8" />
      <path d="M50 21L51.4 24.3L55 24.6L52.3 27L53.1 30.5L50 28.7L46.9 30.5L47.7 27L45 24.6L48.6 24.3Z" fill={ivory} />
      {/* Curved pages, gilded page edges and central binding. */}
      <path d="M32 39Q42 35 50 40Q58 35 68 39V55Q58 51 50 56Q42 51 32 55Z" fill={gold} />
      <path d="M34 37Q43 34 49 39V52Q43 48 34 51Z M51 39Q57 34 66 37V51Q57 48 51 52Z" fill={ivory} />
      <path d="M37 40Q42 39 46 41M37 44Q42 43 46 45M37 48Q42 47 46 49M54 41Q58 39 63 40M54 45Q58 43 63 44M54 49Q58 47 63 48" stroke={monochrome ? 'none' : '#AB8C4A'} strokeWidth=".8" strokeLinecap="round" />
      <path d="M50 40V56" stroke={navy} strokeWidth="1" />
      {/* Three arch bridge above engraved water. */}
      <path d="M32 64H68V68H65V77H60V72C60 68 54 68 54 72V77H46V72C46 68 40 68 40 72V77H35V68H32Z" fill={gold} />
      <path d="M34 60V64M40 60V64M46 60V64M54 60V64M60 60V64M66 60V64M33 61H67" stroke={gold} strokeWidth="1.5" />
      <path d="M37 80Q41 78 45 80T53 80T61 80M42 84Q46 82 50 84T58 84" stroke={gold} strokeWidth="1" strokeLinecap="round" />
      {/* Folded scroll, kept free of tiny lettering for legibility. */}
      <path d="M12 94L24 92L22 101L14 105L16 99Z M88 94L76 92L78 101L86 105L84 99Z" fill={gold} />
      <path d="M22 93Q50 102 78 93L76 103Q50 112 24 103Z" fill={gold} stroke={ivory} strokeWidth=".6" />
      <path d="M31 99Q50 104 69 99" stroke={monochrome ? 'none' : '#684B20'} strokeWidth=".7" />
      <circle cx="50" cy="103" r="1.2" fill={navy} />
    </svg>
  );
};
