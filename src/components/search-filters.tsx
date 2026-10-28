"use client";

export type SearchFilter = "latest";

const FILTERS: Array<{ id: SearchFilter; label: string }> = [
  { id: "latest", label: "Latest" },
];

export function SearchFilters({
  active,
  onToggle,
}: {
  active: SearchFilter[];
  onToggle: (filter: SearchFilter) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Search filters"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="font-mono text-[9.5px] tracking-[0.16em] text-ink/38 uppercase">
        Filter
      </span>
      {FILTERS.map((filter) => {
        const isActive = active.includes(filter.id);

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onToggle(filter.id)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "border-accent/50 bg-accent-soft/60 text-accent"
                : "border-ink/12 text-ink/55 hover:border-accent/45 hover:bg-accent-soft/25 hover:text-accent"
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                isActive ? "bg-accent" : "bg-ink/25"
              }`}
            />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
