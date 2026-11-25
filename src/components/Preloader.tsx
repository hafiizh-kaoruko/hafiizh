import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [spaceVisible, setSpaceVisible] = useState(true);
  const [stage, setStage] = useState<'enter' | 'hover' | 'launch' | 'split'>('enter');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setStage('hover'), 1000);
    const t2 = setTimeout(() => setStage('launch'), 2000);
    const t3 = setTimeout(() => setStage('split'), 2100);
    const t4 = setTimeout(() => setSpaceVisible(false), 2100);
    const t5 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = 'auto';
    }, 3500);

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-center items-center overflow-hidden">
      {/* Left curtain */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#0B0F19] z-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          stage === 'split' ? '-translate-x-full' : 'translate-x-0'
        }`}
      />
      {/* Right curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#0B0F19] z-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          stage === 'split' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Starfield & Planets */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
          spaceVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 opacity-60 animate-[twinkle_4s_ease-in-out_infinite]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div
          className="absolute inset-0 opacity-40 animate-[twinkle_6s_ease-in-out_infinite_reverse]"
          style={{
            backgroundImage: 'radial-gradient(circle, #88ccff 1.5px, transparent 1.5px)',
            backgroundSize: '70px 70px',
            backgroundPosition: '15px 15px',
          }}
        />

        {/* Planet 1 (Red) */}
        <div className="absolute bottom-[10%] left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-500 to-red-900 opacity-80 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-[float_6s_ease-in-out_infinite]" />

        {/* Planet 2 (Jupiter) */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden opacity-70 shadow-[0_0_40px_rgba(234,179,8,0.5)] animate-[float_8s_ease-in-out_infinite]">
          <div className="w-full h-full bg-gradient-to-b from-yellow-100 via-orange-300 to-yellow-600" />
          <div className="absolute top-1/4 w-full h-2 bg-orange-800/30" />
          <div className="absolute top-1/2 w-full h-3 bg-orange-900/40" />
          <div className="absolute top-3/4 w-full h-2 bg-orange-800/30" />
        </div>

        {/* Planet 3 (Saturn with ring) */}
        <div className="absolute top-[20%] left-[15%] w-16 h-16 md:w-20 md:h-20 opacity-80 animate-[float_7s_ease-in-out_infinite] [perspective:500px]">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
          <div className="absolute top-1/2 left-1/2 w-32 h-4 md:w-40 md:h-6 border-2 border-yellow-600/50 rounded-[50%] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(70deg)] animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Planet 4 (Ice) */}
        <div className="absolute bottom-[20%] right-[15%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-100 to-blue-400 opacity-80 shadow-[0_0_20px_rgba(34,211,238,0.7)] animate-[float_5s_ease-in-out_infinite]" />

        {/* Planet 5 (Purple) */}
        <div className="absolute top-[45%] right-[5%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-indigo-600 to-purple-900 opacity-70 shadow-[0_0_30px_rgba(139,92,246,0.5)] animate-[float_9s_ease-in-out_infinite]" />

        {/* Planet 6 (Earth) */}
        <div className="absolute top-[40%] left-[5%] w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden opacity-80 shadow-[0_0_25px_rgba(34,197,94,0.5)] animate-[float_7.5s_ease-in-out_infinite]">
          <div
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, #22c55e 0%, transparent 40%),
                radial-gradient(circle at 70% 60%, #15803d 0%, transparent 45%),
                linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)
              `,
            }}
          />
        </div>

        {/* Planet 7 (Moon) */}
        <div className="absolute bottom-[30%] left-[20%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 opacity-70 shadow-[0_0_15px_rgba(156,163,175,0.6)] animate-[float_4s_ease-in-out_infinite]" />

        {/* Planet 8 (Orange) */}
        <div className="absolute bottom-[5%] right-[30%] w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-700 opacity-80 shadow-[0_0_15px_rgba(249,115,22,0.6)] animate-[float_3s_ease-in-out_infinite]" />

        {/* Planet 9 (Blue) */}
        <div className="absolute top-[35%] right-[25%] w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-300 to-blue-700 opacity-70 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[float_5.5s_ease-in-out_infinite]" />
      </div>

      {/* Rocket */}
      <div
        className={`relative z-20 flex flex-col items-center ${
          stage === 'enter'
            ? 'translate-y-[50vh] opacity-0 transition-all duration-1000 ease-out'
            : stage === 'hover'
              ? 'translate-y-0 opacity-100 transition-all duration-500 ease-in-out'
              : stage === 'launch' || stage === 'split'
                ? '-translate-y-[150vh] opacity-100 transition-all duration-[1200ms] ease-[cubic-bezier(0.5,0,0,1)]'
                : ''
        }`}
      >
        <div className={`relative ${stage === 'hover' ? 'animate-[hover_1s_ease-in-out_infinite]' : ''}`}>
          <img
            src="/m.png"
            alt="Rocket"
            width={500}
            height={500}
            className={`object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-300 ${
              stage === 'hover' ? 'drop-shadow-[0_0_30px_rgba(249,115,22,0.8)] scale-110' : ''
            }`}
          />
          <div
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300 ${
              stage === 'launch' || stage === 'split' ? 'scale-y-[2.5] scale-x-150' : ''
            }`}
          >
            <div className="w-6 h-16 bg-gradient-to-t from-transparent via-orange-500/80 to-yellow-200/90 rounded-full blur-md animate-[flame_0.15s_ease-in-out_infinite_alternate]" />
            <div className="w-3 h-8 bg-white blur-sm absolute bottom-0 animate-[flame_0.1s_ease-in-out_infinite_alternate]" />
          </div>
        </div>
      </div>
    </div>
  );
}
