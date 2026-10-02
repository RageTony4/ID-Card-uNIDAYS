import React, { useMemo } from 'react';
import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode';
import { getSchoolWebsiteUrl } from '../lib/barcodeUtils';

export interface QRCodeGeneratorProps {
  /**
   * The website URL or text to encode. If not provided or partial,
   * will be resolved using `universityName` and `website`.
   */
  value?: string;
  universityName?: string;
  website?: string;
  size?: number | string;
  fgColor?: string;
  bgColor?: string;
  margin?: number;
  level?: QRCodeErrorCorrectionLevel;
  className?: string;
  showLabel?: boolean;
  labelOverride?: string;
  sublabel?: string;
  interactive?: boolean;
  boxStyle?: 'badge' | 'minimal' | 'flat';
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  universityName,
  website,
  size = 64,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  margin = 2,
  level = 'M',
  className = '',
  showLabel = false,
  labelOverride,
  sublabel,
  interactive = true,
  boxStyle = 'flat'
}) => {
  // Resolve target school or student website URL
  const targetUrl = useMemo(() => {
    if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
      return value;
    }
    return getSchoolWebsiteUrl(universityName, website || value);
  }, [value, universityName, website]);

  // Generate SVG path for the QR code modules
  const { path, viewBoxSize } = useMemo(() => {
    try {
      const qr = QRCode.create(targetUrl, {
        errorCorrectionLevel: (level || 'M') as QRCodeErrorCorrectionLevel
      });
      const moduleCount = qr.modules.size;
      const totalSize = moduleCount + margin * 2;
      let d = '';

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (qr.modules.get(row, col)) {
            d += `M${col + margin} ${row + margin}h1v1h-1z `;
          }
        }
      }

      return { path: d, viewBoxSize: totalSize };
    } catch (err) {
      console.error('Failed to generate QR code:', err);
      return { path: '', viewBoxSize: 33 };
    }
  }, [targetUrl, margin, level]);

  const displayDomain = useMemo(() => {
    try {
      const parsed = new URL(targetUrl);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return targetUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
    }
  }, [targetUrl]);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Could not open encoded website URL:', err);
    }
  };

  const containerTooltip = `Dynamic QR Code • ${targetUrl} (Scan with camera or click to open)`;

  const svgElement = (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      className={`object-contain block ${typeof size === 'string' ? size : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {bgColor && bgColor !== 'transparent' && (
        <rect
          x="0"
          y="0"
          width={viewBoxSize}
          height={viewBoxSize}
          fill={bgColor}
          rx={boxStyle === 'badge' ? 1.5 : 0}
        />
      )}
      <path d={path} fill={fgColor} />
    </svg>
  );

  if (boxStyle === 'badge') {
    return (
      <div
        onClick={handleClick}
        title={containerTooltip}
        className={`bg-white rounded-[4px] p-1 shadow-xs border border-neutral-300/80 flex flex-col items-center justify-center transition-all ${
          interactive ? 'cursor-pointer hover:ring-1 hover:ring-indigo-500/50 hover:shadow-sm' : ''
        } ${className}`}
      >
        <div className="flex items-center justify-center">
          {svgElement}
        </div>
        {showLabel && (
          <div className="w-full flex flex-col items-center mt-0.5 leading-none text-center">
            <span className="font-mono text-[5px] font-bold text-neutral-800 tracking-wider truncate max-w-full">
              {labelOverride || displayDomain}
            </span>
            {sublabel && (
              <span className="text-[4.5px] text-neutral-500 font-sans uppercase tracking-tight mt-0.5">
                {sublabel}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      title={containerTooltip}
      className={`relative flex flex-col items-center justify-center ${
        interactive ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-center">
        {svgElement}
      </div>
      {showLabel && (
        <div className="w-full flex flex-col items-center mt-0.5 leading-none text-center">
          <span className="font-mono text-[5.5px] font-bold tracking-wider text-inherit opacity-90 truncate max-w-full">
            {labelOverride || displayDomain}
          </span>
          {sublabel && (
            <span className="text-[4.5px] text-inherit opacity-75 font-sans uppercase tracking-tight mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
