import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  FaCode,
  FaDatabase,
  FaIdCard,
  FaLaptopCode,
  FaMicrochip,
  FaRocket,
  FaShieldAlt,
} from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

export default function Experiences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const experiences = [
    {
      year: '2023',
      title: 'Eksplorasi IoT & Hardware',
      desc: 'Di tahun ini saya mulai mempelajari perangkat keras (hardware), mengeksplorasi Arduino sebagai otak penggerak komponen, servo sebagai perangkat bergerak, dan ESP32 yang dilengkapi WiFi serta Bluetooth sebagai penghubung hardware ke software.',
      icon: <FaMicrochip />,
      planetColor: 'bg-[#38BDF8]',
      ringColor: 'border-[#38BDF8]/50',
    },
    {
      year: '2025',
      title: 'Mulai Belajar Web Development',
      desc: 'Di tahun tersebut saya masuk SMK jurusan RPL (Rekayasa Perangkat Lunak) dan mulai mempelajari dasar-dasar HTML, CSS, dan JavaScript untuk mengawali karir saya menjadi Web Developer.',
      icon: <FaCode />,
      planetColor: 'bg-[#A0A0A0]',
      ringColor: 'border-[#A0A0A0]/50',
    },
    {
      year: '2026',
      title: 'Belajar Backend & Database',
      desc: 'Saya mulai mempelajari PHP dan MySQL, serta membangun sistem informasi dan web sederhana menggunakan PHP dan MySQL sebagai database.',
      icon: <FaDatabase />,
      planetColor: 'bg-[#E6B87D]',
      ringColor: 'border-[#E6B87D]/50',
    },
    {
      year: '2026',
      title: 'Proyek Sistem Absensi RFID',
      desc: 'Saya berkesempatan membangun proyek absensi menggunakan RFID RC522 yang berfungsi untuk absen menggunakan kartu fisik, dipadukan dengan website dan aplikasi Android.',
      icon: <FaIdCard />,
      planetColor: 'bg-[#EF4444]',
      ringColor: 'border-[#EF4444]/50',
    },
    {
      year: 'Masa Depan',
      title: 'Cybersecurity & Ethical Hacking',
      desc: 'Ini adalah cita-cita saya. Saya mulai mendalami keamanan siber dan penetration testing sebagai awal membangun karir masa depan di bidang Cybersecurity. Saya tidak akan terburu-buru menjadi ahli, saya akan belajar memahami dan mengetahui dari sisi keamanan siber.',
      icon: <FaShieldAlt />,
      planetColor: 'bg-[#A855F7]',
      ringColor: 'border-[#A855F7]/50',
    },
  ];

  return (
    <section
      id="experiences"
      className="py-24 px-6 md:px-20 bg-theme-main relative overflow-hidden transition-colors duration-500"
    >
      {/* Watermark icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-theme-accent opacity-[0.03] transform -rotate-12">
          <FaRocket className="w-96 h-96" />
        </div>
        <div className="absolute top-1/3 right-10 text-theme-accent opacity-[0.03] transform rotate-45">
          <FaLaptopCode className="w-80 h-80" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-theme-accent opacity-[0.03] transform rotate-12">
          <FaMicrochip className="w-64 h-64" />
        </div>
        <div className="absolute bottom-10 right-1/4 text-theme-accent opacity-[0.03] transform -rotate-12">
          <FaShieldAlt className="w-72 h-72" />
        </div>
      </div>

      {/* Dotted pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-theme-main mb-2">
              My Experiences
            </h2>
            <div className="w-20 h-1 bg-theme-accent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="relative" ref={containerRef}>
          {/* Static background timeline */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-theme/30 md:-translate-x-1/2" />
          {/* Scroll-driven active timeline */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-theme-accent md:-translate-x-1/2 shadow-[0_0_10px_var(--accent)] z-10"
          />

          {experiences.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const isFlipped = flippedIndex === idx;

            return (
              <ScrollReveal key={idx}>
                <div
                  className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div
                    onClick={() => setFlippedIndex(isFlipped ? null : idx)}
                    className="w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-[45%] h-[250px] md:h-[220px] group [perspective:1000px] cursor-pointer"
                  >
                    <div
                      className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
                        isFlipped
                          ? '[transform:rotateY(180deg)]'
                          : 'md:group-hover:[transform:rotateY(180deg)]'
                      }`}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 bg-theme-card/80 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-theme [backface-visibility:hidden] shadow-lg flex flex-col justify-start">
                        <span className="text-theme-accent font-bold text-sm mb-2 block">
                          {item.year}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-theme-main mb-2">
                          {item.title}
                        </h3>
                        <p className="text-theme-muted text-sm leading-relaxed line-clamp-4 md:line-clamp-5">
                          {item.desc}
                        </p>
                        <span className="md:hidden text-xs text-theme-accent mt-auto pt-2 block font-medium">
                          Ketuk untuk detail →
                        </span>
                      </div>

                      {/* Back */}
                      <div
                        className={`absolute inset-0 ${item.planetColor} bg-opacity-90 p-6 rounded-xl border border-white/20 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg flex flex-col items-center justify-center text-center`}
                      >
                        <div className="text-5xl text-white mb-4 drop-shadow-md">{item.icon}</div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <span className="text-white/80 font-medium text-sm">{item.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Orbital Marker */}
                  <div className="absolute left-4 md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative flex items-center justify-center w-12 h-12">
                      <div
                        className={`absolute w-20 h-8 border-2 rounded-[50%] animate-[spin_5s_linear_infinite] ${item.ringColor}`}
                        style={{ transform: 'rotateX(75deg)' }}
                      />
                      <div
                        className={`w-10 h-10 ${item.planetColor} rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_currentColor] z-10`}
                      >
                        <span className="text-sm drop-shadow-md">{item.icon}</span>
                      </div>
                      <div
                        className={`absolute inset-0 ${item.planetColor} rounded-xl filter blur-md opacity-40`}
                      />
                    </div>
                  </div>

                  <div className="hidden md:block w-[45%]" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
