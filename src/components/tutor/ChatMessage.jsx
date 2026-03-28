import React from "react";
import { Brain, User } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

function useDark() {
  const [d, setD] = React.useState(() => document.documentElement.dataset.theme === 'dark');
  React.useEffect(() => {
    const o = new MutationObserver(() => setD(document.documentElement.dataset.theme === 'dark'));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => o.disconnect();
  }, []);
  return d;
}

const G = 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)';

export default function ChatMessage({ message, index }) {
  const dark = useDark();
  const isUser = message.role === "user";

  const timeStr = (() => {
    try { return format(new Date(message.timestamp), "HH:mm"); }
    catch (_) { return ''; }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * .06, .4) }}
      style={{ display: 'flex', gap: 10, flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}
    >
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser ? G : (dark ? 'rgba(245,166,35,.12)' : 'rgba(245,166,35,.1)'),
        boxShadow: isUser ? '0 3px 10px rgba(245,166,35,.35)' : 'none',
        border: isUser ? 'none' : '1px solid rgba(245,166,35,.2)',
      }}>
        {isUser
          ? <User size={14} style={{ color: '#1a1500' }} />
          : <Brain size={14} style={{ color: '#F5A623' }} />}
      </div>

      {/* Bubble */}
      <div style={{ flex: 1, maxWidth: '80%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isUser
            ? G
            : (dark ? 'rgba(255,255,255,.04)' : '#fff'),
          border: isUser ? 'none' : '1px solid rgba(245,166,35,.16)',
          boxShadow: isUser
            ? '0 4px 14px rgba(245,166,35,.3)'
            : (dark ? '0 2px 8px rgba(0,0,0,.25)' : '0 2px 8px rgba(0,0,0,.06)'),
          color: isUser ? '#1a1500' : (dark ? '#F9F5E8' : '#111'),
          fontSize: 13,
          lineHeight: 1.6,
          wordBreak: 'break-word',
        }}>
          {isUser ? (
            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.content}</p>
          ) : (
            <div style={{ fontSize: 13, lineHeight: 1.65, overflowWrap: 'anywhere' }}
              className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        {timeStr && (
          <span style={{ fontSize: 10, marginTop: 4, color: dark ? '#6b7280' : '#9ca3af' }}>{timeStr}</span>
        )}
      </div>
    </motion.div>
  );
}