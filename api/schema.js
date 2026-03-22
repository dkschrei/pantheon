export const typeDefs = `#graphql
  type Gem {
    name: String!
    aliases: [String!]!
    domains: [String!]!
    triggers: [String!]!
    lineage: String
    originType: String
    """The distilled mental model — extracted from '### The Pattern' in the pattern file."""
    description: String
    practitioners: [GemPractitioner!]!
    events: [Event!]!
  }

  """A practitioner as they appear on a specific gem (includes application context)."""
  type GemPractitioner {
    name: String!
    era: String
    application: String
    """The shared Practitioner node for reverse-lookup across all gems."""
    practitioner: Practitioner
  }

  """A deduplicated practitioner across the entire library."""
  type Practitioner {
    name: String!
    """All gems this practitioner appears in."""
    gems: [Gem!]!
  }

  type Event {
    name: String!
    """Year or range as a string (e.g. "1986", "1943-1945", "48bc-642ad")."""
    year: String
    """'applied' or 'violated'"""
    role: String
    """The explanation after the em-dash in the gem-role field."""
    description: String
    gem: Gem!
  }

  type Query {
    """Return all gems, optionally filtered by domain."""
    gems(domain: String): [Gem!]!
    """Return a single gem by its slug name."""
    gem(name: String!): Gem
    """Return all deduplicated practitioners across the library."""
    practitioners: [Practitioner!]!
    """Return a single practitioner by name, with all gems they appear in."""
    practitioner(name: String!): Practitioner
    """Return all events across all gems."""
    events: [Event!]!
  }
`;
