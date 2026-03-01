import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const QUICK_REPLIES = [
  'Recommandez-moi un restaurant',
  'Quel hôtel choisir ?',
  'Comment réserver ?',
  'Quels événements à venir ?',
];

const BOT_RESPONSES = {
  default: 'Merci pour votre message ! Notre équipe de concierges vous répondra bientôt. En attendant, explorez nos restaurants et hôtels d\'exception.',
  restaurant: 'Pour des recommandations personnalisées, consultez notre section Classements ou utilisez le Comparateur. Nos restaurants étoilés offrent une expérience culinaire unique !',
  hotel: 'Découvrez nos hôtels de prestige dans la section Hôtels. Utilisez les filtres pour trouver l\'établissement parfait pour votre séjour.',
  reserver: 'Pour réserver, rendez-vous sur la page du restaurant ou de l\'hôtel de votre choix et cliquez sur "Réserver". Vous recevrez une confirmation par email.',
  event: 'Consultez notre page Événements pour découvrir les dîners exclusifs, masterclass et dégustations à venir à travers l\'Afrique.',
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Bienvenue chez Guide Africa ! Comment puis-je vous aider à trouver l\'expérience parfaite ?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('restaurant') || lower.includes('manger') || lower.includes('cuisine')) return BOT_RESPONSES.restaurant;
    if (lower.includes('hotel') || lower.includes('hôtel') || lower.includes('dormir') || lower.includes('séjour')) return BOT_RESPONSES.hotel;
    if (lower.includes('réserv') || lower.includes('book')) return BOT_RESPONSES.reserver;
    if (lower.includes('événement') || lower.includes('event') || lower.includes('masterclass')) return BOT_RESPONSES.event;
    return BOT_RESPONSES.default;
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, type: 'bot', text: getBotResponse(text) };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chat-widget-button"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le chat"
        >
          <FiMessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <h3>Concierge Guide Africa</h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--ivory-muted)' }}>En ligne</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--ivory-muted)', cursor: 'pointer' }}
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div style={{ padding: '8px 16px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {QUICK_REPLIES.map(reply => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  style={{
                    padding: '6px 12px', borderRadius: 50, fontSize: '0.75rem',
                    background: 'rgba(201, 168, 76, 0.1)', border: '1px solid rgba(201, 168, 76, 0.3)',
                    color: 'var(--gold)', cursor: 'pointer',
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Votre message..."
            />
            <button type="submit" disabled={!input.trim()}>
              <FiSend size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
