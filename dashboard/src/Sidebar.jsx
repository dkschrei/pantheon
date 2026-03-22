import React from 'react';

export default function Sidebar({ selectedNode, gems, practitioners, onClose, onNavigate }) {
  if (!selectedNode) {
    return (
      <aside className="w-80 bg-pantheon-card border-l border-pantheon-border p-5 overflow-y-auto flex-shrink-0">
        <p className="text-pantheon-muted text-sm">Click a node in the graph to see details.</p>
        <div className="mt-6">
          <h3 className="font-display text-pantheon-accent text-sm mb-3 uppercase tracking-wider">Legend</h3>
          <div className="space-y-3 text-sm">
            <div className="group">
              <div className="flex items-center gap-2 cursor-default">
                <div className="w-4 h-4 rotate-45 border border-pantheon-gem bg-pantheon-gem/15 flex-shrink-0" />
                <span className="text-pantheon-gem font-medium">Gem</span>
              </div>
              <p className="text-xs text-pantheon-muted mt-1 leading-relaxed pl-6">A distilled cognitive pattern — a named move high-performers make when facing a specific class of problem.</p>
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
        <button onClick={onClose} className="text-pantheon-muted hover:text-pantheon-text text-lg leading-none">x</button>
      </div>
      <h2 className="font-display text-lg text-pantheon-accent mb-4">{label}</h2>
      {type === 'gem' && <GemDetail gem={data} onNavigate={onNavigate} />}
      {type === 'practitioner' && <PractitionerDetail practitioner={data} gems={gems} onNavigate={onNavigate} />}
      {type === 'event' && <EventDetail event={data} gems={gems} onNavigate={onNavigate} />}
    </aside>
  );
}

function GemDetail({ gem, onNavigate }) {
  return (
    <div className="space-y-4 text-sm">
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
      {gem.originType && (
        <div>
          <h4 className="text-pantheon-muted text-xs uppercase tracking-wider mb-1">Origin</h4>
          <span className={`px-2 py-0.5 rounded text-xs ${gem.originType === 'authored' ? 'bg-pantheon-accent/10 text-pantheon-accent' : 'bg-pantheon-event/10 text-pantheon-event'}`}>
            {gem.originType === 'authored' ? 'Authored' : 'Historian'}
          </span>
        </div>
      )}
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
  return (
    <div className="space-y-4 text-sm">
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
  return (
    <div className="space-y-4 text-sm">
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
