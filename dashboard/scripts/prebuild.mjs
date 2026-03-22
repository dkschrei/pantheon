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

function fixYaml(raw) {
  // Quote gem-role values that aren't already quoted
  raw = raw.replace(
    /^(\s+gem-role:\s+)([^'"\n][^\n]*)$/gm,
    (_m, prefix, value) => `${prefix}'${value.replace(/'/g, "''")}'`
  );
  // Quote name/application values where a double-quoted word is followed by more text
  // e.g. name: "We Shall Fight" — House of Commons  →  name: '"We Shall Fight" — House of Commons'
  // e.g. application: "The machine that makes the machine" — ...  →  application: '"The machine..." — ...'
  raw = raw.replace(
    /^(\s+(?:- )?(?:name|application):\s+)"([^"]*)"([^\n]+)$/gm,
    (_m, prefix, inner, rest) => {
      const full = `"${inner}"${rest}`.replace(/'/g, "''");
      return `${prefix}'${full}'`;
    }
  );
  // General fix: quote any unquoted scalar value containing ': ' (colon-space)
  // e.g. outcome: The lesson: hardware is commoditizable  →  outcome: 'The lesson: hardware is commoditizable'
  // Skips already-quoted values (starting with ' or "), block indicators (|, >), and flow sequences/maps ([ {)
  raw = raw.replace(
    /^(\s+[\w-]+:\s+)([^'"\|\>\[\{][^\n]*)$/gm,
    (_m, prefix, value) => {
      if (value.includes(': ')) {
        return `${prefix}'${value.replace(/'/g, "''")}'`;
      }
      return _m;
    }
  );
  return raw;
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

const parseErrors = [];
const gems = files.flatMap(file => {
  try {
    const raw = readFileSync(join(PATTERNS_DIR, file), 'utf8');
    const { data, content } = matter(fixYaml(raw));
    const name = data.name || file.split('/')[0];
    return [{
      name,
      aliases: data.aliases || [],
      domains: data.domain || [],
      triggers: data.trigger || [],
      lineage: data.lineage || null,
      originType: data['origin-type'] || null,
      authoredBy: data['authored-by'] || null,
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
    }];
  } catch (err) {
    parseErrors.push({ file, error: err.message });
    console.error(`⚠ SKIPPED ${file}: ${err.message}`);
    return [];
  }
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
if (parseErrors.length > 0) {
  console.error(`\n⚠ ${parseErrors.length} pattern(s) skipped due to YAML errors:`);
  parseErrors.forEach(({ file, error }) => console.error(`  • ${file}: ${error}`));
  console.error('Fix the frontmatter in these files and rebuild.\n');
  process.exit(1);
}
