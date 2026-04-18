import React from 'react';

interface QuickActionsProps {
  onAction: (actionId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    { id: 'route', label: 'Fastest\nRoute', icon: '⚡', color: 'var(--primary)' },
    { id: 'crowds', label: 'Avoid\nCrowds', icon: '👥', color: 'var(--secondary)' },
    { id: 'wait', label: 'Check Wait\nTimes', icon: '🕒', color: 'var(--success-green)' },
    { id: 'food', label: 'Find\nFood', icon: '🍔', color: 'var(--accent-pink)' },
  ];

  return (
    <div className="quick-actions-grid">
      {actions.map((action) => (
        <button
          key={action.id}
          className="action-card glass"
          onClick={() => onAction(action.id)}
          style={{ '--icon-color': action.color } as React.CSSProperties}
        >
          <div className="icon-box">
            <span className="icon">{action.icon}</span>
          </div>
          <span className="label">{action.label}</span>
        </button>
      ))}

      <style jsx>{`
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 10px 16px;
        }

        .action-card {
          aspect-ratio: 1 / 1.35;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
          padding: 8px;
        }

        .action-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--icon-color);
          box-shadow: 0 8px 15px -10px var(--icon-color);
        }

        .icon-box {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          border: 1px solid var(--icon-color);
          box-shadow: inset 0 0 10px var(--icon-color);
          color: var(--icon-color);
        }

        .label {
          font-size: 9px;
          font-weight: 700;
          text-align: center;
          white-space: pre-line;
          line-height: 1.2;
          opacity: 0.9;
          letter-spacing: 0.2px;
        }

        @media (max-width: 400px) {
          .quick-actions-grid {
            gap: 6px;
          }
          .action-card {
            padding: 6px;
            border-radius: 14px;
          }
        }
      `}</style>
    </div>
  );
};

