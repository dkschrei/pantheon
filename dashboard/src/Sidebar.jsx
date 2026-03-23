import React from 'react';

function CollapseTab({ onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex-shrink-0 w-6 h-full bg-pantheon-card border-l border-pantheon-border flex items-center justify-center text-pantheon-muted hover:text-pantheon-text hover:bg-pantheon-border/30 transition-colors text-base"
      title="Open sidebar"
    >
      ‹
    </button>
  );
}

export default function Sidebar({ selectedNode, gems, practitioners, onClose, onNavigate, sidebarOpen, onToggleSidebar }) {
  if (!sidebarOpen) {
    return <CollapseTab onToggle={onToggleSidebar} />;
  }

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-pantheon-card border-l border-pantheon-border p-5 overflow-y-auto flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-pantheon-muted text-xs uppercase tracking-wider">Sidebar</span>
          <button onClick={onToggleSidebar} className="text-pantheon-muted hover:text-pantheon-text text-sm leading-none" title="Collapse sidebar">›</button>
        </div>
        <p className="text-pantheon-muted text-sm">Click a node in the graph to see details.</p>
        <div className="mt-6">
          <h3 className="font-display text-pantheon-accent text-sm mb-3 uppercase tracking-wider">Legend</h3>
          <div className="space-y-3 text-sm">
            <div className="group">
              <div className="flex items-center gap-2 cursor-default">
                <div className="w-4 h-4 rotate-45 border border-pantheon-gem bg-pantheon-gem/15 flex-shrink-0" />
                <span className="text-pantheon-gem font-medium">Gem</span>
                <span className="text-pantheon-muted text-xs">(Historian)</span>
              </div>
              <p className="text-xs text-pantheon-muted mt-1 leading-relaxed pl-6">A distilled cognitive pattern extracted by Historian from historical research.</p>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 cursor-default">
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 rotate-45 border-2 border-yellow-400 bg-yellow-400/15" />
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-yellow-400 text-[8px]">✦</span>
                </div>
                <span className="text-yellow-400 font-medium">Gem</span>
                <span className="text-pantheon-muted text-xs">(Authored)</span>
              </div>
              <p className="text-xs text-pantheon-muted mt-1 leading-relaxed pl-6">An original cognitive pattern authored directly — not extracted from history.</p>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 cursor-default">
                <div className="w-4 h-4 rounded-full border border-pantheon-practitioner bg-pantheon-practitioner/15 flex-shrink-0" />
                <span className="text-pantheon-practitioner font-medium">Practitioner</span>
              </div>
              <p className="text-xs text-pantheon-muted mt-1 leading-relaxed pl-6">A historical figure documented applying this pattern — the real-world evidence it works.</p>
            </div>
            <div className="group">
              <div className="flex items-center gap-2 cursor-default">
                <div className="w-4 h-4 rounded-sm border border-pantheon-event bg-pantheon-event/15 flex-shrink-0" />
                <span className="text-pantheon-event font-medium">Event</span>
              </div>
              <p className="text-xs text-pantheon-muted mt-1 leading-relaxed pl-6">A specific moment when a gem was applied or violated — with year and outcome.</p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const { type, label, data } = selectedNode;

  return (
    <aside className="w-80 bg-pantheon-card border-l border-pantheon-border p-5 overflow-y-auto flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-full border ${
          type === 'gem' ? 'text-pantheon-gem border-pantheon-gem/30' :
          type === 'practitioner' ? 'text-pantheon-practitioner border-pantheon-practitioner/30' :
          'text-pantheon-event border-pantheon-event/30'
        }`}>{type}</span>
        <div className="flex items-center gap-2">
          <button onClick={onToggleSidebar} className="text-pantheon-muted hover:text-pantheon-text text-sm leading-none" title="Collapse sidebar">›</button>
          <button onClick={onClose} className="text-pantheon-muted hover:text-pantheon-text text-lg leading-none">x</button>
        </div>
      </div>
      <h2 className="font-display text-lg text-pantheon-accent mb-4">{label}</h2>
      {type === 'gem' && <GemDetail gem={data} onNavigate={onNavigate} />}
      {type === 'practitioner' && <PractitionerDetail practitioner={data} gems={gems} onNavigate={onNavigate} />}
      {type === 'event' && <EventDetail event={data} gems={gems} onNavigate={onNavigate} />}
    </aside>
  );
}

const GITHUB_BASE = 'https://github.com/dkschrei/pantheon/blob/main/patterns';

const MAGNITUDE_META = {
  5: { label: 'Civilizational', color: '#f87171' },
  4: { label: 'Historic',       color: '#fb923c' },
  3: { label: 'Major',          color: '#facc15' },
  2: { label: 'Significant',    color: '#6ee7b7' },
  1: { label: 'Notable',        color: '#71717a' },
};

function GemDetail({ gem, onNavigate }) {
  const githubUrl = `${GITHUB_BASE}/${gem.name}/pattern.md`;
  return (
    <div className="space-y-4 text-sm">
      {gem.description && (
        <div className="p-3 bg-pantheon-bg rounded-lg border border-pantheon-border/50">
          <p className="text-xs leading-relaxed text-pantheon-text">{gem.description}</p>
        </div>
      )}
      <a href={githubUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-pantheon-accent hover:underline">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        Full pattern on GitHub
      </a>
      {gem.domains?.length > 0 && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Domains</h4>
          <div className="flex flex-wrap gap-1">
            {gem.domains.map(d => (
              <span key={d} className="px-2 py-0.5 bg-pantheon-bg border border-pantheon-border rounded text-xs">{d}</span>
            ))}
          </div>
        </div>
      )}
      {gem.originType === 'authored' ? (
        <div className="p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-yellow-400 text-xs">✦</span>
            <h4 className="text-yellow-400 text-xs uppercase tracking-wider font-medium">Authored Gem</h4>
          </div>
          <p className="text-xs text-pantheon-muted">
            Created by{' '}
            <a href={`https://github.com/dkschrei`} target="_blank" rel="noopener noreferrer"
              className="text-yellow-400 hover:underline">{gem.authoredBy}</a>
            {' · '}
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-yellow-400 hover:underline">view pattern</a>
          </p>
        </div>
      ) : gem.originType ? (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Origin</h4>
          <span className="px-2 py-0.5 rounded text-xs bg-pantheon-event/10 text-pantheon-event">Historian</span>
        </div>
      ) : null}
      {gem.lineage && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Lineage</h4>
          <p className="text-xs text-pantheon-muted leading-relaxed">{gem.lineage}</p>
        </div>
      )}
      {gem.practitioners?.length > 0 && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-2">Practitioners</h4>
          <div className="space-y-2">
            {gem.practitioners.map(p => (
              <button key={p.name} onClick={() => onNavigate({ id: `practitioner:${p.name}`, type: 'practitioner', label: p.name, data: p })}
                className="block w-full text-left p-2 rounded-lg bg-pantheon-bg hover:bg-pantheon-border/50 transition-colors">
                <span className="text-pantheon-practitioner">{p.name}</span>
                {p.era && <span className="text-pantheon-muted text-xs ml-2">{p.era}</span>}
                {p.application && <p className="text-xs text-pantheon-muted mt-0.5 line-clamp-2">{p.application}</p>}
              </button>
            ))}
          </div>
        </div>
      )}
      {gem.gemScore > 0 && (
        <div className="border border-pantheon-border rounded-lg overflow-hidden">
          <div className="px-3 py-2 bg-pantheon-bg/60 border-b border-pantheon-border flex items-center justify-between">
            <h4 className="text-pantheon-muted text-xs uppercase tracking-wider">Historian's Score</h4>
            <span className="font-mono text-sm text-pantheon-accent font-semibold">{gem.gemScore}</span>
          </div>
          <div className="px-3 py-2 space-y-2">
            {gem.events.filter(e => e.magnitude).map(e => {
              const meta = MAGNITUDE_META[e.magnitude] || MAGNITUDE_META[1];
              return (
                <div key={e.name} className="text-xs space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono w-4 text-right flex-shrink-0 font-semibold" style={{ color: meta.color }}>{e.magnitude}</span>
                    <span className="text-[10px] uppercase tracking-wider flex-shrink-0" style={{ color: meta.color }}>{meta.label}</span>
                    <span className={`text-[10px] px-1 rounded flex-shrink-0 ${e.role === 'violated' ? 'text-red-400/70' : 'text-pantheon-event/70'}`}>{e.role}</span>
                    <span className="text-pantheon-muted text-[10px]">{e.year}</span>
                  </div>
                  <p className="text-pantheon-text pl-6 leading-snug">{e.name}</p>
                  {e.description && <p className="text-pantheon-muted pl-6 leading-snug line-clamp-2">{e.description}</p>}
                </div>
              );
            })}
            <div className="pt-2 border-t border-pantheon-border/50">
              <a href="https://github.com/dkschrei/pantheon/blob/main/CONTRIBUTING.md"
                target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-pantheon-muted hover:text-pantheon-accent transition-colors">
                Disagree with this ranking? → Open a PR
              </a>
            </div>
          </div>
        </div>
      )}
      {gem.events?.length > 0 && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-2">Events</h4>
          <div className="space-y-2">
            {gem.events.map(e => (
              <button key={e.name} onClick={() => onNavigate({ id: `event:${gem.name}:${e.name}`, type: 'event', label: e.name, data: { ...e, gemName: gem.name } })}
                className="block w-full text-left p-2 rounded-lg bg-pantheon-bg hover:bg-pantheon-border/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${e.role === 'violated' ? 'bg-red-400/10 text-red-400' : 'bg-pantheon-event/10 text-pantheon-event'}`}>{e.role || 'applied'}</span>
                  <span className="text-xs text-pantheon-muted">{e.year}</span>
                </div>
                <p className="text-xs mt-1">{e.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PractitionerDetail({ practitioner, gems, onNavigate }) {
  const practGems = gems.filter(g => g.practitioners.some(p => p.name === practitioner.name));
  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(practitioner.name.replace(/ /g, '_'))}`;
  return (
    <div className="space-y-4 text-sm">
      <a href={wikiUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-pantheon-practitioner hover:underline">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.09 2C6.545 2 2 6.545 2 12.09 2 17.636 6.545 22.18 12.09 22.18c5.545 0 10.09-4.544 10.09-10.09C22.18 6.545 17.635 2 12.09 2zm-.91 3.636h1.818v1.819h-1.818V5.636zm0 3.637h1.818v7.272h-1.818V9.273z"/></svg>
        Wikipedia — {practitioner.name}
      </a>
      {practitioner.era && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Era</h4>
          <p>{practitioner.era}</p>
        </div>
      )}
      {practitioner.application && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Application</h4>
          <p className="text-xs leading-relaxed">{practitioner.application}</p>
        </div>
      )}
      <div>
        <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-2">Gems Used ({practGems.length})</h4>
        <div className="space-y-2">
          {practGems.map(g => {
            const pData = g.practitioners.find(p => p.name === practitioner.name);
            return (
              <button key={g.name} onClick={() => onNavigate({ id: `gem:${g.name}`, type: 'gem', label: g.name, data: g })}
                className="block w-full text-left p-2 rounded-lg bg-pantheon-bg hover:bg-pantheon-border/50 transition-colors">
                <span className="text-pantheon-gem">{g.name}</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {g.domains.slice(0, 3).map(d => (
                    <span key={d} className="text-[10px] px-1.5 py-0.5 bg-pantheon-border/50 rounded text-pantheon-muted">{d}</span>
                  ))}
                </div>
                {pData?.application && <p className="text-xs text-pantheon-muted mt-1 line-clamp-2">{pData.application}</p>}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-2">Related Events</h4>
        <div className="space-y-1">
          {practGems.flatMap(g => g.events.map(e => ({ ...e, gemName: g.name }))).map(e => (
            <div key={`${e.gemName}:${e.name}`} className="p-2 bg-pantheon-bg rounded-lg">
              <div className="flex items-center gap-2 text-xs">
                <span className={e.role === 'violated' ? 'text-red-400' : 'text-pantheon-event'}>{e.role}</span>
                <span className="text-pantheon-muted">{e.year}</span>
              </div>
              <p className="text-xs mt-0.5">{e.name}</p>
              <p className="text-[10px] text-pantheon-muted mt-0.5">via {e.gemName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventDetail({ event, gems, onNavigate }) {
  const parentGem = gems.find(g => g.name === event.gemName);
  const wikiSearchUrl = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(event.name)}`;
  return (
    <div className="space-y-4 text-sm">
      <a href={wikiSearchUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-pantheon-event hover:underline">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.09 2C6.545 2 2 6.545 2 12.09 2 17.636 6.545 22.18 12.09 22.18c5.545 0 10.09-4.544 10.09-10.09C22.18 6.545 17.635 2 12.09 2zm-.91 3.636h1.818v1.819h-1.818V5.636zm0 3.637h1.818v7.272h-1.818V9.273z"/></svg>
        Search Wikipedia — {event.name}
      </a>
      <div>
        <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Year</h4>
        <p>{event.year}</p>
      </div>
      <div>
        <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Role</h4>
        <span className={`px-2 py-0.5 rounded text-xs ${event.role === 'violated' ? 'bg-red-400/10 text-red-400' : 'bg-pantheon-event/10 text-pantheon-event'}`}>{event.role || 'applied'}</span>
      </div>
      {event.description && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Description</h4>
          <p className="text-xs leading-relaxed">{event.description}</p>
        </div>
      )}
      {parentGem && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-2">Parent Gem</h4>
          <button onClick={() => onNavigate({ id: `gem:${parentGem.name}`, type: 'gem', label: parentGem.name, data: parentGem })}
            className="block w-full text-left p-2 rounded-lg bg-pantheon-bg hover:bg-pantheon-border/50 transition-colors">
            <span className="text-pantheon-gem">{parentGem.name}</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {parentGem.domains.map(d => (
                <span key={d} className="text-[10px] px-1.5 py-0.5 bg-pantheon-border/50 rounded text-pantheon-muted">{d}</span>
              ))}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
