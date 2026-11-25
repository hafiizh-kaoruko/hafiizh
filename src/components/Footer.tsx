import { FaCoffee, FaEnvelope, FaGithub, FaGlobe, FaInstagram, FaReact, FaRocket } from 'react-icons/fa';
import { SiFramer, SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { AppLink } from '../context/RouterContext';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-theme-main pt-32 pb-12 px-6 md:px-20 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background watermarks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -bottom-20 -left-20 text-theme-accent opacity-[0.03] transform -rotate-45">
          <FaRocket className="w-[500px] h-[500px]" />
        </div>
        <div className="absolute top-10 -right-20 text-theme-accent opacity-[0.03] transform rotate-12">
          <FaGlobe className="w-[400px] h-[400px]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-theme-accent rounded-full filter blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-theme-main leading-tight mb-6 tracking-tight">
              Mari Belajar sesuatu <br className="hidden md:block" />
              <span className="text-theme-muted">yang luar biasa.</span>
            </h2>
            <p className="text-theme-muted text-lg max-w-lg leading-relaxed">
              Saat ini aku terbuka untuk peluang dan mempelajari baru, kolaborasi proyek dan
              belajar proyek, atau sekadar berdiskusi tentang teknologi atau sharing!!.
            </p>
          </div>

          <a
            href="https://wa.me/6281401941640"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 text-theme-main font-medium pb-2 transition-colors duration-300"
          >
            Mulai Diskusi
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-theme/50">
              <span className="absolute top-0 left-0 w-0 h-full bg-theme-accent group-hover:w-full transition-all duration-500 ease-out" />
            </span>
          </a>
        </div>

        <div className="w-full h-px bg-theme/50 mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-sm text-theme-muted">
            <span className="text-lg font-bold tracking-tight text-theme-main">
              Hafz<span className="text-theme-muted font-light">Dev</span>
            </span>
            <span className="w-px h-3 bg-theme/50 hidden md:block" />
            <p>© 2026 All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-theme-muted">
            <span>Dibuat dengan</span>
            <SiNextdotjs
              title="Next.js"
              className="text-theme-main text-base hover:text-white transition-colors"
            />
            <FaReact
              title="React"
              className="text-[#61DAFB] text-base hover:scale-110 transition-transform"
            />
            <SiTailwindcss
              title="Tailwind CSS"
              className="text-[#38BDF8] text-base hover:scale-110 transition-transform"
            />
            <SiFramer
              title="Framer Motion"
              className="text-[#F107A3] text-base hover:scale-110 transition-transform"
            />
            <SiTypescript
              title="TypeScript"
              className="text-[#3178C6] text-base hover:scale-110 transition-transform"
            />
          </div>

          <div className="flex items-center gap-6 md:gap-8 text-sm font-medium">
            <a
              href="https://github.com/qanziz47-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-theme-muted hover:text-theme-main transition-colors duration-300"
            >
              <FaGithub className="text-base group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="hidden sm:block">GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/fajri_hafz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-theme-muted hover:text-theme-main transition-colors duration-300"
            >
              <FaInstagram className="text-base group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="hidden sm:block">Instagram</span>
            </a>
            <a
              href="mailto:qanziz47@gmail.com"
              className="group flex items-center gap-2 text-theme-muted hover:text-theme-main transition-colors duration-300"
            >
              <FaEnvelope className="text-base group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="hidden sm:block">Email</span>
            </a>
            <a
              href="https://saweria.co/Hafzdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105"
            >
              <FaCoffee /> Traktir Saya Kopi
            </a>
            <AppLink
              href="/now"
              className="w-12 h-12 bg-theme-main rounded-full flex items-center justify-center text-theme-main text-xl hover:bg-theme-accent hover:text-white transition"
              title="Apa yang sedang saya lakukan?"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </AppLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
