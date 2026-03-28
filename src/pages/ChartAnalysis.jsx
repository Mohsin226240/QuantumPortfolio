import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { ChartAnalysis as ChartAnalysisEntity } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { User } from "@/api/entities";
import { format, isToday } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Brain, Loader2, AlertTriangle, RotateCcw, BarChart3, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UploadZone from "../components/analysis/UploadZone";
import AnalysisResult from "../components/analysis/AnalysisResult";
import LoadingAnalysis from "../components/analysis/LoadingAnalysis";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .ca * { font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
  @keyframes dorb{0%,100%{transform:translate(0,0)}50%{transform:translate(15px,-12px)}} .dorb{animation:dorb 14s ease-in-out infinite;}
  .ctop::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent);}
  .gbtn{transition:transform .2s,box-shadow .2s;} .gbtn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(245,166,35,.5)!important;} .gbtn:active{transform:translateY(0);}
  .obtn{transition:transform .2s,background .2s,border-color .2s;} .obtn:hover{transform:translateY(-2px);}
  .hcard{transition:transform .2s,box-shadow .2s;} .hcard:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(245,166,35,.12);}
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
const TIER_LIMITS = { starter: 10, pro: 50, expert: Infinity };

function DCard({ children, className = '', dark }) {
  return (
    <div className={`ctop relative rounded-2xl border border-[rgba(245,166,35,.18)] ${dark ? 'bg-[#141209]' : 'bg-[#FFFDF5]'} ${className}`}>
      {children}
    </div>
  );
}

