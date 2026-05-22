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
