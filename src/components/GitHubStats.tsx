import { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaCode,
  FaGithub,
  FaLaptopCode,
  FaMicrochip,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaTerminal,
  FaUserFriends,
  FaUsers,
} from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const DARK_COLORS = ['#1E293B', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildFallbackYear(year: number): ContributionDay[] {
  const days: ContributionDay[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = d.toISOString().slice(0, 10);
    days.push({ date: iso, count: 0, level: 0 });
  }
  return days;
}

function GitHubContributionCard() {
  const [year, setYear] = useState<number>(2026);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(
      `https://github-contributions-api.jogruber.de/v4/qanziz47-coder?y=${year}&client=react-github-calendar`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load contributions');
        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json?.contributions)) {
          setContributions(json.contributions);
        } else {
          setContributions(buildFallbackYear(year));
        }
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          setContributions(buildFallbackYear(year));
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [year]);

  const data = contributions.length > 0 ? contributions : buildFallbackYear(year);
  const firstDay = new Date(data[0].date + 'T00:00:00').getDay();
  const padded: (ContributionDay | null)[] = [...Array(firstDay).fill(null), ...data];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  const totalCount = data.reduce((sum, item) => sum + (item.count || 0), 0);

  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wIdx) => {
    const firstValid = week.find((d) => d !== null);
    if (firstValid) {
      const m = new Date(firstValid.date + 'T00:00:00').getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ label: MONTHS[m], weekIndex: wIdx });
        lastMonth = m;
      }
    }
  });

  return (
    <div className="w-full bg-theme-main/50 border border-theme rounded-2xl p-6 md:p-8 relative overflow-hidden group">
      {/* Watermark Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FaCode className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-theme-accent opacity-[0.02] text-[250px] -rotate-12" />
        <FaLaptopCode className="absolute top-6 left-6 text-theme-accent opacity-10 text-5xl transform rotate-45" />
        <FaRocket className="absolute top-8 right-8 text-theme-accent opacity-10 text-6xl" />
        <FaTerminal className="absolute bottom-6 left-10 text-theme-accent opacity-10 text-4xl" />
        <FaServer className="absolute bottom-8 right-12 text-theme-accent opacity-10 text-5xl -rotate-12" />
        <FaMicrochip className="absolute top-4 left-1/2 text-theme-accent opacity-10 text-3xl" />
        <FaShieldAlt className="absolute bottom-4 left-1/2 text-theme-accent opacity-10 text-4xl" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-bold text-theme-main flex items-center gap-2">
          <FaCalendarAlt className="text-theme-accent text-2xl" />
          GitHub Contributions
        </h3>
        <div className="flex items-center gap-2">
          {[2026, 2025].map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                year === y
                  ? 'bg-theme-accent text-white shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                  : 'bg-theme-main text-theme-muted hover:text-theme-main hover:bg-theme-card border border-theme/50'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full overflow-x-auto pb-2">
        {loading ? (
          <div className="w-full h-40 bg-theme-main/50 border border-theme rounded-2xl animate-pulse flex items-center justify-center text-theme-muted">
            Memuat kontribusi GitHub...
          </div>
        ) : (
          <div className="min-w-[780px] text-[13px] text-theme-muted select-none">
            {/* Month Labels */}
            <div className="flex mb-2 relative h-5">
              {monthLabels.map((m, idx) => (
                <span
                  key={`${m.label}-${idx}`}
                  style={{ left: `${m.weekIndex * 20}px` }}
                  className="absolute text-xs text-theme-muted"
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[4px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[4px]">
                  {Array.from({ length: 7 }).map((_, dIdx) => {
                    const day = week[dIdx];
                    if (!day) {
                      return <div key={dIdx} className="w-4 h-4" />;
                    }
                    const color = DARK_COLORS[day.level] ?? DARK_COLORS[0];
                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHovered(day)}
                        onMouseLeave={() => setHovered(null)}
                        title={`${day.count} contributions on ${day.date}`}
                        style={{ backgroundColor: color }}
                        className="w-4 h-4 rounded-[2px] border border-white/[0.04] transition-transform duration-150 hover:scale-125 cursor-pointer"
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer count + legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-xs text-theme-muted">
              <span>
                {hovered
                  ? `${hovered.count} contributions on ${hovered.date}`
                  : `${totalCount} contributions in ${year}`}
              </span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {DARK_COLORS.map((c) => (
                  <span
                    key={c}
                    style={{ backgroundColor: c }}
                    className="w-3.5 h-3.5 rounded-[2px] border border-white/[0.06] inline-block"
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GitHubStats() {
  const [stats, setStats] = useState({
    repos: 14,
    followers: 0,
    following: 2,
  });

  useEffect(() => {
    fetch('https://api.github.com/users/qanziz47-coder')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.public_repos === 'number') {
          setStats({
            repos: data.public_repos,
            followers: data.followers ?? 0,
            following: data.following ?? 0,
          });
        }
      })
      .catch(() => {
        // Keep exact extracted fallback numbers
      });
  }, []);

  const statCards = [
    {
      value: stats.repos,
      label: 'Repositories',
      icon: <FaGithub />,
    },
    {
      value: stats.followers,
      label: 'Followers',
      icon: <FaUsers />,
    },
    {
      value: stats.following,
      label: 'Following',
      icon: <FaUserFriends />,
    },
    {
      value: '3+',
      label: 'Years Learning',
      icon: <FaRocket />,
    },
  ];

  return (
    <section
      id="stats"
      className="bg-theme-card/30 backdrop-blur-md border-y border-theme py-16 px-6 md:px-20 relative overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-theme-accent filter blur-[150px] opacity-5 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, i) => (
            <ScrollReveal key={i}>
              <div className="bg-theme-main/50 border border-theme p-6 rounded-2xl text-center group hover:border-theme-accent hover:-translate-y-1 transition duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-6xl text-theme-accent opacity-5 group-hover:opacity-10 transition">
                  {card.icon}
                </div>
                <h3 className="text-4xl font-bold text-theme-accent mb-2 group-hover:scale-110 transition drop-shadow-[0_0_10px_var(--accent)]">
                  {card.value}
                </h3>
                <p className="text-theme-muted text-xs uppercase tracking-widest font-semibold">
                  {card.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <GitHubContributionCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