export default function ChartAnalysis() {
  const { t } = useTranslation(['dashboard', 'common']);
  const dark = useDark();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try { setUser(await User.me()); }
      catch (e) { console.error("Failed to fetch user:", e); setUser(null); }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const loadAnalyses = async () => {
      try { setHistory(await ChartAnalysisEntity.listAnalyses(200)); }
      catch (_e) {}
    };
    loadAnalyses();
  }, [user]);

  const handleFileUpload = async (file) => {
    try {
      setError(null);
      const { file_url, file_data_url, mime_type } = await UploadFile({ file });
      setUploadedFile({ file, url: file_url, dataUrl: file_data_url, mimeType: mime_type });
    } catch (error) {
      setError(t('chartAnalysis.uploadFailed', { ns: 'dashboard' }));
    }
  };

  const analyzeChart = async () => {
    if (!uploadedFile) { setError(t('chartAnalysis.pleaseUploadFirst', { ns: 'dashboard' })); return; }
    if (!user) { setError(t('chartAnalysis.mustLogin', { ns: 'dashboard' })); return; }
    setIsAnalyzing(true); setError(null);
    try {
      let image_url = uploadedFile.url;
      try {
        const up = await ChartAnalysisEntity.uploadToCloudinary({ file_data_url: uploadedFile.dataUrl, folder: 'OpticScope/charts' });
        image_url = up?.image_url || image_url;
      } catch (_e) {}
      const created = await ChartAnalysisEntity.analyze({ image_url, image_data_url: uploadedFile.dataUrl, symbol: symbol || t('chartAnalysis.unknown', { ns: 'dashboard' }) });
      const updated = { id: created.id, created_at: created.created_at, symbol: created.symbol, chart_image_url: created.image_url, analysis_result: created.analysis_json };
      setAnalysis(updated);
      setHistory(prev => [updated, ...prev]);
      try { setUser(await User.me()); } catch (_e) {}
    } catch (error) {
      setError(t('chartAnalysis.analysisFailed', { ns: 'dashboard', error: error.message || t('chartAnalysis.unknownError', { ns: 'dashboard' }) }));
    } finally { setIsAnalyzing(false); }
  };

  const resetAnalysis = () => { setUploadedFile(null); setAnalysis(null); setError(null); setSymbol(""); };

  const displayTier = user ? (user.role === "admin" ? "expert" : (user.subscription_tier || "starter")) : "starter";
  const currentLimit = TIER_LIMITS[displayTier];
  const analysesUsed = history.filter(h => { try { return isToday(new Date(h.created_at)); } catch (_e) { return false; } }).length;

  const tx = dark ? 'text-[#F9F5E8]' : 'text-gray-900';
  const mu = dark ? 'text-gray-400' : 'text-gray-500';
  const bg = dark ? 'bg-[#0E0D08]' : 'bg-[#FEFCF3]';
  const inputCls = `${dark ? 'bg-[#1a1810] border-[rgba(245,166,35,.25)] text-[#F9F5E8] placeholder:text-gray-600' : 'bg-white border-[rgba(245,166,35,.3)] placeholder:text-gray-400'} focus:border-amber-400 focus:ring-amber-400/20 rounded-xl`;

  return (
    <div className={`ca min-h-screen ${bg} ${tx} relative overflow-hidden`}>
      <style>{CSS}</style>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="dorb absolute w-[450px] h-[450px] rounded-full -top-40 -left-28" style={{ background: dark ? 'radial-gradient(circle,rgba(245,166,35,.09) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(245,166,35,.06) 0%,transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} className="mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-2" style={{ background: 'rgba(245,166,35,.1)', border: '1px solid rgba(245,166,35,.25)', color: '#F5A623' }}>
            <BarChart3 size={11} />Chart Analysis
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('chartAnalysis.title', { ns: 'dashboard' })}
          </h1>
          <p className={`mt-1 text-xs sm:text-sm ${mu}`}>{t('chartAnalysis.subtitle', { ns: 'dashboard' })}</p>
          {user && (
            <p className="mt-1 text-xs" style={{ color: '#F5A623' }}>
              {currentLimit === Infinity
                ? t('chartAnalysis.dailyUsageUnlimited', { ns: 'dashboard', used: analysesUsed })
                : t('chartAnalysis.dailyUsage', { ns: 'dashboard', used: analysesUsed, limit: currentLimit })}
            </p>
          )}
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
            <Alert variant="destructive" className="rounded-xl border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Main content */}
        <AnimatePresence mode="wait">
          {!uploadedFile && !analysis ? (
            <motion.div key="upload" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .3 }}>
              <UploadZone onFileUpload={handleFileUpload} />
            </motion.div>
          ) : isAnalyzing ? (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .3 }}>
              <LoadingAnalysis />
            </motion.div>
          ) : analysis ? (
            <motion.div key="result" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .3 }}>
              <AnalysisResult analysis={analysis} onReset={resetAnalysis} />
            </motion.div>
          ) : (
            <motion.div key="preview" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .3 }}>
              <DCard dark={dark} className="overflow-hidden">
                <div className="p-5 sm:p-6 flex items-center gap-3" style={{ background: dark ? 'rgba(245,166,35,.06)' : 'rgba(245,166,35,.04)', borderBottom: '1px solid rgba(245,166,35,.12)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,.15)' }}>
                    <Brain size={16} style={{ color: '#F5A623' }} />
                  </div>
                  <span className={`font-bold text-sm ${tx}`}>{t('chartAnalysis.readyToAnalyze', { ns: 'dashboard' })}</span>
                </div>
                <div className="p-5 sm:p-6 space-y-5">
                  <div className="flex justify-center">
                    <img src={uploadedFile.url} alt={t('chartAnalysis.uploadedChart', { ns: 'dashboard' })} className="max-w-full max-h-80 rounded-xl object-contain" style={{ border: '1px solid rgba(245,166,35,.2)' }} />
                  </div>
                  <div>
                    <Label className={`text-xs font-semibold mb-1.5 block ${mu}`}>{t('chartAnalysis.dataSymbol', { ns: 'dashboard' })}</Label>
                    <Input id="symbol" placeholder={t('chartAnalysis.dataSymbolPlaceholder', { ns: 'dashboard' })} value={symbol} onChange={(e) => setSymbol(e.target.value)} className={inputCls} />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={analyzeChart} disabled={!user || isAnalyzing} className="gbtn flex-1 py-3 text-sm font-bold rounded-xl text-gray-900 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: G, boxShadow: '0 5px 18px rgba(245,166,35,.38)' }}>
                      {isAnalyzing ? <Loader2 size={15} className="animate-spin" /> : <Brain size={15} />}
                      {t('chartAnalysis.analyzeChart', { ns: 'dashboard' })}
                    </button>
                    <button onClick={resetAnalysis} className={`obtn px-5 py-3 text-sm font-semibold rounded-xl border border-[rgba(245,166,35,.28)] flex items-center justify-center gap-2 ${dark ? 'text-amber-300 hover:bg-[rgba(245,166,35,.08)]' : 'text-amber-700 hover:bg-amber-50'}`}>
                      <RotateCcw size={14} />{t('chartAnalysis.reset', { ns: 'dashboard' })}
                    </button>
                  </div>
                  {!user && (
                    <Alert className="rounded-xl" style={{ background: 'rgba(245,166,35,.08)', border: '1px solid rgba(245,166,35,.2)' }}>
                      <AlertTriangle className="h-4 w-4" style={{ color: '#F5A623' }} />
                      <AlertDescription className={`text-xs ${mu}`}>{t('chartAnalysis.pleaseLogin', { ns: 'dashboard' })}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </DCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .4 }} className="mt-7">
            <DCard dark={dark} className="overflow-hidden">
              <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(245,166,35,.1)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,.1)' }}>
                  <Clock size={14} style={{ color: '#F5A623' }} />
                </div>
                <span className={`font-bold text-sm ${tx}`}>{t('chartAnalysis.previousAnalyses', { ns: 'dashboard' })}</span>
              </div>
              <div className="p-3 sm:p-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {history.map((h) => (
                  <div key={h.id} className={`hcard rounded-xl overflow-hidden border border-[rgba(245,166,35,.12)] cursor-pointer ${dark ? 'bg-[#1a1810]' : 'bg-white'}`}>
                    <div className="aspect-video overflow-hidden bg-[rgba(245,166,35,.05)]">
                      <img src={h.image_url || h.chart_image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2.5">
                      <div className={`text-xs font-semibold truncate mb-0.5 ${tx}`}>{h.symbol || t('chartAnalysis.unknown', { ns: 'dashboard' })}</div>
                      <div className={`text-xs ${mu}`}>{new Date(h.created_at).toLocaleDateString()}</div>
                      <div className={`text-xs mt-1 line-clamp-2 ${mu}`}>{h.analysis_json?.analysis_summary || h.analysis_result?.analysis_summary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </DCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}