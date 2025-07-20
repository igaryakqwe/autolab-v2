'use client';

import { useEffect, useState } from 'react';

interface SvgIconProps {
  src: string;
  className?: string;
  fallback?: React.ReactNode;
}

const SvgIcon = ({ src, className, fallback }: SvgIconProps) => {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to fetch SVG: ${response.statusText}`);
        }
        const text = await response.text();
        if (!text.startsWith('<svg')) {
          throw new Error('Invalid SVG content');
        }
        setSvg(text);
      } catch (err) {
        setError(err);
        console.error(`Failed to load SVG from ${src}`, err);
      }
    };

    fetchSvg();
  }, [src]);

  if (error || !svg) {
    return fallback;
  }

  const svgWithClass = svg.replace('<svg', `<svg class="${className || ''}"`);

  return <div dangerouslySetInnerHTML={{ __html: svgWithClass }} />;
};

export default SvgIcon;
