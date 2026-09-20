import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HERO_ROTATOR_PHRASES } from '@/data/heroRotator';
import HeroRotator from '../../Template/HeroRotator';

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('HeroRotator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('types the first phrase character by character', () => {
    render(<HeroRotator />);

    expect(screen.queryByText(HERO_ROTATOR_PHRASES[0])).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(60);
    });

    expect(document.querySelector('.hero-rotator-text')).toHaveTextContent(
      HERO_ROTATOR_PHRASES[0][0],
    );
  });

  it('shows the first phrase without animating when reduced motion is preferred', () => {
    setReducedMotion(true);
    render(<HeroRotator />);

    expect(document.querySelector('.hero-rotator-text')).toHaveTextContent(
      HERO_ROTATOR_PHRASES[0],
    );
  });
});
