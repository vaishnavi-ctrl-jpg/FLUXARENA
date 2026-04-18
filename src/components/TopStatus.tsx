import React from 'react';

interface TopStatusProps {
  density: string;
  temperature?: string;
  suggestedAction?: string;
}

export const TopStatus: React.FC<TopStatusProps> = ({ 
  density = 'Moderate', 
  temperature = '22°C',
  suggestedAction = 'Move in 2 mins'
}) => {
  return (
    <div className="top-status">
      {/* Current Zone Status */}
      <div className="status-pill glass">
        <div className="status-section">
          <span className="label">Current Zone:</span>
          <div className="value-group">
            <span className={`value ${density.toLowerCase()}`}>{density}</span>
            <span className="dot"></span>
            <span className="temp">{temperature}</span>
          </div>
        </div>
      </div>

      {/* Suggested Action Status */}
      <div className="status-pill glass action-pill">
        <div className="status-section">
          <span className="label">Suggested Action:</span>
          <span className="action-value">{suggestedAction}</span>
        </div>
      </div>

      <style jsx>{`
        .top-status {
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          gap: 10px;
          margin-top: 10px;
        }

        .status-pill {
          flex: 1;
          padding: 12px 14px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .label {
          font-size: 10px;
          opacity: 0.6;
          font-weight: 500;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 4px;
        }

        .value-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .value {
          font-size: 13px;
          font-weight: 700;
        }

        .value.moderate { color: var(--moderate-yellow); }
        .value.high { color: var(--alert-red); }
        .value.low { color: var(--success-green); }

        .dot {
          width: 4px;
          height: 4px;
          background: var(--success-green);
          border-radius: 50%;
        }

        .temp {
          font-size: 13px;
          font-weight: 600;
          opacity: 0.9;
        }

        .action-pill {
          background: rgba(0, 243, 255, 0.05);
          border: 1px solid rgba(0, 243, 255, 0.15);
        }

        .action-value {
          font-size: 13px;
          font-weight: 700;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
};
