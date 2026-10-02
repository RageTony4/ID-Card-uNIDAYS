import React, { useMemo } from 'react';
import { getQRCodeSvgData, getValidSchoolUrl } from '../lib/barcodeUtils';

interface ScannableQRCodeProps {
  value?: string;
  website?: string;
  schoolName?: string;
  className?: string;
  size?: number | string;
  showLabel?: boolean;
  labelText?: string;
  paddingClass?: string;
  bgWhite?: boolean;
}

export const ScannableQRCode: React.FC<ScannableQRCodeProps> = ({
  value,
  website,
  schoolName,
  className = 'w-8 h-8',
  size,
  showLabel = false,
  labelText = 'SCAN TO VERIFY',
  paddingClass = 'p-0.5',
  bgWhite = true
}) => {
  const targetUrl = useMemo(() => {
    if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
      return value;
    }
    return getValidSchoolUrl(website || value, schoolName);
  }, [value, website, schoolName]);

  const { path, viewBoxSize } = useMemo(() => {
    return getQRCodeSvgData(targetUrl, 2);
  }, [targetUrl]);

  const styleObj: React.CSSProperties = {};
  if (typeof size === 'number') {
    styleObj.width = `${size}px`;
    styleObj.height = `${size}px`;
  } else if (typeof size === 'string') {
    styleObj.width = size;
    styleObj.height = size;
  }

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Scan with your phone camera or click to open: ${targetUrl}`}
      className={`inline-flex flex-col items-center justify-center select-none group cursor-pointer transition-transform hover:opacity-95 ${bgWhite ? 'bg-white' : ''} ${paddingClass} rounded-[2px] shadow-sm flex-shrink-0`}
      onClick={(e) => {
        // Prevent accidental card-level click events
        e.stopPropagation();
      }}
    >
      <div className={className} style={styleObj}>
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="w-full h-full block"
          style={{ shapeRendering: 'crispEdges' }}
          role="img"
          aria-label={`Official QR Code for ${targetUrl}`}
        >
          <rect width={viewBoxSize} height={viewBoxSize} fill="#FFFFFF" />
          <path d={path} fill="#000000" />
        </svg>
      </div>
      {showLabel && (
        <span className="text-[4px] font-black text-neutral-800 tracking-tight uppercase leading-none mt-0.5 whitespace-nowrap">
          {labelText}
        </span>
      )}
    </a>
  );
};

export default ScannableQRCode;
