import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const SelahAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy el Asistente de Bienestar de Selah Thera House. 🌿 ¿En qué puedo ayudarte hoy? Puedo explicarte nuestros tratamientos, precios o guiarte hacia el plan ideal para tu salud.' }
  ]);
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
    Eres el Asistente Experto de Bienestar de "Selah Thera House", un centro de medicina integrativa de alto nivel en Heredia, Costa Rica.
    Tu tono es: Cálido, Profesional, Empático, Científico pero accesible, y sutilmente persuasivo.

    TU OBJETIVO:
    Educar al usuario sobre la "Medicina del Futuro con Raíces Ancestrales" y guiarlos a agendar una cita o comprar un plan.

    BASE DE CONOCIMIENTO (MANUAL OPERATIVO RESUMIDO):
    
    1. FILOSOFÍA:
       - No tratamos síntomas, optimizamos la biología.
       - Fórmula Clave: ABRIR (PEMF) -> LIMPIAR (Detox/Zapper) -> REPARAR (Luz Roja/Nutrición) -> SELLAR (Tesla/Escalar).
       - Todo es 100% Natural, Indoloro y No Invasivo.

    2. SERVICIOS Y PRECIOS (Siempre dalos en USD):
       - "Valoración Inicial": GRATIS. Es el primer paso recomendado.
       - "Therapeutic Day Pass" ($77 USD): Para ejecutivos/estrés. 3 horas. Incluye PEMF, Detox, Luz Roja, Bebida alcalina. (Precio regular $99).
       - "Programa Recovery" ($770 USD): 10 Sesiones. Para dolor crónico/agudo. Incluye Escaneo 4D, Zapper, Detox, etc. (Precio regular $950).
       - "Retreat Intensive" (Nosara, 10 días): $4,250 USD. Bootcamp de salud acelerado.
       - "Retreat Recovery" (Nosara, 21 días): $7,875 USD. Transformación total para enfermedades crónicas.

    3. TECNOLOGÍAS (EXPLICACIÓN SIMPLE):
       - PEMF (Magnetoterapia): "El abrelatas celular". Abre la célula para que entren nutrientes y salgan toxinas.
       - Detox Iónico: Saca toxinas por los pies mediante electrólisis.
       - Zapper: Mata virus, bacterias y parásitos con frecuencias. IMPORTANTE: Siempre va seguido de Detox Iónico.
       - Ondas Escalares / Oscilador Tesla: Recargan la batería de la célula (voltaje) y reparan el ADN.
       - Escáner 4D: Diagnóstico preciso que ve el estado de tus órganos.
       - Luz Roja: Alimenta las mitocondrias para dar energía.

    REGLAS DE INTERACCIÓN:
    - Si mencionan un síntoma (dolor, fatiga, estrés), empatiza y explica cómo nuestra tecnología ataca la CAUSA RAÍZ (inflamación/toxinas) y sugiere la Valoración Inicial.
    - Si preguntan por precios, sé directo y menciona el valor que obtienen.
    - NUNCA des diagnósticos médicos definitivos ("tienes cáncer") ni recetes fármacos. Tu enfoque es bioregenerativo natural.
    - Mantén las respuestas concisas (máximo 3-4 párrafos cortos). Usa emojis con moderación (🌿, ✨, 🔋).
  `;

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct conversation history for context
      let prompt = "";
      // We take the last few messages to maintain context window
      const contextMessages = messages.slice(-6); 
      contextMessages.forEach(m => {
         prompt += `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.text}\n`;
      });
      prompt += `Usuario: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      } else {
         throw new Error("No response from AI");
      }

    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un pequeño problema de conexión. ¿Podrías preguntarme de nuevo? O si prefieres, puedes escribirnos directamente al WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-brand-accent hover:bg-[#B5952F] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:animate-spin" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-brand-primary/20 flex flex-col transition-all duration-500 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`} style={{ height: '550px', maxHeight: '80vh' }}>
        
        {/* Header */}
        <div className="bg-brand-dark text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full border border-white/20">
              <Bot className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide">Asistente Selah</h3>
              <p className="text-xs text-brand-light flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span> En línea (IA)
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

        {/* Messages Area */}
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
                <span className="text-xs text-gray-400 mr-2">Pensando</span>
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white rounded-b-2xl flex gap-2 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregunta sobre terapias..."
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
