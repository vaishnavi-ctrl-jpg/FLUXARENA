import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="phone-wrapper">
      <div className="phone-container">
        {/* Physical Buttons */}
        <div className="button-silent"></div>
        <div className="button-vol-up"></div>
        <div className="button-vol-down"></div>
        <div className="button-power"></div>

        {/* Main Frame */}
        <div className="iphone-frame">
          <div className="inner-bezel">
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="camera"></div>
            </div>

            <div className="screen">
              {/* Status Bar */}
              <div className="status-bar">
                <span className="time">9:41</span>
                <div className="status-right">
                  <div className="icon-signal"></div>
                  <div className="icon-wifi"></div>
                  <div className="icon-battery"></div>
                </div>
              </div>

              <main className="app-content">
                {children}
              </main>

              {/* Home Indicator */}
              <div className="home-indicator"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #000;
        }

        .phone-container {
          position: relative;
          height: 95vh;
          aspect-ratio: 1 / 2.05;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .iphone-frame {
          width: 100%;
          height: 100%;
          background: #1c1c1e;
          border-radius: 54px;
          padding: 12px;
          position: relative;
          box-shadow: 
            0 0 0 2px #3a3a3c,
            0 20px 50px rgba(0,0,0,0.9),
            inset 0 0 10px rgba(255,255,255,0.1);
          z-index: 10;
        }

        .inner-bezel {
          background: black;
          width: 100%;
          height: 100%;
          border-radius: 42px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 4px rgba(255,255,255,0.2);
        }

        .dynamic-island {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 25%;
          height: 3.2%;
          background: black;
          border-radius: 20px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 3%;
        }

        .camera {
          width: 8px;
          height: 8px;
          background: #1a1a1a;
          border-radius: 50%;
          box-shadow: inset 0 0 2px rgba(255,255,255,0.2);
        }

        .screen {
          width: 100%;
          height: 100%;
          border-radius: 36px;
          background: var(--background);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .status-bar {
          height: 44px;
          padding: 14px 28px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
          z-index: 50;
        }

        .status-right {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .icon-signal, .icon-wifi, .icon-battery {
          width: 16px;
          height: 10px;
          background: white;
          border-radius: 2px;
          opacity: 0.9;
        }

        .app-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
        }

        .home-indicator {
          width: 32%;
          height: 5px;
          background: rgba(255,255,255,0.2);
          border-radius: 100px;
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
        }

        /* Physical Buttons Styling */
        .button-silent, .button-vol-up, .button-vol-down, .button-power {
          position: absolute;
          background: #3a3a3c;
          border-radius: 2px;
          width: 3px;
          z-index: 1;
        }

        .button-silent { height: 3.3%; left: -3px; top: 18%; }
        .button-vol-up { height: 6.4%; left: -3px; top: 24.3%; }
        .button-vol-down { height: 6.4%; left: -3px; top: 32%; }
        .button-power { height: 10.2%; right: -3px; top: 26.9%; }

        @media (max-width: 500px) {
          .phone-container {
            width: 100vw;
            height: 100vh;
            max-height: none;
            aspect-ratio: auto;
          }
          .iphone-frame {
            border-radius: 0;
            padding: 0;
            background: black;
          }
          .inner-bezel {
            border-radius: 0;
          }
          .screen {
            border-radius: 0;
          }
          .button-silent, .button-vol-up, .button-vol-down, .button-power {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

