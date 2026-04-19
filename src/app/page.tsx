'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MobileFrame } from '@/components/MobileFrame';
import { StadiumMap } from '@/components/StadiumMap';
import { QuickActions } from '@/components/QuickActions';
import { ChatAssistant } from '@/components/ChatAssistant';
import { TopStatus } from '@/components/TopStatus';

export default function Home() {
  const [densityData, setDensityData] = useState<Record<string, number>>({});
  const [showRoute, setShowRoute] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [mapMode, setMapMode] = useState<'normal' | 'avoid' | 'food'>('normal');
  const [status, setStatus] = useState({
    density: 'Moderate',
    temp: '22°C',
    action: 'Move in 2 mins'
  });

  const simulateSurge = () => {
    const newData: Record<string, number> = {};
    for (let i = 1; i <= 20; i++) {
      newData[`zone-${i}`] = 0.1 + Math.random() * 0.8;
    }
    setDensityData(newData);
    
    const avgDensity = Object.values(newData).reduce((a, b) => a + b, 0) / 20;
    if (avgDensity > 0.6) {
      setStatus({ density: 'High', temp: '25°C', action: 'Avoid Zone 4' });
    } else if (avgDensity < 0.3) {
      setStatus({ density: 'Low', temp: '20°C', action: 'Enter Gate A' });
    } else {
      setStatus({ density: 'Moderate', temp: '22°C', action: 'Move in 2 mins' });
    }
  };

  const handleAction = (actionId: string) => {
    if (actionId === 'route') {
      setShowRoute(true);
      setMapMode('normal');
      setTimeout(() => setShowRoute(false), 5000);
    } else if (actionId === 'crowds') {
      setMapMode('avoid');
      setTimeout(() => setMapMode('normal'), 6000);
    } else if (actionId === 'food') {
      setMapMode('food');
      setTimeout(() => setMapMode('normal'), 6000);
    } else if (actionId === 'wait') {
      setIsAiOpen(true);
    }
  };

  return (
    <MobileFrame>
      <div className="dashboard-v3">
        {/* Row 1: Grid Header */}
        <header className="grid-header">
          <div className="branding-container">
            <Image src="/logo-v27.png" alt="" width={40} height={40} className="logo-eye" priority quality={100} />
            <Image src="/text-v25.png" alt="FluxArena" width={170} height={170} className="logo-text" priority quality={100} />
          </div>
          <button className="simulate-btn glass" onClick={simulateSurge}>
            Simulate Surge
          </button>
        </header>

        {/* Row 2: Status */}
        <div className="status-row">
          <TopStatus 
            density={status.density} 
            temperature={status.temp} 
            suggestedAction={status.action} 
          />
        </div>

        {/* Row 3: Main View (Map) */}
        <main className="view-row">
          <StadiumMap 
            densityData={densityData} 
            showRoute={showRoute} 
            mode={mapMode}
          />
        </main>

        {/* Row 4: Actions */}
        <div className="actions-row">
          <QuickActions onAction={handleAction} />
        </div>

        {/* Row 5: Footer */}
        <footer className="footer-row">
          <button className="ai-footer-btn glass" onClick={() => setIsAiOpen(true)}>
            <div className="btn-content">
              <Image src="/logo-v27.png" alt="" width={24} height={24} className="pulse-slow" quality={100} />
              <span>Open AI Assistant</span>
            </div>
          </button>
        </footer>

        {/* Overlays */}
        <ChatAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} densityData={densityData} />
      </div>

      <style jsx>{`
        .dashboard-v3 {
          display: grid;
          grid-template-rows: 60px auto 1fr auto 80px;
          height: 100%;
          width: 100%;
          background: var(--background);
          overflow: hidden;
          position: relative;
        }

        .grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .branding-container {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 100%;
        }

        .logo-eye {
          height: 40px;
          width: 40px;
          object-fit: contain;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 10px var(--primary-glow));
        }

        .logo-text {
          height: 32px;
          width: auto;
          object-fit: contain;
          mix-blend-mode: screen;
          margin-left: -4px;
        }

        .simulate-btn {
          font-size: 10px;
          padding: 6px 12px;
          border-radius: 100px;
          color: white;
          font-weight: 700;
          border: 1px solid rgba(255, 77, 77, 0.4);
          background: rgba(255, 77, 77, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .status-row {
          padding-top: 5px;
        }

        .view-row {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          overflow: hidden;
        }

        .actions-row {
          padding: 0 5px;
          margin-top: -10px;
          z-index: 10;
        }

        .footer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px 10px;
        }

        .ai-footer-btn {
          width: 100%;
          border-radius: 100px;
          border: 1px solid var(--glass-border);
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ai-footer-btn:hover {
          border-color: var(--primary);
          background: rgba(0, 243, 255, 0.05);
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .ai-footer-btn span {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: white;
        }

        .pulse-slow {
          animation: pulseSlow 3s infinite ease-in-out;
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 5px var(--primary-glow)); }
        }
      `}</style>
    </MobileFrame>
  );
}
