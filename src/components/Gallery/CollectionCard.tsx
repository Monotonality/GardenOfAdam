import Image from 'next/image';
import Link from 'next/link';

import type { GalleryCollection } from '@/data/gallery';

interface CollectionCardProps {
  collection: GalleryCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { cover, description, medium, published, slug, title } = collection;
  const countLabel =
    collection.pieces.length === 1
      ? '1 piece'
      : `${collection.pieces.length} pieces`;

  const image = (
    <div className="gallery-card-image">
      <Image
        src={cover.src}
        alt=""
        width={cover.width}
        height={cover.height}
        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
      />
    </div>
  );

  const body = (
    <>
      {image}
      <div className="gallery-card-body">
        <p className="gallery-card-kicker">{medium}</p>
        <h2 className="gallery-card-title">{title}</h2>
        <p className="gallery-card-desc">{description}</p>
        <p className="gallery-card-meta">
          {published ? countLabel : 'Coming soon'}
        </p>
      </div>
    </>
  );

  if (!published) {
    return (
      <article className="gallery-card gallery-card--soon" aria-disabled="true">
        {body}
      </article>
    );
  }

  return (
    <Link
      href={`/gallery/${slug}/`}
      className="gallery-card gallery-card--link"
    >
      {body}
    </Link>
  );
}
