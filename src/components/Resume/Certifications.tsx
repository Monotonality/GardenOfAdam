import type { Certification as CertificationType } from '@/data/resume/certifications';

import Certification from './Certifications/Certification';

interface CertificationsProps {
  data: CertificationType[];
}

export default function Certifications({ data }: CertificationsProps) {
  const sorted = [...data].sort((a, b) =>
    b.issueDate.localeCompare(a.issueDate),
  );

  return (
    <div className="certifications">
      <div className="title">
        <h2>Licenses &amp; Certifications</h2>
      </div>
      {sorted.map((cert) => (
        <Certification data={cert} key={`${cert.issuer}-${cert.name}`} />
      ))}
    </div>
  );
}
