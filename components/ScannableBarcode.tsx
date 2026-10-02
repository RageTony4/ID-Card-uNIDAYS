import React, { useMemo } from 'react';
import { getCode128SvgData } from '../lib/barcodeUtils';

interface ScannableBarcodeProps {
  value: string;
  className?: string;
  fill?: string;
  showValue?: boolean;
  valueClassName?: string;
  height?: number;
}

export const ScannableBarcode: React.FC<ScannableBarcodeProps> = ({
  value,
  className = 'h-4 w-36',
  fill = '#000000',
  showValue = true,
  valueClassName = 'font-mono text-[6px] tracking-widest text-black font-semibold mt-0.5',
  height = 20
}) => {
  const { bars, totalWidth } = useMemo(() => {
    return getCode128SvgData(value);
  }, [value]);

  return (
    <div className="flex flex-col items-start select-none">
      <svg
        className={className}
        viewBox={`0 0 ${totalWidth} ${height}`}
        preserveAspectRatio="none"
        fill="currentColor"
        style={{ shapeRendering: 'crispEdges' }}
        role="img"
        aria-label={`Barcode ${value}`}
      >
        {bars.map((b, idx) => (
          <rect
            key={idx}
            x={b.x}
            y={0}
            width={b.width}
            height={height}
            fill={fill}
          />
        ))}
      </svg>
      {showValue && (
        <span className={valueClassName}>
          {value}
        </span>
      )}
    </div>
  );
};

export default ScannableBarcode;
