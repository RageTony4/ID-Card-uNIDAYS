import React, { useMemo } from 'react';
import { encodeCode128B, getSchoolWebsiteUrl } from '../lib/barcodeUtils';

interface RealisticBarcodeProps {
  value?: string;
  universityName?: string;
  customWebsite?: string;
  className?: string;
  fill?: string;
  background?: string;
  showQuietZone?: boolean;
  showLabel?: boolean;
  labelOverride?: string;
  height?: number;
  interactive?: boolean;
  boxStyle?: 'badge' | 'minimal' | 'flat';
}

export const RealisticBarcode: React.FC<RealisticBarcodeProps> = ({
  value,
  universityName,
  customWebsite,
  className = "w-full h-5",
  fill = "#000000",
  background,
  showQuietZone = true,
  showLabel = false,
  labelOverride,
  height = 28,
  interactive = true,
  boxStyle = 'flat'
}) => {
  // Resolve target school website URL
  const targetUrl = useMemo(() => {
    if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
      return value;
    }
    return getSchoolWebsiteUrl(universityName, customWebsite || value);
  }, [value, universityName, customWebsite]);

  // Encode URL into genuine ISO/IEC 15417 Code 128
  const { bars, totalWidth } = useMemo(() => {
    return encodeCode128B(targetUrl, showQuietZone ? 10 : 2);
  }, [targetUrl, showQuietZone]);

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
      console.warn('Could not open school website:', err);
    }
  };

  const svgContent = (
    <svg
      viewBox={`0 0 ${totalWidth} ${height}`}
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {background && (
        <rect
          x="0"
          y="0"
          width={totalWidth}
          height={height}
          fill={background}
          rx={boxStyle === 'badge' ? 2 : 0}
        />
      )}
      {bars.map((bar, idx) => (
        <rect
          key={idx}
          x={bar.x}
          y="0"
          width={bar.width}
          height={height}
          fill={fill}
        />
      ))}
    </svg>
  );

  const containerTooltip = `Official Scannable Code 128 • ${targetUrl} (Scan with phone or click to open)`;

  if (boxStyle === 'badge') {
    return (
      <div 
        onClick={handleClick}
        title={containerTooltip}
        className={`bg-white rounded-[3px] p-1 px-1.5 shadow-xs border border-neutral-300/80 flex flex-col items-center justify-center transition-all ${
          interactive ? 'cursor-pointer hover:ring-1 hover:ring-[#BF5700]/50 hover:shadow-sm' : ''
        }`}
      >
        <div className="w-full flex items-center justify-center overflow-hidden">
          {svgContent}
        </div>
        {showLabel && (
          <div className="w-full flex items-center justify-between text-[5.5px] font-mono font-bold text-neutral-800 tracking-wider mt-0.5 px-0.5 leading-none">
            <span className="truncate">{labelOverride || displayDomain}</span>
            <span className="text-[5px] text-neutral-500 uppercase font-sans">SCAN</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      title={containerTooltip}
      className={`relative flex flex-col items-center ${interactive ? 'cursor-pointer group' : ''}`}
    >
      <div className="w-full flex items-center justify-center overflow-hidden">
        {svgContent}
      </div>
      {showLabel && (
        <span className="font-mono text-[5.5px] tracking-wider text-inherit opacity-80 mt-0.5 leading-none block truncate max-w-full">
          {labelOverride || displayDomain}
        </span>
      )}
    </div>
  );
};

export default RealisticBarcode;
