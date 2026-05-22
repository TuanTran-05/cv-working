# Portfolio Website Redesign Design

Date: 2026-05-22

## Summary

Redesign the entire static portfolio website in a dark-purple "Tech Terminal" direction inspired by the provided reference, while preserving the current content and all existing user-facing functionality.

The new visual direction should feel like a networking/security portfolio: dark near-black background, violet glow, subtle technical grid, liquid-glass panels, terminal-style labels, strong hero typography, animated status/terminal elements, and polished section reveal animations.

## Goals

- Redesign the full website, not only the hero.
- Preserve current content in `index.html`: hero, about, education, skills, achievements, extras, contact, footer.
- Preserve current functions: VI/EN language toggle, dark/light theme toggle, mobile menu, CV download, Web3Forms contact form validation/submission, back-to-top, Zalo and Messenger floating buttons, social links, and scroll reveal behavior.
- Make the default look dark-purple and visually close to the chosen Tech Terminal mockup.
- Add liquid-glass treatment to key surfaces: header/nav, buttons, cards, skill meters, contact form, and floating elements.
- Add motion that improves polish without making the site noisy: slow liquid/aurora background motion, hero floating elements, terminal cursor/type feel, skill-meter fill, and section/card reveal on scroll.
- Keep the site responsive, especially on mobile where text and glass panels must not overflow.

## Non Goals

- Do not migrate to a framework or build system.
- Do not remove bilingual support.
- Do not remove the light theme toggle; redesign the light theme as a frosted-glass variant instead.
- Do not replace the contact provider or change the form endpoint behavior.
- Do not change personal information, links, CV filename, or section content except for layout/styling needs.
- Do not add heavy libraries for animation.

## Existing Architecture

The project is a static site:

- `index.html` contains all content and section markup.
- `styles.css` contains the design system, layout, responsive rules, and animations.
- `script.js` handles theme, language switching, mobile navigation, welcome modal, reveal behavior, back-to-top, and contact form interactions.
- `images/avt.jpg` is the current avatar.
- `tuantran02122005@gmail.com.pdf` is the downloadable CV.

The redesign should stay within this architecture and mostly update HTML structure/classes and CSS. JavaScript changes should be minimal and limited to supporting reveal/animation behavior if the existing logic is not enough.

## Visual System

Default dark theme:

- Background: near-black base with subtle grid pattern.
- Accent: violet/lavender glow as the primary brand color.
- Secondary accents: muted cyan/blue can be used sparingly for technical status details, but violet should remain dominant.
- Typography: keep the existing web fonts unless a local pattern requires otherwise; use strong white headings and muted lavender-gray body text.
- Surfaces: liquid glass panels with blur, translucent fill, thin bright border, inner highlight, and a moving sheen where appropriate.
- Buttons: primary CTA should be a high-contrast violet pill; secondary CTA should be glass/outline.

Light theme:

- Keep functional parity with the dark theme.
- Use a bright frosted-glass variant rather than the current plain light card style.
- Maintain contrast and readability.

Motion:

- Slow liquid/aurora background movement in hero and/or page-level decoration.
- Avatar or hero visual floats subtly.
- Terminal cursor blinks; terminal/status copy can imply typing without needing complex text generation.
- Skill meters animate when visible.
- Cards reveal on scroll using existing reveal classes where possible.
- Respect `prefers-reduced-motion` by disabling or minimizing animation.

## Page Structure

### Header

- Keep sticky navigation.
- Convert the header into a liquid-glass bar.
- Keep logo/name, nav links, theme toggle, language toggle, and mobile menu.
- Mobile menu should use the same dark glass style and remain readable.

### Hero

- Rework into a tech-terminal hero:
  - Eyebrow such as networking/security portfolio.
  - Large name/title treatment.
  - Existing subtitle/major content preserved.
  - Contact and Download CV CTAs preserved.
  - Avatar remains present but integrated into a glowing visual stack.
  - Add terminal/status glass panels around the avatar to reinforce the networking/security theme.

### About

- Preserve personal information and career goals.
- Present content as glass panels with stronger visual hierarchy.
- Use compact icons or terminal labels if they fit the existing icon system.

### Education

- Preserve timeline entries.
- Restyle as command-log or system-history cards.
- Keep dates and school/certificate text unchanged.

### Skills

- Preserve technical skills, soft skills, and language data.
- Restyle progress bars as status meters.
- Add animated fill on reveal.
- Keep labels readable on narrow screens.

### Achievements and Extras

- Preserve achievement cards and extra lists.
- Restyle as glass cards with icon glow and subtle reveal.
- Avoid oversized cards that make the page feel like a landing page instead of a portfolio/CV.

### Contact

- Preserve contact info, social links, and Web3Forms form fields.
- Restyle contact info and form as liquid-glass panels.
- Preserve validation messages, loading state, and success/error behavior.
- Floating Zalo/Messenger buttons and back-to-top remain, restyled to match the new system.

### Footer

- Preserve copyright and social links.
- Restyle as a quiet dark footer with glass/terminal details.

## Data Flow and Behavior

- Language toggle continues reading `data-lang-*` attributes and updating text, placeholders, alt, and aria labels.
- Theme toggle continues using `data-theme="dark"` or absence of the attribute, but CSS variables will be redesigned so both themes are polished.
- Mobile menu continues using `open` class and `aria-expanded`.
- Contact form continues using the existing client-side validation and Web3Forms submission flow.
- Back-to-top and reveal logic continue to rely on scroll listeners/IntersectionObserver-style behavior already present in `script.js`.

## Accessibility and Performance

- Maintain readable contrast in dark and light themes.
- Do not rely on color alone for interactive states.
- Preserve focus-visible styling for links, buttons, inputs, and mobile menu controls.
- Ensure all text fits within buttons/cards on mobile.
- Use CSS animations only; no heavy runtime animation library.
- Use `prefers-reduced-motion` to reduce motion.
- Keep remote dependency usage no worse than current Font Awesome and Google Fonts.

## Testing Plan

Manual verification after implementation:

- Open `index.html` locally or through a static server.
- Check desktop layout around 1366px width.
- Check mobile layout around 390px width.
- Verify no text overlap, clipped controls, or horizontal scroll.
- Verify VI/EN toggle updates visible text and placeholders.
- Verify theme toggle switches between dark Tech Terminal and light frosted-glass mode.
- Verify mobile menu opens, closes, and links scroll to sections.
- Verify Download CV link still points to `tuantran02122005@gmail.com.pdf`.
- Verify contact form required-field errors still display.
- Verify back-to-top appears after scrolling.
- Verify Zalo and Messenger buttons remain clickable.
- Verify animations are visible but not distracting.
- Verify `prefers-reduced-motion` CSS disables/minimizes motion.

## Implementation Notes

- Prefer editing existing classes where practical, but introduce focused new classes for liquid glass, terminal hero, and status/meter visuals when it keeps CSS clearer.
- Keep CSS variables as the source of color/theme truth.
- Avoid unrelated content edits.
- Keep JavaScript changes small and backward-compatible with current markup.
- Do not commit generated `.superpowers/` brainstorming files.
