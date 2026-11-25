import { FaFigma, FaLayerGroup, FaPalette } from 'react-icons/fa';
import { DESIGNS_DATA } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Designs() {
  return (
    <section
      id="designs"
      className="py-24 px-6 md:px-20 bg-theme-main relative overflow-hidden transition-colors duration-500"
    >
      {/* Background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 text-theme-accent opacity-[0.03] transform rotate-12">
          <FaFigma className="w-[450px] h-[450px]" />
        </div>
        <div className="absolute top-1/3 -right-20 text-theme-accent opacity-[0.03] transform -rotate-12">
          <FaPalette className="w-[400px] h-[400px]" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-theme-accent opacity-[0.03] transform rotate-6">
          <FaLayerGroup className="w-[300px] h-[300px]" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-theme-accent rounded-full filter blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold text-theme-main mb-2">UI/UX Design</h2>
              <div className="w-20 h-1 bg-theme-accent rounded-full mb-4" />
              <p className="text-theme-muted max-w-xl">
                Eksplorasi desain antarmuka dan pengalaman pengguna.
              </p>
            </div>
            <a
              href="https://figma.com/@fajri_hafz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-theme-card border border-theme hover:border-theme-accent text-theme-main px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm group"
            >
              <FaFigma className="text-theme-accent group-hover:scale-110 transition-transform" />
              Lihat Profil Figma
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DESIGNS_DATA.map((design, idx) => (
            <ScrollReveal key={idx}>
              <div className="bg-theme-card/90 backdrop-blur-sm rounded-xl border border-theme hover:border-theme-accent transition duration-300 group flex flex-col h-full relative overflow-hidden shadow-lg">
                <div className="relative w-full h-64 md:h-80 overflow-hidden bg-theme-main">
                  <img
                    src={design.image}
                    alt={design.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-theme-main/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <a
                      href={design.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-theme-accent text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition shadow-lg hover:scale-105"
                    >
                      <FaFigma /> Buka di Figma
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-2 mb-3">
                    {design.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs font-semibold bg-theme-main text-theme-accent px-3 py-1 rounded-full border border-theme"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-theme-main mb-2 group-hover:text-theme-accent transition">
                    {design.title}
                  </h3>
                  <p className="text-theme-muted text-sm leading-relaxed flex-1">
                    {design.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
