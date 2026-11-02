import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PieceGrid from '@/components/Gallery/PieceGrid';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import {
  getGalleryCollection,
  getGalleryCollectionSlugs,
} from '@/data/gallery';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

interface GalleryCollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGalleryCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GalleryCollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getGalleryCollection(slug);

  if (!collection?.published) {
    return {};
  }

  return createPageMetadata({
    title: collection.title,
    description: collection.description,
    path: `/gallery/${slug}/`,
  });
}

export default async function GalleryCollectionPage({
  params,
}: GalleryCollectionPageProps) {
  const { slug } = await params;
  const collection = getGalleryCollection(slug);

  if (!collection?.published || collection.pieces.length === 0) {
    notFound();
  }

  const collectionUrl = `${SITE_URL}/gallery/${slug}/`;
  const galleryUrl = `${SITE_URL}/gallery/`;

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: collectionUrl,
            name: collection.title,
            description: collection.description,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(collectionUrl, [
            { name: 'Home', url: HOME_URL },
            { name: 'Gallery', url: galleryUrl },
            { name: collection.title, url: collectionUrl },
          ]),
        ]}
      />
      <section className="gallery-page gallery-collection-page">
        <header className="gallery-header">
          <p className="gallery-back">
            <Link href="/gallery/">← Gallery</Link>
          </p>
          <p className="gallery-collection-kicker">{collection.medium}</p>
          <h1 className="page-title">{collection.title}</h1>
          <p className="page-subtitle">{collection.description}</p>
        </header>

        <PieceGrid pieces={collection.pieces} />
      </section>
    </PageWrapper>
  );
}
