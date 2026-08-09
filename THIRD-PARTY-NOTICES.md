# Third-party notices

The ten themes are original work, licensed GPL-2.0-or-later; see
[`COPYING`](COPYING). This file covers everything in the repository that is **not**
ours, so you can tell at a glance what you are redistributing when you fork, install
a theme, or host the preview.

Two things worth knowing before the tables:

- **A theme carries no bundled third-party code.** `<theme>/stylesheets/application.css`
  and `<theme>/javascripts/theme.js` are ours. A theme does reference a web font at
  runtime (see [Fonts](#fonts-fetched-at-runtime-not-bundled)) and imports Redmine's
  own stylesheet from your install, but it ships nothing belonging to anyone else.
- **Everything vendored here exists for the preview.** If you only want a theme, none
  of the files below are involved.

## Redmine

Everything vendored below was taken from a local **Redmine 7.0** checkout at
revision `2563fa6a55b1` (2026-08-03), and each file was diffed against that
checkout — see the notes in the table for the two that are not byte-identical.

Redmine is copyright Jean-Philippe Lang and licensed GPL-2.0-or-later. Its licence
notice is reproduced verbatim as
[`doc/licenses/redmine.txt`](doc/licenses/redmine.txt), and the full GPL text it
refers to is [`COPYING`](COPYING) — the same text this project uses for its own
licence, so it appears once rather than twice.

> Redmine - project management software
> Copyright (C) Jean-Philippe Lang
>
> This program is free software; you can redistribute it and/or modify it under the
> terms of the GNU General Public License as published by the Free Software
> Foundation; either version 2 of the License, or (at your option) any later version.

Redmine is not a dependency of a theme in the packaging sense — you already have
Redmine, and a theme imports the copy of the core stylesheet in your own install.
The files below are vendored only so the preview has something real to render
against.

## Bundled in this repository

| Path | Component | Copyright | Licence | Notice |
| --- | --- | --- | --- | --- |
| `stylesheets/context_menu.css`<br>`stylesheets/dropdown.css`<br>`stylesheets/responsive.css` | Redmine `app/assets/stylesheets/` — **unmodified**, byte-identical to the checkout | Jean-Philippe Lang | GPL-2.0-or-later | [`doc/licenses/redmine.txt`](doc/licenses/redmine.txt), [`COPYING`](COPYING) |
| `stylesheets/application.css`<br>`stylesheets/gantt.css`<br>`stylesheets/scm.css`<br>`stylesheets/jstoolbar.css` | Redmine `app/assets/stylesheets/` — **modified**. Redmine serves assets from the server root via Propshaft, so these reference them as `url(/name)`, which cannot resolve on a static site served from a subpath. All such URLs are made relative; each file's own header records the deviation, and `jstoolbar.css` additionally itemises seven dropped rules. Verified: apart from those URLs, the rule bodies are identical to the checkout | Jean-Philippe Lang | GPL-2.0-or-later | [`doc/licenses/redmine.txt`](doc/licenses/redmine.txt), [`COPYING`](COPYING) |
| `icons.svg` | Redmine `app/assets/images/icons.svg` — the icon sprite, 117 symbols. Reserialized only: self-closing tags expanded, so all 387 path geometries and every symbol id match the checkout. The sprite file is Redmine's; the glyph artwork in it is Tabler's, so both notices apply | Jean-Philippe Lang (file), Paweł Kuna (artwork) | GPL-2.0-or-later / MIT | [`doc/licenses/redmine.txt`](doc/licenses/redmine.txt), [`doc/licenses/tabler-icons.txt`](doc/licenses/tabler-icons.txt) |
| `jstoolbar/*.svg` (19 files) | Redmine `app/assets/images/jstoolbar/` — [Tabler Icons](https://tabler.io/icons) as shipped by Redmine. Reserialized only: whitespace collapsed and self-closing tags expanded, path geometry matches the checkout 19/19 | Paweł Kuna | MIT | [`doc/licenses/tabler-icons.txt`](doc/licenses/tabler-icons.txt) |
| `stylesheets/open-color.css` | Redmine `app/assets/stylesheets/open-color.css` — [Open Color](https://github.com/yeun/open-color) v1.9.1 as vendored by Redmine, unmodified | heeyeun | MIT | [`doc/licenses/open-color.txt`](doc/licenses/open-color.txt) |
| `images/*.svg` (4 files) | Redmine `app/assets/images/` — Tabler chevrons and the search glyph. Reserialized only; geometry matches the checkout | Paweł Kuna | MIT | [`doc/licenses/tabler-icons.txt`](doc/licenses/tabler-icons.txt) |
| `images/*.png`, `images/loading.gif` (16 files) | Redmine `app/assets/images/` — byte-identical to the checkout. See [Icon artwork](#icon-artwork-attribution-required) below; attribution is **required** | Mark James, Yusuke Kamiyamane, Jean-Philippe Lang | CC-BY-2.5 / CC-BY-3.0 / GPL-2.0-or-later | [`doc/licenses/silk-icons.txt`](doc/licenses/silk-icons.txt), [`doc/licenses/fugue-icons.txt`](doc/licenses/fugue-icons.txt), [`COPYING`](COPYING) |

The MIT licences require their notice to accompany the files they cover, so
`doc/licenses/` ships in the preview bundle and in every release archive containing
those files.

## Icon artwork — attribution required

The raster images are the one component here under a licence that asks for **credit**
rather than just a bundled notice. Redmine draws its icon artwork from two
Creative Commons sets, and credits them in `doc/README_FOR_APP`; those credits are
reproduced here, verbatim in substance:

- **Silk Icons** by Mark James
  (<https://github.com/markjames/famfamfam-silk-icons>), licensed under the
  [Creative Commons Attribution 2.5](https://creativecommons.org/licenses/by/2.5/)
  License — see [`doc/licenses/silk-icons.txt`](doc/licenses/silk-icons.txt).
- **Fugue Icons** by Yusuke Kamiyamane (<https://p.yusukekamiyamane.com/>), licensed
  under the
  [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/)
  License — see [`doc/licenses/fugue-icons.txt`](doc/licenses/fugue-icons.txt).

**What we could and could not establish.** `images/exclamation.png` is
pixel-for-pixel identical to Silk's `exclamation.png`, so at least one file is
certainly Silk's and CC-BY-2.5 attribution is owed. For the rest we could not map
each file to a set with confidence: `arrow_up.png` shares a name with a Silk icon but
is 9×9 against Silk's 16×16, so it is a different image, and the remaining PNGs — the
8×8 gantt bars and milestone, version and project markers — look like Redmine's own
work but carry no metadata to prove it. Rather than guess per file, both sets are
credited above and both licence texts ship. If you can attribute a file precisely,
please open an issue and it will be corrected.

## Fonts, fetched at runtime, not bundled

No font file is distributed here. Each theme's stylesheet contains an `@import` that
asks **Google Fonts** for its typeface when a page loads, which means the browser
contacts `fonts.googleapis.com` and `fonts.gstatic.com`. All eight families are
[SIL Open Font License 1.1](https://openfontlicense.org); none is copied into this
repository, so no OFL notice is required of us — they are listed for transparency
about the network request and so you can self-host if you would rather not make it.

| Family | Used by | Licence |
| --- | --- | --- |
| Public Sans | Atlas, and the preview's own chrome | OFL-1.1 |
| Karla | Zen | OFL-1.1 |
| IBM Plex Sans | Umbra | OFL-1.1 |
| Archivo | Dense | OFL-1.1 |
| Source Sans 3, Source Serif 4 | Folio | OFL-1.1 |
| JetBrains Mono | the preview's own chrome | OFL-1.1 |
| Noto Sans | Redmine's own body font, `@font-face`-declared in the vendored `stylesheets/application.css` as `../fonts/NotoSans-*.woff2`. **Not bundled** — the four files are 872 KB and every theme overrides the body font, so it would never render. Those four requests 404 in the preview, harmlessly | OFL-1.1 |

To cut the dependency, delete the first `@import` from a theme's
`stylesheets/application.css` and the theme falls back to the system font stack, or
point it at a self-hosted copy.

## The mock Redmine content

The twelve preview screens in `preview/shell.html` — the "Orbital Systems" project,
its issues, people, wiki text and commit log — are invented for the preview. The
people are placeholders by construction: John Doe is the signed-in user, and Jane,
Sam, Chris and Alex Doe fill the other roles. The markup imitates the
structure Redmine generates so themes can be judged against something realistic; it
is not copied from Redmine's templates and contains no real data.

## Reporting a problem

If something here is misattributed, or a licence is stated wrongly, please open an
issue — it will be corrected.
