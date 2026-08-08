# Folio

A Redmine 7 theme.

> **Untested.** Designed entirely by Claude and never run against a live
> Redmine instance. See the [repository README](../README.md) for details.

## Install

```
cp -r folio /path/to/redmine/themes/
```

Then pick **Folio** under *Administration → Settings → Display → Theme*.

For Redmine versions before 6.0, copy into `public/themes/` instead and change the
first `@import` in `stylesheets/application.css` to point at
`../../../stylesheets/application.css` relative to that location.

## Layout

```
folio/
├── stylesheets/application.css   imports Redmine core, then the theme
├── javascripts/theme.js          optional runtime (see below)
└── favicon/                      drop a favicon.ico here to override Redmine's
```

## Recolouring

Everything is derived from the token block at the top of `stylesheets/application.css`.
The theme remaps Redmine's own Open Color variables rather than overriding individual
rules, so changing `--oc-gray-*` retints every neutral surface and `--oc-blue-*`
retints every accent. Light and dark are the same block with a different ramp.

## Colour modes

Ships light and dark. The mode follows `prefers-color-scheme` by default. To pin it:

```js
rmSetColorMode('dark');   // or 'light', or 'auto'
```

The choice persists in `localStorage`. You can also set `data-rm-mode="dark"` on
`<html>` directly if you would rather not use the script.

## What theme.js does

Additive DOM work only — no server templates are modified, and deleting the file
returns you to stock Redmine behaviour with the styling intact.

- **Global nav rail** on the left, assembled from the existing top and project
  menus. Collapsible, state persisted. Icons are cloned from the sprite each menu
  link already carries, so it uses your Redmine's real icon set.
- **Status pills** in place of plain status text in issue tables and details.
- **Board view** toggle on issue lists, grouping rows into columns by status.
- **Issue editor**: stock Redmine renders the edit form below the history, so
  commenting means scrolling past every journal entry. The form is lifted directly
  under the issue details and its fieldsets become tabs — Comment, Properties,
  Log time, Files — with a sticky submit bar and Ctrl/Cmd+Enter to submit.
