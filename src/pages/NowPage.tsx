import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCode, FaGithub, FaTerminal } from 'react-icons/fa';
import { AppLink } from '../context/RouterContext';
import { useLanyard } from '../hooks/useLanyard';

interface LatestRepo {
  name: string;
  description: string | null;
  html_url: string;
}

export default function NowPage() {
  const lanyard = useLanyard('1425746283410489344');
  const [latestRepo, setLatestRepo] = useState<LatestRepo>({
    name: 'website antibullying nextjs',
    description: null,
    html_url: 'https://github.com/qanziz47-coder/website-antibullying-nextjs',
  });

  useEffect(() => {
    fetch('https://api.github.com/users/qanziz47-coder/repos?sort=updated&per_page=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((repos) => {
        if (Array.isArray(repos) && repos.length > 0) {
          setLatestRepo({
            name: repos[0].name.replace(/-/g, ' '),
            description: repos[0].description,
            html_url: repos[0].html_url,
          });
        }
      })
      .catch(() => {
        // Keep extracted fallback repo
      });
  }, []);

  const codingActivity = lanyard?.activities?.find(
    (act) =>
      act.name?.toLowerCase().includes('code') ||
      act.name?.toLowerCase().includes('studio') ||
      act.type === 0
  );

  const isActive = Boolean(codingActivity);

  return (
    <main className="min-h-screen bg-theme-main text-theme-main py-24 px-6 md:px-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <AppLink
          href="/"
          className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-accent mb-10 transition font-semibold"
        >
          <FaArrowLeft /> Kembali ke Beranda
        </AppLink>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
            Mission{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
              Control
            </span>
          </h1>
          <p className="text-theme-muted text-lg max-w-2xl mx-auto">
            Telemetri langsung dari aktivitas coding dan penjelajahan saya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Coding Card */}
          <div className="bg-theme-card/50 backdrop-blur-sm border border-theme p-6 rounded-2xl relative overflow-hidden">
            <div
              className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-20 ${
                isActive ? 'bg-green-500' : 'bg-gray-500'
              }`}
            />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-theme-main flex items-center gap-2">
                <FaCode className="text-theme-accent" /> Status Coding
              </h2>
              <span
                className={`px-2 py-1 text-xs rounded-full border ${
                  isActive
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}
              >
                {isActive ? 'ACTIVE' : 'IDLE'}
              </span>
            </div>
            <p className="text-theme-muted text-sm mb-2">Aktivitas saat ini:</p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-theme-main/50 border border-theme/50">
              <div className="text-2xl text-theme-muted">
                <FaTerminal />
              </div>
              <div>
                <p className="text-theme-main font-semibold">
                  {codingActivity?.name || 'Standby'}
                </p>
                <p className="text-xs text-theme-muted truncate max-w-[200px]">
                  {codingActivity?.details ||
                    codingActivity?.state ||
                    'Tidak ada aktivitas terdeteksi.'}
                </p>
              </div>
            </div>
          </div>

          {/* Latest Repository Card */}
          <div className="bg-theme-card/50 backdrop-blur-sm border border-theme p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-theme-accent rounded-full blur-[50px] opacity-10" />
            <h2 className="text-xl font-bold text-theme-main mb-4 flex items-center gap-2">
              <FaGithub className="text-theme-accent" /> Repositori Terakhir
            </h2>
            <div>
              <p className="text-theme-main font-bold text-lg mb-1">{latestRepo.name}</p>
              <p className="text-sm text-theme-muted line-clamp-2 mb-4">
                {latestRepo.description || 'Tidak ada deskripsi.'}
              </p>
              <a
                href={latestRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-theme-accent hover:underline text-sm font-bold"
              >
                Buka Repositori →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
