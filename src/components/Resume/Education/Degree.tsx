import dayjs from 'dayjs';

import type { Degree as DegreeType } from '@/data/resume/degrees';

interface DegreeProps {
  data: DegreeType;
}

export default function Degree({ data }: DegreeProps) {
  const {
    school,
    degree,
    link,
    year,
    startDate,
    endDate,
    location,
    highlights,
  } = data;
  const hasRange = Boolean(startDate && endDate);

  return (
    <article className="degree-container">
      <header>
        <h3 className="degree">{degree}</h3>
        <p className="school">
          <a href={link}>{school}</a>
          {location ? (
            <>
              <span className="degree-location"> · {location}</span>
            </>
          ) : null}
        </p>
        {hasRange ? (
          <p className="daterange degree-daterange">
            <time dateTime={startDate}>
              {dayjs(startDate).format('MMMM YYYY')}
            </time>
            <span className="daterange-sep" aria-hidden="true">
              {' '}
              –{' '}
            </span>
            <span className="sr-only"> to </span>
            <time dateTime={endDate}>{dayjs(endDate).format('MMMM YYYY')}</time>
          </p>
        ) : (
          <p className="school">
            <time dateTime={String(year)}>{year}</time>
          </p>
        )}
      </header>
      {highlights ? (
        <ul className="points degree-points">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
