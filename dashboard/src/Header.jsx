import React, { useMemo } from 'react';

export default function Header({ gems, practitioners, filterType, setFilterType, filterValue, setFilterValue }) {
  const allDomains = useMemo(() => {
    const set = new Set();
    gems.forEach(g => g.domains.forEach(d => set.add(d)));
    return [...set].sort();
  }, [gems]);

  const eventCount = useMemo(() => gems.reduce((sum, g) => sum + g.events.length, 0), [gems]);

  const handleFilterChange = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
  };

  const clearFilter = () => {
    setFilterType('all');
    setFilterValue('');
  };

  return (
    <header className="bg-pantheon-card border-b border-pantheon-border px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-xl text-pantheon-accent tracking-wide">PANTHEON</h1>
        <div className="h-6 w-px bg-pantheon-border" />
        <div className="flex items-center gap-2 text-sm text-pantheon-muted">
          <span className="inline-block w-3 h-3 rotate-45 bg-pantheon-gem" /> {gems.length} gems
          <span className="ml-2 inline-block w-3 h-3 rounded-full bg-pantheon-practitioner" /> {practitioners.length} practitioners
          <span className="ml-2 inline-block w-3 h-3 rounded-sm bg-pantheon-event" /> {eventCount} events
        </div>
      </div>
      <div className="flex items-center gap-3">
        <select
          className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pantheon-accent"
          value={filterType === 'practitioner' ? filterValue : ''}
          onChange={e => handleFilterChange('practitioner', e.target.value)}
        >
          <option value="">All Practitioners</option>
          {practitioners.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
        <select
          className="bg-pantheon-bg border border-pantheon-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pantheon-accent"
          value={filterType === 'gem' ? filterValue : ''}
          onChange={e => handleFilterChange('gem', e.target.value)}
        >
          <option value="">All Gems</option>
          {gems.map(g => (
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
        {filterValue && (
          <button onClick={clearFilter} className="text-xs text-pantheon-muted hover:text-pantheon-accent transition-colors px-2 py-1 border border-pantheon-border rounded-lg">Clear</button>
        )}
      </div>
    </header>
  );
}
