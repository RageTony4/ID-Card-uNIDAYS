import React, { useLayoutEffect, useRef } from 'react';

/** Fit the complete text to the available width, including loaded font metrics. */
export const SingleLineText = ({ children, className = '', fontSize = 7.5 }: {
  children: string;
  className?: string;
  fontSize?: number;
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

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
      if (naturalWidth > availableWidth) {
        container.style.fontSize = `${fontSize * availableWidth / naturalWidth}px`;
      }
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    document.fonts.ready.then(fit);
    document.fonts.addEventListener('loadingdone', fit);
    return () => {
      active = false;
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', fit);
    };
  }, [children, fontSize]);

  return (
    <p ref={containerRef} className={`w-full min-w-0 whitespace-nowrap ${className}`} style={{ fontSize }}>
      <span ref={textRef} className="inline-block whitespace-nowrap">{children}</span>
    </p>
  );
};
