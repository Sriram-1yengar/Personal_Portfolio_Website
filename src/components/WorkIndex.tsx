import { useMemo, useState, type CSSProperties } from 'react';
import './WorkIndex.css';

export interface WorkItem {
  slug: string;
  title: string;
  summary: string;
  year: number;
  status: 'shipped' | 'in-progress' | 'archived';
  tags: string[];
  stack: string[];
}

const STATUS_LABEL: Record<WorkItem['status'], string> = {
  shipped: 'Shipped',
  'in-progress': 'In progress',
  archived: 'Archived',
};

export default function WorkIndex({ items }: { items: WorkItem[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, [items]);

  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? items : items.filter((i) => i.tags.includes(active));

  return (
    <div className="work">
      <div className="work__filters" role="group" aria-label="Filter projects by area">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="work__filter"
            aria-pressed={active === tag}
            onClick={() => setActive(tag)}
          >
            {tag}
            {tag !== 'All' && (
              <span className="work__count">
                {items.filter((i) => i.tags.includes(tag)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <ol className="work__grid">
        {filtered.map((item, idx) => (
          <li
            key={item.slug}
            className="work__card"
            data-reveal
            style={{ '--reveal-delay': `${idx * 70}ms` } as CSSProperties}
          >
            <a className="work__link" href={`/projects/${item.slug}`}>
              <div className="work__card-top">
                <span className="work__index mono">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="work__meta">
                  <span className={`work__status work__status--${item.status}`}>
                    {STATUS_LABEL[item.status]}
                  </span>
                  <span className="work__year">{item.year}</span>
                </span>
              </div>

              <h3 className="work__title">{item.title}</h3>
              <p className="work__summary">{item.summary}</p>

              <span className="work__tags">
                {item.stack.slice(0, 5).map((s) => (
                  <span key={s} className="work__tag">
                    {s}
                  </span>
                ))}
              </span>

              <span className="work__cta">
                Explore
                <svg
                  className="work__arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 8h8M9 4l3.5 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ol>

      {filtered.length === 0 && (
        <p className="work__empty">Nothing tagged “{active}” yet.</p>
      )}
    </div>
  );
}
