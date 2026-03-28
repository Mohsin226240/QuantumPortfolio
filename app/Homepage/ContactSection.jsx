"use client";

import React from "react";
import {
  MapPin, Phone, Mail, Headphones, MessageSquare, Send,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection({ contactForm, setContactForm, contactLoading, handleContactSubmit }) {
  const tp = "text-slate-900";
  const ts = "text-slate-500";

  return (
    <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white transition-colors duration-500`}>
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)", filter: "blur(35px)" }} />
      <div className="max-w-[1320px] mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className={`text-4xl lg:text-5xl font-bold ${tp} mb-3`}>Contact <span style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Us</span></h2>
          <p className={`text-base ${ts} max-w-lg mx-auto`}>Have a question? Reach out and we'll respond within 24 hours.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-3">
            {[
              { icon: MapPin, title: "Our Office", info: "123 Financial District", sub: "London, UK EC2V 8RF" },
              { icon: Phone, title: "Call Us", info: "+44 (0) 20 7946 0800", sub: "Mon–Fri, 9am–6pm GMT" },
              { icon: Mail, title: "Email Us", info: "support@elitefusion.com", sub: "Response within 24 hours" },
              { icon: Headphones, title: "Live Support", info: "24/7 Live Chat", sub: "Instant help, always online" },
            ].map(({ icon: Icon, title, info, sub }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                <div className="group flex items-center gap-4 p-5 rounded-2xl cursor-default transition-all duration-500"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d1fae5",
                    boxShadow: "0 2px 8px rgba(16,185,129,0.06)",
                  }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = "0 10px 32px rgba(16,185,129,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#6ee7b7"; }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(16,185,129,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#d1fae5"; }}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-emerald-500/20"
                    style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#059669", marginBottom: 2 }}>{title}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{info}</p>
                    <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:col-span-3">
            <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)",
                border: "1px solid #d1fae5",
                boxShadow: "0 20px 60px rgba(16,185,129,0.08)",
              }}>
              <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)" }} />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25"
                    style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}>
                    <MessageSquare className="h-[18px] w-[18px] text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${tp}`}>Send a Message</h3>
                    <p className={`text-xs ${ts}`}>We'll get back to you within 24 hours</p>
                  </div>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[{ id: "cn", name: "name", label: "Full Name", type: "text", ph: "John Doe" }, { id: "ce", name: "email", label: "Email Address", type: "email", ph: "john@example.com" }].map(({ id, name, label, type, ph }) => (
                      <div key={name}>
                        <label htmlFor={id} className={`block text-[10px] font-bold uppercase tracking-widest ${ts} mb-1.5`}>{label}</label>
                        <input type={type} id={id} name={name} value={contactForm[name]} onChange={e => setContactForm(p => ({ ...p, [e.target.name]: e.target.value }))} required placeholder={ph}
                          className="contact-input w-full px-4 py-3 rounded-xl text-sm"
                          style={{ border: "1px solid #d1fae5", background: "rgba(16,185,129,0.02)", color: "#1e293b" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="cs" className={`block text-[10px] font-bold uppercase tracking-widest ${ts} mb-1.5`}>Subject</label>
                    <input type="text" id="cs" name="subject" value={contactForm.subject} onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))} required placeholder="How can we help you?"
                      className="contact-input w-full px-4 py-3 rounded-xl text-sm"
                      style={{ border: "1px solid #d1fae5", background: "rgba(16,185,129,0.02)", color: "#1e293b" }} />
                  </div>
                  <div>
                    <label htmlFor="cm" className={`block text-[10px] font-bold uppercase tracking-widest ${ts} mb-1.5`}>Message</label>
                    <textarea id="cm" name="message" value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))} required rows={5} placeholder="Tell us more about your inquiry..."
                      className="contact-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                      style={{ border: "1px solid #d1fae5", background: "rgba(16,185,129,0.02)", color: "#1e293b" }} />
                  </div>
                  <button type="submit" disabled={contactLoading}
                    className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-xl shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #059669, #0d9488)", border: "none", cursor: contactLoading ? "not-allowed" : "pointer" }}>
                    {contactLoading ? <span>Sending Message...</span> : <><span>Send Message</span><Send className="h-[15px] w-[15px]" /></>}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
