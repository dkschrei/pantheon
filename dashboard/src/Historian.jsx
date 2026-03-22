import React, { useMemo, useState } from 'react';

const MAGNITUDE_META = {
  5: { label: 'Civilizational', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  4: { label: 'Historic',       color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  3: { label: 'Major',          color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  2: { label: 'Significant',    color: '#6ee7b7', bg: 'rgba(110,231,183,0.12)' },
  1: { label: 'Notable',        color: '#71717a', bg: 'rgba(113,113,122,0.10)' },
};

function MagnitudePip({ value }) {
  if (!value) return <span className="text-pantheon-muted text-xs">—</span>;
  const meta = MAGNITUDE_META[value] || MAGNITUDE_META[1];
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono px-1.5 py-0.5 rounded"
      style={{ color: meta.color, background: meta.bg }}>
      {value} <span className="opacity-70">{meta.label}</span>
    </span>
  );
}

function ScoreBar({ score, max }) {
  const pct = max > 0 ? Math.round((score / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 bg-pantheon-border rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-pantheon-accent transition-all"
          style={{ width: `${pct}%`, opacity: 0.85 }} />
      </div>
      <span className="text-sm font-mono text-pantheon-accent tabular-nums w-6 text-right">{score}</span>
    </div>
  );
}

function ProvenBadge({ score }) {
  if (score === 0) return <span className="text-[10px] uppercase tracking-wider text-pantheon-muted">unscored</span>;
  if (score >= 12) return <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: '#fb923c', background: 'rgba(251,146,60,0.12)' }}>proven</span>;
  if (score >= 6)  return <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: '#facc15', background: 'rgba(250,204,21,0.10)' }}>emerging</span>;
  return              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded text-pantheon-muted border border-pantheon-border">candidate</span>;
}

