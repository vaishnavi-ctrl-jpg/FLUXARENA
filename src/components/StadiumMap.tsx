import React from 'react';

interface StadiumMapProps {
  densityData?: Record<string, number>;
  showRoute?: boolean;
  mode?: 'normal' | 'avoid' | 'food';
}

export const StadiumMap: React.FC<StadiumMapProps> = ({ 
  densityData = {}, 
  showRoute = false,
  mode = 'normal'
}) => {
  const getColor = (density: number, zoneId: number) => {
    if (mode === 'avoid' && density > 0.4) return 'rgba(255, 77, 77, 0.1)'; // Dimmed
    if (mode === 'food' && ![5, 12, 18].includes(zoneId)) return 'rgba(255, 255, 255, 0.05)'; // Dimmed non-food
    if (mode === 'food' && [5, 12, 18].includes(zoneId)) return '#ff00d9'; // Neon Pink for Food

    if (density > 0.7) return '#ff4d4d'; // Alert Red
    if (density > 0.4) return '#ffcc00'; // Moderate Yellow
    return '#39ff14'; // Success Green
  };

  const renderRing = (radius: number, count: number, startId: number) => {
    const angleStep = 360 / count;
    const paths = [];
    const innerRadius = radius - 25;

    for (let i = 0; i < count; i++) {
      const zoneId = startId + i;
      const startAngle = i * angleStep + (angleStep * 0.05);
      const endAngle = (i + 1) * angleStep - (angleStep * 0.05);
      const density = densityData[`zone-${zoneId}`] || 0.2 + (Math.random() * 0.6);
      
      const x1 = 150 + radius * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 150 + radius * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 150 + radius * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 150 + radius * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const x3 = 150 + innerRadius * Math.cos((endAngle - 90) * Math.PI / 180);
      const y3 = 150 + innerRadius * Math.sin((endAngle - 90) * Math.PI / 180);
      const x4 = 150 + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180);
      const y4 = 150 + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180);

      const d = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
      
      const color = getColor(density, zoneId);
      const isHighlighted = (mode === 'food' && [5, 12, 18].includes(zoneId)) || (mode === 'avoid' && density <= 0.4);

      paths.push(
        <g key={`zone-${zoneId}`}>
          <path
            d={d}
            fill={color}
            fillOpacity={isHighlighted ? 0.8 : 0.4}
            stroke={isHighlighted ? 'white' : 'rgba(255,255,255,0.05)'}
            strokeWidth={isHighlighted ? 1 : 0.5}
            className={`segment ${isHighlighted ? 'highlighted' : ''}`}
          >
            <animate
              attributeName="fill-opacity"
              values={isHighlighted ? "0.6;0.9;0.6" : "0.3;0.6;0.3"}
              dur={`${3 + Math.random() * 3}s`}
              repeatCount="indefinite"
            />
          </path>
          {mode === 'food' && [5, 12, 18].includes(zoneId) && (
            <text
              x={150 + (radius - 12) * Math.cos((startAngle + angleStep/2 - 90) * Math.PI / 180)}
              y={150 + (radius - 12) * Math.sin((startAngle + angleStep/2 - 90) * Math.PI / 180)}
              fontSize="8"
              textAnchor="middle"
              fill="white"
            >🍔</text>
          )}
        </g>
      );
    }
    return paths;
  };

  return (
    <div className="stadium-map-container">
      <svg viewBox="0 0 300 300" className="stadium-svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Decor Rings */}
        <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 4" />

        {/* Stadium Pitch Center */}
        <g className="pitch">
          <rect x="125" y="115" width="50" height="70" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="150" cy="150" r="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="125" y1="150" x2="175" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        {/* Heatmap Rings */}
        {renderRing(115, 12, 1)}
        {renderRing(85, 8, 13)}

        {/* Scanning Line */}
        <line x1="30" y1="150" x2="270" y2="150" stroke="#00f3ff" strokeWidth="1" strokeOpacity="0.4" className="scan-line" />

        {/* Suggested Route Path */}
        {showRoute && (
          <path
            d="M 210 50 Q 250 100 240 180 L 230 170 M 240 180 L 250 170"
            fill="none"
            stroke="#00f3ff"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
            className="route-path"
          />
        )}
      </svg>

      <style jsx>{`
        .stadium-map-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 280px;
        }

        .stadium-svg {
          width: 100%;
          max-width: 300px;
          height: auto;
          overflow: visible;
        }

        .segment {
          transition: all 0.8s ease;
        }

        .segment.highlighted {
          filter: drop-shadow(0 0 5px white);
        }

        .scan-line {
          animation: scan 6s linear infinite;
          transform-origin: center;
        }

        @keyframes scan {
          0% { transform: translateY(-120px); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(120px); opacity: 0; }
        }

        .route-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawRoute 2s forwards cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes drawRoute {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};


