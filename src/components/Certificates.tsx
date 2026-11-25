import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Certificates() {
  const [index, setIndex] = useState(-1);
  const slides = CERTIFICATES_DATA.map((cert) => ({ src: cert.image }));

  return (
    <section
      id="certificates"
      className="py-24 px-6 md:px-20 bg-theme-main relative overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-theme-main mb-2">
              Sertifikat &amp; Pencapaian
            </h2>
            <div className="w-20 h-1 bg-theme-accent mx-auto rounded-full" />
            <p className="text-theme-muted mt-4">
              Beberapa sertifikat dan penghargaan yang telah saya raih.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES_DATA.map((cert, idx) => (
            <ScrollReveal key={idx}>
              <div
                onClick={() => setIndex(idx)}
                className="bg-theme-card rounded-xl border border-theme overflow-hidden group hover:border-theme-accent transition duration-300 shadow-lg cursor-pointer relative"
              >
                <div className="relative w-full h-64 overflow-hidden bg-theme-main">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="text-white font-bold bg-theme-accent/80 px-4 py-2 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition">
                      Lihat Sertifikat
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-theme-main mb-1">{cert.title}</h3>
                  <p className="text-sm text-theme-muted">{cert.issuer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
        />
      </div>
    </section>
  );
}
