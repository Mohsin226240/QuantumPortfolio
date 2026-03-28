"use client";

import React from "react";
import { MapPin, Phone, Mail, Headphones, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection({ contactForm, setContactForm, contactLoading, handleContactSubmit }) {
  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <img src="/msg.png" alt="Contact us" className="w-32 h-32 mx-auto mb-4 object-contain" draggable={false} />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Get in <span className="text-emerald-500">touch</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Have a question? Reach out and we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -80, y: 60 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 3.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="rounded-2xl p-6 sm:p-8 bg-gray-50 border border-gray-200">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Send a Message</h3>
                  <p className="text-[11px] text-gray-400">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <div className="grid md:grid-cols-2 gap-3.5">
                  {[
                    { name: "name", label: "Full Name", type: "text", ph: "John Doe" },
                    { name: "email", label: "Email Address", type: "email", ph: "john@example.com" },
                  ].map(({ name, label, type, ph }) => (
                    <div key={name}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={contactForm[name]}
                        onChange={e => setContactForm(p => ({ ...p, [e.target.name]: e.target.value }))}
                        required
                        placeholder={ph}
                        className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-300 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-300 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                    required
                    rows={4}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-300 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full py-3 rounded-lg text-white font-bold text-sm bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer border-none"
                >
                  {contactLoading ? "Sending..." : <><span>Send Message</span><Send className="h-3.5 w-3.5" /></>}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 80, y: 60 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 3.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 space-y-3 order-1 lg:order-2"
          >
            {[
              { icon: MapPin, title: "Our Office", info: "123 Financial District", sub: "London, UK EC2V 8RF" },
              { icon: Phone, title: "Call Us", info: "+44 (0) 20 7946 0800", sub: "Mon–Fri, 9am–6pm GMT" },
              { icon: Mail, title: "Email Us", info: "support@elitefusion.com", sub: "Response within 24 hours" },
              { icon: Headphones, title: "Live Support", info: "24/7 Live Chat", sub: "Instant help, always online" },
            ].map(({ icon: Icon, title, info, sub }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 cursor-default hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200 transition-all duration-400">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-0.5">{title}</p>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{info}</p>
                    <p className="text-[11px] text-gray-400">{sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
