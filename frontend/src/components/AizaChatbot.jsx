import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Bot, Send, X, Trash2, Sparkles, AlertCircle } from 'lucide-react'

// Lightweight inline markdown parser
const parseInlineMarkdown = (text) => {
  let parts = [{ type: 'text', content: text }];

  // 1. Process Bold: **text**
  const boldRegex = /\*\*(.*?)\*\*/g;
  parts = parts.flatMap(part => {
    if (part.type !== 'text') return part;
    const subParts = [];
    let lastIndex = 0;
    let match;

    boldRegex.lastIndex = 0;
    while ((match = boldRegex.exec(part.content)) !== null) {
      if (match.index > lastIndex) {
        subParts.push({ type: 'text', content: part.content.substring(lastIndex, match.index) });
      }
      subParts.push({ type: 'bold', content: match[1] });
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < part.content.length) {
      subParts.push({ type: 'text', content: part.content.substring(lastIndex) });
    }
    return subParts;
  });

  // 2. Process Inline Code: `code`
  const codeRegex = /`(.*?)`/g;
  parts = parts.flatMap(part => {
    if (part.type !== 'text') return part;
    const subParts = [];
    let lastIndex = 0;
    let match;

    codeRegex.lastIndex = 0;
    while ((match = codeRegex.exec(part.content)) !== null) {
      if (match.index > lastIndex) {
        subParts.push({ type: 'text', content: part.content.substring(lastIndex, match.index) });
      }
      subParts.push({ type: 'code', content: match[1] });
      lastIndex = codeRegex.lastIndex;
    }
    if (lastIndex < part.content.length) {
      subParts.push({ type: 'text', content: part.content.substring(lastIndex) });
    }
    return subParts;
  });

  return parts.map((part, idx) => {
    if (part.type === 'bold') {
      return <strong key={idx} className="font-semibold text-charcoal">{part.content}</strong>;
    }
    if (part.type === 'code') {
      return <code key={idx} className="px-1.5 py-0.5 rounded bg-subtle text-terra font-mono text-xs">{part.content}</code>;
    }
    return part.content;
  });
};

