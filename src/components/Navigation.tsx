import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[999] px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-gray-100/90 dark:bg-black/70 border border-border-light dark:border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg transition-colors duration-300">
          
          {/* LOGO */}
          <a
            href="#"
            className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white"
          >
            QuantumByte
            <span className="text-cyan-400">.AGENCY</span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-800 dark:text-gray-300 relative group"
                whileHover={{ y: -2, color: "#06b6d4" }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <motion.button
              className="px-6 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 border border-border-light dark:border-white/10 rounded-full text-gray-900 dark:text-white text-sm font-medium transition-all"
              whileHover={{ scale: 1.03 }}
            >
              Start Project
            </motion.button>

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="absolute top-28 left-6 right-6 p-6 backdrop-blur-xl bg-gray-100/95 dark:bg-black/90 border border-border-light dark:border-white/10 rounded-2xl md:hidden flex flex-col space-y-4"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-800 dark:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-xl text-white font-bold">
            Start Project
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
