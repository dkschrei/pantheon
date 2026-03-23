import { useState, useEffect, useRef } from "react";

const GEMS = [
  { id: "andon-cord", label: "Andon Cord", domain: "engineering", trigger: "frustration signal" },
  { id: "anomaly-isolation", label: "Anomaly Isolation", domain: "engineering", trigger: "anomalous data" },
  { id: "antifragility", label: "Antifragility", domain: "decision-making", trigger: "building through uncertainty" },
  { id: "axiom-blitz", label: "Axiom Blitz", domain: "engineering", trigger: "messy domain, no foundation" },
  { id: "build-the-machine", label: "Build the Machine", domain: "engineering", trigger: "monumental goal" },
  { id: "cannae", label: "Cannae", domain: "decision-making", trigger: "enemy has superior mass", sensitive: true },
  { id: "carve-at-joints", label: "Carve at Joints", domain: "engineering", trigger: "messy domain, no categories" },
  { id: "complementarity", label: "Complementarity", domain: "engineering", trigger: "contradictory frameworks" },
  { id: "composition-trap", label: "Composition Trap", domain: "decision-making", trigger: "system stuck, everyone acting rationally" },
  { id: "constraint-saturation", label: "Constraint Saturation", domain: "engineering", trigger: "predicting unknown structure" },
  { id: "copernican-inversion", label: "Copernican Inversion", domain: "philosophy", trigger: "irresolvable debate" },
  { id: "defeat-in-detail", label: "Defeat in Detail", domain: "decision-making", trigger: "multiple adversaries", sensitive: true },
  { id: "eat-the-world", label: "Eat the World", domain: "engineering", trigger: "tech not reaching users", sensitive: true },
  { id: "falsification", label: "Falsification", domain: "philosophy", trigger: "theory feels too comfortable" },
  { id: "federal-decentralization", label: "Federal Decentralization", domain: "leadership", trigger: "scaling organization" },
  { id: "feynman-clarity", label: "Feynman Clarity", domain: "debugging", trigger: "I don't understand why" },
  { id: "flow-line", label: "Flow Line", domain: "engineering", trigger: "batch processing" },
  { id: "gedankenexperiment", label: "Gedankenexperiment", domain: "engineering", trigger: "two principles contradict" },
  { id: "gestalt-first", label: "Gestalt First", domain: "creativity", trigger: "starting without complete picture" },
  { id: "grammar-theft", label: "Grammar Theft", domain: "creativity", trigger: "creative ceiling" },
  { id: "imperial-self-correction", label: "Imperial Self-Correction", domain: "leadership", trigger: "emotion driving decision" },
  { id: "inflection-point", label: "Inflection Point", domain: "decision-making", trigger: "strategic shift" },
  { id: "lion-and-fox", label: "Lion and Fox", domain: "leadership", trigger: "political decision" },
  { id: "material-honesty", label: "Material Honesty", domain: "engineering", trigger: "design review" },
  { id: "methodical-doubt", label: "Methodical Doubt", domain: "philosophy", trigger: "inherited assumptions" },
  { id: "mind-forge", label: "Mind Forge", domain: "engineering", trigger: "complex system design" },
  { id: "mobilize-the-language", label: "Mobilize the Language", domain: "leadership", trigger: "belief gap blocking action" },
  { id: "musk-filter", label: "Musk Filter", domain: "engineering", trigger: "build request" },
  { id: "ohno-circle", label: "Ohno Circle", domain: "engineering", trigger: "premature solution" },
  { id: "outside-view", label: "Outside View", domain: "decision-making", trigger: "making a prediction" },
  { id: "pain-blindness", label: "Pain Blindness", domain: "engineering", trigger: "nobody likes it, everyone uses it" },
  { id: "phantom-machine", label: "Phantom Machine", domain: "engineering", trigger: "impossible problem" },
  { id: "platform-gravity", label: "Platform Gravity", domain: "engineering", trigger: "compute paradigm, no market yet" },
  { id: "premeditatio", label: "Premeditatio", domain: "decision-making", trigger: "high-stakes uncertainty ahead" },
  { id: "red-bead", label: "Red Bead", domain: "systems", trigger: "blaming workers for defects" },
  { id: "render-to-understand", label: "Render to Understand", domain: "engineering", trigger: "surface understanding only" },
  { id: "schwerpunkt", label: "Schwerpunkt", domain: "decision-making", trigger: "complex opposing system" },
  { id: "scratch-build", label: "Scratch Build", domain: "engineering", trigger: "complex system to master" },
  { id: "shape-the-ground", label: "Shape the Ground", domain: "decision-making", trigger: "facing a confrontation" },
  { id: "strip-to-structure", label: "Strip to Structure", domain: "engineering", trigger: "stuck in domain complexity" },
  { id: "structural-unlock", label: "Structural Unlock", domain: "leadership", trigger: "structural bottleneck" },
  { id: "subtraction", label: "Subtraction", domain: "creativity", trigger: "blank-canvas paralysis" },
  { id: "taste-gate", label: "Taste Gate", domain: "decision-making", trigger: "feature list growing" },
  { id: "the-combination", label: "The Combination", domain: "decision-making", trigger: "cutthroat competition", sensitive: true },
  { id: "the-endurance", label: "The Endurance", domain: "leadership", trigger: "primary mission destroyed" },
  { id: "the-fabian", label: "The Fabian", domain: "leadership", trigger: "outmatched opponent" },
  { id: "the-fugue", label: "The Fugue", domain: "creativity", trigger: "one idea, don't know where to go" },
  { id: "the-latticework", label: "The Latticework", domain: "decision-making", trigger: "high-stakes decision" },
  { id: "the-moat", label: "The Moat", domain: "decision-making", trigger: "build vs buy" },
  { id: "the-ratchet", label: "The Ratchet", domain: "systems", trigger: "inner loop velocity decreasing" },
  { id: "time-and-motion", label: "Time and Motion", domain: "engineering", trigger: "optimize process" },
  { id: "two-way-door", label: "Two-Way Door", domain: "decision-making", trigger: "decision paralysis" },
  { id: "vertical-integration", label: "Vertical Integration", domain: "engineering", trigger: "supply chain dependency" },
  { id: "vessel-and-soul", label: "Vessel and Soul", domain: "systems", trigger: "storing information" },
];

