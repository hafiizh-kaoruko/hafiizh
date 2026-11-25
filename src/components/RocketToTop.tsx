import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function RocketToTop() {
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    setLaunching(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLaunching(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            ...(launching
              ? { y: -150, opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }
              : {}),
          }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 md:bottom-1 md:right-1 z-[999] group flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-2"
          aria-label="Back to Top"
        >
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-48 md:h-48 transform group-hover:-translate-y-2 transition-transform duration-300">
            <img
              src="/m.png"
              alt="Rocket"
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(56,189,248,1)] transition-all duration-300"
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
