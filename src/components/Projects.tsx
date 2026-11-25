import { FaCodeBranch, FaFolder, FaGithub, FaLaptopCode, FaStar } from 'react-icons/fa';
import { PROJECTS_DATA } from '../data/portfolioData';
import { AppLink } from '../context/RouterContext';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-20 bg-theme-main relative overflow-hidden transition-colors duration-500"
    >
      {/* Background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 text-theme-accent opacity-[0.03] transform rotate-12">
          <FaLaptopCode className="w-[500px] h-[500px]" />
        </div>
        <div className="absolute top-1/4 -right-20 text-theme-accent opacity-[0.03] transform -rotate-12">
          <FaCodeBranch className="w-[400px] h-[400px]" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-theme-accent opacity-[0.03] transform -rotate-6">
          <FaFolder className="w-[300px] h-[300px]" />
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-theme-accent rounded-full filter blur-[150px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold text-theme-main mb-2">Portfolio</h2>
              <div className="w-20 h-1 bg-theme-accent rounded-full mb-4" />
              <p className="text-theme-muted max-w-xl">
                Beberapa proyek yang telah saya kerjakan.
              </p>
            </div>
            <a
              href="https://github.com/qanziz47-coder?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-theme-accent hover:opacity-80 text-white px-6 py-3 rounded-md text-sm font-semibold transition flex items-center gap-2"
            >
              <FaGithub /> All Repositories
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, idx) => (
            <ScrollReveal key={project.slug || idx}>
              <div className="bg-theme-card/90 backdrop-blur-sm rounded-xl border border-theme hover:border-theme-accent transition duration-300 group flex flex-col h-full relative overflow-hidden shadow-lg">
                {/* Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden bg-theme-main">
                  <img
                    src={project.img}
                    alt={project.slug}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.gh}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-theme-accent text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition"
                      title="Lihat Kode"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-2xl text-theme-accent">
                      <FaGithub />
                    </div>
                    <span className="text-xs font-semibold bg-theme-main text-theme-muted px-3 py-1 rounded-full border border-theme">
                      {project.lang}
                    </span>
                  </div>

                  <AppLink href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold text-theme-main mb-2 group-hover:text-theme-accent transition capitalize cursor-pointer">
                      {project.title}
                    </h3>
                  </AppLink>

                  <p className="text-theme-muted text-sm mb-6 line-clamp-3 flex-1">
                    {project.desc}
                  </p>

                  <div className="flex gap-4 text-xs text-theme-muted mb-4">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeBranch /> {project.forks}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-theme">
                    <a
                      href={project.gh}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-theme-main border border-theme hover:border-theme-accent text-theme-main text-center py-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <FaGithub /> Kode
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
