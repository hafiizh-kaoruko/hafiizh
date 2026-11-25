import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { FaChevronDown } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
          if (text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          setText(currentWord.substring(0, text.length + 1));
          if (text === currentWord) {
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="inline-flex items-center">
      {text}
      <span className="w-[3px] h-[1em] bg-blue-400 ml-1 animate-[blink_1s_step-end_infinite]" />
    </span>
  );
}

function ParallaxBackground({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = 1.5 * Math.random() + 0.5;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.fill();
      }
    }

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 100 }, () => new Particle(canvas.width, canvas.height));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 100) * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - mdist / 150) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
    />
  );
}

function BirthdayModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, rotateX: 20 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, y: 50, rotateX: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-lg bg-[#1a120b] border-2 border-[#d4af37] rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.3)] p-8 text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]" />
            <div className="text-6xl mb-4 animate-bounce">🎁</div>
            <h2 className="text-3xl font-serif font-bold text-[#fcd34d] mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              Undangan Spesial
            </h2>
            <p className="text-gray-400 font-mono text-sm mb-6 uppercase tracking-widest">
              Special Event • 2026
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Sebuah Medieval magic telah disiapkan. Di dalamnya tersimpan kenangan, harapan, dan
              kejutan yang hanya bisa dibuka pada waktunya.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => (window.location.href = 'https://event.hafzdev.web.id/')}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-500 hover:to-yellow-600 text-white font-bold tracking-widest rounded-sm shadow-lg transition-all duration-300"
              >
                BUKA GULUNGAN TAKDIR
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Nanti Saja
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('hasSeenBirthdayModal')) {
      const timer = setTimeout(() => {
        setModalOpen(true);
        sessionStorage.setItem('hasSeenBirthdayModal', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#1a153b] to-[#0B0F19]"
    >
      <ConstellationCanvas />

      <ParallaxBackground>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #88ccff 1.5px, transparent 1.5px)',
            backgroundSize: '100px 100px',
            backgroundPosition: '20px 20px',
          }}
        />

        {/* Shooting Stars */}
        <div
          className="absolute top-[10%] left-[20%] h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shooting_4s_ease-out_infinite]"
          style={{ animationDelay: '0s', transform: 'rotate(-45deg)' }}
        />
        <div
          className="absolute top-[40%] left-[70%] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[shooting_5s_ease-out_infinite]"
          style={{ animationDelay: '2s', transform: 'rotate(-45deg)' }}
        />
        <div
          className="absolute top-[20%] left-[80%] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-[shooting_3.5s_ease-out_infinite]"
          style={{ animationDelay: '4s', transform: 'rotate(-45deg)' }}
        />
        <div
          className="absolute top-[60%] left-[10%] h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-[shooting_6s_ease-out_infinite]"
          style={{ animationDelay: '1s', transform: 'rotate(-45deg)' }}
        />

        {/* Earth */}
        <div className="absolute top-20 right-[-100px] w-[400px] h-[400px] rounded-full animate-[drift_20s_ease-in-out_infinite] group cursor-help z-0">
          <div
            className="absolute inset-0 rounded-full blur-sm opacity-60 shadow-[0_0_100px_rgba(59,130,246,0.5)]"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, #22c55e 0%, transparent 40%), radial-gradient(circle at 70% 60%, #15803d 0%, transparent 45%), radial-gradient(circle at 40% 80%, #4ade80 0%, transparent 35%), linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
            }}
          />
          <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-green-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              🌍 Bumi (Tempatku Belajar)
            </div>
          </div>
        </div>

        {/* Saturn */}
        <div className="absolute top-[15%] left-[5%] w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-full opacity-60 shadow-[0_0_30px_rgba(250,204,21,0.4)] [perspective:500px] animate-[float_6s_ease-in-out_infinite] group cursor-help">
          <div className="absolute top-1/2 left-1/2 w-40 h-6 border-2 border-yellow-600/50 rounded-[50%] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(70deg)] animate-[spin_10s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-yellow-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              🪐 Saturnus (Cincinnya Keren!)
            </div>
          </div>
        </div>

        {/* Mars */}
        <div className="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-full animate-[wander_12s_ease-in-out_infinite] group cursor-help">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-900 opacity-60 shadow-[0_0_40px_rgba(220,38,38,0.5)] blur-[1px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-red-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              🔴 Mars (Planet Merah)
            </div>
          </div>
        </div>

        {/* Jupiter */}
        <div className="absolute top-[50%] right-[5%] w-40 h-40 rounded-full animate-[float_8s_ease-in-out_infinite] group cursor-help">
          <div className="absolute inset-0 rounded-full overflow-hidden blur-[1px] opacity-40 shadow-[0_0_40px_rgba(234,179,8,0.3)]">
            <div className="w-full h-full bg-gradient-to-b from-yellow-100 via-orange-300 to-yellow-600" />
            <div className="absolute top-1/4 w-full h-2 bg-orange-800/30" />
            <div className="absolute top-1/2 w-full h-3 bg-orange-900/40" />
            <div className="absolute top-3/4 w-full h-2 bg-orange-800/30" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-orange-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              🟠 Jupiter (Raksasa Gas)
            </div>
          </div>
        </div>

        {/* Ice Planet */}
        <div className="absolute bottom-[10%] right-[20%] w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-400 rounded-full opacity-70 shadow-[0_0_25px_rgba(34,211,238,0.6)] animate-[float_4s_ease-in-out_infinite] group cursor-help">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-cyan-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              ❄️ Planet Es
            </div>
          </div>
        </div>

        {/* Purple Planet */}
        <div className="absolute top-[45%] left-[15%] w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full opacity-50 shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-[drift_10s_ease-in-out_infinite] group cursor-help">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-purple-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              🟣 Planet Ungu Misterius
            </div>
          </div>
        </div>

        {/* Station */}
        <div className="absolute top-[25%] left-[45%] opacity-30 animate-[spin_30s_linear_infinite] hidden md:block group cursor-help">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
            <circle cx="12" cy="12" r="3" fill="#0B0F19" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <div className="bg-theme-card/90 backdrop-blur-md border border-blue-500/50 text-theme-main px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap">
              🛰️ Stasiun HafzDev
            </div>
          </div>
        </div>
      </ParallaxBackground>

      {/* Main Hero Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 md:px-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10 relative"
      >
        <ScrollReveal>
          <div className="flex flex-col items-start">
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              ✦ Pertualangan melalui angkasa yang luas
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-2 tracking-tight">
              I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                Fajri
              </span>
            </h1>
            <div className="text-xl md:text-2xl font-mono text-cyan-300 mb-6 h-8 flex items-center">
              <Typewriter
                words={[
                  'beginner coding',
                  'Web developer',
                  'Minecraft Modder',
                  'Ethical Hacking beginner',
                  'IoT Enthusiast',
                  'Desgin Figma',
                ]}
              />
            </div>
            <p className="text-gray-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
              Hallo semuanya, nama aku Fajri seseorang pemula yang sedang belajar pemrograman dan
              membangun website, aplikasi dan juga modifikasi beberapa mod minecarft dan juga
              aplikasi dengan tujuan meningkatkan skill dan juga Pengalaman saya di dalam
              pengembangan software komputer.
            </p>
            <div className="flex flex-wrap items-center gap-4 z-20 relative">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
                <span className="relative z-10">Project Saya</span>
                <svg
                  className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </a>
              <button
                onClick={() => (window.location.href = 'https://event.hafzdev.web.id/')}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
                <span className="relative z-10">🎁 Event Ulang Tahun</span>
              </button>
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-gray-300 hover:text-white font-semibold py-3.5 px-6 rounded-full transition-colors duration-300"
              >
                Tentang diri saya
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Avatar Orbital Flip Card */}
        <div className="relative flex justify-center items-center h-[400px] md:h-[500px] [perspective:1000px] z-10 mt-10 md:mt-0">
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-[2px] md:border-[3px] border-blue-500/40 rounded-full animate-[spin3D_10s_linear_infinite] shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
          <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-cyan-500/30 rounded-full animate-[spin3DReverse_15s_linear_infinite]" />
          <div className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] border-2 border-dashed border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] animate-[spin_8s_linear_infinite]">
            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] absolute top-0 left-1/2 -translate-x-1/2" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] absolute bottom-0 left-1/2 -translate-x-1/2" />
            <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)] absolute top-1/2 right-0 -translate-y-1/2" />
          </div>
          <div className="relative w-[220px] h-[220px] md:w-[300px] md:h-[300px] z-10 animate-float">
            <div className="flip-card w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <div className="flip-card-inner">
                <div className="flip-card-front border-4 border-blue-500/50 rounded-full overflow-hidden bg-[#0B0F19]">
                  <img
                    src="/foto-deh.jpeg"
                    alt="Hafz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flip-card-back border-4 border-blue-500/50 rounded-full overflow-hidden bg-[#0B0F19]">
                  <img
                    src="https://github.com/qanziz47-coder.png"
                    alt="Hafz Setup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center gap-1 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 transition-all duration-300 group-hover:bg-black/60 group-hover:border-cyan-400/50">
          <span className="text-sm text-white uppercase tracking-[0.2em] font-black drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,1)]"
          >
            <FaChevronDown size={32} />
          </motion.div>
        </div>
      </motion.div>

      <BirthdayModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
