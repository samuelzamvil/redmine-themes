# Dense

A Redmine 7 theme — maximum information density — small type, tight rows, a rust accent. This is the **rail** variant: navigation lives in a collapsible left rail.

> **Untested.** Designed entirely by Claude and not systematically tested on a live
> Redmine install. See the [repository README](../README.md) for details.

## Install

```
cp -r dense /path/to/redmine/themes/
```

Then pick **Dense** under *Administration → Settings → Display → Theme*.

Requires Redmine 7.0.

## Navigation variants

Dense ships in two variants. They are the same design — same palette, same type,
same components — and differ only in where navigation lives:

| Folder | Navigation |
| --- | --- |
| [`dense/`](../dense/) | **Rail.** A collapsible left rail carries navigation. Redmine's top and project bars are hidden above 900px, because the rail already holds exactly those links and showing both repeats every item and costs two rows of vertical space. |
| [`dense-classic/`](../dense-classic/) | **Classic.** No rail. Redmine's global bar and project tabs stay where they are. |

Install whichever you prefer — they are separate folders and both can sit in
`themes/` at once. Below 900px the two are identical: the rail withdraws and
Redmine's own flyout menu takes over.

## Layout

```
dense/
├── stylesheets/application.css   imports Redmine core, then the theme
├── javascripts/theme.js          optional runtime (see below)
└── favicon/                      drop a favicon.ico here to override Redmine's
```

## Fonts and third-party notices

Nothing in this folder belongs to anyone but the author, and the only third-party
dependency is a web font: the first `@import` in `stylesheets/application.css`
asks Google Fonts for **Archivo**, so a page load contacts
`fonts.googleapis.com` and `fonts.gstatic.com`. The font is not redistributed
here; it is [OFL-1.1](https://openfontlicense.org) licensed.

Delete that one `@import` and the theme falls back to the system font stack, or
point it at a self-hosted copy. Full disclosures for the wider project are in
`THIRD-PARTY-NOTICES.md`, and this theme's own licence is in `COPYING`.

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
- **Account control** at the foot of the rail, above the collapse toggle and
  separated by a rule: a person icon and your name, opening the account menu
  cloned from `#account .dropdown-content` — so anything a plugin adds to that
  menu comes along. Collapsed, the icon stands alone; the name truncates rather
  than widening the rail. The menu is positioned from the trigger's own rect, so a
  56px rail cannot clip it, and it closes on outside click or Escape. Hiding
  `#top-menu` hides Redmine's own account dropdown, which is why the rail carries
  this; on an anonymous session it is not created.
- **Status pills** in place of plain status text in issue tables and details.
- **Board view** toggle on issue lists, grouping rows into columns by status.
- **Issue editor**: stock Redmine renders the edit form below the history, so
  commenting means scrolling past every journal entry. The form is lifted directly
  under the issue details and its fieldsets become tabs — Comment, Properties,
  Log time, Files — with a sticky submit bar and Ctrl/Cmd+Enter to submit.
