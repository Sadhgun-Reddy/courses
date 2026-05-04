import React, { useState, useEffect, useRef } from 'react';
import { URLS } from '../Url';
import './ChatbotWidget.css';

const generateSessionId = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const id = `t${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return id;
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const messagesEndRef = useRef(null);

  // Initialize session and load history
  useEffect(() => {
    let currentSessionId = localStorage.getItem('chatbot_session_id_public');
    if (!currentSessionId) {
      currentSessionId = generateSessionId();
      localStorage.setItem('chatbot_session_id_public', currentSessionId);
    }
    setSessionId(currentSessionId);

    const savedMessages = localStorage.getItem('chatbot_messages_public');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Failed to parse chat messages", e);
      }
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot_messages_public', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Start chat if no messages exist
  useEffect(() => {
    if (isOpen && messages.length === 0 && sessionId && !loading) {
      handleStartChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, messages.length, sessionId]);

  const handleStartChat = async () => {
    setLoading(true);
    try {
      const response = await fetch(URLS.ChatbotStartChat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      
      if (data.success && data.data) {
        setMessages([
          {
            sender: 'bot',
            text: data.data.message,
            options: data.data.options || [],
          }
        ]);
      }
    } catch (error) {
      console.error("Error starting chat", error);
      setMessages([
        {
          sender: 'bot',
          text: "Sorry, I am currently unavailable. Please try again later.",
          options: [],
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOption = async (option) => {
    // Add user message
    const newMessages = [
      ...messages,
      { sender: 'user', text: option }
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch(URLS.ChatbotSendMessage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          userInput: option
        }),
      });
      const data = await response.json();

      if (data.success && data.data) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: data.data.message,
            options: data.data.options || [],
          }
        ]);
      }
    } catch (error) {
      console.error("Error sending message", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "Sorry, I couldn't process your response. Please try again.",
          options: [],
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    localStorage.removeItem('chatbot_session_id_public');
    localStorage.removeItem('chatbot_messages_public');
    setMessages([]);
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    localStorage.setItem('chatbot_session_id_public', newSessionId);
  };

  return (
    <div className="chatbot-widget-container">
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          className="chatbot-fab" 
          onClick={() => setIsOpen(true)}
          aria-label="chat"
        >
          <svg className="chatbot-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <svg className="chatbot-robot-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7h5a2 2 0 0 1 2 2v2h2v4h-2v4c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2v-4H2v-4h2V9c0-1.1.9-2 2-2h5V5.73A2 2 0 0 1 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
              </svg>
              VoltEdz Assistant
            </div>
            <div className="chatbot-header-actions" style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="chatbot-close-btn" 
                onClick={handleNewChat}
                title="Start New Chat"
              >
                <svg className="chatbot-close-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </button>
              <button 
                className="chatbot-close-btn" 
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <svg className="chatbot-close-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => {
              const isBot = msg.sender === 'bot';
              // Only show options on the last message from the bot
              const isLastMessage = idx === messages.length - 1;
              const showOptions = isBot && msg.options && msg.options.length > 0 && isLastMessage && !loading;

              return (
                <div key={idx} className={`chatbot-message-row ${isBot ? 'bot-row' : 'user-row'}`}>
                  <div className={`chatbot-bubble-wrapper ${isBot ? 'bot-wrapper' : 'user-wrapper'}`}>
                    {isBot && (
                      <div className="chatbot-avatar">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7h5a2 2 0 0 1 2 2v2h2v4h-2v4c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2v-4H2v-4h2V9c0-1.1.9-2 2-2h5V5.73A2 2 0 0 1 12 2z"/>
                        </svg>
                      </div>
                    )}
                    <div className={`chatbot-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
                      {msg.text}
                    </div>
                  </div>

                  {/* Options Area (Only on last bot message) */}
                  {showOptions && (
                    <div className="chatbot-options">
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          className="chatbot-option-btn"
                          onClick={() => handleSendOption(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="chatbot-message-row bot-row">
                <div className="chatbot-bubble-wrapper bot-wrapper">
                  <div className="chatbot-avatar">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7h5a2 2 0 0 1 2 2v2h2v4h-2v4c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2v-4H2v-4h2V9c0-1.1.9-2 2-2h5V5.73A2 2 0 0 1 12 2z"/>
                    </svg>
                  </div>
                  <div className="chatbot-bubble bot-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
