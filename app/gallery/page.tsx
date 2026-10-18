import type { Metadata } from 'next';

import CollectionCard from '@/components/Gallery/CollectionCard';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { getGalleryCollections } from '@/data/gallery';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const GALLERY_URL = `${SITE_URL}/gallery/`;

const GALLERY_DESCRIPTION =
  'Collections of portraiture, photography, and other visual work by Adam Torres.';

export const metadata: Metadata = createPageMetadata({
  title: 'Gallery',
  description: GALLERY_DESCRIPTION,
  path: '/gallery/',
});

export default function GalleryPage() {
  const collections = getGalleryCollections();

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: GALLERY_URL,
            name: 'Gallery',
            description: GALLERY_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(GALLERY_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Gallery', url: GALLERY_URL },
          ]),
        ]}
      />
      <section className="gallery-page">
        <header className="gallery-header">
          <h1 className="page-title">Gallery</h1>
          <p className="page-subtitle">
            Art is a pastime for me. Here are some favorites of mine.
          </p>
        </header>

        <div className="gallery-collections">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
