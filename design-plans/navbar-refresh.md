# Refine the site navigation bar

Written against: `ae9cb7c87cca26e34c9b364931ce08978f622338`

## Evidence chain

- Surface: shared site header, as shown in the user supplied desktop screenshot; rendered by `Navbar` from `/`, `/internships/winter-2026`, `/internships/summer-45-day`, `/register`, `/about`, and `/contact`.
- Problem: the screenshot shows the two organization marks and five navigation actions sharing one flat row. The marks read as small, separated badges, while the links have little grouping or active-page indicator beyond a text color shift. The right-side call to action is visually distinct, but the rest of the header has weak hierarchy.
- Design evidence: user supplied screenshot; current header styles in `src/components/Navbar.tsx`; site colors and shared theme behavior in `src/App.tsx` and `src/index.css`.
- Owner: `src/components/Navbar.tsx`.
- Scope and affected surfaces: shared header across all non-admin public routes; desktop and mobile navigation states.
- Uncertainty: screenshot shows a desktop home state only. Validate the same treatment on both dark and light page themes and at mobile widths.

## Design decision

Give the existing dark glass header a clearer three-part hierarchy: a compact brand group, a visually grouped center navigation with a restrained active indicator, and a consistent registration action. Keep the current dark navy, cyan, and blue identity and existing labels. Tighten the logo pair into one aligned unit and give the bar a measured vertical rhythm, subtle border, and backdrop treatment so it reads as a deliberate site header rather than a plain strip.

## Reuse

- Reuse existing Tailwind colors and component-local `linkClass`, `mobileLinkClass`, `internshipMenu`, and registration button styles in `src/components/Navbar.tsx`.
- Exemplar: the supplied screenshot establishes the navy header, cyan active text, paired organization marks, centered links, and blue registration action.
- Do not add a new design token or dependency for this refresh.

## Changes

1. `src/components/Navbar.tsx`
   - Change: refine the shared desktop layout into aligned brand, navigation, and action groups; normalize the paired logo heights and spacing; add a subtle active state to the current route; polish the internship dropdown with matching border, spacing, and hover treatment; retain a clear blue registration CTA.
   - Preserve: all current labels, route destinations, dropdown content, outside-click and Escape dismissal, and registration behavior.
   - Verify: at desktop widths, the marks remain legible, the links stay centered without crowding the logo or CTA, the current route is easy to identify, and the dropdown visually belongs to the header.
2. `src/components/Navbar.tsx`
   - Change: align the mobile menu panel, its internship submenu, and registration action with the updated header surface and spacing; ensure the menu opens below the bar without covering or clipping its controls.
   - Preserve: current menu toggle and navigation behavior.
   - Verify: at narrow widths, the brand and menu control fit on one row and each menu action remains readable and easy to tap.

## Scope

- Inherit: all public routes that render `Navbar` through `src/App.tsx`.
- Verify: `/`, `/internships/winter-2026`, `/internships/summer-45-day`, `/register`, `/about`, and `/contact`, including active states and mobile menu open/closed states.
- Exclude: admin navigation, page content, route behavior, and changes to organization marks.

## Validation

- Product: navigate to each public route and confirm all existing actions still lead to their current destinations.
- Interface: inspect desktop and mobile widths, dark and light page themes, active routes, internship dropdown open/closed states, and mobile menu open/closed states.
- System: confirm the shared component remains the sole owner of the public navigation and no route-specific duplicate header is introduced.
- Repository: `git diff --check` → no whitespace errors.

## Stop conditions

- Stop if the supplied organization marks cannot remain legible at a compact aligned size; keep their current proportions and adjust group spacing instead.
- Stop if the shared header cannot maintain readable contrast across both existing page themes without changing the site's theme system.

## Design documentation

- After acceptance and validation: none; the repository has no current design specification for this header.
