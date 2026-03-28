import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/config';
import { TutorConversation, User } from "@/api/entities";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Brain, Sparkles, Loader2, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ChatMessage from "../components/tutor/ChatMessage";
import TopicSuggestions from "../components/tutor/TopicSuggestions";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .at * { font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
  @keyframes dorb{0%,100%{transform:translate(0,0)}50%{transform:translate(15px,-12px)}} .dorb{animation:dorb 14s ease-in-out infinite;}
  .ctop::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent);}
  .gbtn{transition:transform .2s,box-shadow .2s;} .gbtn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(245,166,35,.5)!important;} .gbtn:active{transform:translateY(0);}
  .obtn{transition:transform .2s,background .2s;} .obtn:hover{transform:translateY(-1px);}
  .conv-item{transition:background .15s,transform .15s;} .conv-item:hover{transform:translateX(2px);}
  .msg-scroll::-webkit-scrollbar{width:4px;} .msg-scroll::-webkit-scrollbar-track{background:transparent;} .msg-scroll::-webkit-scrollbar-thumb{background:rgba(245,166,35,.3);border-radius:10px;}
  .conv-scroll::-webkit-scrollbar{width:2px;} .conv-scroll::-webkit-scrollbar-track{background:transparent;} .conv-scroll::-webkit-scrollbar-thumb{background:rgba(245,166,35,.2);border-radius:10px;}
  .mobile-sidebar-scroll{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;} .mobile-sidebar-scroll::-webkit-scrollbar{display:none;}
