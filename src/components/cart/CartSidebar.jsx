import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, ShoppingCart, AlertTriangle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useToast } from '@/components/ui/use-toast';
import { redirectToCheckout } from '@/utils/checkoutRedirect';
import { serverApi } from '@/api/serverApi';
import TransactionBlockedModal from '@/components/TransactionBlockedModal';

export default function CartSidebar({ onNavigateToCheckout, checkoutDisabled }) {
  const {
    isOpen,
    closeCart,
    items,
    totalAmount,
    totalItems,
    removeItem,
    updateQuantity,
    requiresCredits,
    clearCart
  } = useCart();

  const { selectedCurrency, formatPrice: formatCurrencyPrice } = useCurrency();
  const { toast } = useToast();
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect dark mode
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === 'dark' ||
      document.documentElement.classList.contains('dark')
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(
        document.documentElement.dataset.theme === 'dark' ||
        document.documentElement.classList.contains('dark')
      );
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => obs.disconnect();
  }, []);

  // Mount guard for portal
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeCart]);

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) updateQuantity(itemId, newQuantity);
  };

  const handleGoToCheckout = async () => {
    if (requiresCredits) {
      toast({
        title: 'Credit Package Required',
        description: 'Please add a credit package to continue with your purchase.',
        variant: 'destructive'
      });
      return;
    }
    try {
      setIsCheckingStatus(true);
      const status = await serverApi.checkout.checkStatus();
      if (!status || typeof status.allowed === 'undefined') {
        closeCart();
        redirectToCheckout({ items, totalAmount, totalItems }, selectedCurrency);
        return;
      }
      if (!status.allowed) {
        setIsBlocked(true);
        setBlockMessage(status.message || 'Your payment attempts are temporarily blocked. Please try again later.');
        return;
      }
      closeCart();
      redirectToCheckout({ items, totalAmount, totalItems }, selectedCurrency);
    } catch (error) {
      closeCart();
      redirectToCheckout({ items, totalAmount, totalItems }, selectedCurrency);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  if (!mounted) return null;

  const bg = dark ? '#0E0D0A' : '#FFFDF5';
  const borderColor = dark ? 'rgba(245,166,35,0.18)' : 'rgba(245,166,35,0.25)';
  const textColor = dark ? '#F0EAD6' : '#1A1710';
  const mutedColor = dark ? 'rgba(240,234,214,0.5)' : 'rgba(26,23,16,0.55)';
  const cardBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(245,166,35,0.05)';
  const cardBorder = dark ? 'rgba(245,166,35,0.12)' : 'rgba(245,166,35,0.2)';
  const dividerColor = dark ? 'rgba(245,166,35,0.1)' : 'rgba(245,166,35,0.15)';

  const sidebar = (
    <>
      <TransactionBlockedModal isOpen={isBlocked} message={blockMessage} />

      {/* Overlay */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Sidebar panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: 'min(540px, 90vw)',
          background: bg,
          borderLeft: `1px solid ${borderColor}`,
          boxShadow: '-24px 0 64px rgba(0,0,0,0.4)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top gold shimmer line */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(245,166,35,.6),transparent)',
          flexShrink: 0,
        }} />

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${dividerColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingCart size={20} style={{ color: '#F5A623' }} />
            <span style={{
              fontSize: 18,
              fontWeight: 800,
              background: 'linear-gradient(135deg,#F5A623,#FFCF6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Shopping Cart
            </span>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              background: 'rgba(245,166,35,0.15)',
              color: '#F5A623',
              padding: '2px 8px',
              borderRadius: 99,
              border: '1px solid rgba(245,166,35,0.3)',
            }}>
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeCart}
            style={{
              width: 32, height: 32,
              borderRadius: 10,
              border: `1px solid ${borderColor}`,
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#F5A623',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: 12, textAlign: 'center',
            }}>
              <ShoppingCart size={48} style={{ color: mutedColor, opacity: 0.4 }} />
              <p style={{ fontSize: 16, fontWeight: 700, color: textColor }}>Your cart is empty</p>
              <p style={{ fontSize: 13, color: mutedColor }}>Add some packages to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Credit Requirements Warning */}
              {requiresCredits && (
                <div style={{
                  background: 'rgba(245,166,35,0.08)',
                  border: '1px solid rgba(245,166,35,0.3)',
                  borderRadius: 12,
                  padding: '12px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                }}>
                  <AlertTriangle size={16} style={{ color: '#F5A623', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#F5A623' }}>Credit Package Required</p>
                    <p style={{ fontSize: 12, color: mutedColor, marginTop: 4 }}>
                      You need to add a credit package to use your selected plan.
                    </p>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: textColor }}>{item.name}</span>
                        {item.type === 'credits' && (
                          <span style={{
                            fontSize: 11, fontWeight: 700,
                            background: 'rgba(96,165,250,0.15)', color: '#60a5fa',
                            padding: '2px 8px', borderRadius: 99,
                            border: '1px solid rgba(96,165,250,0.3)',
                          }}>
                            {item.credits} Credits
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p style={{ fontSize: 12, color: mutedColor, marginTop: 4 }}>{item.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: 28, height: 28,
                        borderRadius: 8,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: mutedColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginLeft: 8,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = mutedColor; e.currentTarget.style.background = 'transparent'; }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        style={{
                          width: 30, height: 30,
                          borderRadius: 8,
                          border: `1px solid ${borderColor}`,
                          background: cardBg,
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: textColor, transition: 'all 0.2s',
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ minWidth: 28, textAlign: 'center', fontSize: 14, fontWeight: 700, color: textColor }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        style={{
                          width: 30, height: 30,
                          borderRadius: 8,
                          border: `1px solid ${borderColor}`,
                          background: cardBg,
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: textColor, transition: 'all 0.2s',
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: '#F5A623' }}>
                        {formatCurrencyPrice(Number(item.price) * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: 11, color: mutedColor }}>
                          {formatCurrencyPrice(Number(item.price))} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 24px',
            borderTop: `1px solid ${dividerColor}`,
            flexShrink: 0,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 14,
            }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: mutedColor }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#F5A623' }}>
                {formatCurrencyPrice(totalAmount)}
              </span>
            </div>

            <button
              disabled={requiresCredits || isCheckingStatus || checkoutDisabled}
              onClick={handleGoToCheckout}
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: 13,
                border: 'none',
                cursor: (requiresCredits || isCheckingStatus || checkoutDisabled) ? 'not-allowed' : 'pointer',
                background: (requiresCredits || isCheckingStatus || checkoutDisabled)
                  ? 'rgba(245,166,35,0.25)'
                  : 'linear-gradient(135deg,#F5A623,#FFCF6B,#E8940A)',
                color: '#1A180F',
                fontWeight: 800,
                fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: (requiresCredits || isCheckingStatus || checkoutDisabled)
                  ? 'none'
                  : '0 4px 18px rgba(245,166,35,0.4)',
                transition: 'all 0.2s',
                opacity: (requiresCredits || isCheckingStatus || checkoutDisabled) ? 0.6 : 1,
              }}
            >
              <CreditCard size={16} />
              {requiresCredits ? 'Add Credit Package First' : isCheckingStatus ? 'Checking...' : 'Go to Checkout'}
            </button>

            {requiresCredits && (
              <p style={{ fontSize: 11, color: mutedColor, textAlign: 'center', marginTop: 8 }}>
                Please add a credit package to continue
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );

  return createPortal(sidebar, document.body);
}
