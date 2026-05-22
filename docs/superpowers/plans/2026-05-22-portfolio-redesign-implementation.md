# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved full-site Tech Terminal redesign with liquid glass and animation while preserving all existing portfolio content and behavior.

**Architecture:** Keep the site static: `index.html` owns content/structure, `styles.css` owns the redesign and animations, and `script.js` keeps interaction behavior. Add one lightweight Node regression script so the redesign can be checked without introducing a framework.

**Tech Stack:** HTML, CSS custom properties/animations, vanilla JavaScript, Font Awesome, Node.js for local regression checks.

---

### Task 1: Add Redesign Regression Checks

**Files:**
- Create: `scripts/test-portfolio-redesign.mjs`

- [ ] **Step 1: Write the failing test**

Create `scripts/test-portfolio-redesign.mjs` with assertions that the approved redesign exists and core functions remain wired:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';

const index = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

const checks = [
  ['hero uses terminal redesign class', () => assert.match(index, /class="hero terminal-hero"/)],
  ['hero includes liquid glass terminal card', () => assert.match(index, /hero-terminal-card liquid-glass/)],
  ['hero includes current status glass card', () => assert.match(index, /hero-status-card liquid-glass/)],
  ['header opts into liquid glass', () => assert.match(index, /class="header liquid-glass"/)],
  ['contact form remains present', () => assert.match(index, /id="contact-form"/)],
  ['language toggle remains present', () => assert.match(index, /id="lang-toggle"/)],
  ['theme toggle remains present', () => assert.match(index, /id="dark-toggle"/)],
  ['CV link remains unchanged', () => assert.match(index, /href="tuantran02122005@gmail\.com\.pdf"/)],
  ['liquid glass CSS exists', () => assert.match(css, /\.liquid-glass/)],
  ['liquid sheen CSS exists', () => assert.match(css, /glassSheen/)],
  ['liquid background animation exists', () => assert.match(css, /liquidFlow/)],
  ['terminal hero CSS exists', () => assert.match(css, /\.terminal-hero/)],
  ['reduced motion override exists', () => assert.match(css, /prefers-reduced-motion:\s*reduce/)],
  ['dark mode defaults when no saved theme', () => assert.match(js, /localStorage\.getItem\('theme'\)\s*\|\|\s*'dark'/)],
  ['contact submission logic remains present', () => assert.match(js, /fetch\('https:\/\/api\.web3forms\.com\/submit'/)],
];

const failures = [];
for (const [name, check] of checks) {
  try {
    check();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(name);
    console.error(`FAIL ${name}`);
    console.error(`  ${error.message}`);
  }
}

if (failures.length) {
  console.error(`\n${failures.length} redesign checks failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} redesign checks passed.`);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/test-portfolio-redesign.mjs`

Expected: FAIL for missing terminal hero/liquid glass/default-dark implementation.

### Task 2: Update Hero Markup and Theme Default

**Files:**
- Modify: `index.html`
- Modify: `script.js`

- [ ] **Step 1: Update header and hero markup**

Change the header class to `header liquid-glass`. Change the hero section to `hero terminal-hero` and add liquid-glass terminal/status elements beside the current avatar. Preserve the Contact and Download CV links and all `data-lang-*` attributes.

- [ ] **Step 2: Make dark Tech Terminal the default theme**

In `script.js`, update `initTheme()` so `localStorage.getItem('theme') || 'dark'` is used. When the saved or default theme is `light`, remove `data-theme`; when it is `dark`, set `data-theme="dark"` and update icons.

- [ ] **Step 3: Run regression check**

Run: `node scripts/test-portfolio-redesign.mjs`

Expected: remaining FAILs only for CSS items until Task 3 is implemented.

### Task 3: Add Tech Terminal Liquid Glass CSS

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Add redesign override section**

Append a "Tech Terminal Redesign Overrides" section that redefines color variables, dark/light surfaces, body background, sticky glass header, buttons, hero layout, glass panels, cards, timeline, skills, contact, footer, floating chat buttons, and mobile behavior.

- [ ] **Step 2: Add animation and accessibility rules**

Add keyframes for `liquidFlow`, `glassSheen`, `heroFloat`, `terminalBlink`, and skill fill/reveal polish. Add a final `@media (prefers-reduced-motion: reduce)` override that disables nonessential animation and transitions.

- [ ] **Step 3: Run regression check**

Run: `node scripts/test-portfolio-redesign.mjs`

Expected: PASS.

### Task 4: Verify Site Behavior Manually and With Local Server

**Files:**
- Read/verify: `index.html`
- Read/verify: `styles.css`
- Read/verify: `script.js`

- [ ] **Step 1: Start static server**

Run: `python -m http.server 4173`

Expected: local site available at `http://127.0.0.1:4173/`.

- [ ] **Step 2: Check desktop and mobile render**

Use browser/screenshot tooling against `http://127.0.0.1:4173/` at desktop and mobile widths. Verify no horizontal overflow, text overlap, blank hero, or clipped controls.

- [ ] **Step 3: Check interactions**

Verify theme toggle, language toggle, mobile menu, CV link, required-field form validation, back-to-top visibility, and floating chat links.

- [ ] **Step 4: Report status**

Summarize changed files, verification evidence, and any remaining limitations.
