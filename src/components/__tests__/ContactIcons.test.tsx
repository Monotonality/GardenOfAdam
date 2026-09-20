import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContactIcons from '../Contact/ContactIcons';

describe('ContactIcons', () => {
  it('renders contact icons', () => {
    render(<ContactIcons />);

    // Check if GitHub link is present
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/adam-venegas-torres/',
    );

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Monotonality',
    );

    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/t.adam.j/',
    );

    // Check if email link is present
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:'),
    );
  });

  it('renders only linked social profiles plus email', () => {
    render(<ContactIcons />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('can omit email when the page already has a primary email action', () => {
    render(<ContactIcons includeEmail={false} />);

    expect(
      screen.queryByRole('link', { name: /email/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });
});
