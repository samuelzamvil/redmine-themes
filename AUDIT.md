# Mock fidelity audit

Every bug that reached a live install got there because the preview could not
show the state it lived in. This walks the real views for the twelve screens and
lists what the mock does not reproduce, so the next one can be found before it
ships rather than after.

Two measurements, taken against origin/main a98d3d6.

## 1. Selector coverage

Every selector in `atlas/stylesheets/application.css` was extracted from the
parsed stylesheet, then tested against all twelve screens with fieldsets forced
open:

**301 of 365 selectors match something. 64 do not.**

Those 64 are rules the mock cannot exercise — they ship untested. Grouped by why:

### Whole views the mock never renders

- `.rm-board`
- `.rm-board-col`
- `.rm-board-col > h4`
- `.rm-card`
- `.rm-card .rm-card-subject`
- `.rm-card .rm-card-meta`
- `.table-list`
- `.table-list-header`
- `fieldset.box`
- `fieldset.box legend`
- `#login-form table`

### States that need an interaction to reach

- `html.flyout-is-active #wrapper`
- `html.flyout-is-active #header`
- `html.flyout-is-active #wrapper .flyout-menu`
- `html.flyout-is-active body`
- `html.flyout-is-active #header a.mobile-toggle-button`
- `#rm-rail .rm-rail-account[aria-expanded="true"] .rm-rail-caret`
- `.table-generator td`
- `.table-generator td.selected-cell`
- `body #content .jstTabs.tabs li.tab-elements .jstElements.hidden`
- `.rm-editor fieldset[hidden]`
- `#main-menu .menu-children`

### Scroll-driven, so invisible to a static capture

- `body #sticky-issue-header`
- `body #sticky-issue-header a`

### Error and empty states

- `div.flash.error`
- `p.pagination`
- `.box .even`

### Data shapes the fixtures do not contain

- `table.list tr.group td`
- `table.list tr.group .badge-count`
- `table.list tr.group .toggle-all`
- `.gantt_subjects div.project-name a`
- `div.task_late.parent`
- `.version.task_todo`
- `.project.task_todo`
- `.version.task_done`
- `.project.task_done`
- `.tag-label-color`
- `#activity dt .author`
- `div.wiki h1`
- `#sidebar hr`
- `.top-menu__links a:visited`
- `.top-menu__links svg.icon-svg`
- `#rm-rail .rm-rail-mono`

### Element variants the fixtures skip

- `a.button`
- `a.button.secondary`
- `button.secondary`
- `body a.button`
- `.contextual a.icon.new-object`
- `.contextual a.icon.new-object .icon-svg`
- `#filters-table .filter .values input`
- `.rm-editor .tabular p > input[type="number"]`
- `.rm-editor .tabular p > textarea`
- `.rm-editor #add_notes p`
- `body .rm-editor .splitcontent p > input[type="number"]`
- `body #query_form_with_buttons > fieldset`
- `body #content > .contextual + h3`
- `body #content > .contextual + p.subtitle`
- `body #content > .splitcontent + .autoscroll`
- `#wrapper .flyout-menu .icon svg`
- `#wrapper .flyout-menu .icon-only svg`

### Legacy core markup that may no longer exist

- `#content .jstTabs.tabs .jstElements .help`
- `#content .jstTabs.tabs .jstElements .help a`
- `body .jstElements .help`
- `body .jstElements .help a`

The sharpest of these is `#sticky-issue-header`. It has a dedicated block in
every theme, it is scroll-driven, and nothing in the mock ever instantiates it —
the same shape as the jstoolbar bug, which also had CSS written against markup
the preview never produced.

`.rm-board` / `.rm-card` is the largest hole by volume: a whole view with six
rules and no fixture.

## 2. Markup and states missing from the mock

Read from the real views at redmine/redmine@master.

| Screen | Missing | Source |
| --- | --- | --- |
| Issue list | `p.nodata` (empty query), query totals row, `#csv-export-options` modal, `#context-menu` | issues/index.html.erb |
| Issue detail | `#sticky-issue-header`, `.next-prev-links.contextual`, `.avatar-with-child`, `.reaction`, `.badge-private`, `#issue_tree`, `#relations`, quote-reply `.contextual`, attachments + thumbnails, `#watchers` | issues/show.html.erb |
| New issue | `error_messages_for`, `#attachments_form`, `#watchers_form_container`, Create-and-continue | issues/new.html.erb |
| Activity | sidebar `#activity_scope_form` (day range, user select, type checkboxes) | activities/index.html.erb |
| Wiki | older-revision header with prev/next/diff, attachments fieldset, `badge-status-locked`, `#watchers` | wiki/show.html.erb |
| Repository | `.contextual` navigation partial, `dir_list` table | repositories/show.html.erb |
| Calendar | `span.contextual.pagination`, `p.legend.cal` | calendars/show.html.erb |
| Login | `back_url` hidden field, autologin checkbox | account/login.html.erb |
| Global | `div.flash.error`, `#errorExplanation`, `.conflict`, `.warning`, modal chrome | application.css |

Roadmap and Project overview came back clean.

## 3. The two known environmental gaps

**Stylesheet order.** The preview loads the theme in the `application` slot and
lets the theme's own `@import` pull core in, so core's rules land *before* the
theme's. A live page also receives core sheets through `yield :header_tags`
after the theme. That difference is what hid the height-vs-block-size conflict:
a logical property that loses to a physical one on a real page wins in the mock.
Until the preview reproduces the real order, any rule relying on beating core is
unverified here.

**Fonts.** Four Noto Sans woff2 requests 404 because the fonts are deliberately
not bundled. Harmless, but it means the console is never clean, so a real error
has nowhere to stand out.

## 4. Where I would spend the effort

1. `#sticky-issue-header` — has CSS, is scroll-driven, zero coverage.
2. The stylesheet order — one change, and it retro-covers every rule that has to
   out-rank core.
3. `.rm-board` / `.rm-card` — six rules, no fixture at all.
4. Error and empty states — `div.flash.error`, `#errorExplanation`, `p.nodata`;
   cheap to add, and the flash-banner bug was exactly this shape.
5. The interaction states — flyout open, account menu open, table generator.
   These need the mock to expose a toggle, not new markup.
