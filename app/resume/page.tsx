import type { Metadata } from 'next';
import Link from 'next/link';

import Certifications from '@/components/Resume/Certifications';
import Courses from '@/components/Resume/Courses';
import Education from '@/components/Resume/Education';
import Experience from '@/components/Resume/Experience';
import References from '@/components/Resume/References';
import ResumeNav from '@/components/Resume/ResumeNav';
import Skills from '@/components/Resume/Skills';
import PageWrapper from '@/components/Template/PageWrapper';
import profile from '@/data/profile.json';
import certifications from '@/data/resume/certifications';
import courses from '@/data/resume/courses';
import degrees from '@/data/resume/degrees';
import { categories, skills } from '@/data/resume/skills';
import work from '@/data/resume/work';
import { createPageMetadata } from '@/lib/metadata';
import { AUTHOR_NAME, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Resume',
  description: `${AUTHOR_NAME}'s resume — financial research at UT Dallas, Actriant, daRSVP.`,
  path: '/resume/',
});

export default function ResumePage() {
  return (
    <PageWrapper>
      <section className="resume-page">
        <header className="resume-header">
          <h1 className="resume-title">Resume</h1>
          <p className="resume-summary">
            I&apos;m an Artificial Intelligence and Analytics student at the{' '}
            <a href="https://www.utdallas.edu/">
              University of Texas at Dallas
            </a>
            , where I conduct financial research. I work at{' '}
            <a href="https://www.linkedin.com/company/actriant">Actriant</a>,
            helping businesses identify people problems and build technical
            solutions to solve them. Inventor and lead developer of{' '}
            <Link href="/writing/what-is-darsvp/">daRSVP</Link> technology.
          </p>
          {/* Print-only, but real markup rather than CSS `content`, so it is
              selectable, linkable, and reads from the shared profile. The
              screen layout carries these in the footer, which print hides. */}
          <address className="resume-print-contact">
            {profile.streetAddress}, {profile.addressLocality},{' '}
            {profile.addressRegion} {profile.postalCode}
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              {profile.phone}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={`${SITE_URL}/`}>{SITE_URL.replace(/^https?:\/\//, '')}</a>
            <span aria-hidden="true"> · </span>
            <a href="https://github.com/Monotonality">
              github.com/Monotonality
            </a>
          </address>
        </header>

        <ResumeNav />

        <div className="resume-content">
          <section id="experience" className="resume-section">
            <Experience data={work} />
          </section>

          <section id="education" className="resume-section">
            <Education data={degrees} />
          </section>

          <section id="certifications" className="resume-section">
            <Certifications data={certifications} />
          </section>

          <section id="skills" className="resume-section">
            <Skills skills={skills} categories={categories} />
          </section>

          <section id="courses" className="resume-section">
            <Courses data={courses} />
          </section>

          <section id="references" className="resume-section">
            <References />
          </section>
        </div>
      </section>
    </PageWrapper>
  );
}
