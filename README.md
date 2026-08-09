# Redmine 7 themes

Ten drop-in themes for Redmine 7, built against the stock core stylesheet: five
designs, each in two navigation variants.

> **Untested — use at your own risk.** These themes were designed entirely by
> [Claude](https://claude.com/claude-code) and have **not** been installed or
> tested against a running Redmine instance. The preview below renders them against
> the real core stylesheet, but against mocked-up markup — not against Redmine's
> actual output, on real data, in a real browser session. Treat every theme as a
> starting point rather than a finished product, and try one on a staging install
> before putting it in front of users. Bug reports and fixes are welcome.
>
> Releases stay in the `0.x` range while that is the case.

| Design | Character | Rail | Classic |
| --- | --- | --- | --- |
| Atlas | Modern SaaS board — cool blue-grey neutrals, roomy rows, card-like issue list. | [`atlas/`](atlas/) | [`atlas-classic/`](atlas-classic/) |
| Zen | Calm minimal — generous whitespace, hairline rules, muted teal accent, no zebra striping. | [`zen/`](zen/) | [`zen-classic/`](zen-classic/) |
| Umbra | Low-light — dark by default with an automatic light variant, periwinkle accent. | [`umbra/`](umbra/) | [`umbra-classic/`](umbra-classic/) |
| Dense | Maximum information density — small type, tight rows, rust accent. | [`dense/`](dense/) | [`dense-classic/`](dense-classic/) |
| Folio | Warm editorial — serif headings on a warm paper ground, amber accent. | [`folio/`](folio/) | [`folio-classic/`](folio-classic/) |

### The two navigation variants

Same palette, same type, same components — only where navigation lives differs.

**Rail** puts navigation in a collapsible left sidebar and hides Redmine's top and
project bars above 900px, because the rail already carries exactly those links:
showing both repeats every item and costs two rows of vertical space on every page.
Because hiding `#top-menu` also hides Redmine's account dropdown, the rail carries
its own account control at the foot: your name and a person icon, opening the same
menu cloned from `#account`, so plugin-added items come with it.

**Classic** builds no rail at all and leaves Redmine's global bar and project tabs
exactly where they are.

Below 900px the two are identical — the rail withdraws and Redmine's own flyout menu
owns navigation either way. Both variants are separate folders, so you can install
one or both.

## Live preview

**[Click around all ten themes →](https://samuelzamvil.github.io/redmine-themes/)**

Twelve mocked Redmine screens — issue list, issue detail, the reworked editor, new
issue, project overview, activity, roadmap, wiki, gantt, repository diff, admin
settings, login — rendered against the unmodified Redmine 7 core stylesheet with a
theme layered on top, exactly as a real install loads it. Switch design, switch
navigation variant, switch light/dark, or put all five side by side.

A **Width** control renders the frame at a fixed device width — Desktop 1280,
Laptop 1000, Tablet 834, Phone 390 — so the responsive behaviour is reachable from
a desktop browser. The stage scrolls rather than shrinking the frame, because
clamping it to the pane silently renders a desktop layout when you asked for a
phone, which is exactly how a responsive bug hides.

Every control writes to the URL, so you can link straight to one view:

| Link | Shows |
| --- | --- |
| [`?theme=zen`](https://samuelzamvil.github.io/redmine-themes/?theme=zen) | Zen, issue list |
| [`?theme=umbra&mode=dark`](https://samuelzamvil.github.io/redmine-themes/?theme=umbra&mode=dark) | Umbra in dark mode |
| [`?theme=folio&page=issue-edit`](https://samuelzamvil.github.io/redmine-themes/?theme=folio&page=issue-edit) | Folio, the reworked issue editor |
| [`?compare=1`](https://samuelzamvil.github.io/redmine-themes/?compare=1) | all five side by side |
| [`?theme=atlas&nav=classic`](https://samuelzamvil.github.io/redmine-themes/?theme=atlas&nav=classic) | Atlas with Redmine's own navigation |

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
to be one of these ten. Full instructions ship inside the bundle, and are readable
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
| `atlas.zip` … `folio-classic.zip` | one theme, ready to drop into `themes/` |
| `all-themes.zip` | all ten themes |
| `redmine-mock-site.zip` | the fake Redmine, for previewing themes offline |

The theme archives unpack straight into an install:

```
unzip atlas.zip -d /path/to/redmine/themes/              # one theme
unzip all-themes.zip -d /path/to/redmine/themes/ # all ten
```

Installing all ten is safe — each is a separate entry in the theme picker, and
only the selected one loads.

## Shared design

All ten are built the same way. Rather than overriding Redmine's rules one by one,
each theme remaps the Open Color custom properties that core already uses, so a
single token block at the top of `stylesheets/application.css` drives every
surface, border and accent — and dark mode falls out of inverting the same ramp.

Every theme ships light and dark, following `prefers-color-scheme` with a manual
override. Each also carries an optional `javascripts/theme.js` adding status pills, a
board view for issue lists, and a reworked issue editor — plus, in the rail variants
only, the nav rail itself. That file is purely additive; delete it and the styling
still stands.

See each theme's README for install and customisation notes.

## Compatibility

Redmine 7.0 only. Themes live in `themes/` at the application root, and each theme
imports the core stylesheet from there. Earlier releases put themes in
`public/themes/` and shipped a different core stylesheet, so these will not work on
6.x or below without changes.

## Repo layout

```
atlas/ zen/ umbra/ dense/ folio/   the themes — copy one into your install
<design>-classic/                  the same five, without the nav rail
index.html                         the preview app (picker, compare, deep links)
preview/shell.html                 the mocked Redmine screens it renders
preview/README.md                  how to use the mock on your own theme
stylesheets/                       unmodified Redmine 7 core CSS, for the preview only
script/build-site.sh               assembles the site; used by Pages and the bundle
script/build-release.sh            builds the release archives
.github/workflows/pages.yml        publishes the preview to GitHub Pages
```

Only the theme folders are needed to use a theme; everything else exists to
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

### Third-party files

A theme itself bundles nothing that is not ours. The preview vendors files from a
Redmine 7.0 checkout — its core stylesheets, icon sprite and images
(GPL-2.0-or-later, copyright Jean-Philippe Lang), Open Color and the Tabler icons it
carries (both MIT), and icon artwork from the Silk and Fugue sets that is
Creative Commons **Attribution** licensed, so Mark James and Yusuke Kamiyamane are
credited in the notices. Every theme also asks Google Fonts for one typeface at
runtime.

Full disclosure — component, origin, copyright, licence, and what was modified — is
in **[`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md)**, with the licence texts
themselves in [`doc/licenses/`](doc/licenses/).
