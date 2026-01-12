import { useEffect, useState } from 'react';

interface TourHighlightProps {
  elementId: string | null;
  isActive: boolean;
}

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function TourHighlight({ elementId, isActive }: TourHighlightProps) {
  const [rect, setRect] = useState<HighlightRect | null>(null);

  useEffect(() => {
    if (!elementId || !isActive) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      const element = document.getElementById(elementId);
      if (element) {
        const domRect = element.getBoundingClientRect();
        setRect({
          top: domRect.top + window.scrollY,
          left: domRect.left + window.scrollX,
          width: domRect.width,
          height: domRect.height,
        });
      }
    };

    updateRect();

    const handleScroll = () => updateRect();
    const handleResize = () => updateRect();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [elementId, isActive]);

  if (!rect || !isActive) return null;

  return (
    <div
      className="absolute z-40 pointer-events-none transition-all duration-700 ease-out"
      style={{
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
      }}
    >
      <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 shadow-lg shadow-cyan-400/30 animate-highlight-pulse" />
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-teal-500/10 blur-sm" />
    </div>
  );
}
