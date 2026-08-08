# Third-party notices

The five themes are original work, licensed GPL-2.0-or-later; see
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

Verified against `redmine/redmine` at `2563fa6a55b1` (2026-08-03).

## Bundled in this repository

| Path | Component | Copyright | Licence | Notice |
| --- | --- | --- | --- | --- |
| `stylesheets/application.css`<br>`stylesheets/context_menu.css`<br>`stylesheets/dropdown.css`<br>`stylesheets/gantt.css`<br>`stylesheets/responsive.css`<br>`stylesheets/scm.css` | [Redmine](https://github.com/redmine/redmine) — **unmodified**, byte-identical to `app/assets/stylesheets/` | Jean-Philippe Lang | GPL-2.0-or-later | [`COPYING`](COPYING) |
| `stylesheets/jstoolbar.css` | Redmine — **modified**; every change is itemised in the file's own header | Jean-Philippe Lang | GPL-2.0-or-later | [`COPYING`](COPYING) |
| `stylesheets/open-color.css` | [Open Color](https://github.com/yeun/open-color) v1.9.1, as vendored by Redmine — unmodified | heeyeun | MIT | [`doc/licenses/open-color.txt`](doc/licenses/open-color.txt) |
| `jstoolbar/*.svg` (19 files) | [Tabler Icons](https://tabler.io/icons), as shipped by Redmine. Reserialized only — whitespace collapsed and self-closing tags expanded; path geometry is identical to upstream | Paweł Kuna | MIT | [`doc/licenses/tabler-icons.txt`](doc/licenses/tabler-icons.txt) |

Both MIT licences require their notice to accompany the files, so
`doc/licenses/` is included in the preview bundle and in every release archive that
contains the files it covers.

Redmine is the source of the vendored CSS but is **not** a dependency of a theme in
the packaging sense — you already have Redmine, and a theme imports the copy in your
own install.

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
| Noto Sans | referenced by the vendored `stylesheets/application.css`, **not** bundled — the request 404s in the preview and the browser falls back | OFL-1.1 |

To cut the dependency, delete the first `@import` from a theme's
`stylesheets/application.css` and the theme falls back to the system font stack, or
point it at a self-hosted copy.

## The mock Redmine content

The twelve preview screens in `preview/shell.html` — the "Orbital Systems" project,
its issues, people, wiki text and commit log — are invented for the preview. Any
resemblance to a real project or person is accidental. The markup imitates the
structure Redmine generates so themes can be judged against something realistic; it
is not copied from Redmine's templates and contains no real data.

## Reporting a problem

If something here is misattributed, or a licence is stated wrongly, please open an
issue — it will be corrected.
