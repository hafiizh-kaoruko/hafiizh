import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface HistoryItem {
  id: string;
  type: 'input' | 'output';
  text: string;
}

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'init-1', type: 'output', text: 'HafzDev Terminal v1.0.0' },
    { id: 'init-2', type: 'output', text: "Ketik 'help' untuk melihat daftar perintah." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-terminal', handleToggle);
    return () => window.removeEventListener('toggle-terminal', handleToggle);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const rawInput = input;

    setHistory((prev) => [
      ...prev,
      { id: `in-${Date.now()}`, type: 'input', text: `guest@hafzdev:~$ ${rawInput}` },
    ]);
    setInput('');

    setTimeout(() => {
      let response = '';
      switch (cmd) {
        case 'help':
          response =
            'Perintah tersedia:\n- about    : Tentang Fajri\n- skills   : Keahlian yang dikuasai\n- projects : Daftar proyek\n- contact  : Info kontak\n- clear    : Bersihkan layar';
          break;
        case 'about':
          response =
            'Fajri Hafiz (HafzDev) adalah pelajar SMK RPL yang antusias di bidang Web Dev, IoT, dan Cybersecurity. Sedang mendalami Next.js dan Ethical Hacking.';
          break;
        case 'skills':
          response =
            'HTML/CSS (Intermediate), JavaScript (Beginner), PHP/MySQL (Beginner), UI/UX Design (Beginner), IoT (Arduino/ESP32).';
          break;
        case 'projects':
          response =
            "1. Sistem Absensi RFID\n2. Portofolio Website (Next.js)\n3. Mod Minecraft 'Survival Economy'\n4. Desain UI Spotify (Figma)";
          break;
        case 'contact':
          response =
            'WhatsApp: +62 814-0194-1640\nEmail: qanziz47@gmail.com\nGitHub: github.com/qanziz47-coder';
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'sudo':
          response = 'Nice try! Tapi kamu bukan root di sini. 😉';
          break;
        default:
          response = `Perintah '${cmd}' tidak ditemukan. Ketik 'help' untuk bantuan.`;
      }
      setHistory((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: response },
      ]);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 right-4 md:right-10 z-[999] w-[calc(100vw-2rem)] md:w-[450px] h-[400px] bg-[#050810]/95 backdrop-blur-xl border border-green-500/30 rounded-xl shadow-[0_0_40px_rgba(34,197,94,0.15)] flex flex-col overflow-hidden font-mono"
        >
          <div className="bg-[#0B0F19] px-4 py-2 border-b border-green-500/30 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-green-500/70">guest@hafzdev:~</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-green-500/50 hover:text-green-400 text-xs"
            >
              [x]
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto text-sm text-green-400 space-y-2 custom-scrollbar"
          >
            {history.map((item, idx) => (
              <div
                key={item.id || `history-${idx}`}
                className={`whitespace-pre-wrap ${
                  item.type === 'input' ? 'text-white' : 'text-green-400'
                }`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-green-500/30 p-2 flex items-center bg-[#0B0F19]"
          >
            <span className="text-green-500 mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik perintah..."
              autoFocus
              className="flex-1 bg-transparent text-green-300 outline-none placeholder-green-700"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
