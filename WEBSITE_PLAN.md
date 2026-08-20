# Vault 223 Website Plan

## Project summary

Build a production-ready, mobile-first website for Vault 223, a locally owned cafe and grab-and-go eatery at 223 N Main St in downtown Kokomo, Indiana. The experience is organized into three public pages:

- **Home** — brand story, featured food and drinks, quick hours, location preview, and ordering.
- **Menu** — a complete, accessible HTML menu organized by category with verified prices and supplied photography.
- **Visit & Order** — storefront, directions, recurring hours, contact details, a click-to-load map, interior story, and delivery choices.

The creative direction is **modern heritage**: a warm neighborhood cafe expressed through brass, ledger, and mechanical details inspired by the building's real century-old vault. Mobile usability is a launch-blocking requirement from 320-pixel phones through large desktops.

## Business information

- **Address:** 223 N Main St, Kokomo, IN 46901
- **Phone:** (765) 553-3417
- **Email:** management@vault223.com
- **Hours:** Tuesday–Friday, 7:00 AM–5:00 PM; Saturday, 10:00 AM–4:00 PM; Sunday–Monday, closed
- **Timezone:** America/Indiana/Indianapolis
- **Facebook:** https://www.facebook.com/p/Vault-223-61575300112455/
- **DoorDash:** https://www.doordash.com/store/vault-223-kokomo-46300935/
- **Uber Eats:** https://www.ubereats.com/store/vault-223/pbaEEGGJQpaGDEd2T34pvg

No August 19 closure or other one-time closure is included. Temporary closures remain a future content update and visitors are directed to Facebook for short-notice announcements.

## Core technology and hosting

- Astro with static output for fast, search-friendly pages and minimal browser JavaScript.
- Strict TypeScript.
- React islands only for the navigation drawer, order-provider sheet, current-hours indicator, and map loader.
- shadcn/ui conventions with Radix accessibility primitives.
- Tailwind CSS v4 plus custom Vault 223 design tokens and authored component styles.
- Phosphor Icons.
- Self-hosted Bitter, Instrument Sans, and IBM Plex Mono fonts through Fontsource.
- Typed local content validated by Zod; no CMS or database in v1.
- Astro responsive image processing with AVIF, WebP, and JPEG sources.
- Vitest for content and hours logic; Playwright and axe for browser and accessibility checks.
- Node.js 24 and pnpm 11 pinned in the repository.
- Static `dist` deployment to Netlify, with SSL, security headers, apex-domain canonicalization, and `www` redirect.

Netlify is the selected host because it supports commercial use at a lower paid entry point than Vercel Pro. The site has no v1 backend: ordering, directions, phone, email, and Facebook are outbound actions.

## Brand identity

### Brand idea

**Historic character, modern neighborhood fuel.**

Retain the established **Fueling Big Dreams** tagline.

Homepage headline: **Coffee, good food, and a century of character.**

Supporting copy: **Step inside Kokomo's historic vault for crafted drinks, breakfast, lunch, and a place to stay awhile.**

### Voice

Warm, confident, crafted, local, and lightly curious. Copy is concise and specific to Vault 223 and downtown Kokomo. Vault-related language is used selectively. The site avoids steampunk, luxury-bank, Wild West, chalkboard, and generic cafe-template treatments, and it does not invent historical, sourcing, dietary, accessibility, or parking claims.

### Color system

- Vault Ink: `#11100E`
- Ledger Cream: `#F6EBD7`
- Brass: `#D39A32`
- Burnished Gold: `#F0BC58`
- Espresso: `#3A261C`
- Patina Slate: `#24343A`
- Tomato: `#B74C3B`

Cream carries most reading surfaces. Gold is reserved for accents and important actions.

### Visual language

Circular vault-door arcs, numbered dial marks, brass rules, ledger grids, chamfered corners, editorial image crops, and circular porthole crops create the system. Motion is subtle and respects `prefers-reduced-motion`. The site uses only supplied photography in v1 and avoids repetitive rounded cards, stock art, floating gradients, glassmorphism, autoplay video, and parallax.

## Mobile-first requirements

- Design from 320 pixels upward; validate at 320, 360, 390, 430, 768, 1024, and 1440 pixels.
- Use fluid typography with `clamp()` and responsive spacing tokens.
- Prevent horizontal page scrolling at every supported width.
- Honor iPhone safe areas around the header and fixed ordering controls.
- Support portrait and landscape orientations and 200% text zoom.
- Never depend on hover for navigation, descriptions, ordering, or image access.
- Give all controls at least a 44 by 44-pixel touch target with visible focus and pressed states.
- Use an accessible shadcn/Radix Sheet for mobile navigation.
- Keep a persistent mobile Order Online action above the device safe area without covering page content.
- Open the provider chooser as a bottom sheet on phones and centered dialog on larger screens.
- Use art-directed responsive crops, explicit aspect ratios, eager hero loading, lazy below-fold images, and a target initial mobile transfer near 1.5 MB or less.

