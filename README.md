# Personal Website

Static personal website built with plain HTML, CSS, and vanilla JavaScript.

## Files

- `index.html`: page structure
- `styles.css`: visual system and responsive layout
- `script.js`: hydration, nav toggle, section highlighting, reveal effects
- `site-data.js`: all editable content and links
- `assets/`: local SVG artwork used by the page

## Edit Content

Open `site-data.js` and update:

- `brand`: name and tagline
- `hero`: main positioning, call-to-action labels, and hero artwork
- `stats`: highlight metrics
- `about`: bio and quote
- `timeline`: experience entries
- `ventures`: venture cards, URLs, and artwork paths
- `projects`: showcase cards
- `skills`: skill labels and levels
- `principles`: operating principles list
- `contact.formEmail`: email target for the contact form
- `contact.items`: visible contact methods
- `footer`: footer copy

## Contact Form

The form is disabled until `contact.formEmail` is set in `site-data.js`.

Example:

```js
contact: {
    heading: "Open to serious collaborations, ventures, and product opportunities.",
    copy: "If you're building something ambitious and want product, engineering, and execution aligned, reach out.",
    formEmail: "you@example.com",
    items: [
        { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
        { label: "Location", value: "Gold Coast, Australia", href: null },
        { label: "LinkedIn", value: "linkedin.com/in/yourname", href: "https://linkedin.com/in/yourname" }
    ]
}
```

## Run Locally

No build step is required.

- Open `index.html` directly in a browser
- Or serve the folder with any static file server

## Hosting

This project can be hosted anywhere that serves static files, including:

- GitHub Pages
- Netlify
- Cloudflare Pages
- Vercel static hosting
- Apache / Nginx
- Any shared hosting with HTML file support

## Deploy

Upload the entire `personal-website` folder contents, preserving this structure:

- `index.html`
- `styles.css`
- `script.js`
- `site-data.js`
- `assets/`

No server-side framework, Node runtime, or backend is required.
