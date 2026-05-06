import { useState } from 'react';

interface GlueUpWidgetProps {
  src: string;
  title: string;
  minHeight?: string;
  className?: string;
}

export const GlueUpWidget = ({ src, title, minHeight = '700px', className = '' }: GlueUpWidgetProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full ${className}`} style={{ minHeight }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl">
          <div className="w-10 h-10 border-4 border-lbbc-green/20 border-t-lbbc-green rounded-full animate-spin" />
        </div>
      )}
      <iframe
        className="eb-widget w-full border-0 block"
        data-auto-adjust-height="true"
        data-auto-adjust-width="false"
        style={{
          margin: 0,
          padding: 0,
          border: 0,
          outline: 0,
          background: 'transparent',
          width: '100%',
          minHeight,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        src={src}
        title={title}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