`;

function useDark() {
  const [d, setD] = useState(() => document.documentElement.dataset.theme === 'dark');
  useEffect(() => {
    const o = new MutationObserver(() => setD(document.documentElement.dataset.theme === 'dark'));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => o.disconnect();
  }, []);
  return d;
}

const G = 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)';

const DOMAIN_PROFILES = {
  "Technical Analysis":   { role: "Expert in chart patterns, indicators (RSI, MACD, MA), trends, support/resistance, entries/exits.", kickoff: "Let's start a Technical Analysis session. Give me a quick overview of your chart-reading approach and one question to tailor the session." },
  "Risk Management":      { role: "Expert in position sizing, stop placement, risk/reward, drawdown control, and scenario planning.", kickoff: "Let's focus on Risk Management. Summarize your current risk rules and ask me one question about your risk tolerance to personalize advice." },
  "Trading Psychology":   { role: "Expert in discipline, bias mitigation, routines, performance review, and emotional control.", kickoff: "Starting Trading Psychology coaching. Share key mindset challenges and ask me one question about your routines to tailor the plan." },
  "Portfolio Management": { role: "Expert in diversification, rebalancing, correlation, sizing across assets, and long-term allocation.", kickoff: "Begin Portfolio Management. Outline your objective and horizon, then ask one question about diversification or rebalancing." },
  "Market Fundamentals":  { role: "Expert in macro drivers, valuation, supply/demand, catalysts, and data interpretation.", kickoff: "Kick off Market Fundamentals. What sectors or metrics do you follow? Ask one question about valuation or catalysts." },
  "Strategy Development": { role: "Expert in hypothesis building, backtesting, validation, metrics, and iteration.", kickoff: "Start Strategy Development. Describe your idea and constraints, then ask one question about testing or metrics." },
};

function DCard({ children, className = '', dark }) {
  return (
    <div className={`ctop relative rounded-2xl border border-[rgba(245,166,35,.18)] ${dark ? 'bg-[#141209]' : 'bg-[#FFFDF5]'} ${className}`}>
      {children}
    </div>
  );
}

export default function AITutor() {
  const { t } = useTranslation(['dashboard', 'common']);
  const dark = useDark();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
    User.me().then(setUser).catch(() => {});
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const isInitialLoad = useRef(true);
  useEffect(() => {
    if (isInitialLoad.current) { isInitialLoad.current = false; return; }
    if (messages.length > 0) messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const loadConversations = async () => {
    const data = await TutorConversation.listConversations(10);
    setConversations(data);
    if (data?.length > 0) {
      setCurrentConversation(data[0]);
      try { setMessages(await TutorConversation.getMessages(data[0].id)); } catch (_e) { setMessages([]); }
    }
  };

  const startNewConversation = async (topic) => {
    if (user?.subscription_tier === 'starter' && (topic === 'Strategy Development' || topic === 'Market Fundamentals')) {
      alert(t('aiTutor.upgradeRequired', { ns: 'dashboard' })); return;
    }
    const newConv = await TutorConversation.createConversation({ title: `${topic} ${t('aiTutor.discussion', { ns: 'dashboard' })}`, topic });
    setCurrentConversation(newConv); setMessages([]);
    setConversations(prev => [newConv, ...prev]);
    setSidebarOpen(false);
    if (DOMAIN_PROFILES[topic]?.kickoff) await sendText(DOMAIN_PROFILES[topic].kickoff, newConv, topic);
  };

  const sendText = async (text, convOverride = null, topicOverride = null) => {
    const trimmed = String(text || '').trim();
    if (!trimmed) return;
    const userMsg = { role: "user", content: trimmed, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    if (!convOverride) setInputMessage("");
    setIsLoading(true);
    try {
      let conv = convOverride || currentConversation;
      if (!conv) {
        conv = await TutorConversation.createConversation({ title: trimmed.slice(0, 50) + "...", topic: topicOverride || "General" });
        setCurrentConversation(conv); setConversations(prev => [conv, ...prev]);
      }
      const assistant = await TutorConversation.sendMessage(conv.id, { content: trimmed, temperature: 0.5, language: i18n.language || 'en' });
      setMessages(prev => [...prev, { role: "assistant", content: assistant?.content || "", timestamp: assistant?.timestamp || new Date().toISOString() }]);
      try { setUser(await User.me()); } catch (_e) {}
    } catch (e) { console.error("Error:", e); }
    finally { setIsLoading(false); }
  };

  const selectConversation = async (conv) => {
    setCurrentConversation(conv); setSidebarOpen(false);
    try { setMessages(await TutorConversation.getMessages(conv.id)); } catch (_e) { setMessages([]); }
  };

  const tx = dark ? 'text-[#F9F5E8]' : 'text-gray-900';
  const mu = dark ? 'text-gray-400' : 'text-gray-500';
  const bg = dark ? 'bg-[#0E0D08]' : 'bg-[#FEFCF3]';
  const inputBg = dark ? 'bg-[#1a1810] border-[rgba(245,166,35,.25)] text-[#F9F5E8] placeholder:text-gray-600' : 'bg-white border-[rgba(245,166,35,.25)] placeholder:text-gray-400';
  const sep = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';

  return (
    <div className={`at ${bg} ${tx} relative`} style={{ height: 'calc(100dvh - 70px)', minHeight: '400px', overflow: 'hidden' }}>
      <style>{CSS}</style>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="dorb absolute w-[420px] h-[420px] rounded-full -top-36 -left-24" style={{ background: dark ? 'radial-gradient(circle,rgba(245,166,35,.09) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(245,166,35,.06) 0%,transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 lg:py-6 flex flex-col h-full w-full overflow-hidden">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} className="flex items-center justify-between mb-3 sm:mb-5 shrink-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-1" style={{ background: 'rgba(245,166,35,.1)', border: '1px solid rgba(245,166,35,.25)', color: '#F5A623' }}>
              <Brain size={11} />AI Tutor
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight" style={{ background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('aiTutor.title', { ns: 'dashboard' })}
            </h1>
            <p className={`text-xs mt-0.5 hidden sm:block ${mu}`}>{t('aiTutor.subtitle', { ns: 'dashboard' })}</p>
          </div>
          {/* Mobile sidebar toggle */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`lg:hidden obtn p-2.5 rounded-xl border border-[rgba(245,166,35,.25)] flex-shrink-0 ${dark ? 'text-amber-300' : 'text-amber-700'}`}>
            <MessageSquare size={16} />
          </button>
        </motion.div>

        {/* Main grid */}
        <div className="flex-1 grid lg:grid-cols-4 gap-3 sm:gap-5 min-h-0 overflow-hidden">

          {/* Sidebar */}
          <AnimatePresence>
            {(sidebarOpen || true) && (
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15, duration: .4 }}
                className={`lg:col-span-1 flex-col gap-4 ${sidebarOpen ? 'flex fixed left-0 right-0 bottom-0 z-40 mobile-sidebar-scroll' : 'hidden lg:flex overflow-y-auto msg-scroll'} ${sidebarOpen && (dark ? 'bg-[#0E0D08]' : 'bg-[#FEFCF3]')}`}
                style={sidebarOpen ? { top: 0, paddingTop: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 } : undefined}>

                {sidebarOpen && (
                  <div className="flex items-center justify-end shrink-0">
                    <button onClick={() => setSidebarOpen(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
                      style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)', boxShadow: '0 4px 14px rgba(245,166,35,.45)', border: 'none', cursor: 'pointer' }}>
                      <X size={18} style={{ color: '#1a1500' }} />
                    </button>
                  </div>
                )}

                {/* Quick Start */}
                <DCard dark={dark} className="overflow-hidden shrink-0">
                  <div className="p-4 flex items-center gap-2" style={{ borderBottom: `1px solid ${sep}` }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,.12)' }}>
                      <Sparkles size={13} style={{ color: '#F5A623' }} />
                    </div>
                    <span className={`font-bold text-sm ${tx}`}>{t('aiTutor.quickStart', { ns: 'dashboard' })}</span>
                  </div>
                  <div className="p-3">
                    <TopicSuggestions onTopicSelect={startNewConversation} />
                  </div>
                </DCard>

                {/* Conversation History */}
                <DCard dark={dark} className="overflow-hidden lg:flex-[4] lg:min-h-[320px] flex flex-col">
                  <div className="p-4 flex items-center justify-between shrink-0" style={{ borderBottom: `1px solid ${sep}` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,.1)' }}>
                        <MessageSquare size={13} style={{ color: '#F5A623' }} />
                      </div>
                      <span className={`font-bold text-sm ${tx}`}>{t('aiTutor.recentChats', { ns: 'dashboard' })}</span>
                    </div>
                    <button onClick={() => { setCurrentConversation(null); setMessages([]); setSidebarOpen(false); }}
                      className="gbtn w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: G }}>
                      <Plus size={13} className="text-gray-900" />
                    </button>
                  </div>
                  <div className="p-2 space-y-1 overflow-y-auto conv-scroll flex-1">
                    {conversations.map((conv) => (
                      <div key={conv.id} onClick={() => selectConversation(conv)}
                        className={`conv-item p-3 rounded-xl cursor-pointer ${currentConversation?.id === conv.id ? 'border border-[rgba(245,166,35,.3)]' : ''}`}
                        style={{ background: currentConversation?.id === conv.id ? (dark ? 'rgba(245,166,35,.1)' : 'rgba(245,166,35,.07)') : (dark ? 'rgba(255,255,255,.02)' : 'rgba(0,0,0,.02)') }}>
                        <p className={`font-medium text-xs truncate mb-1 ${tx}`}>{conv.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,.1)', color: '#F5A623' }}>{conv.topic}</span>
                          <span className={`text-xs ${mu}`}>{format(new Date(conv.created_at || conv.created_date), "MMM d")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </DCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .4 }} className="lg:col-span-3 min-h-0 overflow-hidden">
            <DCard dark={dark} className="h-full flex flex-col overflow-hidden">
              {/* Chat header */}
              <div className="p-4 flex items-center gap-3 shrink-0" style={{ borderBottom: `1px solid ${sep}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,.12)' }}>
                  <Brain size={16} style={{ color: '#F5A623' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm truncate ${tx}`}>{currentConversation ? currentConversation.title : t('aiTutor.title', { ns: 'dashboard' })}</div>
                  {currentConversation?.topic && <div className="text-xs" style={{ color: '#F5A623' }}>{currentConversation.topic}</div>}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto msg-scroll p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,.1)' }}>
                      <Brain size={28} style={{ color: '#F5A623' }} />
                    </div>
                    <div className="text-center">
                      <h3 className={`font-bold text-base mb-1 ${tx}`}>{t('aiTutor.welcome', { ns: 'dashboard' })}</h3>
                      <p className={`text-xs leading-relaxed max-w-xs ${mu}`}>{t('aiTutor.welcomeDescription', { ns: 'dashboard' })}</p>
                    </div>
                    <div className={`text-xs ${mu}`}>{t('aiTutor.tryAsking', { ns: 'dashboard' })}</div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((msg, i) => <ChatMessage key={i} message={msg} index={i} />)}
                  </AnimatePresence>
                )}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(245,166,35,.08)', border: '1px solid rgba(245,166,35,.15)' }}>
                    <Loader2 size={14} className="animate-spin" style={{ color: '#F5A623' }} />
                    <span className="text-xs font-medium" style={{ color: '#F5A623' }}>{t('aiTutor.thinking', { ns: 'dashboard' })}</span>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 shrink-0" style={{ borderTop: `1px solid ${sep}` }}>
                <div className="flex gap-2">
                  <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(inputMessage); } }}
                    placeholder={t('aiTutor.inputPlaceholder', { ns: 'dashboard' })}
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2.5 text-sm rounded-xl border outline-none focus:border-amber-400 transition-colors ${inputBg}`}
                  />
                  <button onClick={() => sendText(inputMessage)} disabled={!inputMessage.trim() || isLoading}
                    className="gbtn w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: G, boxShadow: '0 4px 14px rgba(245,166,35,.35)' }}>
                    <Send size={14} className="text-gray-900" />
                  </button>
                </div>
              </div>
            </DCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}