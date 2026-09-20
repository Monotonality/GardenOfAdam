import dayjs from 'dayjs';

import type { Certification as CertificationType } from '@/data/resume/certifications';

interface CertificationProps {
  data: CertificationType;
}

export default function Certification({ data }: CertificationProps) {
  const { name, issuer, issueDate, url } = data;

  return (
    <article className="certification-container">
      <header>
        <h3 className="certification-name">{name}</h3>
        <p className="certification-meta">
          {url ? <a href={url}>{issuer}</a> : <span>{issuer}</span>}
          <span className="certification-meta-sep" aria-hidden="true">
            {' '}
            ·{' '}
          </span>
          <time dateTime={issueDate}>
            Issued {dayjs(issueDate).format('MMMM YYYY')}
          </time>
        </p>
      </header>
    </article>
  );
}
