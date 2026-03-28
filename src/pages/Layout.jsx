import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User, ChartAnalysis as ChartAnalysisEntity } from "@/api/entities";
import { BarChart3, MessageSquare, History, Home, Settings, Shield, CreditCard, Coins, LogOut, Sun, Moon } from "lucide-react";
import CartIcon from "@/components/cart/CartIcon";
import CurrencySelector from "@/components/CurrencySelector";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
  SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { creditPackages as fallbackCreditPackages } from "@/data/packages";
import { serverApi } from '@/api/serverApi';

const navigationItems = [
  { titleKey: "navigation.dashboard", url: createPageUrl("Dashboard"), icon: Home },
  { titleKey: "navigation.chartAnalysis", url: createPageUrl("ChartAnalysis"), icon: BarChart3 },
  { titleKey: "navigation.aiAssistant", url: createPageUrl("AITutor"), icon: MessageSquare },
  { titleKey: "navigation.analysisHistory", url: createPageUrl("History"), icon: History },
];

const G = 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)';

/* Landing-page-matching SVG logo icon */
const ScopeLogo = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#1A180F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5-2.1 2.1M7.6 16.4l-2.1 2.1m0-12.5 2.1 2.1m8.8 8.8 2.1 2.1" />
  </svg>
);

export default function Layout({ children, currentPageName }) {
  const { t } = useTranslation(['dashboard', 'common', 'landing']);
  const location = useLocation();
  const navigate = useNavigate();
  const { addCreditPackage, openCart } = useCart();
  const [user, setUser] = useState(null);
  const isPublicRoute = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/brand-login" || location.pathname === "/reseller-login" || location.pathname === "/pricing" || location.pathname === "/checkout" || currentPageName === 'Login' || currentPageName === 'BrandLogin' || currentPageName === 'ResellerLogin';
  const [loading, setLoading] = useState(!isPublicRoute);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [quickStats, setQuickStats] = useState({ analyses: 0, accuracyPct: 0 });
  const [analysesToday, setAnalysesToday] = useState(0);
  const [creditPackages, setCreditPackages] = useState(fallbackCreditPackages);

  // Dark mode state — set data-theme SYNCHRONOUSLY so child components
  // (like Navbar) read the correct theme on their first render
  const [dark, setDark] = useState(() => {
    let isDark = false;
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        document.documentElement.dataset.theme = saved;
        isDark = saved === 'dark';
      } else {
        isDark = document.documentElement.dataset.theme === 'dark';
      }
    } catch (_) {
      isDark = document.documentElement.dataset.theme === 'dark';
    }

    // Sync Tailwind dark class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return isDark;
  });

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch (_) { }
  };

  useEffect(() => {
    const fetchCreditPackages = async () => {
      try {
        const data = await serverApi.packages.listPublic();
        if (data.creditPackages && data.creditPackages.length > 0) {
          const normalized = data.creditPackages.map(pkg => ({
            ...pkg,
            price: Number(pkg.price),
            credits: pkg.credits === 'unlimited' || pkg.credits === null ? 'unlimited' : Number(pkg.credits),
            unlimited: pkg.credits === 'unlimited' || pkg.credits === null,
          }));
          setCreditPackages(normalized);
        }
      } catch (error) {
        console.error('Failed to fetch credit packages, using fallback:', error);
      }
    };
    fetchCreditPackages();
  }, []);

  const formatPrice = (price, currency = '$') => `${currency}${Number(price).toFixed(2)}`;
  const sortedCreditPackages = [...creditPackages].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  const handleQuickAddCredits = (pkg) => { addCreditPackage(pkg); openCart(); };

  const clearAllCookies = () => {
    try {
      if (typeof document === 'undefined') return;
      const cookies = document.cookie ? document.cookie.split(';') : [];
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
        if (!name) continue;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        try {
          const parts = window.location.hostname.split('.');
          while (parts.length > 1) {
            const domain = `.${parts.join('.')}`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
            parts.shift();
          }
        } catch (_e) { }
      }
    } catch (_e) { }
  };

  const handleLogout = async () => {
    try { await User.logout(); } catch (_e) { }
    clearAllCookies();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        try {
          const serverAnalyses = await ChartAnalysisEntity.listAnalyses(200);
          const analysesCount = Array.isArray(serverAnalyses) ? serverAnalyses.length : 0;
          const completedAnalyses = Array.isArray(serverAnalyses) ? serverAnalyses : [];
          const highConfidenceCount = completedAnalyses.filter(a => a?.analysis_json?.confidence_level > 0.7).length;
          const successRate = completedAnalyses.length > 0 ? Math.round((highConfidenceCount / completedAnalyses.length) * 100) : 0;
          setQuickStats({ analyses: analysesCount, accuracyPct: successRate });
          const today = new Date();
          const todayCount = completedAnalyses.filter(a => {
            try { return new Date(a.created_at).toDateString() === today.toDateString(); } catch (_e) { return false; }
          }).length;
          setAnalysesToday(todayCount);
        } catch (_e) { }
        if (location.pathname === '/login' || location.pathname === '/brand-login') {
          navigate(currentUser.role === 'brand' ? '/brand-dashboard' : '/dashboard');
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [location.pathname]);

  if (loading && !isPublicRoute) {
    return (
      <div className={`w-screen h-screen flex items-center justify-center ${dark ? 'bg-[#0E0D08]' : 'bg-[#FEFCF3]'}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}>
            <ScopeLogo />
          </div>
          <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{t('loading', { ns: 'common' })}</p>
        </div>
      </div>
    );
  }

  if (!user && (location.pathname === "/" || currentPageName === 'Login' || currentPageName === 'BrandLogin' || currentPageName === 'ResellerLogin' || location.pathname === '/login' || location.pathname === '/brand-login' || location.pathname === '/reseller-login' || location.pathname === '/pricing' || location.pathname === '/checkout')) {
    return children;
  }
  if ((currentPageName === 'Login' || currentPageName === 'BrandLogin' || currentPageName === 'ResellerLogin') && !user) return children;
  if (location.pathname === "/") return children;
  const pathLower = (location.pathname || '').toLowerCase();
  if (currentPageName === 'AdminDashboard' || pathLower === '/admin-dashboard' || pathLower.startsWith('/admin-dashboard/')) return children;
  if (currentPageName === 'BrandDashboard' || pathLower === '/brand-dashboard' || pathLower.startsWith('/brand-dashboard/')) return children;

  return (
    <SidebarProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        :root {
          --sb-bg: #FAFAF7;
          --sb-bg2: #F3F1EB;
          --sb-card: rgba(245,166,35,.06);
          --sb-card-h: rgba(245,166,35,.13);
          --sb-border: rgba(245,166,35,.16);
          --sb-border-h: rgba(245,166,35,.42);
          --sb-ink: #1A1710;
          --sb-muted: rgba(26,23,16,.55);
          --sb-muted2: rgba(26,23,16,.35);
          --sb-divider: rgba(245,166,35,.13);
          --sb-overlay: rgba(254,252,243,.76);
        }

        :root[data-theme="dark"], .dark {
          --sb-bg: #0C0B07;
          --sb-bg2: #111009;
          --sb-card: rgba(255,255,255,.04);
          --sb-card-h: rgba(245,166,35,.11);
          --sb-border: rgba(245,166,35,.12);
          --sb-border-h: rgba(245,166,35,.35);
          --sb-ink: rgba(240,234,214,.9);
          --sb-muted: rgba(240,234,214,.5);
          --sb-muted2: rgba(240,234,214,.28);
          --sb-divider: rgba(245,166,35,.1);
          --sb-overlay: rgba(14,13,8,.76);
        }

        .sb-root, .sb-root * { font-family:'Inter',system-ui,-apple-system,sans-serif; box-sizing:border-box; }
        [data-sidebar="sidebar"] { background:var(--sb-bg) !important; color:var(--sb-ink) !important; }
        [data-sidebar="sidebar"] * { font-family:'Inter',system-ui,-apple-system,sans-serif; box-sizing:border-box; }

        /* ── Logo pulse glow (matching landing footer) ── */
        @keyframes sb-pulse { 0%,100%{box-shadow:0 4px 14px rgba(245,166,35,.45)} 50%{box-shadow:0 4px 28px rgba(245,166,35,.75)} }
        @keyframes sb-shimmer { from{left:-60%} to{left:110%} }
        @keyframes sb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes sb-avatar-pulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.7;transform:scale(1.05)} }
        @keyframes sb-online-dot { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 4px rgba(34,197,94,0)} }
        .sb-settings-spin:hover svg { animation: sb-spin-once 0.5s ease; }
        @keyframes sb-spin-once { from{transform:rotate(0deg)} to{transform:rotate(180deg)} }

        /* ── Nav link ── */
        .sb-nav-link {
          position:relative; display:flex; align-items:center; gap:12px;
          padding:11px 16px; border-radius:14px; cursor:pointer;
          transition:all .25s cubic-bezier(.34,1.4,.64,1);
          text-decoration:none; overflow:hidden;
        }
        .sb-nav-link::before {
          content:''; position:absolute; top:0; left:-120%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
          transition:left .5s;
        }
        .sb-nav-link:hover::before { left:160%; }

        .sb-nav-active {
          background:linear-gradient(135deg,#F5A623,#FFCF6B,#E8940A) !important;
          box-shadow:0 5px 22px rgba(245,166,35,.45),inset 0 1px 0 rgba(255,255,255,.3);
          transform:scale(1);
        }
        .sb-nav-active:hover {
          transform:scale(1.02);
          box-shadow:0 8px 28px rgba(245,166,35,.55),inset 0 1px 0 rgba(255,255,255,.3);
        }

        .sb-nav-inactive { background:transparent; }
        .sb-nav-inactive:hover {
          background:var(--sb-card-h);
          transform:translateX(4px);
          box-shadow:0 4px 16px rgba(245,166,35,.08);
        }

        /* ── Stat row ── */
        .sb-stat-row {
          display:flex; align-items:center; justify-content:space-between;
          padding:8px 0;
          transition:all .22s;
        }
        .sb-stat-row:hover { padding-left:4px; }

        /* ── User card ── */
        .sb-user-card {
          display:flex; align-items:center; gap:12px; padding:14px;
          border-radius:16px; position:relative; overflow:hidden;
          transition:all .3s cubic-bezier(.34,1.4,.64,1);
        }
        .sb-user-card:hover { transform:translateY(-2px); }
        .sb-user-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2.5px;
          background:linear-gradient(90deg,transparent,rgba(245,166,35,.55),transparent);
        }

        /* ── Settings / toggle button (matching footer social-btn) ── */
        .sb-icon-btn {
          width:36px; height:36px; border-radius:11px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; border:none;
          transition:all .25s cubic-bezier(.34,1.4,.64,1);
        }
        .sb-icon-btn:hover {
          background:#F5A623 !important; color:#1A1710 !important;
          border-color:#F5A623 !important;
          transform:translateY(-2px) scale(1.08);
          box-shadow:0 8px 24px rgba(245,166,35,.4);
        }

        /* ── Header button ── */
        .sb-hdr-btn {
          position:relative; overflow:hidden;
          transition:all .22s;
        }
        .sb-hdr-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,166,35,.52); }
        .sb-hdr-btn::before {
          content:''; position:absolute; top:0; left:-120%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);
          transition:left .44s;
        }
        .sb-hdr-btn:hover::before { left:160%; }

        /* ── Theme toggle (matching navbar) ── */
        .sb-theme-btn {
          width:36px; height:36px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          background:transparent; color:#F5A623; cursor:pointer;
          transition:all .22s;
        }
        .sb-theme-btn:hover { background:var(--sb-card-h); transform:rotate(20deg); }

        /* ── Plan badge (matching navbar support btn) ── */
        .sb-plan-badge {
          transition:all .22s;
        }
        .sb-plan-badge:hover { border-color:#F5A623 !important; color:#F5A623 !important; background:var(--sb-card-h) !important; transform:translateY(-1px); }

        /* ── Stats card (matching footer StatCard) ── */
        .sb-stats-card {
          border-radius:16px; position:relative; overflow:hidden;
          transition:all .35s cubic-bezier(.34,1.4,.64,1);
        }
        .sb-stats-card:hover {
          border-color:var(--sb-border-h) !important;
          background:var(--sb-card-h) !important;
          transform:translateY(-2px) scale(1.01);
          box-shadow:0 12px 36px rgba(245,166,35,.12);
        }
        .sb-stats-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent);
        }

        /* ── Section label (matching footer column headers) ── */
        .sb-section-label {
          font-size:10px; font-weight:800; letter-spacing:0.1em;
          text-transform:uppercase; color:#F5A623;
          display:flex; align-items:center; gap:8px;
          padding:4px 0 12px 4px;
        }
        .sb-section-label::before {
          content:''; width:16px; height:1.5px; background:#F5A623;
          display:inline-block; border-radius:2px; opacity:0.6;
        }

        /* ── Footer link ── */
        .sb-footer-link { transition:color .2s; }
        .sb-footer-link:hover { color:#F5A623; }
      `}</style>

      <div className="sb-root min-h-screen flex w-full overflow-x-hidden" style={{ background: 'var(--sb-bg)', color: 'var(--sb-ink)' }}>

        {/* ── SIDEBAR ── */}
        <Sidebar className="border-r" style={{ borderColor: 'var(--sb-border)' }}>

          {/* ── Top glow line ── */}
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#F5A623 40%,#FFCF6B 60%,transparent)', opacity: 0.5 }} />

          {/* ── Logo Header ── */}
          <SidebarHeader className="p-5 pb-4" style={{ borderBottom: '1px solid var(--sb-divider)' }}>
            <Link to="/dashboard" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
              <div
                className="transition-all duration-300 group-hover:rotate-[-9deg] group-hover:scale-110"
                style={{
                  width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                  background: 'linear-gradient(135deg,#F5A623,#FFCF6B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'sb-pulse 3s ease-in-out infinite',
                }}
              >
                <ScopeLogo />
              </div>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--sb-ink)', lineHeight: 1 }}>
                  OpticScope<span style={{ color: '#F5A623' }}>AI</span>
                </span>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--sb-muted)', marginTop: 3 }}>
                  {t('navigation.platformSubtitle', { ns: 'dashboard' })}
                </p>
              </div>
            </Link>
          </SidebarHeader>

          {/* ── Content ── */}
          <SidebarContent className="p-3">

            {/* ── Navigation ── */}
            <SidebarGroup>
              <SidebarGroupLabel>
                <div className="sb-section-label" style={{ padding: '8px 4px 12px' }}>
                  {t('navigation.menu', { ns: 'dashboard' })}
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1.5">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname.replace(/-/g, '') === item.url.replace(/-/g, '');
                    return (
                      <SidebarMenuItem key={item.titleKey}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={`sb-nav-link ${isActive ? 'sb-nav-active' : 'sb-nav-inactive'}`}
                          >
                            <item.icon size={18} style={{ color: isActive ? '#1A180F' : '#F5A623', flexShrink: 0 }} />
                            <span style={{
                              fontSize: 14, fontWeight: isActive ? 700 : 500,
                              color: isActive ? '#1A180F' : 'var(--sb-ink)',
                            }}>
                              {t(item.titleKey, { ns: 'dashboard' })}
                            </span>
                            {isActive && (
                              <div style={{
                                marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                                background: '#1A180F', opacity: 0.5,
                              }} />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* ── Quick Stats ── */}
            <SidebarGroup className="mt-5">
              <SidebarGroupLabel>
                <div className="sb-section-label" style={{ padding: '8px 4px 12px' }}>
                  {t('navigation.quickStats', { ns: 'dashboard' })}
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="sb-stats-card mx-1 p-4" style={{ background: 'var(--sb-card)', border: '1px solid var(--sb-border)' }}>
                  {[
                    { label: t('navigation.analyses', { ns: 'dashboard' }), value: quickStats.analyses, color: '#F5A623', icon: '◈' },
                    { label: t('navigation.accuracy', { ns: 'dashboard' }), value: `${quickStats.accuracyPct}%`, color: '#22C55E', icon: '◉' },
                    { label: 'Today', value: analysesToday, color: '#60a5fa', icon: '◆' },
                  ].map((stat, i) => (
                    <React.Fragment key={i}>
                      <div className="sb-stat-row">
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--sb-muted)' }}>
                          <span style={{ color: stat.color, fontSize: 11, opacity: 0.7 }}>{stat.icon}</span>
                          {stat.label}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: stat.color, letterSpacing: '-0.02em' }}>
                          {stat.value}
                        </span>
                      </div>
                      {i < 2 && <div style={{ height: 1, background: 'var(--sb-divider)', margin: '2px 0' }} />}
                    </React.Fragment>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* ── Footer ── */}
          <SidebarFooter className="p-3" style={{ borderTop: '1px solid var(--sb-divider)' }}>
            <div className="sb-user-card" style={{ background: 'var(--sb-card)', border: '1px solid var(--sb-border)' }}>
              {/* Avatar with pulse ring + online dot */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: 14,
                  border: '2px solid rgba(245,166,35,.25)',
                  animation: 'sb-avatar-pulse 3s ease-in-out infinite',
                }} />
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: 'linear-gradient(135deg,#F5A623,#FFCF6B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 3px 12px rgba(245,166,35,.4)',
                  animation: 'sb-float 3s ease-in-out infinite',
                }}>
                  <span style={{ color: '#1A180F', fontWeight: 800, fontSize: 14 }}>{user?.full_name?.[0]?.toUpperCase() || 'U'}</span>
                </div>
                {/* Online dot */}
                <div style={{
                  position: 'absolute', bottom: -1, right: -1,
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#22C55E',
                  border: '2px solid var(--sb-bg)',
                  animation: 'sb-online-dot 2s ease-in-out infinite',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--sb-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.full_name || 'User'}
                </p>
                <p style={{ fontSize: 11, color: 'var(--sb-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'capitalize', marginTop: 1 }}>
                  {user?.subscription_tier || t('navigation.noPackage', { ns: 'dashboard' })} {t('navigation.package', { ns: 'dashboard' })}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="sb-icon-btn sb-settings-spin"
                    style={{ background: 'var(--sb-card)', border: '1px solid var(--sb-border)', color: '#F5A623' }}
                  >
                    <Settings size={15} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem onSelect={() => navigate('/pricing')}>
                    <CreditCard size={14} className="mr-2" />{t('navigation.billingSettings', { ns: 'dashboard' })}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsCreditsOpen(true)}>
                    <Coins size={14} className="mr-2" />{t('navigation.creditsPanel', { ns: 'dashboard' })}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut size={14} className="mr-2" />{t('logout', { ns: 'common' })}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Credits Dialog */}
            <Dialog open={isCreditsOpen} onOpenChange={setIsCreditsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('creditsPanel.title', { ns: 'dashboard' })}</DialogTitle>
                  <DialogDescription>{t('creditsPanel.dialogDescription', { ns: 'dashboard' })}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'var(--sb-muted)' }}>{t('creditsPanel.currentPlan', { ns: 'dashboard' })}</span>
                    <span className="font-semibold capitalize">{user?.subscription_tier || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'var(--sb-muted)' }}>{t('creditsPanel.title', { ns: 'dashboard' })}</span>
                    <span className="font-semibold">
                      {user?.credits_unlimited ? t('creditsPanel.unlimited', { ns: 'dashboard' }) : t('creditsPanel.remaining', { count: Number(user?.credits_balance || 0), ns: 'dashboard' })}
                    </span>
                  </div>
                  <div className="pt-2 text-xs" style={{ color: 'var(--sb-muted)' }}>{t('creditsPanel.manageBilling', { ns: 'dashboard' })}</div>
                  <div className="pt-2">
                    <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sb-muted)' }}>{t('creditsPanel.quickBuy', { ns: 'dashboard' })}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                      {sortedCreditPackages.map((pkg) => (
                        <div key={pkg.id} style={{ background: 'var(--sb-card)', border: '1px solid var(--sb-border)', borderRadius: 14, padding: 12, transition: 'all .25s', cursor: 'pointer' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,.4)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,166,35,.12)' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sb-border)'; e.currentTarget.style.boxShadow = 'none' }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--sb-ink)' }}>{pkg.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--sb-muted)' }}>{pkg.unlimited ? t('creditsPanel.unlimited', { ns: 'dashboard' }) : t('creditsPanel.creditsCount', { count: pkg.credits, ns: 'dashboard' })}</div>
                            </div>
                            <div className="text-right">
                              <div style={{ color: '#F5A623', fontWeight: 800 }}>{formatPrice(pkg.price, pkg.currency)}</div>
                              <Button size="sm" className="mt-2" onClick={(e) => { e.preventDefault(); handleQuickAddCredits(pkg); }}>
                                {t('creditsPanel.add', { ns: 'dashboard' })}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="sb-hdr-btn"
                    style={{ width: '100%', padding: '11px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#F5A623,#FFCF6B)', color: '#1A180F', fontWeight: 800, fontSize: 13, boxShadow: '0 4px 18px rgba(245,166,35,.4)' }}
                    onClick={() => { setIsCreditsOpen(false); navigate('/pricing'); }}
                  >
                    {t('creditsPanel.buyCreditsUpgrade', { ns: 'dashboard' })}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarFooter>
        </Sidebar>

        {/* ── MAIN ── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-20 px-3 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between gap-2" style={{
            background: 'var(--sb-overlay)',
            backdropFilter: 'blur(22px) saturate(1.7)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.7)',
            borderBottom: '1px solid var(--sb-border)',
            boxShadow: dark ? '0 4px 24px rgba(0,0,0,.3)' : '0 4px 24px rgba(245,166,35,.06)',
          }}>
            <div className="flex items-center gap-3">
              <SidebarTrigger
                className="sb-icon-btn"
                style={{ background: 'var(--sb-card)', border: '1px solid var(--sb-border)', color: '#F5A623' }}
              />
              <Link to="/dashboard" className="group hidden sm:flex items-center gap-2" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--sb-ink)' }}>
                  OpticScope<span style={{ color: '#F5A623' }}>AI</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink min-w-0 flex-wrap justify-end">
              {(user?.user_type === 'admin' || user?.role === 'admin') && (
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="sb-hdr-btn flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold rounded-full"
                  style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)', color: '#1A180F', border: 'none', cursor: 'pointer', boxShadow: '0 3px 14px rgba(245,166,35,.36)', whiteSpace: 'nowrap' }}
                >
                  <Shield size={13} />{t('navigation.adminPanel', { ns: 'dashboard' })}
                </button>
              )}
              <CurrencySelector />
              <CartIcon />
              <button
                onClick={toggleDark}
                className="sb-theme-btn"
                style={{ border: '1px solid var(--sb-border)' }}
                title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <span
                className="sb-plan-badge text-xs font-semibold capitalize hidden lg:block px-3 py-1.5 rounded-full cursor-default"
                style={{ background: 'var(--sb-card)', color: 'var(--sb-muted)', border: '1px solid var(--sb-border)', transition: 'all .22s' }}
              >
                {user?.subscription_tier} {t('navigation.plan', { ns: 'dashboard' })}
              </span>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>

          {/* Company info */}
          <div className="text-center py-4 px-6 text-xs" style={{ color: 'var(--sb-muted)' }}>
            <p className="font-semibold">Infolast Ltd</p>
            <p>Company Number – 16261639</p>
            <p>71-75 Shelton Street, Covent Garden, United Kingdom</p>
          </div>

          {/* Footer disclaimer */}
          <footer className="px-6 py-3 text-center text-xs" style={{ borderTop: '1px solid var(--sb-divider)', color: 'var(--sb-muted)' }}>
            {t('footer.disclaimer', { ns: 'landing' })}
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}