import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { ChartAnalysis as ChartAnalysisEntity, TutorConversation } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BarChart3, MessageSquare, TrendingUp, TrendingDown, Target, Brain, Upload, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "../components/dashboard/StatsCard";
import RecentAnalyses from "../components/dashboard/RecentAnalyses";
import QuickActions from "../components/dashboard/QuickActions";
import CreditsPanel from "../components/dashboard/CreditsPanel";
import { User } from "@/api/entities";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .dr * { font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
  @keyframes pdot{0%,100%{opacity:1}50%{opacity:.25}} .pdot{animation:pdot 2s infinite;}
  @keyframes dorb{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-14px)}} .dorb{animation:dorb 14s ease-in-out infinite;}
  .ctop::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent);}
  [data-theme='light'] .dr .ctop{box-shadow:0 2px 12px rgba(0,0,0,.06),0 1px 3px rgba(0,0,0,.04);}
  .gbtn{transition:transform .2s,box-shadow .2s;} .gbtn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(245,166,35,.5)!important;} .gbtn:active{transform:translateY(0);}
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

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const dark = useDark();
  const [analyses, setAnalyses] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [me, setMe] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const user = await User.me().catch(() => null);
      if (user && user.role === 'brand') {
        window.location.href = createPageUrl("BrandDashboard");
        return;
      }
      // Note: Admins can now view the normal user dashboard
      const [serverAnalyses, conversationsData] = await Promise.all([
        ChartAnalysisEntity.listAnalyses(10),
        TutorConversation.listConversations(5)
      ]);
      const mappedAnalyses = (serverAnalyses || []).map(a => ({
        id: a.id,
        chart_image_url: a.image_url,
        symbol: a.symbol,
        created_date: a.created_at,
        status: 'completed',
        analysis_result: a.analysis_json,
      }));
      setAnalyses(mappedAnalyses);
      setConversations(conversationsData || []);
      setMe(user);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const completedAnalyses = analyses.filter(a => a.status === 'completed');
  const successRate = completedAnalyses.length > 0
    ? (completedAnalyses.filter(a => a.analysis_result?.confidence_level > 0.7).length / completedAnalyses.length * 100)
    : 0;

  const bg = dark ? 'bg-[#0E0D08]' : 'bg-[#FEFCF3]';
  const tx = dark ? 'text-[#F9F5E8]' : 'text-gray-900';
  const mu = dark ? 'text-gray-400' : 'text-gray-500';
  const cb = `${dark ? 'bg-[#141209]' : 'bg-[#FFFDF5]'} border-[rgba(245,166,35,.18)]`;

  const statsConfig = [
    { title: t('stats.totalAnalyses'), value: analyses.length, icon: BarChart3, color: 'orange', trend: t('stats.totalAnalysesTrend') },
    { title: t('stats.accuracyScore'), value: `${successRate.toFixed(1)}%`, icon: Target, color: 'green', trend: t('stats.accuracyScoreTrend') },
    { title: t('stats.conversations'), value: conversations.length, icon: MessageSquare, color: 'slate', trend: t('stats.conversationsTrend') },
    { title: t('stats.aiInsights'), value: completedAnalyses.length, icon: Brain, color: 'blue', trend: t('stats.aiInsightsTrend') },
  ];

  const marketRows = [
    { l: t('marketPulse.sentiment'), v: t('marketPulse.upward'), c: '#34d399' },
    { l: t('marketPulse.volatility'), v: t('marketPulse.moderate'), c: '#fbbf24' },
    { l: t('marketPulse.dataIndex'), v: '65/100', c: '#fb923c' },
  ];

  return (
    <div className={`dr min-h-screen ${bg} ${tx} relative overflow-hidden`}>
      <style>{CSS}</style>

      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="dorb absolute w-[500px] h-[500px] rounded-full -top-48 -left-32"
          style={{ background: dark ? 'radial-gradient(circle,rgba(245,166,35,.1) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(245,166,35,.07) 0%,transparent 70%)' }} />
        <div className="dorb absolute w-[320px] h-[320px] rounded-full bottom-0 right-0"
          style={{ background: dark ? 'radial-gradient(circle,rgba(245,166,35,.07) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(245,166,35,.05) 0%,transparent 70%)', animationDelay: '-7s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-6 lg:py-8 w-full overflow-hidden">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-2"
              style={{ background: 'rgba(245,166,35,.1)', border: '1px solid rgba(245,166,35,.25)', color: '#F5A623' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pdot" />Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('title')}
            </h1>
            <p className={`mt-1 text-sm sm:text-base ${mu}`}>{t('subtitle')}</p>
          </div>
          <QuickActions />
        </motion.div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {statsConfig.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08, duration: .4 }}>
              <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} trend={s.trend} />
            </motion.div>
          ))}
        </div>

        {/* ── Main Content ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* RecentAnalyses */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .4 }}>
            <RecentAnalyses analyses={analyses} isLoading={isLoading} />
          </motion.div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* CreditsPanel */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .36, duration: .4 }}>
              <CreditsPanel
                credits_balance={me?.credits_balance}
                credits_unlimited={me?.credits_unlimited}
                subscription_tier={me?.subscription_tier}
              />
            </motion.div>

            {/* AI Tutor Card */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .43, duration: .4 }}>
              <div className={`ctop relative rounded-2xl border overflow-hidden ${cb}`}>
                <div className="px-5 pt-5 pb-4 flex items-center gap-3"
                  style={{ background: dark ? 'rgba(245,166,35,.07)' : 'rgba(245,166,35,.05)', borderBottom: '1px solid rgba(245,166,35,.12)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,.15)' }}>
                    <Sparkles size={16} style={{ color: '#F5A623' }} />
                  </div>
                  <span className={`font-bold text-sm ${tx}`}>{t('aiTutor.title')}</span>
                </div>
                <div className="p-5">
                  <p className={`text-xs leading-relaxed mb-4 ${mu}`}>{t('aiTutor.description')}</p>
                  <Link to={createPageUrl("AITutor")}>
                    <button className="gbtn w-full py-2.5 text-sm font-bold rounded-xl text-gray-900"
                      style={{ background: G, boxShadow: '0 5px 18px rgba(245,166,35,.38)' }}>
                      {t('aiTutor.startLearning')}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Market Pulse Card */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .5, duration: .4 }}>
              <div className={`ctop relative rounded-2xl border ${cb} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={15} style={{ color: '#34d399' }} />
                  <span className={`font-bold text-sm ${tx}`}>{t('marketPulse.title')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pdot ml-auto" />
                </div>
                {marketRows.map((r, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5"
                    style={{ borderBottom: i < marketRows.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)'}` : undefined }}>
                    <span className={`text-xs ${mu}`}>{r.l}</span>
                    <span className="text-xs font-bold" style={{ color: r.c }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}