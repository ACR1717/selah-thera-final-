import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface SelahAssistantProps {
  language: 'es' | 'en';
}

export const SelahAssistant: React.FC<SelahAssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initial greeting based on language
  const initialGreeting = language === 'es' 
    ? '¡Hola! Soy el Asistente de Bienestar de Selah Thera House. 🌿 ¿En qué puedo ayudarte hoy? Puedo explicarte nuestros tratamientos, precios o guiarte hacia el plan ideal.'
    : 'Hello! I am the Wellness Assistant at Selah Thera House. 🌿 How can I help you today? I can explain our treatments, prices, or guide you to the ideal plan.';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: initialGreeting }
  ]);
  
  // Reset chat if language changes (optional, but good for consistency)
  useEffect(() => {
    setMessages([{ role: 'model', text: initialGreeting }]);
  }, [language]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const systemInstruction = `
    You are the Expert Wellness Assistant for "Selah Thera House", a high-end integrative medicine center in Heredia, Costa Rica.
    
    CURRENT LANGUAGE CONTEXT: ${language === 'es' ? 'SPANISH' : 'ENGLISH'}.
    YOU MUST REPLY IN: ${language === 'es' ? 'SPANISH' : 'ENGLISH'}.

    TONE: Warm, Professional, Empathetic, Scientific yet accessible, and subtly persuasive.

    GOAL:
    Educate the user about "Future Medicine with Ancestral Roots" and guide them to book an appointment or buy a plan.

    KNOWLEDGE BASE:
    
    1. PHILOSOPHY:
       - We don't treat symptoms, we optimize biology.
       - Key Formula: OPEN (PEMF) -> CLEANSE (Detox/Zapper) -> REPAIR (Red Light/Nutrition) -> SEAL (Tesla/Scalar).
       - All is 100% Natural, Painless, and Non-Invasive.

    2. SERVICES & PRICES (Always in USD):
       - "Initial Assessment" (Valoración Inicial): FREE. Recommended first step.
       - "Therapeutic Day Pass": $77 USD (Reg $99). For executives/stress. 3 hours. Includes PEMF, Detox, Red Light, Alkaline Drink.
       - "Recovery Program": $770 USD (Reg $950). 10 Sessions. For chronic/acute pain. Includes 4D Scan, Zapper, Detox, etc.
       - "Retreat Intensive" (Nosara, 10 days): $4,250 USD. Health bootcamp.
       - "Retreat Recovery" (Nosara, 21 days): $7,875 USD. Total transformation for chronic illness.

    3. TECHNOLOGIES (SIMPLE EXPLANATION):
       - PEMF: "The biological can opener". Opens cells for nutrients to enter and toxins to exit.
       - Ionic Detox: Removes toxins via feet electrolysis.
       - Zapper: Kills viruses/bacteria with frequencies. IMPORTANT: Always followed by Ionic Detox.
       - Scalar Waves / Tesla Oscillator: Recharges cell battery (voltage) and repairs DNA.
       - 4D Scanner: Precise diagnosis seeing organ status.
       - Red Light: Feeds mitochondria for energy.

    INTERACTION RULES:
    - If they mention a symptom (pain, fatigue), empathize and explain how our tech attacks the ROOT CAUSE (inflammation/toxins).
    - If asked for prices, be direct.
    - NEVER give definitive medical diagnoses ("you have cancer") or prescribe drugs. Focus on natural bioregeneration.
    - Keep answers concise (3-4 short paragraphs max).
  `;

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;

      if (!apiKey) {
        throw new Error("API Key config missing.");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      let prompt = "";
      const contextMessages = messages.slice(-6); 
      contextMessages.forEach(m => {
         prompt += `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}\n`;
      });
      prompt += `User: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });
      
      const responseText = response.text;

      if (responseText) {
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      } else {
         throw new Error("No response");
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsg = language === 'es' 
        ? "Lo siento, tengo problemas de conexión momentáneos. Por favor contáctanos por WhatsApp."
        : "I'm sorry, I'm having temporary connection issues. Please contact us via WhatsApp.";
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-brand-accent hover:bg-[#B5952F] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label={language === 'es' ? "Abrir chat" : "Open chat"}
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:animate-spin" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
      </button>

      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-brand-primary/20 flex flex-col transition-all duration-500 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`} style={{ height: '550px', maxHeight: '80vh' }}>
        
        <div className="bg-brand-dark text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full border border-white/20">
              <Bot className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide">{language === 'es' ? 'Asistente Selah' : 'Selah Assistant'}</h3>
              <p className="text-xs text-brand-light flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span> {language === 'es' ? 'En línea (IA)' : 'Online (AI)'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/70 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#F5F5F0] space-y-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex gap-1 items-center">
                <span className="text-xs text-gray-400 mr-2">{language === 'es' ? 'Pensando' : 'Thinking'}</span>
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white rounded-b-2xl flex gap-2 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'es' ? "Pregunta sobre terapias..." : "Ask about therapies..."}
            className="flex-1 bg-gray-50 text-brand-dark text-sm rounded-xl px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputText.trim()}
            className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};
