/**
 * Prebuild script — runs before `vite build` and `vite dev`.
 * Parses all patterns/*.md files and writes src/data/gems.json.
 * This eliminates the need for a runtime GraphQL server.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { glob } from 'glob';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATTERNS_DIR = join(__dirname, '../../patterns');

function quoteGemRoleValues(raw) {
  return raw.replace(
    /^(\s+gem-role:\s+)([^'"\n][^\n]*)$/gm,
    (_m, prefix, value) => `${prefix}'${value.replace(/'/g, "''")}'`
  );
}

function parseGemRole(str) {
  if (!str) return { role: null, description: null };
  str = String(str);
  const i = str.indexOf('—');
  if (i === -1) return { role: str.trim().toLowerCase(), description: null };
  return { role: str.slice(0, i).trim().toLowerCase(), description: str.slice(i + 1).trim() };
}

function extractDescription(content) {
  const m = content.match(/###\s+The Pattern\s*\n+([\s\S]*?)(?=\n\n###|\n\n##|$)/);
  return m ? m[1].trim() : null;
}

const files = glob.sync('*/pattern.md', { cwd: PATTERNS_DIR });

const gems = files.map(file => {
  const raw = readFileSync(join(PATTERNS_DIR, file), 'utf8');
  const { data, content } = matter(quoteGemRoleValues(raw));
  const name = data.name || file.split('/')[0];
  return {
    name,
    aliases: data.aliases || [],
    domains: data.domain || [],
    triggers: data.trigger || [],
    lineage: data.lineage || null,
    originType: data['origin-type'] || null,
    description: extractDescription(content),
    practitioners: (data.practitioners || []).map(p => ({
      name: p.name || '',
      era: p.era != null ? String(p.era) : null,
      application: p.application || null,
    })),
    events: (data.events || []).map(e => {
      const { role, description } = parseGemRole(e['gem-role']);
      return { name: e.name || '', year: e.year != null ? String(e.year) : null, role, description };
    }),
  };
});

const practitionerMap = new Map();
for (const gem of gems)
  for (const p of gem.practitioners)
    if (!practitionerMap.has(p.name)) practitionerMap.set(p.name, { name: p.name });

const practitioners = Array.from(practitionerMap.values());

mkdirSync(join(__dirname, '../src/data'), { recursive: true });
writeFileSync(
  join(__dirname, '../src/data/gems.json'),
  JSON.stringify({ gems, practitioners }, null, 2)
);
console.log(`✓ gems.json: ${gems.length} gems, ${practitioners.length} practitioners, ${gems.reduce((s, g) => s + g.events.length, 0)} events`);
