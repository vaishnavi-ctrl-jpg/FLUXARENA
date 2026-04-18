import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I am your FluxArena AI. How can I help you navigate the stadium today?' }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', text: 'Analyzing metadata... Recommended: Use South Gate for 40% faster entry.' }]);
    }, 1000);
  };

  const toggleMic = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000); // Auto-stop simulation
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className={`chat-assistant-sheet glass ${isOpen ? 'open' : ''}`}>
        <div className="sheet-handle" onClick={onClose}></div>
        
        <div className="chat-header">
          <div className="header-logo">
            <Image src="/logo-v27.png" alt="" width={22} height={22} quality={100} />
            <span className="gradient-text-cyan">AI ASSISTANT</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="messages-list">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-line ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="ai-eye-wrapper">
                  <Image src="/logo-v27.png" alt="" width={20} height={20} quality={100} />
                </div>
              )}
              <div className={`bubble glass ${msg.role}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="input-area">
          <div className={`input-pill glass-pill ${isRecording ? 'recording' : ''}`}>
            <input
              type="text"
              placeholder={isRecording ? "Listening..." : "Ask FluxArena..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isRecording}
            />
            <button className={`mic-btn ${isRecording ? 'pulse-red' : ''}`} onClick={toggleMic}>
              {isRecording ? '🔴' : '🎙️'}
            </button>
          </div>
        </div>
      </div>

      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>

      <style jsx>{`
        .chat-assistant-sheet {
          position: fixed;
          bottom: -100%;
          left: 50%;
          transform: translateX(-50%);
          width: 375px; 
          height: 60vh;
          z-index: 1000;
          transition: bottom 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          border-radius: 32px 32px 0 0;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.8);
          border-top: 1px solid var(--glass-border);
        }

        @media (max-width: 400px) {
          .chat-assistant-sheet {
            width: 100%;
          }
        }

        .chat-assistant-sheet.open {
          bottom: 0px;
        }

        .sheet-handle {
          width: 40px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          margin: 0 auto 15px;
          cursor: pointer;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-logo span {
          font-weight: 900;
          letter-spacing: 1.5px;
          font-size: 14px;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          opacity: 0.5;
        }

        .messages-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 10px 0;
        }

        .chat-line {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          max-width: 90%;
        }

        .chat-line.user {
          align-self: flex-end;
          justify-content: flex-end;
        }

        .ai-eye-wrapper {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          mix-blend-mode: screen;
        }

        .bubble {
          padding: 12px 18px;
          border-radius: 20px;
          font-size: 14px;
          line-height: 1.5;
        }

        .bubble.assistant {
          border-top-left-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .bubble.user {
          border-top-right-radius: 4px;
          background: linear-gradient(135deg, #0066ff, #00f3ff);
          color: white;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(0, 102, 255, 0.3);
        }

        .input-area {
          padding: 10px 0 20px;
        }

        .input-pill {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          gap: 10px;
          border-radius: 100px;
        }

        .input-pill.recording {
          border-color: #ff4d4d;
          box-shadow: 0 0 15px rgba(255, 77, 77, 0.3);
        }

        input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-size: 15px;
          outline: none;
        }

        .mic-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }

        .pulse-red {
          animation: pulseRed 1s infinite alternate;
        }

        @keyframes pulseRed {
          from { transform: scale(1); opacity: 0.6; }
          to { transform: scale(1.2); opacity: 1; text-shadow: 0 0 10px #ff4d4d; }
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 900;
        }

        .overlay.show {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};


