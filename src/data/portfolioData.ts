export interface ProjectItem {
  title: string;
  slug: string;
  lang: string;
  desc: string;
  img: string;
  gh: string;
  demo: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}

export interface DesignItem {
  title: string;
  badges: string[];
  desc: string;
  image: string;
  figmaUrl: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  image: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: 'website antibullying fullstack',
    slug: 'website-antibullying-fullstack',
    lang: 'Blade',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/website-antibullying-fullstack',
    gh: 'https://github.com/qanziz47-coder/website-antibullying-fullstack',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-20',
  },
  {
    title: 'website antibullying nextjs',
    slug: 'website-antibullying-nextjs',
    lang: 'TypeScript',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/website-antibullying-nextjs',
    gh: 'https://github.com/qanziz47-coder/website-antibullying-nextjs',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-18',
  },
  {
    title: 'webiste anti bullying',
    slug: 'webiste-anti-bullying',
    lang: 'PHP',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/webiste-anti-bullying',
    gh: 'https://github.com/qanziz47-coder/webiste-anti-bullying',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-16',
  },
  {
    title: 'Medieval themed birthday',
    slug: 'Medieval-themed-birthday',
    lang: 'TypeScript',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/Medieval-themed-birthday',
    gh: 'https://github.com/qanziz47-coder/Medieval-themed-birthday',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-15',
  },
  {
    title: 'RFID Smart Macro',
    slug: 'RFID-Smart-Macro',
    lang: 'C++',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/RFID-Smart-Macro',
    gh: 'https://github.com/qanziz47-coder/RFID-Smart-Macro',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-15',
  },
  {
    title: 'HafzAnyaDashboard',
    slug: 'HafzAnyaDashboard',
    lang: 'TeX',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/HafzAnyaDashboard',
    gh: 'https://github.com/qanziz47-coder/HafzAnyaDashboard',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'qanziz47 coder',
    slug: 'qanziz47-coder',
    lang: 'Web',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/qanziz47-coder',
    gh: 'https://github.com/qanziz47-coder/qanziz47-coder',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'qanziz47 coder.github.io',
    slug: 'qanziz47-coder.github.io',
    lang: 'CSS',
    desc: 'Tidak ada deskripsi.',
    img: 'https://raw.githubusercontent.com/qanziz47-coder/qanziz47-coder.github.io/main/porto.png',
    gh: 'https://github.com/qanziz47-coder/qanziz47-coder.github.io',
    demo: 'https://github.com/qanziz47-coder/qanziz47-coder.github.io',
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'absensi project app',
    slug: 'absensi-project-app',
    lang: 'PHP',
    desc: 'Tidak ada deskripsi.',
    img: 'https://raw.githubusercontent.com/qanziz47-coder/absensi-project-app/main/absensi-cover.png',
    gh: 'https://github.com/qanziz47-coder/absensi-project-app',
    demo: 'https://github.com/qanziz47-coder/absensi-project-app',
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'mod survival economy',
    slug: 'mod-survival-economy',
    lang: 'Java',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/mod-survival-economy',
    gh: 'https://github.com/qanziz47-coder/mod-survival-economy',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'MusicPython',
    slug: 'MusicPython',
    lang: 'Python',
    desc: 'To play and display the song "Soulsoup" by Official Hige Dandism, Python is used.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/MusicPython',
    gh: 'https://github.com/qanziz47-coder/MusicPython',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'absensi_qr',
    slug: 'absensi_qr',
    lang: 'Web',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/absensi_qr',
    gh: 'https://github.com/qanziz47-coder/absensi_qr',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'peminjaman barang',
    slug: 'peminjaman-barang',
    lang: 'PHP',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/peminjaman-barang',
    gh: 'https://github.com/qanziz47-coder/peminjaman-barang',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
  {
    title: 'cafe db',
    slug: 'cafe-db',
    lang: 'PHP',
    desc: 'Tidak ada deskripsi.',
    img: 'https://opengraph.githubassets.com/1/qanziz47-coder/cafe-db',
    gh: 'https://github.com/qanziz47-coder/cafe-db',
    demo: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-10-14',
  },
];

export const DESIGNS_DATA: DesignItem[] = [
  {
    title: 'Card Music spotify',
    badges: ['card website', 'UI Design'],
    desc: 'saya membuat desgin card player music yang meniru spotify, card ini membawakan lagu soulsoup official hige dandism',
    image: '/designs/soul.png',
    figmaUrl:
      'https://www.figma.com/design/d7QnzHskKzVQA9xbmkd3sw/Fajri_hafz---card-music-ui--Official-Design%7D?node-id=0-1&t=FWgVbyY05YYoZV2L-1',
  },
  {
    title: 'spotify ui project',
    badges: ['Mobile App', 'spotify desgin'],
    desc: 'saya membuat desgin aplikasi spotify ui dengan ambil referensi lagu official hige dandism beberapa lagu same blue dan soulsoup',
    image: '/designs/ui.png',
    figmaUrl:
      'https://www.figma.com/design/r0HclKObWMS2IKrB8htu9E/Fajri_hafz---spotify-ui-project--Official-Design-?t=FWgVbyY05YYoZV2L-1',
  },
  {
    title: 'login ui',
    badges: ['Web Design', 'Login Ui website'],
    desc: 'saya membuat desgin login ui website',
    image: '/designs/login.png',
    figmaUrl:
      'https://www.figma.com/design/4fE6zJC96EwI1XNCwyqc6D/Fajri_hafz---login-UI--official-Design-?t=FWgVbyY05YYoZV2L-1',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    title: 'Sertifikat Pembelajaran bootstrap dan sass',
    issuer: 'program sekolah untuk meingkatkan skill dalam desgin',
    image: '/sertifikat/sertifikat-bootstarp.png',
  },
  {
    title: 'Sertifikat Pembelajaran Html dan CSS',
    issuer: 'program sekolah untuk meingkatkan skill dalam struktur web dasar dan juga desgin dasar website',
    image: '/sertifikat/sertifikat-html.png',
  },
  {
    title: 'Juara 2 robotic Challenge Competition 2019 Tingkat Kota Depok',
    issuer:
      'Pencapaian pertama saya di bidang teknologi. Merakit dan memprogram robot sederhana untuk berlaga di kompetisi, yang menjadi awal mula ketertarikan saya pada dunia hardware dan software.',
    image: '/sertifikat/robotik.jpeg',
  },
];

export const TECH_BADGES = [
  {
    src: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
    alt: 'HTML',
  },
  {
    src: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',
    alt: 'PHP',
  },
  {
    src: 'https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=kotlin&logoColor=white',
    alt: 'Kotlin',
  },
  {
    src: 'https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white',
    alt: 'Arduino',
  },
  {
    src: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
    alt: 'Python',
  },
  {
    src: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
    alt: 'JavaScript',
  },
  {
    src: 'https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white',
    alt: 'MySQL',
  },
  {
    src: 'https://img.shields.io/badge/ESP32-E7352C?style=for-the-badge&logo=espressif&logoColor=white',
    alt: 'ESP32',
  },
];
