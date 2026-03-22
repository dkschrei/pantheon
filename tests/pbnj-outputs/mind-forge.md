# PB&J Test — mind-forge

**Input:** Construct a Peanut Butter and Jelly Sandwich

**Output:**

## Mind Forge: PB&J Sandwich

---

**Step 1: Complete Mental Model**

Components: bread (2 slices), peanut butter, jelly, knife, plate.

Interfaces:
- Knife → bread surface (spreading force, angle)
- PB → slice A (bottom layer)
- Jelly → slice B (bottom layer)
- Slice A + Slice B → joined faces

---

**Step 2: Simulate Operation**

Trace normal execution: spread PB on slice A, spread jelly on slice B, press together. Works.

**Edge case — jelly on top of PB on same slice:** jelly migrates under knife, PB contaminates jelly jar on return stroke.

**Edge case — too much jelly near crust:** structural failure at edges, jelly extrudes on press.

**Edge case — cold PB:** high spreading force tears bread.

---

**Step 3: Redesign**

- Spread PB and jelly on *separate* slices to avoid cross-contamination.
- Keep jelly 1cm from crust to prevent extrusion.
- If PB is cold, microwave 10 seconds before spreading.

Re-simulate: all three failure modes resolved.

---

**Step 4: Build as Verification**

Execute the verified specification. The sandwich confirms the design. No surprises.

---

*Mind Forge prevents the "just try it" wasted sandwich.*