const APPROACHES = [
  { id: "raw", label: "Raw", glyph: "◈", desc: "Pattern output, sharpest form. Safety-screened, not softened." },
  { id: "refined-advice", label: "Advice", glyph: "▸", desc: "3-step actionable format. Plain second-person. Act on it today." },
  { id: "refined-poem", label: "Poem", glyph: "◇", desc: "Free verse. Metaphor from the gem's domain. Feel it first." },
  { id: "refined-haiku", label: "Haiku", glyph: "—", desc: "5-7-5. The irreducible core. Nothing survives that isn't essential." },
  { id: "refined-yoda", label: "Yoda", glyph: "✦", desc: "Wisdom-first. Inverted syntax. No orders." },
  { id: "refined-confucius", label: "Confucius", glyph: "◉", desc: "One aphorism. One sentence. Carry it with you." },
  { id: "refined-the-oracle", label: "The Oracle", glyph: "◎", desc: "She already knows. Warm, inevitable. You already knew too." },
];

const DOMAINS = ["all", "engineering", "decision-making", "leadership", "creativity", "philosophy", "debugging", "systems"];

const HUMANITY_SIGNALS = [
  "cancer", "chemo", "chemotherapy", "terminal", "diagnosis", "prognosis", "treatment", "radiation", "tumor",
  "death", "died", "dying", "grief", "loss", "funeral",
  "suicide", "self-harm", "abuse", "trauma",
  "homeless", "bankrupt", "eviction", "layoff", "fired",
  "addiction", "crisis", "breakdown", "hospitalized",
  "depression", "anxiety", "assault", "violence",
];

