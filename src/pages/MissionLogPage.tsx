import { FaArrowLeft, FaBook, FaLightbulb, FaRocket } from 'react-icons/fa';
import { AppLink } from '../context/RouterContext';

const LOGS = [
  {
    date: 'Oktober 2026',
    title: 'Pertama Kali Pakai Next.js',
    desc: 'Pertama kali pakai Next.js, saya pusing banget lihat error hydration. Butuh 3 hari untuk paham bahwa Server Component dan Client Component itu beda. Pelajaran berharga! saya juga belum terlalu paham dengan framework yang ada di pemrograman ini',
    icon: <FaRocket />,
    colorClass: 'text-blue-400',
  },
  {
    date: 'Oktober 2026',
    title: 'Setup Cloudflare Tunnel',
    desc: 'Setup Cloudflare Tunnel ke XAMPP sempat bikin frustrasi. Ternyata masalahnya cuma salah port di konfigurasi. Tapi dari situ saya belajar banyak tentang DNS dan jaringan dan pengen mengetahui sistem networking',
    icon: <FaLightbulb />,
    colorClass: 'text-yellow-400',
  },
  {
    date: 'September 2026',
    title: 'Integrasi GitHub API',
    desc: 'Awalnya bingung cara ambil data dari GitHub. Ternyata tinggal fetch ke API publiknya, dan datanya langsung bisa ditampilkan. Ini jadi dasar untuk halaman Portfolio saya.',
    icon: <FaBook />,
    colorClass: 'text-green-400',
  },
];

export default function MissionLogPage() {
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
              Log
            </span>
          </h1>
          <p className="text-theme-muted text-lg max-w-2xl mx-auto">
            Catatan jujur tentang perjalanan belajar saya. sumpah memang belum mengerti semuaaa.
          </p>
        </div>

        <div className="space-y-6">
          {LOGS.map((item, idx) => (
            <div
              key={idx}
              className="bg-theme-card/50 backdrop-blur-sm border border-theme p-6 rounded-2xl hover:border-theme-accent transition duration-300 group flex gap-4"
            >
              <div className={`text-3xl shrink-0 ${item.colorClass}`}>{item.icon}</div>
              <div>
                <p className="text-xs text-theme-muted mb-1">{item.date}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-theme-accent transition">
                  {item.title}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
