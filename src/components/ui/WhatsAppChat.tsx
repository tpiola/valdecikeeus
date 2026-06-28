"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";

const PHONE = "5516991115518";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;

const AUTO_MESSAGES = [
  { text: "🩴 Olá! Bem-vindo à Keeus! ❤️", delay: 800 },
  { text: "Como posso ajudar? Escolha uma opção abaixo 👇", delay: 2000 },
];

const QUICK_REPLIES = [
  { label: "📦 Catálogo", msg: "Quero ver os chinelos!" },
  { label: "💰 Frete", msg: "Quanto custa o frete?" },
  { label: "📏 Tamanho", msg: "Como escolher o tamanho?" },
  { label: "🔄 Troca", msg: "Qual a política de troca?" },
  { label: "💬 Falar Agente", msg: "Quero falar com um atendente" },
];

const ANSWERS: Record<string, string> = {
  "quero ver os chinelos": "Acesse nossa coleção completa 👉 https://valdecikeeus.vercel.app/colecao\n\nTemos modelos Bahamas, Malibu e Toledo nas cores café, preto, azul e laranja! 🩴",
  "quanto custa o frete": "📮 O frete é calculado pelos Correios com base no seu CEP.\n\n✅ Frete GRÁTIS (SEDEX) em compras acima de R$ 299,90!\n💰 PAC a partir de R$ 14,50\n⚡ SEDEX a partir de R$ 22,90\n\nDigite seu CEP na página do produto para ver o valor exato!",
  "como escolher o tamanho": "📏 Nossa tabela de tamanhos:\n\n33-34 → 33/34 (PP)\n35-36 → 35/36 (P)\n37-38 → 37/38 (M)\n39-40 → 39/40 (G)\n41-42 → 41/42 (GG)\n43-44 → 43/44 (XG)\n45 → 45 (XXG)\n\n💡 Dica: se estiver entre dois números, escolha o maior!",
  "qual a política de troca": "🔄 Troca garantida em até 30 dias!\n\n• Primeira troca GRÁTIS\n• Produto deve estar sem sinais de uso\n• Entre em contato pelo WhatsApp que enviamos o código de postagem reversa\n\nSimples e sem burocracia! ✅",
  "quero falar com um atendente": "Claro! Vou te redirecionar para nosso atendimento no WhatsApp 👇",
};

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; from: "bot" | "user" }[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto messages on open
  useEffect(() => {
    if (!isOpen) return;
    setMessages([]);
    setShowReplies(false);
    let timeouts: NodeJS.Timeout[] = [];
    AUTO_MESSAGES.forEach(({ text, delay }) => {
      timeouts.push(setTimeout(() => {
        setMessages(prev => [...prev, { text, from: "bot" }]);
      }, delay));
    });
    timeouts.push(setTimeout(() => setShowReplies(true), 3200));
    return () => timeouts.forEach(clearTimeout);
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickReply = (msg: string) => {
    setMessages(prev => [...prev, { text: msg, from: "user" }]);
    setShowReplies(false);

    const lower = msg.toLowerCase();
    const answer = Object.entries(ANSWERS).find(([key]) => lower.includes(key));

    setTimeout(() => {
      if (answer) {
        setMessages(prev => [...prev, { text: answer[1], from: "bot" }]);
        if (lower.includes("falar com um atendente")) {
          setTimeout(() => {
            window.open(WHATSAPP_URL, "_blank");
          }, 1000);
        }
      } else {
        setMessages(prev => [...prev, { text: "Entendi! Vou te redirecionar para nosso atendimento no WhatsApp para ajudar melhor 😊", from: "bot" }]);
        setTimeout(() => window.open(WHATSAPP_URL, "_blank"), 1500);
      }
      setTimeout(() => setShowReplies(true), 500);
    }, 600);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    handleQuickReply(inputValue.trim());
    setInputValue("");
  };

  return (
    <>
      {/* Chat FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-105 hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold">
                K
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Keeus Atendimento</p>
                <p className="text-[11px] text-white/70">Online • Resposta rápida</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="shrink-0 opacity-60 hover:opacity-100">
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[360px] overflow-y-auto bg-[#ECE5DD] p-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-2 flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === "bot"
                        ? "rounded-tl-sm bg-white text-stone-800 shadow-sm"
                        : "rounded-tr-sm bg-[#DCF8C6] text-stone-800"
                    }`}
                  >
                    {msg.text.split('\n').map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {showReplies && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-1.5 border-t border-stone-100 bg-stone-50 px-3 py-2"
                >
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleQuickReply(reply.msg)}
                      className="rounded-full border border-[#25D366]/20 bg-white px-3 py-1.5 text-[11px] font-medium text-[#075E54] transition-all hover:bg-[#25D366]/10 hover:scale-105 active:scale-95"
                    >
                      {reply.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-stone-100 bg-white px-3 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Digite sua dúvida..."
                className="flex-1 rounded-full bg-stone-100 px-4 py-2 text-sm outline-none transition-colors focus:bg-stone-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-all hover:scale-105 disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
