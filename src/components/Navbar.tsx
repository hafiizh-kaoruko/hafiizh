import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaMoon, FaSun, FaTerminal } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { AppLink } from '../context/RouterContext';

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-theme-card text-theme-accent border border-theme hover:scale-110 transition-transform"
      title={theme === 'dark' ? 'Pindah ke Bumi' : 'Pindah ke Luar Angkasa'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Desain', href: '#designs' },
    { name: 'Mission Log', href: '/mission-log' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-theme-main/70 backdrop-blur-lg border-b border-theme/50 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <AppLink href="/" className="flex items-end group relative overflow-hidden">
            <span className="text-2xl font-bold tracking-tighter text-theme-main group-hover:text-theme-accent transition-colors duration-300">
              Hafz
            </span>
            <span className="text-2xl font-bold tracking-tighter text-theme-accent group-hover:text-theme-main transition-colors duration-300">
              Dev
            </span>
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_forwards] pointer-events-none" />
          </AppLink>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-theme-muted">
            {navLinks.map((link) => (
              <li key={link.name}>
                <AppLink
                  href={link.href}
                  className="relative py-2 group hover:text-theme-main transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-theme-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out rounded-full" />
                </AppLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
              title="Buka Terminal"
              className="text-theme-muted hover:text-green-400 transition-colors duration-200"
            >
              <FaTerminal className="text-lg" />
            </button>
            <ThemeToggle />
            <a
              href="/cv.pdf"
              download="CV.pdf"
              onClick={handleDownload}
              className="text-sm font-medium text-theme-main hover:text-theme-accent transition-colors duration-200 flex items-center gap-1 group cursor-pointer"
            >
              Downlaod CV
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div className="md:hidden flex items-center gap-6 z-50">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="text-theme-main focus:outline-none p-2"
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span
                  className={`h-[1.5px] w-full bg-theme-main transition-all duration-300 origin-left ${
                    menuOpen ? 'rotate-45 translate-y-[8px]' : ''
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full bg-theme-main transition-all duration-300 ${
                    menuOpen ? 'opacity-0 translate-x-3' : ''
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full bg-theme-main transition-all duration-300 origin-left ${
                    menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 w-full bg-theme-main/95 backdrop-blur-xl border-b border-theme shadow-2xl"
            >
              <ul className="flex flex-col py-4 px-6 gap-2 text-sm font-medium text-theme-muted">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx + 0.1 }}
                  >
                    <AppLink
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 hover:text-theme-main transition-colors"
                    >
                      {link.name}
                    </AppLink>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 pb-4 border-t border-theme/50 mt-2"
                >
                  <a
                    href="/cv.pdf"
                    download="CV.pdf"
                    onClick={() => {
                      handleDownload();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 text-theme-main hover:text-theme-accent transition-colors"
                  >
                    Download CV →
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-2"
                >
                  <button
                    onClick={() => {
                      window.dispatchEvent(new Event('toggle-terminal'));
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
                  >
                    <FaTerminal /> Buka Terminal
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-theme-card border border-theme/50 text-theme-main px-5 py-3 rounded-xl shadow-2xl z-[100] flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm font-medium">CV sedang diunduh...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
