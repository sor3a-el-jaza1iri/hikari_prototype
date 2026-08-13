import React from 'react';
import { Facebook, Twitter } from 'lucide-react';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 h-[380px] w-full bg-obsidian text-offwhite border-t border-white/10 font-sans flex flex-col justify-between p-6 md:p-12">
      {/* Background Layer */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 my-auto">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-6 text-center">
          
          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-offwhite drop-shadow-[0_0_12px_rgba(115,8,0,0.4)]">
              Get in Touch
            </h3>

            <address className="not-italic text-sm space-y-2 tracking-wide text-steel">
              <p className="hover:text-offwhite transition-colors">
                <span className="text-steel/60 uppercase text-xs font-mono block mb-1">PHONE</span>
                <a href="tel:+213554733576" className="inline-block font-mono text-offwhite hover:text-hikari-red-hot transition-colors hover:underline">
                  +213 123 45 67 89
                </a>
              </p>
              <p className="hover:text-offwhite transition-colors">
                <span className="text-steel/60 uppercase text-xs font-mono block mb-1">EMAIL</span>
                <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" className="font-mono text-offwhite hover:text-hikari-red-hot transition-colors hover:underline">
                  hikariworld@gmail.com
                </a>
              </p>
            </address>

            <div className="grid grid-cols-4 gap-4 w-full max-w-xs mx-auto pt-2">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "https://www.youtube.com/watch?v=Aq5WXmQQooo", label: "Facebook" },
                { icon: <Twitter className="h-5 w-5" />, href: "https://www.youtube.com/watch?v=Aq5WXmQQooo", label: "Twitter" },
                { icon: <FaWhatsapp className="h-5 w-5" />, href: "https://www.youtube.com/watch?v=Aq5WXmQQooo", label: "WhatsApp" },
                { icon: <FaTelegram className="h-5 w-5" />, href: "https://www.youtube.com/watch?v=Aq5WXmQQooo", label: "Telegram" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center p-3 border border-white/10 text-steel hover:text-offwhite hover:border-hikari-red hover:bg-hikari-red/10 transition-all duration-300"
                >
                  <span className="sr-only">{item.label}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-4 text-center text-xs tracking-widest text-steel/60 uppercase font-mono">
          <p>© {new Date().getFullYear()} Hikari Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}