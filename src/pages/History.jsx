import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { ChartAnalysis as ChartAnalysisEntity } from "@/api/entities";
import { History as HistoryIcon, Search, TrendingUp, TrendingDown, Target, BarChart3, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnalysisCard from "../components/history/AnalysisCard";
import FilterTabs from "../components/history/FilterTabs";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .hy * { font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
  @keyframes dorb{0%,100%{transform:translate(0,0)}50%{transform:translate(15px,-12px)}} .dorb{animation:dorb 14s ease-in-out infinite;}
  .ctop::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent);}
  .sc{transition:transform .2s cubic-bezier(.34,1.2,.64,1),box-shadow .2s;} .sc:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(245,166,35,.12);}
  .sinput{transition:border-color .15s,box-shadow .15s;} .sinput:focus{border-color:rgba(245,166,35,.5)!important;box-shadow:0 0 0 3px rgba(245,166,35,.12)!important;outline:none;}
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

function DCard({ children, className = '', dark }) {
  return (
    <div className={`ctop relative rounded-2xl border border-[rgba(245,166,35,.18)] ${dark ? 'bg-[#141209]' : 'bg-[#FFFDF5]'} ${className}`}>
      {children}
    </div>
  );
}

export default function History() {
  const { t } = useTranslation(['dashboard', 'common']);
  const dark = useDark();
  const [analyses, setAnalyses] = useState([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trendFilter, setTrendFilter] = useState("all");

  useEffect(() => { loadAnalyses(); }, []);
  useEffect(() => { applyFilters(); }, [analyses, searchTerm, statusFilter, trendFilter]);

  const loadAnalyses = async () => {
    try {
      const sa = await ChartAnalysisEntity.listAnalyses(50);
      setAnalyses((sa || []).map(a => ({ id: a.id, chart_image_url: a.image_url, symbol: a.symbol, created_date: a.created_at, status: 'completed', analysis_result: a.analysis_json })));
    } catch (e) { console.error("Error loading analyses:", e); }
    finally { setIsLoading(false); }
  };

  const applyFilters = () => {
    let f = analyses;
    if (searchTerm) f = f.filter(a => a.symbol?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (statusFilter !== "all") f = f.filter(a => a.status === statusFilter);
    if (trendFilter !== "all") f = f.filter(a => a.analysis_result?.trend_direction === trendFilter);
    setFilteredAnalyses(f);
  };

  const completed = analyses.filter(a => a.status === 'completed');
  const bullish = completed.filter(a => a.analysis_result?.trend_direction === 'bullish');
  const bearish = completed.filter(a => a.analysis_result?.trend_direction === 'bearish');
  const sr = completed.length > 0 ? Math.round((completed.filter(a => a.analysis_result?.confidence_level > 0.7).length / completed.length) * 100) : 0;

  const tx = dark ? 'text-[#F9F5E8]' : 'text-gray-900';
  const mu = dark ? 'text-gray-400' : 'text-gray-500';
  const bg = dark ? 'bg-[#0E0D08]' : 'bg-[#FEFCF3]';
  const inp = `w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border sinput ${dark ? 'bg-[#1a1810] border-[rgba(245,166,35,.2)] text-[#F9F5E8] placeholder:text-gray-600' : 'bg-white border-[rgba(245,166,35,.25)] placeholder:text-gray-400 text-gray-900'}`;

  const statCards = [
    { val: analyses.length, lbl: t('history.totalAnalyses', { ns: 'dashboard' }), icon: BarChart3, c: '#F5A623' },
    { val: bullish.length, lbl: t('history.bullishSignals', { ns: 'dashboard' }), icon: TrendingUp, c: '#34d399' },
    { val: bearish.length, lbl: t('history.bearishSignals', { ns: 'dashboard' }), icon: TrendingDown, c: '#f87171' },
    { val: completed.length, lbl: t('history.completed', { ns: 'dashboard' }), icon: CheckCircle, c: '#a78bfa' },
    { val: `${sr}%`, lbl: t('history.successRate', { ns: 'dashboard' }), icon: Target, c: '#fb923c' },
  ];

  return (
    <div className={`hy min-h-screen ${bg} ${tx} relative overflow-hidden`}>
      <style>{CSS}</style>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="dorb absolute w-[450px] h-[450px] rounded-full -top-40 -left-28" style={{ background: dark ? 'radial-gradient(circle,rgba(245,166,35,.09) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(245,166,35,.06) 0%,transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} className="mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-2" style={{ background: 'rgba(245,166,35,.1)', border: '1px solid rgba(245,166,35,.25)', color: '#F5A623' }}>
            <HistoryIcon size={11} />History
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ background: 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('history.title', { ns: 'dashboard' })}
          </h1>
          <p className={`mt-1 text-xs sm:text-sm ${mu}`}>{t('history.subtitle', { ns: 'dashboard' })}</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07, duration: .4 }}>
              <DCard dark={dark} className="sc p-3 sm:p-4 text-center cursor-default">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2" style={{ background: `${s.c}18` }}>
                  <s.icon size={14} style={{ color: s.c }} />
                </div>
                <div className="text-lg sm:text-xl font-extrabold mb-0.5" style={{ color: s.c }}>{s.val}</div>
                <div className={`text-[10px] sm:text-xs ${mu}`}>{s.lbl}</div>
              </DCard>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .4 }} className="mb-4 sm:mb-5">
          <DCard dark={dark} className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group flex items-center">
                <Search size={16} style={{ color: '#F5A623', position: 'absolute', left: 12, pointerEvents: 'none', zIndex: 1 }} />
                <input
                  placeholder={t('history.searchPlaceholder', { ns: 'dashboard' })}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${inp} !pl-10`}
                />
              </div>
              <FilterTabs statusFilter={statusFilter} trendFilter={trendFilter} onStatusChange={setStatusFilter} onTrendChange={setTrendFilter} />
            </div>
          </DCard>
        </motion.div>

        {/* Results */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .4 }}>
          {isLoading ? (
            <DCard dark={dark} className="p-12 text-center">
              <div className="w-10 h-10 rounded-full border-2 border-t-transparent mx-auto mb-4 animate-spin" style={{ borderColor: 'rgba(245,166,35,.3)', borderTopColor: '#F5A623' }} />
              <p className={`text-sm ${mu}`}>{t('history.loading', { ns: 'dashboard' })}</p>
            </DCard>
          ) : filteredAnalyses.length === 0 ? (
            <DCard dark={dark} className="p-12 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,166,35,.08)' }}>
                <HistoryIcon size={24} style={{ color: '#F5A623', opacity: .5 }} />
              </div>
              <h3 className={`font-bold text-base mb-1 ${tx}`}>
                {analyses.length === 0 ? t('history.noAnalysesYet', { ns: 'dashboard' }) : t('history.noResultsFound', { ns: 'dashboard' })}
              </h3>
              <p className={`text-sm ${mu}`}>
                {analyses.length === 0 ? t('history.startAnalyzing', { ns: 'dashboard' }) : t('history.adjustFilters', { ns: 'dashboard' })}
              </p>
            </DCard>
          ) : (
            <div className="grid gap-4">
              {filteredAnalyses.map((analysis, i) => (
                <AnalysisCard key={analysis.id} analysis={analysis} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}