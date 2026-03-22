import React, { useMemo, useState, useRef, useEffect } from 'react';

export default function Header({ gems, practitioners, filterType, setFilterType, filterValue, setFilterValue, onSearchSelect }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef();

  const allDomains = useMemo(() => {
    const set = new Set();
    gems.forEach(g => g.domains.forEach(d => set.add(d)));
    return [...set].sort();
  }, [gems]);

  const eventCount = useMemo(() => gems.reduce((sum, g) => sum + g.events.length, 0), [gems]);

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const results = [];

    for (const gem of gems) {
      if (gem.name.toLowerCase().includes(q) || (gem.aliases || []).some(a => a.toLowerCase().includes(q))) {
        results.push({ id: `gem:${gem.name}`, type: 'gem', label: gem.name, data: gem });
      }
      for (const p of gem.practitioners) {
        if (p.name.toLowerCase().includes(q) && !results.some(r => r.id === `practitioner:${p.name}`)) {
          results.push({ id: `practitioner:${p.name}`, type: 'practitioner', label: p.name, data: p });
        }
      }
      for (const e of gem.events) {
        if (e.name.toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q)) {
          results.push({ id: `event:${gem.name}:${e.name}`, type: 'event', label: e.name, data: { ...e, gemName: gem.name } });
        }
      }
    }

    return results.slice(0, 12);
  }, [query, gems]);

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (result) => {
    onSearchSelect(result);
    setQuery('');
    setShowResults(false);
  };

  const handleFilterChange = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
  };

  const clearFilter = () => {
    setFilterType('all');
    setFilterValue('');
  };

  const typeColor = { gem: 'text-pantheon-gem', practitioner: 'text-pantheon-practitioner', event: 'text-pantheon-event' };

  return (
    <header className="bg-pantheon-card border-b border-pantheon-border px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between flex-shrink-0 gap-2">
      <div className="flex items-center gap-4 flex-shrink-0">
        <h1 className="font-display text-xl text-pantheon-accent tracking-wide">PANTHEON</h1>
        <div className="h-6 w-px bg-pantheon-border" />
        <div className="flex items-center gap-2 text-sm text-pantheon-muted">
          <span className="inline-block w-3 h-3 rotate-45 bg-pantheon-gem" /> {gems.length} gems
          <span className="ml-2 inline-block w-3 h-3 rounded-full bg-pantheon-practitioner" /> {practitioners.length} practitioners
          <span className="ml-2 inline-block w-3 h-3 rounded-sm bg-pantheon-event" /> {eventCount} events
        </div>
      </div>
      <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 flex-nowrap">
        {/* Global search */}
        <div ref={searchRef} className="relative">
          <input
            type="text"
            placeholder="Search gems, people, events..."
            value={query}
            onChange={e => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            onKeyDown={e => { if (e.key === 'Enter' && searchResults.length > 0) handleSelect(searchResults[0]); }}
            className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm w-40 sm:w-56 focus:outline-none focus:border-pantheon-accent placeholder:text-pantheon-muted/50"
          />
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-1 left-0 w-80 bg-pantheon-card border border-pantheon-border rounded-lg shadow-xl z-50 overflow-hidden">
              {searchResults.map(r => (
                <button key={r.id} onMouseDown={() => handleSelect(r)}
                  className="w-full text-left px-3 py-2 hover:bg-pantheon-border/40 transition-colors flex items-center gap-2 border-b border-pantheon-border/30 last:border-0">
                  <span className={`text-[10px] uppercase tracking-wider w-16 flex-shrink-0 ${typeColor[r.type]}`}>{r.type}</span>
                  <span className="text-sm truncate">{r.label}</span>
                  {r.type === 'event' && (
                    <span className="text-[10px] text-pantheon-muted ml-auto flex-shrink-0">via {r.data.gemName}</span>
                  )}
                </button>
              ))}
            </div>
          )}
          {showResults && query.length >= 2 && searchResults.length === 0 && (
            <div className="absolute top-full mt-1 left-0 w-80 bg-pantheon-card border border-pantheon-border rounded-lg shadow-xl z-50 px-3 py-2 text-xs text-pantheon-muted">
              No matches for "{query}"
            </div>
          )}
        </div>

        <select
          className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pantheon-accent"
          value={filterType === 'practitioner' ? filterValue : ''}
          onChange={e => handleFilterChange('practitioner', e.target.value)}
        >
          <option value="">All Practitioners</option>
          {[...practitioners].sort((a, b) => a.name.localeCompare(b.name)).map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
        <select
          className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pantheon-accent"
          value={filterType === 'gem' ? filterValue : ''}
          onChange={e => handleFilterChange('gem', e.target.value)}
        >
          <option value="">All Gems</option>
          {[...gems].sort((a, b) => a.name.localeCompare(b.name)).map(g => (
            <option key={g.name} value={g.name}>{g.name}</option>
          ))}
        </select>
        <select
          className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pantheon-accent"
          value={filterType === 'domain' ? filterValue : ''}
          onChange={e => handleFilterChange('domain', e.target.value)}
        >
          <option value="">All Domains</option>
          {allDomains.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pantheon-accent"
          value={filterType === 'origin' ? filterValue : ''}
          onChange={e => handleFilterChange('origin', e.target.value)}
        >
          <option value="">All Origins</option>
          <option value="authored">✦ Authored</option>
          <option value="historian">Historian</option>
        </select>
        {filterValue && (
          <button onClick={clearFilter} className="text-xs text-pantheon-muted hover:text-pantheon-accent transition-colors px-2 py-1 border border-pantheon-border rounded-lg">Clear</button>
        )}
      </div>
    </header>
  );
}
