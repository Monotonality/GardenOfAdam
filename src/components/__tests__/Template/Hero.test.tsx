import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('displays the name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Adam Torres');
  });

  it('renders the cycling typewriter below the name', () => {
    render(<Hero />);

    expect(document.querySelector('.hero-rotator')).toBeInTheDocument();
  });

  it('describes studies at UTD, work at Actriant, and daRSVP', () => {
    const { container } = render(<Hero />);

    const utdLink = screen.getByRole('link', {
      name: 'University of Texas at Dallas',
    });
    expect(utdLink).toHaveAttribute('href', 'https://www.utdallas.edu/');
    expect(utdLink).toHaveClass('hero-highlight');

    const actriantLink = screen.getByRole('link', { name: 'Actriant' });
    expect(actriantLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/actriant',
    );
    expect(actriantLink).toHaveClass('hero-highlight');

    const darsvpLink = screen.getByRole('link', { name: 'daRSVP' });
    expect(darsvpLink).toHaveAttribute('href', '/writing/what-is-darsvp');
    expect(darsvpLink).toHaveClass('hero-highlight');

    expect(container.querySelector('.hero-tagline')).toHaveTextContent(
      "I'm an Artificial Intelligence and Analytics student at the University of Texas at Dallas, where I conduct financial research. I work at Actriant, helping businesses identify people problems and build technical solutions to solve them. Inventor and lead developer of daRSVP technology.",
    );
  });

  it('keeps personal stats and incomplete credential lists off the homepage', () => {
    const { container } = render(<Hero />);

    expect(container.querySelector('.telemetry')).not.toBeInTheDocument();
    expect(container.querySelector('.hero-chips')).not.toBeInTheDocument();
    expect(screen.queryByText('Countries visited')).not.toBeInTheDocument();
    expect(screen.queryByText('Computing since')).not.toBeInTheDocument();
    expect(screen.queryByText('Based in')).not.toBeInTheDocument();
    expect(screen.queryByText('YC Alum')).not.toBeInTheDocument();
    expect(screen.queryByText('Stanford ICME')).not.toBeInTheDocument();
  });

  it('renders one primary CTA and one quieter resume link', () => {
    render(<Hero />);

    const aboutButton = screen.getByRole('link', { name: /about me/i });
    expect(aboutButton).toHaveAttribute('href', '/about');
    expect(aboutButton).toHaveClass('button');

    const resumeButton = screen.getByRole('link', { name: /view resume/i });
    expect(resumeButton).toHaveAttribute('href', '/resume');
    expect(resumeButton).toHaveClass('hero-resume-link');
    expect(resumeButton).not.toHaveClass('button');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
