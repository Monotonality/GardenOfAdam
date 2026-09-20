import Link from 'next/link';

import profile from '@/data/profile.json';

import HeroRotator from './HeroRotator';
import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          <HeroRotator />

          <div className="hero-body">
            <p className="hero-tagline">
              I&apos;m an Artificial Intelligence and Analytics student at the{' '}
              <a href="https://www.utdallas.edu/" className="hero-highlight">
                University of Texas at Dallas
              </a>
              , where I conduct financial research. I work at{' '}
              <a
                href="https://www.linkedin.com/company/actriant"
                className="hero-highlight"
              >
                Actriant
              </a>
              , helping businesses identify people problems and build technical
              solutions to solve them. Inventor and lead developer of{' '}
              <Link href="/writing/what-is-darsvp/" className="hero-highlight">
                daRSVP
              </Link>{' '}
              technology.
            </p>

            <div className="hero-cta">
              <Link href="/about" className="button">
                About Me
              </Link>
              <Link href="/resume" className="hero-resume-link">
                View Resume
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={320} height={320} priority />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
