import { TECH_BADGES } from '../data/portfolioData';

export default function TechMarquee() {
  return (
    <section className="py-12 bg-theme-main overflow-hidden transition-colors duration-500">
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          <div className="flex gap-4 shrink-0 pr-4">
            {TECH_BADGES.map((badge) => (
              <img key={badge.alt} src={badge.src} alt={badge.alt} className="h-10" />
            ))}
          </div>
          <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
            {TECH_BADGES.map((badge) => (
              <img key={`${badge.alt}-dup`} src={badge.src} alt={badge.alt} className="h-10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