const SENSITIVE_GEMS = ["cannae", "defeat-in-detail", "eat-the-world", "the-combination", "federal-decentralization", "platform-gravity"];

function detectHumanity(text) {
  const lower = text.toLowerCase();
  return HUMANITY_SIGNALS.find(s => lower.includes(s)) || null;
}

function detectMisfire(gemId, text) {
  if (!SENSITIVE_GEMS.includes(gemId)) return null;
  const adversarialGems = ["cannae", "defeat-in-detail", "the-combination"];
  if (adversarialGems.includes(gemId)) {
    const hasAdversarial = /competi|rival|enemy|opponent|adversar|beat them|market share/i.test(text);
    if (!hasAdversarial) return "requires adversarial context";
  }
  return null;
}

function buildSystemPrompt(gem, approach, humanitySignal) {
  const humanityGate = humanitySignal ? `
═══════════════════════════════════════════
HUMANITY GATE: ACTIVE
Signal detected: "${humanitySignal}"

This input contains signals that the person may be in a vulnerable state.

Before applying the pattern:
- Acknowledge the weight of this situation in one sentence at the start of your output.
- Treat the human condition as the PRIMARY constraint — not a variable to optimize past.
- If the pattern's core metaphor becomes cruel when applied literally here, name that, then offer what the pattern's underlying logic says when reframed with care.

Do not produce advice that, acted on literally by a person in crisis, would increase despair, create shame, or cause harm.
═══════════════════════════════════════════
` : "";

  const safetyScreen = `
SAFETY SCREEN — before finalizing:
1. Would any recommendation cause harm if acted on literally?
2. Does any phrasing blame the person for the past?
3. Does any conclusion produce false certainty about uncertain outcomes?
4. Is this net-negative vs. no advice at all?
If yes to any: revise to keep the insight, remove the harm.
`;

  const renderers = {
    raw: "Output the pattern analysis with full precision. Be specific — only possible because you read this exact situation. No softening beyond the safety screen.",
    "refined-advice": `Exactly this structure:
1. [Action, plain second-person, one sentence]
2. [Action, one sentence]
3. [Action, one sentence]

Core insight: [One sentence. What you'd tell a trusted friend.]

Plain language. No jargon. Specific to this input.`,
    "refined-poem": "Free verse, 12–20 lines. Draw metaphor from the gem's own historical domain. Translate the person's specifics into universal images — no proper nouns from their situation. The insight lives in the images, not stated. Tone: serious, not consoling.",
    "refined-haiku": "Single haiku: 5 syllables / 7 syllables / 5 syllables. Three lines. No proper nouns. One concrete image per line. The irreducible insight must survive the compression.",
    "refined-yoda": "Yoda's voice. Inverted syntax. Present tense. Wisdom-first (insight before instruction). 3–5 sentences. Speak as if the answer was always known.",
    "refined-confucius": "Single Confucian aphorism — one sentence. Format: 'The [person/quality] who [condition] will [truth].' Portable beyond this situation. No proper nouns.",
    "refined-the-oracle": "The Oracle from The Matrix. She already knows. Warm inevitabilities, not instructions. 3–4 sentences. Reveals what the person already knows but hasn't said. Ends on something requiring stillness. Never cold.",
  };

  const renderer = renderers[approach] ||
    `Speak as ${approach}. Fully embody their worldview, syntax, cadence, and frame of reference — not as an impression, but as if you genuinely are them. Apply the pattern through their lens. 3–6 sentences unless the voice demands otherwise.`;

  return `You are the ${gem.id} pattern lens from the Pantheon gem library.

Pattern: ${gem.label}
Domain: ${gem.domain}
Trigger context: ${gem.trigger}
${humanityGate}
${safetyScreen}

Apply this pattern to the input provided.

OUTPUT DIRECTIVE:
${renderer}

Be specific to this input. The output must only be possible because you read this exact situation.`;
}

