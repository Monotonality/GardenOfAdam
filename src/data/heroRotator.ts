/** Phrases cycled in the homepage hero typewriter. */
export const HERO_ROTATOR_PHRASES = [
  'AI & analytics student',
  'Financial researcher',
  'Actriant consultant',
  'daRSVP inventor',
  'Mentor & builder',
  'Piano teacher',
  'Award Winning Artist',
  'Photographer',
  'Failed Comedian',
] as const;

/** Width anchor for the typewriter row so deleting to empty does not reflow the hero. */
export const HERO_ROTATOR_LONGEST_PHRASE = HERO_ROTATOR_PHRASES.reduce(
  (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
  HERO_ROTATOR_PHRASES[0],
);
