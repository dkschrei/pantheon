import React, { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';

const COLORS = {
  gem: '#c9a84c',
  practitioner: '#6ee7b7',
  event: '#93c5fd',
  link: '#2a2a3a',
  linkViolated: '#ef4444',
};

export default function ForceGraph({ data, onNodeClick, selectedNode }) {
  const svgRef = useRef();

  const handleClick = useCallback((event, d) => {
    onNodeClick({ id: d.id, type: d.type, label: d.label, data: d.data });
  }, [onNodeClick]);

  useEffect(() => {
    if (!data.nodes.length) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll('*').remove();

    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    const defs = svg.append('defs');
    ['applied', 'violated', 'practices'].forEach(type => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', type === 'violated' ? COLORS.linkViolated : COLORS.link);
    });

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => d.radius + 5));

    const link = g.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', d => d.type === 'violated' ? COLORS.linkViolated : COLORS.link)
      .attr('stroke-width', d => d.type === 'practices' ? 1.5 : 1)
      .attr('stroke-dasharray', d => d.type === 'violated' ? '4,4' : null)
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    const node = g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
      )
      .on('click', handleClick);

    node.each(function(d) {
      const el = d3.select(this);
      if (d.type === 'gem') {
        const s = d.radius;
        el.append('polygon')
          .attr('points', `0,${-s} ${s},0 0,${s} ${-s},0`)
          .attr('fill', COLORS.gem)
          .attr('fill-opacity', 0.15)
          .attr('stroke', COLORS.gem)
          .attr('stroke-width', 1.5);
      } else if (d.type === 'practitioner') {
        el.append('circle')
          .attr('r', d.radius)
          .attr('fill', COLORS.practitioner)
          .attr('fill-opacity', 0.15)
          .attr('stroke', COLORS.practitioner)
          .attr('stroke-width', 1.5);
      } else {
        const s = d.radius;
        el.append('rect')
          .attr('x', -s).attr('y', -s)
          .attr('width', s * 2).attr('height', s * 2)
          .attr('rx', 2)
          .attr('fill', COLORS.event)
          .attr('fill-opacity', 0.15)
          .attr('stroke', COLORS.event)
          .attr('stroke-width', 1);
      }
    });

    node.append('text')
      .text(d => {
        if (d.type === 'event') return d.label.length > 20 ? d.label.slice(0, 18) + '...' : d.label;
        return d.label;
      })
      .attr('dy', d => d.radius + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.type === 'gem' ? COLORS.gem : d.type === 'practitioner' ? COLORS.practitioner : COLORS.event)
      .attr('font-size', d => d.type === 'event' ? '9px' : '11px')
      .attr('font-weight', d => d.type === 'gem' ? '600' : '400')
      .attr('opacity', d => d.type === 'event' ? 0.6 : 0.85);

    const DEFINITIONS = {
      gem: 'A distilled cognitive pattern — a named move high-performers make when facing a specific class of problem.',
      practitioner: 'A historical figure or thinker documented applying this pattern in the real world.',
      event: 'A specific moment when this pattern was applied or violated — the historical evidence.',
    };

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    node.on('mouseenter', (event, d) => {
      let html = `<div style="font-size:10px;color:#9ca3af;margin-bottom:5px;font-style:italic;line-height:1.4">${DEFINITIONS[d.type]}</div>`;
      html += `<strong>${d.label}</strong>`;
      if (d.type === 'gem') html += `<br/><span style="color:#71717a">${d.data.domains.join(', ')}</span>`;
      if (d.type === 'practitioner') html += `<br/><span style="color:#71717a">${d.data.era || ''}</span>`;
      if (d.type === 'event') html += `<br/><span style="color:#71717a">${d.data.year} · ${d.data.role || ''}</span>`;
      tooltip.html(html)
        .style('left', (event.pageX + 12) + 'px')
        .style('top', (event.pageY - 12) + 'px')
        .transition().duration(150).style('opacity', 1);
    })
    .on('mouseleave', () => {
      tooltip.transition().duration(150).style('opacity', 0);
    });

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    if (selectedNode) {
      node.style('opacity', d => {
        if (d.id === selectedNode.id) return 1;
        const connected = data.links.some(l =>
          (l.source.id || l.source) === selectedNode.id && (l.target.id || l.target) === d.id ||
          (l.target.id || l.target) === selectedNode.id && (l.source.id || l.source) === d.id
        );
        return connected ? 0.9 : 0.2;
      });
      link.style('opacity', d => {
        const src = d.source.id || d.source;
        const tgt = d.target.id || d.target;
        return src === selectedNode.id || tgt === selectedNode.id ? 0.8 : 0.08;
      });
    }

    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 4, height / 4).scale(0.7));

    return () => { simulation.stop(); tooltip.remove(); };
  }, [data, selectedNode, handleClick]);

  return <svg ref={svgRef} className="w-full h-full" style={{ background: '#0a0a0f' }} />;
}