// Line-by-line Markdown parser for blocks, paragraphs, and lists
const parseMarkdown = (text) => {
  if (!text) return null;

  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const elements = [];
  let currentList = null;
  let currentParagraphLines = [];

  const flushParagraph = (key) => {
    if (currentParagraphLines.length > 0) {
      elements.push(
        <p key={`p-${key}`} className="mb-2 last:mb-0 leading-relaxed text-charcoal/90">
          {currentParagraphLines.map((line, idx) => (
            <span key={idx}>
              {parseInlineMarkdown(line)}
              {idx < currentParagraphLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
      currentParagraphLines = [];
    }
  };

  const flushList = (key) => {
    if (currentList) {
      const ListTag = currentList.type === 'ul' ? 'ul' : 'ol';
      const listClass = currentList.type === 'ul' 
        ? 'list-disc ml-5 mb-2 space-y-1 text-charcoal/90' 
        : 'list-decimal ml-5 mb-2 space-y-1 text-charcoal/90';

      elements.push(
        <ListTag key={`list-${key}`} className={listClass}>
          {currentList.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Bullet List Item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph(i);
      const content = line.replace(/^\s*[-*]\s+/, '');
      if (!currentList || currentList.type !== 'ul') {
        flushList(i);
        currentList = { type: 'ul', items: [content] };
      } else {
        currentList.items.push(content);
      }
    }
    // Numbered List Item
    else if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph(i);
      const content = line.replace(/^\s*\d+\.\s+/, '');
      if (!currentList || currentList.type !== 'ol') {
        flushList(i);
        currentList = { type: 'ol', items: [content] };
      } else {
        currentList.items.push(content);
      }
    }
    // Empty Line
    else if (trimmed === '') {
      flushParagraph(i);
      flushList(i);
      elements.push(<div key={`space-${i}`} className="h-2" />);
    }
    // Paragraph Text
    else {
      flushList(i);
      currentParagraphLines.push(line);
    }
  }

  flushParagraph('final');
  flushList('final');

  return elements;
};

const DEFAULT_WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'bot',
  text: `**Welcome to Zalvro!** I'm Zia, your AI automation assistant.

I can help you with:
- Reviewing our bespoke AI automation workflows
- Structuring custom SaaS and React application builds
- Answering questions about our development and consulting services

How can I help you streamline your operations today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export default function AizaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('aiza_chat_history');
      return saved ? JSON.parse(saved) : [DEFAULT_WELCOME_MESSAGE];
    } catch {
      return [DEFAULT_WELCOME_MESSAGE];
    }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync chat history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aiza_chat_history', JSON.stringify(messages));
    } catch (err) {
      console.error('Failed to save chat history:', err);
    }
  }, [messages]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Configurable API URL via environment variables
      const apiEndpoint = import.meta.env.VITE_API_URL  || 'http://localhost:5000/api/chat';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Support multiple response fields: answer, response, reply, text, message
      const botText = data.answer || data.response || data.reply || data.text || data.message || 
        (typeof data === 'string' ? data : 'Error: Invalid response format from server.');

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot request failed:', error);
      
      const errorMessage = {
        id: `error-${Date.now()}`,
        sender: 'error',
        text: 'I apologize, but I am unable to connect to the assistant server right now. Please verify the backend is running or try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      setMessages([DEFAULT_WELCOME_MESSAGE]);
      try {
        localStorage.removeItem('aiza_chat_history');
      } catch (err) {
        console.error('Failed to clear local storage:', err);
      }
    }
  };

  return (
    <div className="font-sans">
      {/* Floating Circular Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-3 bg-charcoal text-cream text-xs font-semibold rounded-lg px-3 py-2 whitespace-nowrap shadow-lg pointer-events-none select-none border border-subtle/20"
            >
              Ask Zia
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative flex items-center justify-center w-14 h-14 bg-green-dark rounded-full shadow-2xl text-cream hover:bg-[#2d5b42] transition-colors focus:outline-none focus:ring-2 focus:ring-green-dark focus:ring-offset-2 border border-green-light/20 z-10"
          aria-label="Toggle AI Assistant Chatbot"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-cream" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <Bot className="w-6 h-6 text-cream" />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-green-light animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse ring for bot highlight */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-green-dark opacity-35 animate-ping -z-10" />
          )}
        </motion.button>
      </div>

      {/* Main Chat Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 250 }}
            className="fixed bottom-0 right-0 left-0 top-0 sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto sm:w-96 sm:h-[550px] sm:max-h-[calc(100vh-120px)] sm:rounded-2xl w-full h-full rounded-none flex flex-col bg-cream shadow-2xl border border-subtle overflow-hidden z-50"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-charcoal to-[#24243e] p-4 flex items-center justify-between border-b border-subtle/20 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-green-dark flex items-center justify-center border border-green-light/20">
                  <Bot className="w-5 h-5 text-cream" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-light border-2 border-charcoal rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-cream flex items-center gap-1.5 leading-none">
                    Zia
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-green-dark/60 text-green-light rounded font-medium scale-90 origin-left">
                      AI Agent
                    </span>
                  </h3>
                  <span className="text-xs text-cream/70 mt-1 block">Zalvro's AI Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearHistory}
                  className="p-2 hover:bg-cream/10 active:scale-95 text-cream/70 hover:text-cream rounded-lg transition-all focus:outline-none"
                  title="Clear Chat History"
                  aria-label="Clear chat history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-cream/10 active:scale-95 text-cream/70 hover:text-cream rounded-lg transition-all focus:outline-none"
                  title="Close Assistant"
                  aria-label="Close Assistant window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Message Box */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream scrollbar-thin scrollbar-thumb-green-dark scrollbar-track-subtle">
              {messages.map((message) => {
                if (message.sender === 'user') {
                  return (
                    <div key={message.id} className="flex flex-col items-end gap-1 select-text">
                      <div className="bg-green-dark text-cream rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] shadow-sm text-sm leading-relaxed break-words">
                        {message.text}
                      </div>
                      <span className="text-[10px] text-charcoal/50 mr-1 select-none">{message.timestamp}</span>
                    </div>
                  );
                }

                if (message.sender === 'error') {
                  return (
                    <div key={message.id} className="flex gap-2.5 max-w-[85%] bg-red-50 border border-red-200/60 rounded-2xl p-4 shadow-sm mr-auto text-red-800 text-xs">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">Connection Error</span>
                        <p className="leading-relaxed text-red-700/90">{message.text}</p>
                        <span className="text-[10px] text-red-500 mt-1">{message.timestamp}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={message.id} className="flex flex-col items-start gap-1 select-text">
                    <div className="bg-card text-charcoal rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] shadow-md mr-auto text-sm border border-subtle/50">
                      {parseMarkdown(message.text)}
                    </div>
                    <span className="text-[10px] text-charcoal/50 ml-1 select-none">{message.timestamp}</span>
                  </div>
                );
              })}

              {/* Loader Bubble */}
              {isLoading && (
                <div className="flex flex-col items-start gap-1">
                  <div className="bg-card text-charcoal rounded-2xl rounded-tl-none px-4 py-3.5 w-16 shadow-md border border-subtle/50 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-dark opacity-60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-green-dark opacity-60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-green-dark opacity-60 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Form Input Section */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-subtle border-t border-subtle/80 flex gap-2 items-center"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 bg-card text-charcoal border border-subtle/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent transition-all placeholder:text-charcoal/40 resize-none max-h-24 overflow-y-auto leading-normal scrollbar-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-green-dark text-cream p-2.5 rounded-xl hover:bg-[#2d5b42] active:scale-95 transition-all disabled:opacity-40 disabled:active:scale-100 disabled:pointer-events-none flex items-center justify-center shrink-0 shadow-md focus:ring-2 focus:ring-green-dark"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-cream" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