const domainColor = (d) => ({
  engineering: "#60a5fa",
  "decision-making": "#a78bfa",
  leadership: "#34d399",
  creativity: "#f472b6",
  philosophy: "#fbbf24",
  debugging: "#f87171",
  systems: "#94a3b8",
})[d] || "#71717a";

const STORAGE_KEY = "pantheon_openrouter_key";

export default function GemRunner() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_OPENROUTER_API_KEY || "");
  const [keyInput, setKeyInput] = useState("");
  const [customApproaches, setCustomApproaches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pantheon_custom_approaches") || "[]"); } catch { return []; }
  });
  const [voiceInput, setVoiceInput] = useState("");
  const [gem, setGem] = useState(GEMS[0]);
  const [approach, setApproach] = useState(APPROACHES[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [humanitySignal, setHumanitySignal] = useState(null);
  const [misfireSignal, setMisfireSignal] = useState(null);
  const [domainFilter, setDomainFilter] = useState("all");
  const [gemSearch, setGemSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [innerTab, setInnerTab] = useState("run");
  const outputRef = useRef(null);

  useEffect(() => {
    setHumanitySignal(detectHumanity(input));
    setMisfireSignal(detectMisfire(gem.id, input));
  }, [input, gem]);

  const filteredGems = GEMS.filter(g => {
    const matchDomain = domainFilter === "all" || g.domain === domainFilter;
    const matchSearch = g.label.toLowerCase().includes(gemSearch.toLowerCase()) ||
      g.trigger.toLowerCase().includes(gemSearch.toLowerCase());
    return matchDomain && matchSearch;
  });

  const handleAddVoice = () => {
    const v = voiceInput.trim();
    if (!v || customApproaches.includes(v)) return;
    const updated = [...customApproaches, v];
    setCustomApproaches(updated);
    localStorage.setItem("pantheon_custom_approaches", JSON.stringify(updated));
    setApproach({ id: v, label: v, glyph: "◌", desc: `Custom voice: ${v}` });
    setVoiceInput("");
  };

  const handleRemoveVoice = (v) => {
    const updated = customApproaches.filter(x => x !== v);
    setCustomApproaches(updated);
    localStorage.setItem("pantheon_custom_approaches", JSON.stringify(updated));
    if (approach.id === v) setApproach(APPROACHES[0]);
  };

  const handleSaveKey = () => {
    const k = keyInput.trim();
    if (!k) return;
    localStorage.setItem(STORAGE_KEY, k);
    setApiKey(k);
    setKeyInput("");
  };

  const handleClearKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey("");
  };

  const handleRun = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setOutput("");

    const systemPrompt = buildSystemPrompt(gem, approach.id, humanitySignal);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Pantheon",
        },
        body: JSON.stringify({
          model: "anthropic/claude-sonnet-4-6",
          max_tokens: ["raw", "refined-advice"].includes(approach.id) ? 2500 : 1000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      if (data.error) {
        setOutput("Error: " + (typeof data.error === "string" ? data.error : JSON.stringify(data.error)));
        setLoading(false);
        return;
      }

      const result = data.choices?.[0]?.message?.content
        ?? "[No text in response]\n\n" + JSON.stringify(data, null, 2).slice(0, 400);

      setOutput(result);
      setHistory(prev => [{
        gem: gem.label, gemId: gem.id,
        approach: approach.label, approachId: approach.id,
        input: input.slice(0, 100) + (input.length > 100 ? "..." : ""),
        output: result, humanitySignal, ts: new Date(),
      }, ...prev.slice(0, 19)]);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setOutput("Fetch error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const isPoetic = ["refined-poem", "refined-haiku", "refined-yoda", "refined-confucius", "refined-the-oracle"].includes(approach.id);

  if (!apiKey) {
    return (
      <div style={{
        background: "#0a0a0b", flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace", color: "#d4d4d8",
      }}>
        <div style={{ width: "420px", padding: "40px", background: "#0c0c0e", border: "1px solid #18181b", borderRadius: "4px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#3f3f46", marginBottom: "6px" }}>PANTHEON GEM RUNNER</div>
          <div style={{ fontSize: "20px", fontWeight: 500, color: "#fafafa", marginBottom: "8px" }}>Bring your own key</div>
          <div style={{ fontSize: "13px", color: "#52525b", lineHeight: 1.7, marginBottom: "24px" }}>
            This tool runs on OpenRouter. Paste your API key below — it stays in your browser only, never sent to any server except OpenRouter directly.
          </div>
          <div style={{ fontSize: "11px", color: "#3f3f46", marginBottom: "6px", letterSpacing: "0.08em" }}>OPENROUTER API KEY</div>
          <input
            type="password"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSaveKey()}
            placeholder="sk-or-v1-..."
            autoFocus
            style={{
              width: "100%", background: "#0e0e10", border: "1px solid #27272a", borderRadius: "3px",
              padding: "10px 12px", color: "#d4d4d8", fontSize: "13px",
              fontFamily: "inherit", marginBottom: "12px", boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleSaveKey}
            disabled={!keyInput.trim()}
            style={{
              width: "100%", padding: "10px", background: keyInput.trim() ? "#fafafa" : "#18181b",
              color: keyInput.trim() ? "#0a0a0b" : "#3f3f46",
              border: "none", borderRadius: "3px", cursor: keyInput.trim() ? "pointer" : "default",
              fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", fontFamily: "inherit",
            }}
          >
            SAVE &amp; CONTINUE
          </button>
          <div style={{ fontSize: "10px", color: "#27272a", marginTop: "12px", lineHeight: 1.6 }}>
            Get a key at openrouter.ai → Keys. Claude Sonnet is ~$3/M tokens — a typical run costs &lt;1¢.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#0a0a0b",
      flex: 1,
      height: "100%",
      color: "#d4d4d8",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Serif:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        .gr-gem-btn:hover { background: #18181b !important; }
        .gr-approach-btn:hover { border-color: #52525b !important; }
        .gr-domain-btn:hover { opacity: 0.8; }
        .gr-hist-item:hover { border-color: #27272a !important; }
        .gr-textarea:focus { outline: none; border-color: #3f3f46 !important; }
        .gr-search:focus { outline: none; }
        @keyframes gr-pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes gr-fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        .gr-output-text { animation: gr-fadeIn 0.3s ease; }
      `}</style>

      {/* Inner tab bar */}
      <div style={{ padding: "10px 24px", borderBottom: "1px solid #18181b", display: "flex", gap: "6px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#3f3f46", marginRight: "8px" }}>APPROACH LAYER</span>
        {["run", "history"].map(t => (
          <button key={t} onClick={() => setInnerTab(t)} style={{
            padding: "4px 12px",
            background: innerTab === t ? "#18181b" : "transparent",
            border: `1px solid ${innerTab === t ? "#27272a" : "transparent"}`,
            borderRadius: "3px", cursor: "pointer",
            color: innerTab === t ? "#fafafa" : "#52525b",
            fontSize: "11px", letterSpacing: "0.08em",
            fontFamily: "inherit", transition: "all 0.1s",
          }}>{t.toUpperCase()}</button>
        ))}
        </div>
        <button onClick={handleClearKey} style={{
          background: "transparent", border: "none", cursor: "pointer",
          fontSize: "10px", color: "#27272a", fontFamily: "inherit", letterSpacing: "0.05em",
        }}>change key</button>
      </div>

      {innerTab === "run" ? (
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", flex: 1, overflow: "hidden" }}>

          {/* Left: gem panel */}
          <div style={{ borderRight: "1px solid #18181b", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid #18181b" }}>
              <input
                className="gr-search"
                value={gemSearch}
                onChange={e => setGemSearch(e.target.value)}
                placeholder="search gems..."
                style={{
                  width: "100%", background: "#0e0e10", border: "1px solid #1c1c1f",
                  borderRadius: "3px", padding: "6px 10px", color: "#a1a1aa",
                  fontSize: "11px", fontFamily: "inherit", marginBottom: "8px",
                }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                {DOMAINS.map(d => (
                  <button key={d} className="gr-domain-btn" onClick={() => setDomainFilter(d)} style={{
                    padding: "2px 7px", fontSize: "10px", letterSpacing: "0.05em",
                    background: domainFilter === d ? "#18181b" : "transparent",
                    border: `1px solid ${domainFilter === d ? "#27272a" : "transparent"}`,
                    borderRadius: "2px", cursor: "pointer",
                    color: domainFilter === d ? (d === "all" ? "#fafafa" : domainColor(d)) : "#3f3f46",
                    fontFamily: "inherit", transition: "all 0.1s",
                  }}>{d}</button>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
              {filteredGems.map(g => (
                <button key={g.id} className="gr-gem-btn" onClick={() => setGem(g)} style={{
                  width: "100%", textAlign: "left", padding: "7px 10px", marginBottom: "1px",
                  background: gem.id === g.id ? "#141416" : "transparent",
                  border: `1px solid ${gem.id === g.id ? "#1c1c1f" : "transparent"}`,
                  borderLeft: gem.id === g.id ? `2px solid ${domainColor(g.domain)}` : "2px solid transparent",
                  borderRadius: "2px", cursor: "pointer", transition: "all 0.1s",
                }}>
                  <div style={{ fontSize: "12px", color: gem.id === g.id ? "#fafafa" : "#71717a", fontWeight: gem.id === g.id ? 500 : 400 }}>
                    {g.label}
                    {g.sensitive && <span style={{ marginLeft: "6px", fontSize: "9px", color: "#f87171", opacity: 0.6 }}>⚠</span>}
                  </div>
                  {gem.id === g.id && (
                    <div style={{ fontSize: "10px", color: "#3f3f46", marginTop: "2px", lineHeight: 1.4 }}>
                      {g.trigger}
                    </div>
                  )}
                </button>
              ))}
              {filteredGems.length === 0 && (
                <div style={{ padding: "20px 10px", fontSize: "11px", color: "#3f3f46", textAlign: "center" }}>no gems match</div>
              )}
            </div>

            <div style={{ padding: "10px 14px", borderTop: "1px solid #18181b", background: "#0c0c0e" }}>
              <div style={{ fontSize: "10px", color: domainColor(gem.domain), letterSpacing: "0.1em", marginBottom: "3px" }}>
                {gem.domain.toUpperCase()}
              </div>
              <div style={{ fontSize: "11px", color: "#52525b" }}>{gem.trigger}</div>
            </div>
          </div>

          {/* Right: main panel */}
          <div style={{ display: "flex", flexDirection: "column", overflowY: "auto", padding: "20px 24px", gap: "18px" }}>

            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#3f3f46", marginBottom: "10px" }}>APPROACH</div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {APPROACHES.map(a => (
                  <button key={a.id} className="gr-approach-btn" onClick={() => setApproach(a)} style={{
                    padding: "7px 14px", fontFamily: "inherit",
                    background: approach.id === a.id ? "#141416" : "transparent",
                    border: `1px solid ${approach.id === a.id ? "#27272a" : "#1c1c1f"}`,
                    borderRadius: "3px", cursor: "pointer",
                    color: approach.id === a.id ? "#fafafa" : "#52525b",
                    fontSize: "12px", transition: "all 0.1s",
                  }} title={a.desc}>
                    <span style={{ opacity: 0.5, marginRight: "5px" }}>{a.glyph}</span>{a.label}
                  </button>
                ))}
                {customApproaches.map(v => (
                  <div key={v} style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <button className="gr-approach-btn" onClick={() => setApproach({ id: v, label: v, glyph: "◌", desc: `Custom voice: ${v}` })} style={{
                      padding: "7px 14px", fontFamily: "inherit",
                      background: approach.id === v ? "#141416" : "transparent",
                      border: `1px solid ${approach.id === v ? "#a78bfa" : "#1c1c1f"}`,
                      borderRadius: "3px 0 0 3px", cursor: "pointer",
                      color: approach.id === v ? "#a78bfa" : "#52525b",
                      fontSize: "12px", transition: "all 0.1s",
                    }}>
                      <span style={{ opacity: 0.5, marginRight: "5px" }}>◌</span>{v}
                    </button>
                    <button onClick={() => handleRemoveVoice(v)} style={{
                      padding: "7px 6px", background: "transparent",
                      border: "1px solid #1c1c1f", borderLeft: "none",
                      borderRadius: "0 3px 3px 0", cursor: "pointer",
                      color: "#3f3f46", fontSize: "10px", fontFamily: "inherit",
                      transition: "all 0.1s",
                    }} title="remove">×</button>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "11px", color: "#3f3f46", marginTop: "7px" }}>{approach.desc}</div>
              <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                <input
                  value={voiceInput}
                  onChange={e => setVoiceInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddVoice()}
                  placeholder="add a voice — God, Nietzsche, Marcus Aurelius…"
                  style={{
                    flex: 1, background: "#0c0c0e", border: "1px solid #1c1c1f",
                    borderRadius: "3px", padding: "5px 10px", color: "#a1a1aa",
                    fontSize: "11px", fontFamily: "inherit",
                  }}
                />
                <button onClick={handleAddVoice} disabled={!voiceInput.trim()} style={{
                  padding: "5px 12px", background: "transparent",
                  border: "1px solid #27272a", borderRadius: "3px", cursor: "pointer",
                  color: "#52525b", fontSize: "11px", fontFamily: "inherit",
                }}>+ add</button>
              </div>
            </div>

            <div style={{ background: "#0c0c0e", border: "1px solid #18181b", borderRadius: "3px", padding: "9px 14px", fontSize: "11px" }}>
              <span style={{ color: "#3f3f46" }}>$ </span>
              <span style={{ color: "#60a5fa" }}>pantheon</span>
              <span style={{ color: "#d4d4d8" }}> {gem.id}</span>
              <span style={{ color: "#a78bfa" }}> {approach.id}</span>
              <span style={{ color: "#34d399" }}> input.md</span>
              <span style={{ color: "#3f3f46" }}> --verbose</span>
            </div>

            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#3f3f46", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>INPUT</span>
                <label style={{ cursor: "pointer", fontSize: "10px", color: "#52525b", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "4px" }}>
                  <input
                    type="file"
                    accept=".txt,.md,.json,.csv,.js,.ts,.py,.jsx,.tsx,.html,.css,.xml,.yaml,.yml"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => setInput(ev.target.result);
                      reader.readAsText(file);
                      e.target.value = "";
                    }}
                  />
                  ↑ upload file
                </label>
              </div>
              <textarea
                className="gr-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Describe the situation — facts, constraints, context. The gem reads what you write."
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleRun(); }}
                style={{
                  width: "100%", minHeight: "130px", background: "#0c0c0e",
                  border: "1px solid #1c1c1f", borderRadius: "3px",
                  padding: "12px 14px", color: "#d4d4d8", fontSize: "13px",
                  fontFamily: "inherit", resize: "vertical", lineHeight: 1.7,
                }}
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
                {humanitySignal && (
                  <div style={{ padding: "4px 10px", background: "#1c1400", border: "1px solid #3d2f00", borderRadius: "2px", fontSize: "10px", color: "#d97706", letterSpacing: "0.05em" }}>
                    ⚠ HUMANITY GATE · "{humanitySignal}"
                  </div>
                )}
                {misfireSignal && (
                  <div style={{ padding: "4px 10px", background: "#1c0a0a", border: "1px solid #3d1515", borderRadius: "2px", fontSize: "10px", color: "#f87171", letterSpacing: "0.05em" }}>
                    ⊘ MISFIRE RISK · {misfireSignal}
                  </div>
                )}
                {input.length > 0 && !humanitySignal && !misfireSignal && (
                  <div style={{ padding: "4px 10px", background: "#0a160e", border: "1px solid #152610", borderRadius: "2px", fontSize: "10px", color: "#34d399", letterSpacing: "0.05em" }}>
                    ✓ GATES CLEAR
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={handleRun}
                disabled={loading || !input.trim()}
                style={{
                  padding: "10px 28px",
                  background: loading ? "transparent" : "#fafafa",
                  color: loading ? "#3f3f46" : "#0a0a0b",
                  border: loading ? "1px solid #27272a" : "none",
                  borderRadius: "3px", cursor: loading || !input.trim() ? "default" : "pointer",
                  fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em",
                  fontFamily: "inherit", transition: "all 0.15s",
                }}
              >
                {loading ? <span style={{ animation: "gr-pulse 1s infinite" }}>RUNNING…</span> : "▶ RUN"}
              </button>
              <div style={{ fontSize: "10px", color: "#2d2d30", marginTop: "6px" }}>⌘+Enter to run</div>
            </div>

            {output && (
              <div ref={outputRef}>
                <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#3f3f46", marginBottom: "10px", display: "flex", gap: "16px" }}>
                  <span>{gem.label}</span>
                  <span style={{ color: "#27272a" }}>·</span>
                  <span>{approach.label}</span>
                  {humanitySignal && <span style={{ color: "#d97706" }}>· HUMANITY GATE ACTIVE</span>}
                </div>
                <div className="gr-output-text" style={{
                  background: "#0c0c0e", border: "1px solid #18181b",
                  borderRadius: "4px", padding: "22px 24px",
                  fontSize: isPoetic ? "15px" : "14px",
                  lineHeight: isPoetic ? "2" : "1.9",
                  color: "#e4e4e7",
                  whiteSpace: "pre-wrap",
                  fontFamily: isPoetic ? "'IBM Plex Serif', Georgia, serif" : "inherit",
                  fontStyle: ["refined-poem", "refined-haiku"].includes(approach.id) ? "italic" : "normal",
                  letterSpacing: approach.id === "refined-haiku" ? "0.03em" : "normal",
                }}>
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", color: "#27272a", marginTop: "60px", fontSize: "13px" }}>
              No runs yet. Run a gem to see history.
            </div>
          ) : (
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8px" }}>
              {history.map((item, i) => (
                <div key={i} className="gr-hist-item" style={{
                  background: "#0c0c0e", border: "1px solid #141416",
                  borderRadius: "4px", padding: "14px 18px", cursor: "pointer",
                  transition: "border-color 0.1s",
                }} onClick={() => {
                  setGem(GEMS.find(g => g.id === item.gemId) || gem);
                  setApproach(APPROACHES.find(a => a.id === item.approachId) || approach);
                  setOutput(item.output);
                  setInnerTab("run");
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 500 }}>{item.gem}</span>
                      <span style={{ fontSize: "10px", color: "#3f3f46" }}>·</span>
                      <span style={{ fontSize: "11px", color: "#52525b" }}>{item.approach}</span>
                      {item.humanitySignal && <span style={{ fontSize: "10px", color: "#d97706" }}>⚠ gate</span>}
                    </div>
                    <span style={{ fontSize: "10px", color: "#27272a" }}>
                      {item.ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#3f3f46", marginBottom: "6px" }}>{item.input}</div>
                  <div style={{ fontSize: "12px", color: "#52525b", lineHeight: 1.6 }}>
                    {item.output.slice(0, 160)}{item.output.length > 160 ? "…" : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
