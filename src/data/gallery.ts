export interface GalleryPiece {
  id: string;
  src: string;
  title: string;
  alt: string;
  medium: string;
  /** Awards, exhibition history, and other context shown in the lightbox. */
  details?: string;
  /** Display width; height follows image aspect in the layout. */
  width: number;
  height: number;
}

export interface GalleryCollection {
  slug: string;
  title: string;
  description: string;
  medium: string;
  cover: GalleryPiece;
  pieces: GalleryPiece[];
  /** When false, the collection appears on the index but has no detail page yet. */
  published: boolean;
}

const portraiturePieces: GalleryPiece[] = [
  {
    id: 'coming-of-age',
    src: '/images/gallery/portraiture/portrait-4199.jpg',
    title: 'The Coming of Age',
    alt: 'The Coming of Age — white colored pencil on black paper',
    medium: 'White colored pencil on black paper',
    details:
      'Earned Gold Seal and State Seal in the 2022 TAEA VASE competition, then traveled with the statewide TAEA Gold Seal Exhibition.',
    width: 2400,
    height: 3000,
  },
  {
    id: 'splash-of-color',
    src: '/images/gallery/portraiture/portrait-4200.jpg',
    title: 'A Splash of Color',
    alt: 'A Splash of Color — colored pastel on sandpaper',
    medium: 'Colored pastel on sandpaper',
    details:
      'Received State Seal recognition and was shown in a curated exhibition at the Dallas Museum of Art.',
    width: 2400,
    height: 3000,
  },
  {
    id: 'portrait-study-i',
    src: '/images/gallery/portraiture/portrait-4201.jpg',
    title: 'Portrait Study I',
    alt: 'Portrait Study I — colored pastel on sandpaper',
    medium: 'Colored pastel on sandpaper',
    details:
      'A study in the verdaccio technique—the green-gray underpainting layer used to establish form before color is built on top.',
    width: 2400,
    height: 3000,
  },
];

const photoLandscape = { width: 2400, height: 1600 } as const;

function photoPiece(
  id: string,
  src: string,
  title: string,
  alt: string,
): GalleryPiece {
  return {
    id,
    src,
    title,
    alt,
    medium: 'Photography',
    ...photoLandscape,
  };
}

const chicagoPieces: GalleryPiece[] = [
  photoPiece(
    'chicago-2398',
    '/images/gallery/chicago/chicago-2398.jpg',
    'Chicago I',
    'Chicago — photograph I',
  ),
  photoPiece(
    'chicago-2441',
    '/images/gallery/chicago/chicago-2441.jpg',
    'Chicago II',
    'Chicago — photograph II',
  ),
  photoPiece(
    'chicago-2446',
    '/images/gallery/chicago/chicago-2446.jpg',
    'Chicago III',
    'Chicago — photograph III',
  ),
  photoPiece(
    'chicago-2454',
    '/images/gallery/chicago/chicago-2454.jpg',
    'Chicago IV',
    'Chicago — photograph IV',
  ),
  photoPiece(
    'chicago-2249',
    '/images/gallery/chicago/chicago-2249.jpg',
    'Chicago V',
    'Chicago — photograph V',
  ),
];

const toroPieces: GalleryPiece[] = [
  photoPiece(
    'toro-4193',
    '/images/gallery/toro/toro-4193.jpg',
    'Toro I',
    'Toro — photograph I',
  ),
  photoPiece(
    'toro-4194',
    '/images/gallery/toro/toro-4194.jpg',
    'Toro II',
    'Toro — photograph II',
  ),
  photoPiece(
    'toro-4195',
    '/images/gallery/toro/toro-4195.jpg',
    'Toro III',
    'Toro — photograph III',
  ),
  photoPiece(
    'toro-4196',
    '/images/gallery/toro/toro-4196.jpg',
    'Toro IV',
    'Toro — photograph IV',
  ),
  photoPiece(
    'toro-4197',
    '/images/gallery/toro/toro-4197.jpg',
    'Toro V',
    'Toro — photograph V',
  ),
  photoPiece(
    'toro-4198',
    '/images/gallery/toro/toro-4198.jpg',
    'Toro VI',
    'Toro — photograph VI',
  ),
];

const galleryCollections: GalleryCollection[] = [
  {
    slug: 'portraiture',
    title: 'Portraiture',
    description:
      "While I've built skill across many fields, art was unique. It was the one discipline that came instantly and naturally from the start.",
    medium: 'Drawing & pastel',
    cover: portraiturePieces[0],
    pieces: portraiturePieces,
    published: true,
  },
  {
    slug: 'chicago',
    title: 'Chicago',
    description:
      'City light, architecture, and street scenes from time in Chicago.',
    medium: 'Photography',
    cover: chicagoPieces[2],
    pieces: chicagoPieces,
    published: true,
  },
  {
    slug: 'toro',
    title: 'Toro',
    description:
      'The death of a fighting bull is one of the most tragic and beautiful sights I’ve ever witnessed, serving as a study of mortality, ritual, and spectacle.',
    medium: 'Photography',
    cover: toroPieces[0],
    pieces: toroPieces,
    published: true,
  },
];

export function getGalleryCollections(): GalleryCollection[] {
  return galleryCollections;
}

export function getGalleryCollectionSlugs(): string[] {
  return galleryCollections
    .filter(
      (collection) => collection.published && collection.pieces.length > 0,
    )
    .map((collection) => collection.slug);
}

export function getGalleryCollection(
  slug: string,
): GalleryCollection | undefined {
  return galleryCollections.find((collection) => collection.slug === slug);
}
