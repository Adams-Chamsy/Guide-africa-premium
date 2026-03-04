import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const QUICK_REPLIES = [
  'Recommandez-moi un restaurant',
  'Quel h\u00f4tel choisir ?',
  'Comment r\u00e9server ?',
  'Quels \u00e9v\u00e9nements \u00e0 venir ?',
];

const BOT_RESPONSES = {
  default: 'Merci pour votre message ! Notre \u00e9quipe de concierges vous r\u00e9pondra bient\u00f4t. En attendant, explorez nos restaurants et h\u00f4tels d\'exception.',
  restaurant: 'Pour des recommandations personnalis\u00e9es, consultez notre section Classements ou utilisez le Comparateur. Nos restaurants \u00e9toil\u00e9s offrent une exp\u00e9rience culinaire unique !',
  hotel: 'D\u00e9couvrez nos h\u00f4tels de prestige dans la section H\u00f4tels. Utilisez les filtres pour trouver l\'\u00e9tablissement parfait pour votre s\u00e9jour.',
  reserver: 'Pour r\u00e9server, rendez-vous sur la page du restaurant ou de l\'h\u00f4tel de votre choix et cliquez sur "R\u00e9server". Vous recevrez une confirmation par email.',
  event: 'Consultez notre page \u00c9v\u00e9nements pour d\u00e9couvrir les d\u00eeners exclusifs, masterclass et d\u00e9gustations \u00e0 venir \u00e0 travers l\'Afrique.',
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Bienvenue chez Guide Africa ! Comment puis-je vous aider \u00e0 trouver l\'exp\u00e9rience parfaite ?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('restaurant') || lower.includes('manger') || lower.includes('cuisine')) return BOT_RESPONSES.restaurant;
    if (lower.includes('hotel') || lower.includes('h\u00f4tel') || lower.includes('dormir') || lower.includes('s\u00e9jour')) return BOT_RESPONSES.hotel;
    if (lower.includes('r\u00e9serv') || lower.includes('book')) return BOT_RESPONSES.reserver;
    if (lower.includes('\u00e9v\u00e9nement') || lower.includes('event') || lower.includes('masterclass')) return BOT_RESPONSES.event;
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
        <div className="chat-panel" role="dialog" aria-label="Chat concierge">
          <div className="chat-header">
            <div>
              <h3>Concierge Guide Africa</h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--ivory-muted)' }}>En ligne</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
              style={{ background: 'none', border: 'none', color: 'var(--ivory-muted)', cursor: 'pointer' }}
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="chat-messages" role="log" aria-live="polite">
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
              aria-label="Votre message"
            />
            <button type="submit" disabled={!input.trim()} aria-label="Envoyer">
              <FiSend size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