## Information architecture and experience

### Global

- Sticky desktop header and compact mobile header.
- Home, Menu, Visit, and Order Online reachable in one action.
- A sitewide order chooser with enabled DoorDash and Uber Eats actions and a disabled Clover placeholder.
- Footer with hours, address, phone, email, Facebook, Menu, Directions, and ordering.
- Static recurring hours remain visible when JavaScript is unavailable.

### Home

1. Mobile hero with copy before an art-directed `Vault223_Hero.jpg`; asymmetrical split layout on desktop.
2. Order Online and View Menu above the fold on common phones.
3. Kokomo-time open/closed strip.
4. Swipe-friendly category rail for Breakfast, Coffee, Lunch, Crepes, Pizza, and Fresh.
5. Inside the Vault story section.
6. Editorial food mosaic that becomes a deliberate vertical sequence on phones.
7. Storefront visit preview with address, hours, directions, and click-to-call.
8. Closing order panel and Facebook link for announcements.

### Menu

- Render the full menu as semantic, search-indexable HTML.
- Use sticky, horizontally scrollable mobile category anchors and a sticky desktop category rail.
- Stack categories and keep prices legible at 320 pixels without squeezing descriptions.
- Use accessible disclosure elements for modifiers and toppings where appropriate.
- Include Breakfast Favorites, Sweet Crepes, Light & Fresh, Lunch Favorites, Salads, Lunch Crepes, Coffee & Tea, Craft Creations, Vault Fizz, Juices & Sodas, Flatbread Pizza, and Add-ons and Modifiers.
- Transcribe `menu1.jpg`, `menu2.jpg`, `menu3.jpg`, `drinks.jpg`, and `flatbread.jpg` into typed data.
- Show dietary tags only when confirmed.
- Include “Prices and availability may change.”

### Visit & Order

- Lead with the storefront and “Find the door marked 223.”
- Put address, phone, directions, ordering, and recurring hours before story content.
- Use large touch targets for calling, emailing, and directions.
- Highlight today's hours in a compact table.
- Load the Google Map only after explicit visitor action.
- Follow practical information with interior and door photography.
- Link Facebook for temporary closures and announcements.
- Omit unverified parking and accessibility statements.

## Content contracts

Typed local contracts cover `BusinessInfo`, `WeeklyHours`, `SpecialHours`, `Money`, `MenuCategory`, `MenuItem`, `OrderProvider`, and `PhotoAsset`. Build-time validation rejects malformed URLs, duplicate slugs, invalid prices, and conflicting special-hours entries.

## Photo asset inventory

