import React from 'react';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-border-light dark:border-white/10 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          <div className="col-span-1 sm:col-span-2">
            <a
              href="#"
              className="text-2xl font-bold tracking-tighter text-text-light dark:text-white mb-6 block">

              QuantumByte<span className="text-cyan-400">.AGENCY</span>
            </a>
            <p className="text-gray-600 dark:text-gray-500 max-w-sm">
              A digital design agency crafting immersive experiences for the
              modern web. We build the future, one pixel at a time.
            </p>
          </div>

          <div>
            <h4 className="text-text-light dark:text-white font-bold mb-6">Sitemap</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="#services"
                  className="hover:text-cyan-400 transition-colors">

                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="hover:text-cyan-400 transition-colors">

                  Work
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-cyan-400 transition-colors">

                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-cyan-400 transition-colors">

                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-light dark:text-white font-bold mb-6">Socials</h4>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) =>
              <a
                key={i}
                href="#"
                className="p-3 rounded-full bg-gray-200 dark:bg-white/5 border border-border-light dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-text-light dark:hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all">

                  <Icon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border-light dark:border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-600">
          <p>© 2024 QuantumByte Agency. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}