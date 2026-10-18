'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import type { GalleryPiece } from '@/data/gallery';

interface PieceGridProps {
  pieces: GalleryPiece[];
}

export default function PieceGrid({ pieces }: PieceGridProps) {
  const [active, setActive] = useState<GalleryPiece | null>(null);
  const [lightboxImageReady, setLightboxImageReady] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lightboxImageRef = useRef<HTMLImageElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
    setActive(null);
    lastTriggerRef.current?.focus();
  }, []);

  const open = useCallback(
    (piece: GalleryPiece, trigger: HTMLButtonElement) => {
      lastTriggerRef.current = trigger;
      setActive(piece);
    },
    [],
  );

  const activeIndex =
    active === null ? -1 : pieces.findIndex((piece) => piece.id === active.id);
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < pieces.length - 1;

  const showPrevious = useCallback(() => {
    if (!hasPrevious) {
      return;
    }
    setLightboxImageReady(false);
    setActive(pieces[activeIndex - 1]);
  }, [activeIndex, hasPrevious, pieces]);

  const showNext = useCallback(() => {
    if (!hasNext) {
      return;
    }
    setLightboxImageReady(false);
    setActive(pieces[activeIndex + 1]);
  }, [activeIndex, hasNext, pieces]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (!active) {
      setLightboxImageReady(false);
      if (dialog.open) {
        dialog.close();
      }
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    setLightboxImageReady(false);
    const img = lightboxImageRef.current;
    if (img?.complete) {
      setLightboxImageReady(true);
    }
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      close();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [close]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, showNext, showPrevious]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      close();
    }
  };

  return (
    <>
      <ul className="gallery-grid">
        {pieces.map((piece) => (
          <li key={piece.id} className="gallery-grid-item">
            <figure className="gallery-figure">
              <button
                type="button"
                className="gallery-piece-trigger"
                onClick={(event) => open(piece, event.currentTarget)}
                aria-haspopup="dialog"
              >
                <span className="gallery-figure-frame">
                  <Image
                    src={piece.src}
                    alt=""
                    width={piece.width}
                    height={piece.height}
                    sizes="(max-width: 720px) 100vw, 50vw"
                  />
                </span>
                <span className="gallery-figure-caption">{piece.title}</span>
                <span className="gallery-figure-hint">View details</span>
              </button>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        onClick={handleDialogClick}
        aria-labelledby="gallery-lightbox-title"
      >
        {active ? (
          <div
            className="gallery-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="gallery-lightbox-media"
              data-ready={lightboxImageReady ? 'true' : 'false'}
            >
              {/* Native img avoids Next's intrinsic 2400×3000 box flashing before CSS caps size. */}
              <img
                key={active.id}
                ref={lightboxImageRef}
                src={active.src}
                alt={active.alt}
                className={`gallery-lightbox-image${lightboxImageReady ? ' is-loaded' : ''}`}
                decoding="async"
                onLoad={() => setLightboxImageReady(true)}
              />
            </div>

            <div className="gallery-lightbox-copy">
              <h2
                id="gallery-lightbox-title"
                className="gallery-lightbox-title"
              >
                {active.title}
              </h2>
              <p className="gallery-lightbox-medium">{active.medium}</p>
              {active.details ? (
                <p className="gallery-lightbox-details">{active.details}</p>
              ) : null}
            </div>

            <div className="gallery-lightbox-toolbar">
              <button
                type="button"
                className="gallery-lightbox-nav"
                onClick={showPrevious}
                disabled={!hasPrevious}
                aria-label="Previous piece"
              >
                ←
              </button>
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={close}
              >
                Close
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav"
                onClick={showNext}
                disabled={!hasNext}
                aria-label="Next piece"
              >
                →
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
