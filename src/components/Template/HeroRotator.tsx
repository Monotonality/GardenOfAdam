'use client';

import { useEffect, useState } from 'react';

import { HERO_ROTATOR_PHRASES } from '@/data/heroRotator';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const TYPE_MS = 55;
const DELETE_MS = 35;
const HOLD_MS = 2200;
const BETWEEN_MS = 400;

export default function HeroRotator() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(HERO_ROTATOR_PHRASES[0]);
      return;
    }

    const phrase = HERO_ROTATOR_PHRASES[phraseIndex];

    if (!deleting && text.length < phrase.length) {
      const timeout = window.setTimeout(() => {
        setText(phrase.slice(0, text.length + 1));
      }, TYPE_MS);
      return () => window.clearTimeout(timeout);
    }

    if (!deleting && text.length === phrase.length) {
      const timeout = window.setTimeout(() => setDeleting(true), HOLD_MS);
      return () => window.clearTimeout(timeout);
    }

    if (deleting && text.length > 0) {
      const timeout = window.setTimeout(() => {
        setText(phrase.slice(0, text.length - 1));
      }, DELETE_MS);
      return () => window.clearTimeout(timeout);
    }

    if (deleting && text.length === 0) {
      const timeout = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % HERO_ROTATOR_PHRASES.length);
      }, BETWEEN_MS);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [text, phraseIndex, deleting, prefersReducedMotion]);

  return (
    <p className="hero-rotator" aria-live="off">
      <span className="sr-only">Roles: </span>
      <span className="hero-rotator-text" aria-hidden="true">
        {text}
      </span>
      <span
        className="hero-rotator-cursor"
        aria-hidden="true"
        data-reduced={prefersReducedMotion ? 'true' : 'false'}
      />
      <span className="sr-only">{HERO_ROTATOR_PHRASES.join(', ')}</span>
    </p>
  );
}
