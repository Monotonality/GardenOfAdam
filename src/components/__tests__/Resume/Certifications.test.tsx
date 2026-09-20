import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Certifications from '../../Resume/Certifications';

const mockCerts = [
  {
    name: 'Agile Foundations',
    issuer: 'Project Management Institute',
    issueDate: '2026-07-01',
    url: 'https://www.pmi.org/',
  },
  {
    name: "CS50's Web Programming with Python and JavaScript (CS50W)",
    issuer: 'Harvard Online',
    issueDate: '2023-01-01',
    url: 'https://cs50.harvard.edu/web/',
  },
];

describe('Certifications', () => {
  it('renders the certifications section with title', () => {
    render(<Certifications data={mockCerts} />);

    expect(
      screen.getByRole('heading', { name: /licenses & certifications/i }),
    ).toBeInTheDocument();
  });

  it('renders certification names and issuers', () => {
    render(<Certifications data={mockCerts} />);

    expect(screen.getByText('Agile Foundations')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /project management institute/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/july 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/january 2023/i)).toBeInTheDocument();
  });
});