export default function Historian({ gems }) {
  const [expandedGem, setExpandedGem] = useState(null);
  const [timelineView, setTimelineView] = useState('rankings'); // 'rankings' | 'timeline'

  const historianGems = useMemo(() => gems.filter(g => g.originType !== 'authored'), [gems]);
  const authoredGems  = useMemo(() => gems.filter(g => g.originType === 'authored'), [gems]);

  const ranked = useMemo(() =>
    [...historianGems].sort((a, b) => b.gemScore - a.gemScore),
    [historianGems]
  );

  const timeline = useMemo(() =>
    [...historianGems]
      .filter(g => g.discoveredAt)
      .sort((a, b) => a.discoveredAt.localeCompare(b.discoveredAt)),
    [historianGems]
  );

  const maxScore = ranked[0]?.gemScore || 1;
  const totalEvents = historianGems.reduce((s, g) => s + g.events.length, 0);
  const totalMagnitude = historianGems.reduce((s, g) => s + g.gemScore, 0);
  const scoredGems = historianGems.filter(g => g.gemScore > 0).length;

  // Earliest historical event year across all gems
  const earliestYear = useMemo(() => {
    let min = Infinity;
    for (const gem of historianGems) {
      for (const e of gem.events) {
        const y = parseInt(e.year);
        if (!isNaN(y) && y > 0 && y < min) min = y;
      }
    }
    return min === Infinity ? null : min;
  }, [historianGems]);

  const centuriesSpanned = earliestYear
    ? Math.round((new Date().getFullYear() - earliestYear) / 100 * 10) / 10
    : null;

  return (
    <div className="h-full overflow-y-auto bg-pantheon-bg">
      {/* Header */}
      <div className="border-b border-pantheon-border px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-pantheon-accent tracking-wide mb-1">The Historian</h2>
              <p className="text-pantheon-muted text-sm italic">
                "The history is written. The synthesis has just begun."
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setTimelineView('rankings')}
                className={`px-3 py-1.5 text-xs rounded-l-lg border transition-colors ${timelineView === 'rankings' ? 'bg-pantheon-accent/20 border-pantheon-accent/50 text-pantheon-accent' : 'border-pantheon-border text-pantheon-muted hover:text-pantheon-text'}`}>
                Rankings
              </button>
              <button onClick={() => setTimelineView('timeline')}
                className={`px-3 py-1.5 text-xs rounded-r-lg border-t border-b border-r transition-colors ${timelineView === 'timeline' ? 'bg-pantheon-accent/20 border-pantheon-accent/50 text-pantheon-accent' : 'border-pantheon-border text-pantheon-muted hover:text-pantheon-text'}`}>
                Discovery Log
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat value={historianGems.length} label="gems catalogued" />
            <Stat value={totalEvents} label="events mapped" />
            <Stat value={centuriesSpanned ? `${centuriesSpanned}` : '—'} label="centuries of history" />
            <Stat value={totalMagnitude || '—'} label={totalMagnitude ? 'total magnitude' : 'scoring pending'} dim={!totalMagnitude} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">
        {timelineView === 'rankings' ? (
          <>
            {/* Rankings */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-semibold text-pantheon-text uppercase tracking-wider">Pattern Rankings</h3>
                <span className="text-xs text-pantheon-muted">by total magnitude — history's proof of universality</span>
              </div>
              {scoredGems === 0 && (
                <div className="text-pantheon-muted text-sm border border-pantheon-border rounded-lg px-4 py-3 mb-4">
                  Magnitude scoring in progress — scores will appear once the Historian finishes evaluating each event.
                </div>
              )}
              <div className="space-y-1">
                {ranked.map((gem, i) => (
                  <GemRow
                    key={gem.name}
                    gem={gem}
                    rank={i + 1}
                    maxScore={maxScore}
                    expanded={expandedGem === gem.name}
                    onToggle={() => setExpandedGem(expandedGem === gem.name ? null : gem.name)}
                  />
                ))}
              </div>
            </section>

            {/* Authored gems */}
            <AuthoredSection gems={authoredGems} />
          </>
        ) : (
          <>
            {/* Discovery Timeline */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-semibold text-pantheon-text uppercase tracking-wider">Discovery Log</h3>
                <span className="text-xs text-pantheon-muted">historian gems in order of research</span>
              </div>
              <div className="relative border-l border-pantheon-border ml-3 space-y-0">
                {timeline.map((gem, i) => (
                  <TimelineRow key={gem.name} gem={gem} isLast={i === timeline.length - 1} />
                ))}
                <div className="pl-6 py-4">
                  <span className="text-pantheon-muted text-xs italic">The research continues…</span>
                </div>
              </div>
            </section>

            <AuthoredSection gems={authoredGems} />
          </>
        )}

        {/* Convergence note */}
        <div className="border border-pantheon-border/50 rounded-lg px-5 py-4 bg-pantheon-card/40">
          <p className="text-xs text-pantheon-muted leading-relaxed">
            <span className="text-pantheon-text font-medium">On convergence:</span> As the Historian maps more of human history,
            new research should increasingly add events to existing gems rather than create new ones.
            When most discoveries are confirmations — not new patterns — the library has reached maturity.
            High-magnitude events mapping to the same gem across centuries is the validation that these are true universals, not historical curiosities.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, dim }) {
  return (
    <div className="bg-pantheon-card border border-pantheon-border rounded-lg px-4 py-3">
      <div className={`text-xl font-mono font-semibold ${dim ? 'text-pantheon-muted' : 'text-pantheon-accent'}`}>{value}</div>
      <div className="text-[11px] text-pantheon-muted mt-0.5">{label}</div>
    </div>
  );
}

function GemRow({ gem, rank, maxScore, expanded, onToggle }) {
  return (
    <div className="border border-pantheon-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-pantheon-card/60 transition-colors"
      >
        <span className="text-xs font-mono text-pantheon-muted w-6 text-right flex-shrink-0">{rank}</span>
        <span className="flex-1 text-sm text-pantheon-text truncate">{gem.name}</span>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-pantheon-muted hidden sm:inline">{gem.events.length} events</span>
          <ProvenBadge score={gem.gemScore} />
          <ScoreBar score={gem.gemScore} max={maxScore} />
          <span className="text-pantheon-muted text-xs">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-pantheon-border bg-pantheon-card/30 px-4 py-3 space-y-2">
          {gem.events.map(e => (
            <div key={e.name} className="flex items-start gap-3 text-xs">
              <MagnitudePip value={e.magnitude} />
              <div className="flex-1 min-w-0">
                <span className="text-pantheon-text font-medium">{e.name}</span>
                {e.year && <span className="text-pantheon-muted ml-2">({e.year})</span>}
                {e.role && (
                  <span className={`ml-2 uppercase text-[10px] tracking-wider ${e.role === 'violated' ? 'text-red-400/70' : 'text-pantheon-practitioner/70'}`}>
                    {e.role}
                  </span>
                )}
              </div>
            </div>
          ))}
          {gem.discoveredAt && (
            <p className="text-[11px] text-pantheon-muted pt-1 border-t border-pantheon-border/50">
              Catalogued {gem.discoveredAt}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TimelineRow({ gem, isLast }) {
  return (
    <div className="pl-6 pb-4 relative">
      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-pantheon-accent/60 -translate-x-1/2" />
      <div className="bg-pantheon-card border border-pantheon-border rounded-lg px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-sm text-pantheon-text">{gem.name}</span>
            {gem.practitioners.length > 0 && (
              <span className="text-xs text-pantheon-muted ml-2">· {gem.practitioners[0].name}</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <ProvenBadge score={gem.gemScore} />
            {gem.discoveredAt && (
              <span className="text-[11px] text-pantheon-muted font-mono">{gem.discoveredAt}</span>
            )}
          </div>
        </div>
        {gem.lineage && (
          <p className="text-[11px] text-pantheon-muted mt-1 font-mono truncate">{gem.lineage}</p>
        )}
      </div>
    </div>
  );
}

function AuthoredSection({ gems }) {
  if (!gems.length) return null;
  return (
    <section>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-sm font-semibold text-pantheon-text uppercase tracking-wider">
          ✦ Authored Gems
        </h3>
        <span className="text-xs text-pantheon-muted">surfaced from lived experience, not historical research</span>
      </div>
      <div className="space-y-1">
        {gems.map(gem => (
          <div key={gem.name} className="border border-pantheon-accent/20 rounded-lg px-4 py-3 flex items-center gap-3 bg-pantheon-card/30">
            <span className="text-pantheon-accent text-sm">✦</span>
            <span className="text-sm text-pantheon-text flex-1">{gem.name}</span>
            {gem.authoredBy && <span className="text-xs text-pantheon-muted">by {gem.authoredBy}</span>}
            {gem.discoveredAt && <span className="text-[11px] text-pantheon-muted font-mono">{gem.discoveredAt}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
