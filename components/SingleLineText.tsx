import React, { useLayoutEffect, useRef, useState } from 'react';

/** Fit the complete text to the available width, including loaded font metrics. */
export const SingleLineText = ({
  children,
  className = '',
  fontSize = 7.5,
  minFontSize = 4.5,
}: {
  children: React.ReactNode;
  className?: string;
  fontSize?: number;
  minFontSize?: number;
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fittedSize, setFittedSize] = useState<number>(fontSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;
    let active = true;
    const fit = () => {
      if (!active || !container.clientWidth) return;
      container.style.fontSize = `${fontSize}px`;
      const naturalWidth = text.offsetWidth;
      const availableWidth = Math.max(0, container.clientWidth - 1);
      if (naturalWidth > availableWidth && naturalWidth > 0) {
        const next = Math.max(minFontSize, (fontSize * availableWidth) / naturalWidth);
        container.style.fontSize = `${next}px`;
        setFittedSize(next);
      } else {
        setFittedSize(fontSize);
      }
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
      document.fonts.addEventListener('loadingdone', fit);
    }
    return () => {
      active = false;
      observer.disconnect();
      if (document.fonts) {
        document.fonts.removeEventListener('loadingdone', fit);
      }
    };
  }, [children, fontSize, minFontSize]);

  return (
    <p
      ref={containerRef}
      className={`w-full min-w-0 whitespace-nowrap overflow-hidden ${className}`}
      style={{ fontSize: `${fittedSize}px` }}
    >
      <span ref={textRef} className="inline-block whitespace-nowrap">
        {children}
      </span>
    </p>
  );
};