| Asset | Description and role |
|---|---|
| `Vault223_Hero.jpg` | Overhead food-and-drink spread; homepage hero and social preview. |
| `Vault223_BreakfastCroissant.jpg` | Ham, egg, and cheese croissant; breakfast feature. |
| `Vault223_ChickenPestoPanini.jpg` | Grilled chicken pesto panini; lunch feature. |
| `Vault223_OurFamousVaultedPizza.jpg` | Signature flatbread; hero and flatbread feature. |
| `Vault223_PepperoniPizza.jpg` | Pepperoni flatbread; flatbread category. |
| `Vault223_StrawberryCheesecakeCrepe.jpg` | Strawberry-and-cream dessert crepe; sweet crepes. |
| `Vault223_VaultedCrepe.jpg` | Strawberry, sugar, and chocolate crepe; crepes feature. |
| `Vault223_MediterraneanSalad.jpg` | Mediterranean-style chopped salad; fresh-food feature. |
| `Vault223_SummerBreezeSalad.jpg` | Greens, strawberries, cheese, and nuts; salads feature. |
| `Vault223_ColdBrew.jpg` | Cold brew on branded coaster; coffee section. |
| `Vault223_CremeBruleeLatte.jpg` | Iced creamy caramel latte; craft drinks feature. |
| `Vault223_HoneyCinnamonCortado.jpg` | Cinnamon-dusted hot drink; specialty feature. |
| `Vault223_HotCocoa.jpg` | Hot cocoa in takeaway cup; supporting beverage image. |
| `Vault223_HotDripCoffee.jpg` | Steaming black coffee; ambient coffee image. |
| `Vault223_IcedBlackTeaWithLemon.jpg` | Amber iced tea with lemon; tea category. |
| `Vault223_IcedChaiTea.jpg` | Pale iced chai; tea and craft category. |
| `Vault223_LargeCappuccino.jpg` | Hot foam-topped cappuccino; coffee category. |
| `Vault223_LargeIcedGreenTea.jpg` | Golden iced green tea; tea category. |
| `Vault223_LemonSpritz.jpg` | Pale citrus spritz; refreshers feature. |
| `Vault223_OrangeSpritz.jpg` | Bright orange spritz; refreshers feature. |
| `Vault223_StrawberryBlueberrySmoothie.jpg` | Berry smoothie; Light & Fresh feature. |
| `IMG_8125.jpeg` | Branded iced drink; held until product name is confirmed. |
| `restaurant.jpg` | Wide cafe interior; Visit page. |
| `vault-223-exterior.jpeg` | Storefront and address; Visit hero. |
| `vault-223-door.webp` | Branded entrance door; Visit detail. |
| `vault-223-door.jpeg` | Duplicate under a misleading extension; excluded from production. |
| `logo.png` | Transparent logo and “Fueling Big Dreams”; canonical mark. |
| `logo.png.jpg` | Black-background logo variant; retained as reference. |
| `menu1.jpg` | Breakfast, sweet crepes, smoothie, parfait, and add-ons source. |
| `menu2.jpg` | Coffee, tea, flavors, milk, soda, and juice source. |
| `menu3.jpg` | Lunch favorites, salads, and lunch crepes source. |
| `drinks.jpg` | Specialty coffee and Vault Fizz source board. |
| `flatbread.jpg` | Flatbread and Vaulted Pizza source board. |

Professional source photographs remain archival assets. Production pages generate responsive widths at appropriate breakpoints, prefer AVIF then WebP, keep per-image focal positions, and never ship the 9–13 MB originals directly.

## SEO, accessibility, security, and privacy

- Unique titles and descriptions, canonical URLs, sitemap, robots file, favicons, and supplied-photo social preview.
- `CafeOrCoffeeShop` JSON-LD with contact details, recurring hours, menu, price range, and Facebook profile.
- Semantic headings, landmarks, sections, lists, tables, disclosures, and address markup.
- WCAG 2.2 AA contrast, visible keyboard focus, reduced-motion support, and no hover-only content.
- Click-to-load map and no analytics or marketing cookies by default.
- Netlify CSP, HSTS, Referrer-Policy, Permissions-Policy, anti-sniffing, and framing protections.

## Implementation sequence

1. Preserve this plan; scaffold Astro; pin Node and pnpm; configure Netlify.
2. Inventory and normalize assets; transcribe menu content.
3. Build mobile-first tokens, navigation, order sheet, current-hours behavior, and vault motifs.
4. Implement Home, Menu, Visit & Order, and a custom 404.
5. Add metadata, structured data, sitemap, security headers, lazy map, and social preview.
6. Run content, type, unit, accessibility, device, overflow, and performance QA.
7. Deploy the static `dist` output to Netlify and connect `vault223.com` when account and domain access are available.

## Acceptance criteria

- Build, type checking, content validation, and unit tests pass.
- No horizontal overflow at the required viewport widths.
- Navigation, menu, ordering, contact actions, and map work without hover.
- Portrait, landscape, safe-area behavior, keyboard use, reduced motion, and 200% zoom remain usable.
- Recurring hours are correct before, during, and after service and remain readable without JavaScript.
- DoorDash, Uber Eats, phone, email, Facebook, directions, and map links are valid.
- axe reports no serious or critical violations.
- Mobile Lighthouse targets: Performance at least 90, Accessibility/Best Practices/SEO at least 95, LCP under 2.5 seconds, CLS under 0.1, and INP under 200 milliseconds.
- JSON-LD, sitemap, canonical URL, HTTPS, apex domain, and `www` redirect validate in production.
- Any mobile ordering, navigation, overflow, or content-blocking issue prevents launch.

## Assumptions and deferred work

- Vault 223 controls `vault223.com` and has publication rights for supplied assets.
- DoorDash and Uber Eats remain external ordering destinations.
- Clover stays disabled until a direct-order URL or API sync is requested.
- Menu and hours are repository-managed in v1.
- No CMS, reservations, accounts, catering form, newsletter, live social feed, or analytics are included in v1.
- English is the launch language.
- Owner approval is still required for menu transcription, prices, ZIP code, and the unidentified iced drink before public launch.
