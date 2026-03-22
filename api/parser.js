import { readFileSync } from 'fs';
import { glob } from 'glob';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATTERNS_DIR = join(__dirname, '..', 'patterns');

/**
 * Pre-process raw file content to quote any unquoted `gem-role` values
 * that contain `: ` — which would otherwise confuse the YAML parser.
 */
function quoteGemRoleValues(rawContent) {
  return rawContent.replace(
    /^(\s+gem-role:\s+)([^'"\n][^\n]*)$/gm,
    (_match, prefix, value) => {
      // Escape any single quotes inside the value, then wrap in single quotes
      const escaped = value.replace(/'/g, "''");
      return `${prefix}'${escaped}'`;
    }
  );
}

function parseGemRole(gemRoleString) {
  if (!gemRoleString) return { role: null, description: null };
  const str = String(gemRoleString);
  // Format: "applied — description" or "violated — description"
  const dashIdx = str.indexOf('—');
  if (dashIdx === -1) {
    return { role: str.trim().toLowerCase(), description: null };
  }
  return {
    role: str.slice(0, dashIdx).trim().toLowerCase(),
    description: str.slice(dashIdx + 1).trim(),
  };
}

function parseEvent(event, gemName) {
  const { role, description } = parseGemRole(event['gem-role']);
  return {
    name: event.name || '',
    year: event.year != null ? String(event.year) : null,
    role,
    description,
    gemName,
  };
}

function parsePractitioner(p, gemName) {
  return {
    name: p.name || '',
    era: p.era != null ? String(p.era) : null,
    application: p.application || null,
    gemName,
  };
}

function extractDescription(content) {
  const match = content.match(/###\s+The Pattern\s*\n+([\s\S]*?)(?=\n\n###|\n\n##|$)/);
  return match ? match[1].trim() : null;
}

export function loadGems() {
  const files = glob.sync('*/pattern.md', { cwd: PATTERNS_DIR });

  return files.map((file) => {
    const fullPath = join(PATTERNS_DIR, file);
    const raw = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(quoteGemRoleValues(raw));

    const name = data.name || file.split('/')[0];
    const practitioners = (data.practitioners || []).map((p) =>
      parsePractitioner(p, name)
    );
    const events = (data.events || []).map((e) => parseEvent(e, name));

    return {
      name,
      aliases: data.aliases || [],
      domains: data.domain || [],
      triggers: data.trigger || [],
      lineage: data.lineage || null,
      originType: data['origin-type'] || null,
      description: extractDescription(content),
      practitioners,
      events,
    };
  });
}

// Build a deduplicated practitioner index: name → { name, gems[] }
export function buildPractitionerIndex(gems) {
  const index = new Map();
  for (const gem of gems) {
    for (const p of gem.practitioners) {
      if (!index.has(p.name)) {
        index.set(p.name, { name: p.name, gemNames: [] });
      }
      index.get(p.name).gemNames.push(gem.name);
    }
  }
  return index;
}
