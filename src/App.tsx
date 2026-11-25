import { AnimatePresence, motion } from 'motion/react';
import About from './components/About';
import Certificates from './components/Certificates';
import Designs from './components/Designs';
import Experiences from './components/Experiences';
import Footer from './components/Footer';
import GitHubStats from './components/GitHubStats';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Projects from './components/Projects';
import RocketToTop from './components/RocketToTop';
import TechMarquee from './components/TechMarquee';
import TerminalModal from './components/TerminalModal';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import MissionLogPage from './pages/MissionLogPage';
import NowPage from './pages/NowPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function HomePage() {
  return (
    <main className="min-h-screen bg-[#110E1B] text-white font-sans selection:bg-[#E63946] selection:text-white">
      <Navbar />
      <Hero />
      <GitHubStats />
      <TechMarquee />
      <About />
      <Experiences />
      <Projects />
      <Designs />
      <Certificates />
      <Footer />
    </main>
  );
}

function PageContent() {
  const { pathname } = useRouter();

  const renderRoute = () => {
    if (pathname === '/mission-log') {
      return <MissionLogPage />;
    }
    if (pathname === '/now') {
      return <NowPage />;
    }
    if (pathname.startsWith('/projects/')) {
      const slug = decodeURIComponent(pathname.replace('/projects/', '').split('/')[0]);
      return <ProjectDetailPage slug={slug} />;
    }
    return <HomePage />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-grow"
      >
        {renderRoute()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <div className="min-h-screen bg-theme-main text-theme-main font-sans flex flex-col">
          <Preloader />
          <PageContent />
          <TerminalModal />
          <RocketToTop />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
}
