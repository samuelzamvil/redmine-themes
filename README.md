# Redmine 7 themes

Five drop-in themes for Redmine 7, built against the stock core stylesheet.

> **Untested — use at your own risk.** These themes were designed entirely by
> [Claude](https://claude.com/claude-code) and have **not** been installed or
> tested against a running Redmine instance. Nothing here has been verified in a
> browser. Treat every theme as a starting point rather than a finished product,
> and try one on a staging install before putting it in front of users. Bug
> reports and fixes are welcome.

| Theme | Character |
| --- | --- |
| [Atlas](atlas/) | Modern SaaS board — cool blue-grey neutrals, roomy rows, card-like issue list. |
| [Zen](zen/) | Calm minimal — generous whitespace, hairline rules, muted teal accent, no zebra striping. |
| [Umbra](umbra/) | Low-light — dark by default with an automatic light variant, periwinkle accent. |
| [Dense](dense/) | Maximum information density — small type, tight rows, rust accent. |
| [Folio](folio/) | Warm editorial — serif headings on a warm paper ground, amber accent. |

Each folder is a complete theme. Copy the one you want into your install's
`themes/` directory and select it under *Administration → Settings → Display*.

```
cp -r atlas /path/to/redmine/themes/
```

## Download

If you would rather not clone the whole repository, the
[latest release](../../releases/latest) carries each theme as a standalone zip plus
`redmine-themes-all.zip` containing all five. Every archive unpacks straight into
`themes/`:

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

## Licence

GPL-2.0, matching Redmine.
