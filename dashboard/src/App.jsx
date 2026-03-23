import React, { useState, useEffect, useMemo } from 'react';
import gemsData from './data/gems.json';
import ForceGraph from './ForceGraph';
import Sidebar from './Sidebar';
import Header from './Header';
import Historian from './Historian';
import GemRunner from './GemRunner';

export default function App() {
  const { gems, practitioners } = gemsData;
  const [activeTab, setActiveTab] = useState('graph');
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 640);
  const graphData = useMemo(() => buildGraphData(gems, filterType, filterValue), [gems, filterType, filterValue]);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchSelect = (result) => {
    setActiveTab('graph');
    setSelectedNode(result);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        gems={gems}
        practitioners={practitioners}
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onSearchSelect={handleSearchSelect}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex flex-1 overflow-hidden relative">
        {activeTab === 'graph' ? (
          <div className="flex-1 relative">
            <ForceGraph
              data={graphData}
              onNodeClick={setSelectedNode}
              selectedNode={selectedNode}
            />
          </div>
        ) : activeTab === 'historian' ? (
          <Historian gems={gems} onGemSelect={setSelectedNode} />
        ) : (
          <GemRunner />
        )}
        {activeTab !== 'run' && (
          <Sidebar
            selectedNode={selectedNode}
            gems={gems}
            practitioners={practitioners}
            onClose={() => setSelectedNode(null)}
            onNavigate={setSelectedNode}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(o => !o)}
          />
        )}
      </div>
    </div>
  );
}

function buildGraphData(gems, filterType, filterValue) {
  const nodes = [];
  const links = [];
  const nodeSet = new Set();
  const practitionerGems = new Map();

  let filteredGems = gems;

  if (filterType === 'practitioner' && filterValue) {
    filteredGems = gems.filter(g =>
      g.practitioners.some(p => p.name.toLowerCase() === filterValue.toLowerCase())
    );
  } else if (filterType === 'gem' && filterValue) {
    filteredGems = gems.filter(g => g.name === filterValue);
  } else if (filterType === 'domain' && filterValue) {
    filteredGems = gems.filter(g => g.domains.includes(filterValue));
  } else if (filterType === 'origin' && filterValue) {
    if (filterValue === 'authored') {
      filteredGems = gems.filter(g => g.originType === 'authored');
    } else if (filterValue === 'historian') {
      filteredGems = gems.filter(g => g.originType !== 'authored');
    }
  }

  for (const gem of filteredGems) {
    const gemId = `gem:${gem.name}`;
    if (!nodeSet.has(gemId)) {
      nodes.push({ id: gemId, type: 'gem', label: gem.name, data: gem, radius: 12 + gem.practitioners.length * 2 });
      nodeSet.add(gemId);
    }

    for (const p of gem.practitioners) {
      const pId = `practitioner:${p.name}`;
      if (!nodeSet.has(pId)) {
        nodes.push({ id: pId, type: 'practitioner', label: p.name, data: p, radius: 10 });
        nodeSet.add(pId);
      }
      practitionerGems.set(pId, (practitionerGems.get(pId) || 0) + 1);
      links.push({ source: pId, target: gemId, type: 'practices' });
    }

    for (const e of gem.events) {
      const eId = `event:${gem.name}:${e.name}`;
      if (!nodeSet.has(eId)) {
        nodes.push({ id: eId, type: 'event', label: e.name, data: { ...e, gemName: gem.name }, radius: 7 });
        nodeSet.add(eId);
      }
      links.push({ source: gemId, target: eId, type: e.role === 'violated' ? 'violated' : 'applied' });
    }
  }

  for (const node of nodes) {
    if (node.type === 'practitioner') {
      node.radius = 8 + (practitionerGems.get(node.id) || 1) * 3;
    }
  }

  return { nodes, links };
}
