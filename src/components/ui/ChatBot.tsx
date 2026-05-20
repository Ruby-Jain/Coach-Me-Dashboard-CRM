"use client";

import React, { useState, useRef, useEffect } from "react";
import { GlassCard } from "./GlassCard";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I'm your AI Coach Assistant. How can I help you support your students today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great approach. Make sure to review their recent performance metrics first.",
        "I can help you generate a growth report for that student.",
        "Would you like me to schedule a follow-up session?",
        "According to the latest data, they are excelling in Mindset Coaching."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { id: Date.now().toString(), text: randomResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 md:bottom-8 right-6 w-14 h-14 rounded-full flex items-center justify-center z-[70] transition-all duration-300 shadow-[0_0_20px_rgba(1,245,160,0.3)] active:scale-95 ${isOpen ? 'bg-surface-container border border-white/10 text-on-surface' : 'bg-gradient-to-tr from-primary to-secondary-container text-on-primary hover:scale-105'}`}
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 md:bottom-28 right-6 w-[350px] h-[500px] max-h-[70vh] z-[65] animate-fade-in flex flex-col pointer-events-auto shadow-2xl">
          <GlassCard className="flex flex-col h-full border border-primary/30 overflow-hidden" glow="primary">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm font-bold text-on-surface">Coach Assistant</h3>
                <p className="text-[10px] text-primary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end'}`}>
                  <div className={`p-3 rounded-2xl font-body-base text-sm ${msg.isBot ? 'bg-surface-container-high border border-white/5 text-on-surface rounded-tl-sm' : 'bg-primary/20 border border-primary/30 text-primary-fixed rounded-tr-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your students..." 
                className="flex-1 bg-surface-container/50 border border-white/10 rounded-full px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-colors placeholder:text-outline"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/40 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </GlassCard>
        </div>
      )}
    </>
  );
}
