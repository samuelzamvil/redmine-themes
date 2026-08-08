# Redmine 7 themes

Five drop-in themes for Redmine 7, built against the stock core stylesheet.

> **Untested — use at your own risk.** These themes were designed entirely by
> [Claude](https://claude.com/claude-code) and have **not** been installed or
> tested against a running Redmine instance. The preview below renders them against
> the real core stylesheet, but against mocked-up markup — not against Redmine's
> actual output, on real data, in a real browser session. Treat every theme as a
> starting point rather than a finished product, and try one on a staging install
> before putting it in front of users. Bug reports and fixes are welcome.
>
> Releases stay in the `0.x` range while that is the case.

| Theme | Character |
| --- | --- |
| [Atlas](atlas/) | Modern SaaS board — cool blue-grey neutrals, roomy rows, card-like issue list. |
| [Zen](zen/) | Calm minimal — generous whitespace, hairline rules, muted teal accent, no zebra striping. |
| [Umbra](umbra/) | Low-light — dark by default with an automatic light variant, periwinkle accent. |
| [Dense](dense/) | Maximum information density — small type, tight rows, rust accent. |
| [Folio](folio/) | Warm editorial — serif headings on a warm paper ground, amber accent. |

## Live preview

**[Click around all five themes →](https://samuelzamvil.github.io/redmine-themes/)**

Twelve mocked Redmine screens — issue list, issue detail, the reworked editor, new
issue, project overview, activity, roadmap, wiki, gantt, repository diff, admin
settings, login — rendered against the unmodified Redmine 7 core stylesheet with a
theme layered on top, exactly as a real install loads it. Switch theme, switch
light/dark, or put all five side by side.

Every control writes to the URL, so you can link straight to one view:

| Link | Shows |
| --- | --- |
| [`?theme=zen`](https://samuelzamvil.github.io/redmine-themes/?theme=zen) | Zen, issue list |
| [`?theme=umbra&mode=dark`](https://samuelzamvil.github.io/redmine-themes/?theme=umbra&mode=dark) | Umbra in dark mode |
| [`?theme=folio&page=issue-edit`](https://samuelzamvil.github.io/redmine-themes/?theme=folio&page=issue-edit) | Folio, the reworked issue editor |
| [`?compare=1`](https://samuelzamvil.github.io/redmine-themes/?compare=1) | all five side by side |

To run it locally, assemble the site and serve it with anything static:

```
script/build-site.sh
cd _site && python3 -m http.server     # then visit localhost:8000
```

`file://` will not work, because the page fetches stylesheets.

## Use the fake Redmine for your own theme

The preview is a self-contained mock Redmine, and it is published on its own as
**`redmine-mock-site.zip`** on the [latest release](../../releases/latest) — twelve
screens of Redmine markup over Redmine 7's real core stylesheets, with no Ruby,
database or Redmine anywhere:

```
unzip redmine-mock-site.zip
cd redmine-mock-site && python3 -m http.server
```

Drop any theme in as `themes/<name>/` and add one line to the `THEMES` array in
`index.html`, and you get twelve pages of feedback on it at once — it does not have
to be one of these five. Full instructions ship inside the bundle, and are readable
here as [`preview/README.md`](preview/README.md).

## Install

Each folder is a complete theme. Copy the one you want into your install's
`themes/` directory and select it under *Administration → Settings → Display*.

```
cp -r atlas /path/to/redmine/themes/
```

## Download

The [latest release](../../releases/latest) carries every piece separately, if you
would rather not clone:

| Asset | What it is |
| --- | --- |
| `atlas.zip` … `folio.zip` | one theme, ready to drop into `themes/` |
| `redmine-themes-all.zip` | all five themes |
| `redmine-mock-site.zip` | the fake Redmine, for previewing themes offline |

The theme archives unpack straight into an install:

```
unzip atlas.zip -d /path/to/redmine/themes/              # one theme
unzip redmine-themes-all.zip -d /path/to/redmine/themes/ # all five
```

Installing all five is safe — each is a separate entry in the theme picker, and
only the selected one loads.

## Shared design

All five are built the same way. Rather than overriding Redmine's rules one by one,
each theme remaps the Open Color custom properties that core already uses, so a
single token block at the top of `stylesheets/application.css` drives every
surface, border and accent — and dark mode falls out of inverting the same ramp.

Every theme ships light and dark, following `prefers-color-scheme` with a manual
override. Each also carries an optional `javascripts/theme.js` adding a collapsible
left nav rail, status pills, a board view for issue lists, and a reworked issue
editor. That file is purely additive; delete it and the styling still stands.

See each theme's README for install and customisation notes.

## Compatibility

Redmine 7.0 only. Themes live in `themes/` at the application root, and each theme
imports the core stylesheet from there. Earlier releases put themes in
`public/themes/` and shipped a different core stylesheet, so these will not work on
6.x or below without changes.

## Repo layout

```
atlas/ zen/ umbra/ dense/ folio/   the themes — copy one into your install
index.html                         the preview app (picker, compare, deep links)
preview/shell.html                 the mocked Redmine screens it renders
preview/README.md                  how to use the mock on your own theme
stylesheets/                       unmodified Redmine 7 core CSS, for the preview only
script/build-site.sh               assembles the site; used by Pages and the bundle
.github/workflows/pages.yml        publishes the preview to GitHub Pages
```

Only the five theme folders are needed to use a theme; everything else exists to
preview them.

The preview reads a theme from `themes/<name>/`, which the deploy assembles from
those same root folders — so the CSS you click through is the identical file you
install, and the theme's own `@import` of the core stylesheet resolves just as it
does inside a real Redmine tree.

## Licence

GPL-2.0-or-later — deliberately the same terms as Redmine itself, which nothing here
requires. A theme is stylesheets and a little additive JavaScript; it links nothing
and derives from nothing that would force the choice. Matching Redmine simply means
anyone who can use Redmine can use, fork and redistribute these on terms they
already know.

> This program is free software; you can redistribute it and/or modify it under the
> terms of the GNU General Public License as published by the Free Software
> Foundation; either version 2 of the License, or (at your option) any later
> version.
>
> This program is distributed in the hope that it will be useful, but WITHOUT ANY
> WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
> PARTICULAR PURPOSE.

The full text is in [`COPYING`](COPYING), byte-identical to Redmine's own
`doc/COPYING`. Every theme stylesheet and script carries the notice in its header,
and each release archive ships `COPYING` inside the theme folder, so the licence
travels with a theme that gets copied around on its own.

### Third-party files in the preview

None of these are part of a theme; they exist so the preview renders against the
real base, and each keeps its own licence.

| Path | Origin | Licence |
| --- | --- | --- |
| `stylesheets/*.css` (except `jstoolbar.css`) | [Redmine](https://github.com/redmine/redmine), unmodified | GPL-2.0-or-later |
| `stylesheets/jstoolbar.css` | Redmine, **modified** — changes listed in its header | GPL-2.0-or-later |
| `jstoolbar/*.svg` | [Tabler Icons](https://tabler.io/icons), as shipped by Redmine | MIT — [`doc/licenses/tabler-icons.txt`](doc/licenses/tabler-icons.txt) |

Redmine's files are copyright Jean-Philippe Lang; the icons are copyright Paweł
Kuna. Both notices are reproduced verbatim from the Redmine source, and the MIT
notice is bundled anywhere the icons are.
