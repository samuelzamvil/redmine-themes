# Mock Redmine — a static harness for previewing themes

A self-contained fake Redmine you can host anywhere. Twelve screens of realistic
Redmine markup rendered against Redmine 7's **unmodified core stylesheets**, with a
theme layered on top exactly as a real install loads it — no Ruby, no database, no
Redmine.

Built with [Claude](https://claude.com/claude-code) to develop the five themes in
[redmine-themes](https://github.com/samuelzamvil/redmine-themes), and bundled
separately because it is useful on its own: point it at a theme you are writing and
you get instant feedback on twelve pages at once.

## Run it

Any static server, from the bundle root:

```
python3 -m http.server        # then visit localhost:8000
```

`file://` will not work — the page fetches stylesheets, which browsers block over
that scheme.

## What's inside

```
index.html          the picker: theme, screen, light/dark, compare-all
preview/shell.html  the fake Redmine — all twelve screens as templates
stylesheets/        unmodified Redmine 7 core CSS (the real base, vendored)
themes/<name>/      the themes on offer, in Redmine's own themes/ layout
```

Screens: issue list, issue detail, the reworked issue editor, new issue, project
overview, activity, roadmap, wiki, gantt & calendar, repository diff, admin
settings, login.

Every control writes to the URL, so any view is linkable: `?theme=zen`,
`?theme=umbra&mode=dark`, `?theme=folio&page=issue-edit`, `?compare=1`.

## Preview your own theme

The harness has no knowledge of a theme beyond its folder name. To add yours:

1. Drop it in as `themes/<name>/`, laid out the way Redmine expects —
   `themes/<name>/stylesheets/application.css`, and optionally
   `themes/<name>/javascripts/theme.js`. Both paths are required to be exactly
   those; nothing else about the theme matters.
2. Add one entry to the `THEMES` array near the top of the script in `index.html`,
   where `key` is the folder name:

   ```js
   { key:'mytheme', name:'My Theme', note:'work in progress' },
   ```

3. If that takes you past five themes, widen the compare grid in `index.html` —
   `.compare { grid-template-columns:repeat(5,…) }` — or make it self-adjusting
   with `repeat(auto-fit,minmax(200px,1fr))`.

Your theme's own `@import` of the core stylesheet resolves correctly from
`themes/<name>/stylesheets/`, the same as in a real Redmine 7 tree, so a theme that
works here should load unchanged in an install.

## What it will not tell you

The screens are hand-written mock markup, not Redmine's output. It is close, but a
rule targeting markup the mock does not contain simply will not show up, and
`theme.js` behaviour that depends on real Redmine DOM or real data will not run.
Treat a good result here as encouraging, not as a pass — test on a real install
before shipping.

The chrome around the preview and the themes themselves pull fonts from Google
Fonts, so an offline or locked-down host falls back to system fonts.

## Licence

GPL-2.0-or-later, the same terms as Redmine itself. The full text is in `COPYING`,
byte-identical to Redmine's own `doc/COPYING`.

The mock screens and the preview app are copyright 2026 Samuel Zamvil, also
GPL-2.0-or-later, so you are free to adapt this harness for your own theme work.

Third-party files, each under its own licence:

- `stylesheets/*.css` — from the [Redmine](https://github.com/redmine/redmine)
  source, copyright Jean-Philippe Lang, GPL-2.0-or-later. All unmodified except
  `jstoolbar.css`, whose changes are listed in its own header.
- `jstoolbar/*.svg` — [Tabler Icons](https://tabler.io/icons), copyright Paweł Kuna,
  MIT licensed, as shipped by Redmine. The notice is in
  `doc/licenses/tabler-icons.txt`.
