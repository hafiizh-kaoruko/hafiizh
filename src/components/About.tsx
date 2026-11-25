import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  FaCode,
  FaDiscord,
  FaGamepad,
  FaHeart,
  FaLaptopCode,
  FaMicrochip,
  FaMusic,
  FaPause,
  FaPlay,
  FaRocket,
  FaShieldAlt,
  FaSpotify,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa';
import { useLanyard } from '../hooks/useLanyard';
import ScrollReveal from './ScrollReveal';

function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/soulsoup.mp3"
        loop
        onTimeUpdate={() => {
          if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        }}
      />
      <div className="group [perspective:1000px] w-full h-[80px] cursor-pointer">
        <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 bg-theme-card/60 backdrop-blur-sm p-3 rounded-xl border border-theme/50 [backface-visibility:hidden] flex items-center gap-3">
            <div className="text-theme-accent text-lg">
              <FaMusic />
            </div>
            <div>
              <p className="text-xs text-theme-muted">Favorite Music</p>
              <p className="text-sm font-semibold text-theme-main truncate w-32 md:w-40">
                SoulSoup - Official髭男dism
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-theme-card border border-theme-accent/50 p-2 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center gap-3 overflow-hidden">
            <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-theme-accent/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              <img
                src="/soulsoup.jpg"
                alt="SoulSoup Cover"
                className={`w-full h-full object-cover ${
                  isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
                }`}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-theme-main rounded-full border border-theme/50" />
            </div>

            <div className="flex flex-col flex-1 justify-center overflow-hidden pr-1">
              <div className="flex justify-between items-center mb-1">
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-theme-main truncate">SoulSoup</p>
                  <p className="text-[10px] text-theme-muted truncate">Official髭男dism</p>
                </div>
                <button
                  onClick={toggleMute}
                  className="text-theme-muted hover:text-theme-accent transition-colors ml-2"
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-xs" />
                  ) : (
                    <FaVolumeUp className="text-xs" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-7 h-7 shrink-0 bg-theme-accent text-white rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.5)] hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <FaPause className="text-[10px]" />
                  ) : (
                    <FaPlay className="text-[10px] ml-0.5" />
                  )}
                </button>
                <div className="flex-1 h-1.5 bg-theme-main rounded-full overflow-hidden">
                  <div
                    className="h-full bg-theme-accent rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {isPlaying && (
              <div className="absolute bottom-1 right-1 flex items-end gap-0.5 h-2 opacity-50">
                {[0, 1, 2].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-0.5 bg-theme-accent rounded-t-full animate-[eq_0.5s_ease-in-out_infinite_alternate]"
                    style={{ animationDelay: `${0.1 * idx}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function DiscordCard() {
  const data = useLanyard('1425746283410489344');

  if (!data || !data.discord_user) {
    return (
      <div className="flex items-center gap-3 bg-theme-card/60 backdrop-blur-sm p-3 rounded-xl border border-theme/50 h-[80px] animate-pulse">
        <div className="w-10 h-10 bg-theme-main rounded-full" />
        <div className="flex flex-col gap-1 w-full">
          <div className="h-3 w-20 bg-theme-main rounded" />
          <div className="h-2 w-16 bg-theme-main rounded" />
        </div>
      </div>
    );
  }

  const isSpotify = data.listening_to_spotify;
  const statusMap = {
    online: {
      color: 'bg-green-500',
      border: 'border-green-500/50',
      glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
      text: 'Online',
    },
    idle: {
      color: 'bg-yellow-500',
      border: 'border-yellow-500/50',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]',
      text: 'Idle',
    },
    dnd: {
      color: 'bg-red-500',
      border: 'border-red-500/50',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
      text: 'Jangan Diganggu',
    },
    offline: {
      color: 'bg-gray-500',
      border: 'border-gray-500/50',
      glow: 'shadow-none',
      text: 'Offline',
    },
  };

  const currentStatus = statusMap[data.discord_status] || statusMap.offline;
  const avatarUrl = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div
      className={`relative flex flex-col justify-center bg-theme-card/80 backdrop-blur-md p-3 rounded-xl border ${currentStatus.border} ${currentStatus.glow} h-[80px] overflow-hidden transition-all duration-500 group`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      <div className="flex items-center gap-3 z-10">
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt="Discord Avatar"
            className="w-11 h-11 rounded-full border-2 border-theme shadow-md"
          />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${currentStatus.color} rounded-full border-2 border-theme-card`}
          >
            {(data.discord_status === 'online' || data.discord_status === 'dnd') && (
              <span
                className={`absolute inset-0 ${currentStatus.color} rounded-full animate-ping opacity-75`}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          {isSpotify && data.spotify ? (
            <>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5 text-[11px] text-green-400 font-bold uppercase tracking-wider">
                  <FaSpotify className="text-sm animate-pulse" /> Spotify
                </div>
                <div className="text-[9px] text-theme-muted font-mono">
                  {new Date(data.spotify.timestamps.start).toLocaleTimeString([], {
                    minute: '2-digit',
                    second: '2-digit',
                  })}{' '}
                  /{' '}
                  {new Date(data.spotify.timestamps.end).toLocaleTimeString([], {
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </div>
              </div>
              <p className="text-sm font-bold text-theme-main truncate leading-tight">
                {data.spotify.song}
              </p>
              <p className="text-[10px] text-theme-muted truncate">by {data.spotify.artist}</p>
              <div className="w-full h-1 bg-theme-main rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full animate-[progress_3s_linear_infinite]" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-[11px] text-theme-accent font-bold uppercase tracking-wider mb-0.5">
                <FaDiscord className="text-sm" /> Discord
              </div>
              <p className="text-sm font-bold text-theme-main truncate leading-tight">
                {data.discord_user.display_name || data.discord_user.username}
              </p>
              <p
                className={`text-[10px] font-medium truncate ${
                  currentStatus.text === 'Jangan Diganggu' ? 'text-red-400' : 'text-theme-muted'
                }`}
              >
                {data.activities?.[0]?.name || currentStatus.text}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const skillRef = useRef<HTMLDivElement>(null);
  const inView = useInView(skillRef, { once: true, margin: '-100px' });

  const infoCards = [
    {
      icon: <FaLaptopCode />,
      label: 'Sedang belajar',
      value: 'Kali Linux dan Etichal hacking',
    },
    {
      icon: <FaHeart />,
      label: 'Motivasi',
      value: 'ngame, music dan mikir',
    },
    {
      icon: <FaGamepad />,
      label: 'Game Favorit',
      value: 'Minecraft dan Efootball',
    },
  ];

  const skills = [
    {
      name: 'HTML & CSS',
      level: 'Intermediate',
      width: '80%',
      color: 'bg-blue-500',
      desc: 'saya Mampu membuat layout web responsif dan styling modern sederhana',
    },
    {
      name: 'JavaScript',
      level: 'Beginner',
      width: '20%',
      color: 'bg-yellow-400',
      desc: 'saya sedang belajar Memahami logika dasar, DOM, dan integrasi API untuk website yang interaktif',
    },
    {
      name: 'PHP & MySQL',
      level: 'Beginner',
      width: '10%',
      color: 'bg-indigo-500',
      desc: 'saya baru Belajar membuat CRUD dasar dan manajemen database di suatu website untuk mengetahui struktur dan juga membuat data',
    },
    {
      name: 'UI/UX Design',
      level: 'Beginner',
      width: '60%',
      color: 'bg-pink-500',
      desc: 'saya sudah mampu Merancang antarmuka di Figma dengan prinsip desain modern dan minimalis untuk aplikasi dan juga website',
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-20 bg-theme-main relative overflow-hidden transition-colors duration-500"
    >
      {/* Watermark icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 text-theme-accent opacity-[0.03] transform -rotate-12">
          <FaRocket className="w-[450px] h-[450px]" />
        </div>
        <div className="absolute top-1/3 -right-20 text-theme-accent opacity-[0.03] transform rotate-12">
          <FaMicrochip className="w-[350px] h-[350px]" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-theme-accent opacity-[0.03] transform -rotate-6">
          <FaShieldAlt className="w-[300px] h-[300px]" />
        </div>
      </div>

      {/* Dotted overlay & accent glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-accent rounded-full filter blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-theme-main mb-4">Tentang Saya</h2>
            <div className="w-20 h-1 bg-theme-accent mx-auto rounded-full shadow-[0_0_10px_var(--accent)]" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-8 relative">
              {/* Orbital Portrait */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                <div className="absolute w-[120%] h-[120%] bg-theme-accent rounded-full filter blur-[60px] opacity-20 animate-pulse" />
                <div className="absolute w-[140%] h-[140%] [perspective:1000px] pointer-events-none flex items-center justify-center">
                  <div
                    className="absolute w-full h-full border-[3px] border-theme-accent/30 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    style={{ animation: 'spinRing 20s linear infinite' }}
                  />
                  <div
                    className="absolute w-[90%] h-[90%] border border-dashed border-theme-accent/50 rounded-full"
                    style={{ animation: 'spinRingReverse 15s linear infinite' }}
                  />
                </div>
                <div className="absolute inset-0 border-2 border-theme-accent/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
                <div className="absolute inset-2 border border-dashed border-theme-accent/40 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
                <div className="absolute w-[150%] h-[150%] animate-[spin_12s_linear_infinite] pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-5 h-5 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,1)]" />
                </div>
                <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                <div
                  className="absolute bottom-8 right-2 w-1 h-1 bg-white rounded-full animate-ping"
                  style={{ animationDelay: '0.5s' }}
                />
                <div
                  className="absolute top-1/4 right-0 w-1 h-1 bg-white rounded-full animate-ping"
                  style={{ animationDelay: '1s' }}
                />
                <div
                  className="absolute bottom-1/4 left-0 w-1.5 h-1.5 bg-white rounded-full animate-ping"
                  style={{ animationDelay: '1.5s' }}
                />
                <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-theme-main shadow-[0_0_40px_rgba(56,189,248,0.4)] bg-theme-card z-10">
                  <img
                    src="/foto-deh.jpeg"
                    alt="Fajri Hafiz"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Cards Grid */}
              <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3 z-10">
                <MusicCard />
                <DiscordCard />
                {infoCards.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-theme-card/60 backdrop-blur-sm p-3 rounded-xl border border-theme/50 h-[80px]"
                  >
                    <div className="text-theme-accent text-lg">{item.icon}</div>
                    <div>
                      <p className="text-xs text-theme-muted">{item.label}</p>
                      <p className="text-sm font-semibold text-theme-main truncate w-32 md:w-40">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column */}
          <ScrollReveal>
            <div className="space-y-8">
              <div className="space-y-4 text-theme-muted text-lg leading-relaxed">
                <p>
                  Halo! Saya adalah pelajar SMK jurusan RPL (Rekayasa Perangkat Lunak) yang sedang
                  mendalami
                  <span className="text-theme-main font-semibold"> pemrograman </span>
                  dan
                  <span className="text-theme-main font-semibold"> pengembangan software</span>.
                  Selain itu, saya juga mempelajari hardware untuk memperluas skill saya.
                </p>
                <p>
                  Saya sangat tertarik dengan pengelolaan{' '}
                  <span className="text-theme-accent font-bold">backend</span>,
                  <span className="text-theme-accent font-bold"> ethical hacking</span>, dan
                  penasaran seberapa rentannya data jika kita melakukan pengujian keamanan.
                </p>
              </div>

              {/* Skill & Progress 3D Flip Card */}
              <div ref={skillRef} className="group [perspective:1000px] h-[380px] cursor-pointer">
                <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 bg-theme-card/50 backdrop-blur-sm border border-theme/50 p-6 rounded-2xl [backface-visibility:hidden] shadow-lg flex flex-col">
                    <h3 className="text-xl font-bold text-theme-main mb-6 flex items-center gap-2">
                      <FaCode className="text-theme-accent" /> Skill &amp; Progress
                    </h3>
                    <div className="space-y-5 flex-1">
                      {skills.map((skill, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-theme-main font-medium">{skill.name}</span>
                            <span className="text-theme-muted text-xs">{skill.level}</span>
                          </div>
                          <div className="w-full h-2.5 bg-theme-main rounded-full overflow-hidden border border-theme/30">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: inView ? skill.width : 0 }}
                              transition={{
                                duration: 1.5,
                                delay: 0.2 * idx,
                                ease: 'easeOut',
                              }}
                              className={`h-full ${skill.color} rounded-full shadow-[0_0_10px_currentColor]`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-theme-card border border-theme-accent/50 p-6 rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[0_0_30px_rgba(56,189,248,0.2)] flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-theme-accent mb-6 text-center">
                      Penjelasan Skill
                    </h3>
                    <ul className="space-y-4 text-sm text-theme-muted">
                      {skills.map((skill, idx) => (
                        <li key={idx} className="flex flex-col">
                          <span className="font-bold text-theme-main">{skill.name}:</span>
                          <span>{skill.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
