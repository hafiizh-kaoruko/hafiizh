import { useEffect, useState } from 'react';
import { marked } from 'marked';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaGithub,
  FaStar,
} from 'react-icons/fa';
import { AppLink } from '../context/RouterContext';
import { PROJECTS_DATA } from '../data/portfolioData';

function formatIndonesianDate(iso: string): string {
  try {
    const date = new Date(iso);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function sanitizeHtml(rawHtml: string): string {
  return rawHtml
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const fallback = PROJECTS_DATA.find((p) => p.slug === slug);

  const [repoData, setRepoData] = useState({
    name: fallback?.title || slug.replace(/-/g, ' '),
    description: fallback?.desc || 'Tidak ada deskripsi.',
    html_url: fallback?.gh || `https://github.com/qanziz47-coder/${slug}`,
    homepage: fallback?.demo || null,
    language: fallback?.lang || 'Code',
    stargazers_count: fallback?.stars ?? 0,
    forks_count: fallback?.forks ?? 0,
    updated_at: fallback?.updatedAt || '2026-10-14',
    cover:
      fallback?.img && !fallback.img.includes('opengraph.githubassets.com')
        ? fallback.img
        : 'https://placehold.co/1200x600/151A2A/38BDF8?text=Project+Image',
  });
  const [readmeHtml, setReadmeHtml] = useState<string>('');
  const [loadingReadme, setLoadingReadme] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    fetch(`https://api.github.com/repos/qanziz47-coder/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!active || !json) return;
        setRepoData((prev) => ({
          ...prev,
          name: (json.name || prev.name).replace(/-/g, ' '),
          description: json.description || prev.description,
          html_url: json.html_url || prev.html_url,
          homepage: json.homepage || prev.homepage,
          language: json.language || prev.language,
          stargazers_count: json.stargazers_count ?? prev.stargazers_count,
          forks_count: json.forks_count ?? prev.forks_count,
          updated_at: json.updated_at || prev.updated_at,
        }));
      })
      .catch(() => {});

    const fetchReadme = async () => {
      setLoadingReadme(true);
      const branches = ['main', 'master'];
      let mdText = '';
      for (const branch of branches) {
        try {
          const res = await fetch(
            `https://raw.githubusercontent.com/qanziz47-coder/${slug}/${branch}/README.md`
          );
          if (res.ok) {
            mdText = await res.text();
            break;
          }
        } catch {
          // Try next branch
        }
      }
      if (!active) return;
      if (mdText) {
        const parsed = await marked.parse(mdText);
        setReadmeHtml(sanitizeHtml(parsed));
      } else {
        const fallbackMd = `# ${fallback?.title || slug}\n\n${
          fallback?.desc || 'Tidak ada dokumentasi README tersedia untuk repositori ini.'
        }\n\n## Detail Repositori\n\n- **Bahasa**: ${fallback?.lang || '-'}\n- **GitHub**: [${
          fallback?.gh || `https://github.com/qanziz47-coder/${slug}`
        }](${fallback?.gh || `https://github.com/qanziz47-coder/${slug}`})`;
        const parsed = await marked.parse(fallbackMd);
        setReadmeHtml(sanitizeHtml(parsed));
      }
      setLoadingReadme(false);
    };

    fetchReadme();
    return () => {
      active = false;
    };
  }, [slug, fallback]);

  return (
    <main className="min-h-screen bg-theme-main text-theme-main py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <AppLink
          href="/#projects"
          className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-accent mb-10 transition font-semibold"
        >
          <FaArrowLeft /> Kembali ke Portfolio
        </AppLink>

        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold capitalize mb-4">
            {repoData.name}
          </h1>
          <p className="text-xl text-theme-muted leading-relaxed max-w-3xl">
            {repoData.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <a
            href={repoData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-theme-accent text-white px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:opacity-80 transition"
          >
            <FaGithub /> Lihat Kode di GitHub
          </a>
          {repoData.homepage && (
            <a
              href={repoData.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-theme-card border border-theme text-theme-main px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:border-theme-accent transition"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-theme-card p-6 rounded-xl border border-theme flex flex-col items-center justify-center text-center">
            <FaCodeBranch className="text-2xl text-theme-accent mb-2" />
            <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Bahasa</p>
            <p className="font-bold text-lg">{repoData.language}</p>
          </div>
          <div className="bg-theme-card p-6 rounded-xl border border-theme flex flex-col items-center justify-center text-center">
            <FaStar className="text-2xl text-yellow-500 mb-2" />
            <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Stars</p>
            <p className="font-bold text-lg">{repoData.stargazers_count}</p>
          </div>
          <div className="bg-theme-card p-6 rounded-xl border border-theme flex flex-col items-center justify-center text-center">
            <FaCodeBranch className="text-2xl text-theme-accent mb-2" />
            <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Forks</p>
            <p className="font-bold text-lg">{repoData.forks_count}</p>
          </div>
          <div className="bg-theme-card p-6 rounded-xl border border-theme flex flex-col items-center justify-center text-center">
            <FaCalendarAlt className="text-2xl text-theme-accent mb-2" />
            <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Update Terakhir</p>
            <p className="font-bold text-sm">{formatIndonesianDate(repoData.updated_at)}</p>
          </div>
        </div>

        <div className="w-full h-64 md:h-[400px] bg-theme-card rounded-xl border border-theme overflow-hidden relative mb-12">
          <img
            src={repoData.cover}
            alt={slug}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-theme-card border border-theme p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-theme-main mb-6 border-b border-theme pb-4">
            Dokumentasi Proyek
          </h3>
          {loadingReadme ? (
            <div className="text-theme-muted animate-pulse">Memuat dokumentasi README...</div>
          ) : (
            <div
              className="prose prose-invert max-w-none text-theme-muted"
              dangerouslySetInnerHTML={{ __html: readmeHtml }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
