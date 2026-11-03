import type { Filter } from '../types';

const FILTER_LABELS: Record<Filter, string> = {
  all: 'Все',
  active: 'Активные',
  completed: 'Выполненные',
};

interface FilterBarProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

export function FilterBar({ current, onChange }: FilterBarProps) {
  return (
    <div className="filters" role="group" aria-label="Фильтр задач">
      {(Object.keys(FILTER_LABELS) as Filter[]).map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filters__button${filter === current ? ' filters__button--active' : ''}`}
          aria-pressed={filter === current}
          onClick={() => onChange(filter)}
        >
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
}
