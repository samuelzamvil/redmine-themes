/**
 * Umbra Classic - a theme for Redmine
 * Copyright (C) 2026 Samuel Zamvil
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the COPYING file for the full text of the
 * licence, or https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */

/* Redmine theme runtime — status pills, board view, issue editor.
   Pure additive: no server templates are touched. Safe to delete. */
(function () {
  var K = { rail: 'rm.rail.collapsed', view: 'rm.issues.view', mode: 'rm.color.mode', tab: 'rm.editor.tab' };
  function ls(k, v) { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) { return null; } }
  function slug(s) { return (s || '').toLowerCase().replace(/[^a-z]/g, ''); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  /* ---------------------------------------------------------------
     Icons. Redmine 7 renders its own SVG sprite inside menu links, so
     the rail clones that first and only falls back to these when the
     source link has no icon (older versions, plugin menu items).
     --------------------------------------------------------------- */
  var G = {
    home: '<path d="M3 9.2 10 3.5l7 5.7V16a1 1 0 0 1-1 1h-3.5v-5h-5v5H4a1 1 0 0 1-1-1z"/>',
    user: '<circle cx="10" cy="7" r="3"/><path d="M4.2 17c0-3.2 2.6-5 5.8-5s5.8 1.8 5.8 5"/>',
    grid: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/>',
    help: '<circle cx="10" cy="10" r="7"/><path d="M8.1 8a1.9 1.9 0 1 1 2.5 1.9c-.4.2-.6.6-.6 1.1"/><circle cx="10" cy="14" r=".7" fill="currentColor" stroke="none"/>',
    layout: '<rect x="3" y="3.5" width="14" height="13" rx="1.5"/><path d="M3 8h14M8 8v8.5"/>',
    pulse: '<path d="M3 11h3l2.2-5.5L11 15l2-4h4"/>',
    flag: '<path d="M5.2 17.5V3.5M5.2 3.5h9l-2 3 2 3h-9"/>',
    check: '<rect x="3" y="3.5" width="14" height="13" rx="2.5"/><path d="M7 10.2l2.2 2.2 4-4.4"/>',
    bars: '<path d="M4 5.5h8M4 10h11M4 14.5h6"/>',
    calendar: '<rect x="3" y="4.5" width="14" height="12.5" rx="1.5"/><path d="M3 8.5h14M7 2.8v3.4M13 2.8v3.4"/>',
    doc: '<rect x="4" y="3" width="12" height="14" rx="1.5"/><path d="M7 7.2h6M7 10.2h6M7 13.2h3.5"/>',
    code: '<path d="M7.2 5 3.4 10l3.8 5M12.8 5l3.8 5-3.8 5"/>',
    sliders: '<path d="M3.5 6h13M3.5 10h13M3.5 14h13"/><circle cx="8" cy="6" r="1.8" fill="currentColor" stroke="none"/><circle cx="13" cy="10" r="1.8" fill="currentColor" stroke="none"/><circle cx="7" cy="14" r="1.8" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="10" cy="10" r="7"/><path d="M10 6.2V10l2.8 1.8"/>',
    folder: '<path d="M3 6.2a1.2 1.2 0 0 1 1.2-1.2h2.9l1.8 2h6.9A1.2 1.2 0 0 1 17 8.2v6.6a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 14.8z"/>',
    chat: '<path d="M4 5.2h12v8H9.2l-4 3.2v-3.2H4z"/>',
    plus: '<path d="M10 4.2v11.6M4.2 10h11.6"/>',
    search: '<circle cx="9" cy="9" r="5"/><path d="M12.8 12.8 17 17"/>',
    megaphone: '<path d="M4.5 8v4l8.5 3.6V4.4z"/><path d="M4.5 8H3.2v4h1.3"/>',
    left: '<path d="M11.5 5.5 7 10l4.5 4.5"/>',
    right: '<path d="M8.5 5.5 13 10l-4.5 4.5"/>'
  };

  /* Redmine puts a stable class on every menu link — map it to a glyph. */
  var BY_CLASS = {
    home: 'home', 'my-page': 'user', mypage: 'user', projects: 'grid', help: 'help',
    administration: 'sliders', overview: 'layout', activity: 'pulse', roadmap: 'flag',
    issues: 'check', 'new-object': 'plus', 'new-issue': 'plus', gantt: 'bars',
    calendar: 'calendar', news: 'megaphone', documents: 'doc', wiki: 'doc',
    boards: 'chat', files: 'folder', repository: 'code', settings: 'sliders',
    'time-entries': 'clock', timelog: 'clock', search: 'search', 'my-account': 'user', logout: 'right'
  };

  var BY_WORD = [
    [/issue|ticket|bug/, 'check'], [/wiki|doc/, 'doc'], [/gantt/, 'bars'], [/calend/, 'calendar'],
    [/repo|code|source/, 'code'], [/setting|admin|config/, 'sliders'], [/time|spent|log/, 'clock'],
    [/file|attach/, 'folder'], [/forum|board|discuss/, 'chat'], [/news/, 'megaphone'],
    [/roadmap|version|release/, 'flag'], [/activ/, 'pulse'], [/project/, 'grid'],
    [/overview|summary|dashboard/, 'layout'], [/home|start/, 'home'], [/search/, 'search'],
    [/user|account|member|profile/, 'user'], [/new|add|create/, 'plus']
  ];

  function svg(glyph, cls) {
    return '<svg class="' + (cls || 'rm-rail-icon') + '" viewBox="0 0 20 20" fill="none" ' +
      'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + G[glyph] + '</svg>';
  }

  function iconFor(a, label) {
    var native = a && a.querySelector && a.querySelector('svg');
    if (native) {
      var clone = native.cloneNode(true);
      clone.classList.add('rm-rail-icon');
      clone.removeAttribute('width');
      clone.removeAttribute('height');
      return clone;
    }
    var key = null;
    if (a && a.className) {
      String(a.className).split(/\s+/).some(function (c) {
        if (BY_CLASS[c]) { key = BY_CLASS[c]; return true; }
        return false;
      });
    }
    if (!key) {
      var t = (label || '').toLowerCase();
      BY_WORD.some(function (p) { if (p[0].test(t)) { key = p[1]; return true; } return false; });
    }
    var wrap = document.createElement('span');
    if (key) { wrap.innerHTML = svg(key); return wrap.firstChild; }
    /* last resort: a monogram, never a bare dot */
    wrap.className = 'rm-rail-icon rm-rail-mono';
    wrap.textContent = (label || '?').trim().charAt(0).toUpperCase();
    return wrap;
  }

  /* ---- Colour mode: stored manual override wins, otherwise the system ---- */
  var mode = ls(K.mode);
  if (mode === 'light' || mode === 'dark') document.documentElement.setAttribute('data-rm-mode', mode);
  window.rmSetColorMode = function (m) {
    if (m === 'auto') { document.documentElement.removeAttribute('data-rm-mode'); ls(K.mode, ''); }
    else { document.documentElement.setAttribute('data-rm-mode', m); ls(K.mode, m); }
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* Classic nav: this theme keeps Redmine's own top and project menus, so no
       rail is built. Everything below — status pills, the board view, the issue
       editor — is unchanged. */
    decorateStatuses();
    issueViewSwitch();
    enhanceIssueEditor();
  });

  /* ---- Left global nav rail, assembled from the existing menus ---- */
  function buildRail() {
    if (document.getElementById('rm-rail')) return;
    var top = document.querySelector('#top-menu .top-menu__links ul, .top-menu__links ul');
    if (!top) return;

    var rail = document.createElement('nav');
    rail.id = 'rm-rail';

    var project = document.querySelector('#header h1 .current-project');
    var brand = document.createElement('div');
    brand.className = 'rm-rail-brand';
    brand.innerHTML = '<span class="rm-rail-mark"></span><span class="rm-rail-label">' +
      esc((project ? project.textContent : 'Redmine').trim()) + '</span>';
    rail.appendChild(brand);

    rail.appendChild(section('Workspace'));
    Array.prototype.forEach.call(top.querySelectorAll('a'), function (a) { rail.appendChild(railLink(a)); });

    var main = document.querySelectorAll('#main-menu > ul > li > a');
    if (main.length) {
      rail.appendChild(section('Project'));
      Array.prototype.forEach.call(main, function (a) { rail.appendChild(railLink(a)); });
    }

    /* Sign out gets its own block at the foot of the rail. In the rail
       variants Redmine's top menu is hidden, which takes the account
       dropdown with it — so this is the only way out of the session and
       it should not be mixed in with the navigation items above. */
    var out = document.querySelector('#account a.logout, .top-menu__links a.logout, a.logout');
    if (out) {
      var foot = document.createElement('div');
      foot.className = 'rm-rail-foot';
      foot.appendChild(railLink(out));
      rail.appendChild(foot);
    }

    var toggle = document.createElement('a');
    toggle.href = '#';
    toggle.className = 'rm-rail-toggle';
    toggle.title = 'Collapse sidebar';
    toggle.appendChild(iconFor(null, null) && wrapGlyph('left'));
    toggle.appendChild(label('Collapse'));
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var on = document.body.classList.toggle('rm-rail-collapsed');
      ls(K.rail, on ? '1' : '');
      toggle.replaceChild(wrapGlyph(on ? 'right' : 'left'), toggle.firstChild);
      toggle.title = on ? 'Expand sidebar' : 'Collapse sidebar';
    });
    rail.appendChild(toggle);

    document.body.appendChild(rail);
    document.body.classList.add('rm-has-rail');
    if (ls(K.rail) === '1') {
      document.body.classList.add('rm-rail-collapsed');
      toggle.replaceChild(wrapGlyph('right'), toggle.firstChild);
      toggle.title = 'Expand sidebar';
    }
  }

  function wrapGlyph(key) {
    var w = document.createElement('span');
    w.innerHTML = svg(key);
    return w.firstChild;
  }
  function label(text) {
    var s = document.createElement('span');
    s.className = 'rm-rail-label';
    s.textContent = text;
    return s;
  }
  function section(text) {
    var d = document.createElement('div');
    d.className = 'rm-rail-sec';
    d.textContent = text;
    return d;
  }
  function railLink(src) {
    var text = src.textContent.trim();
    var a = document.createElement('a');
    a.href = src.getAttribute('href') || '#';
    a.title = text;                       /* the tooltip is what makes the collapsed rail usable */
    if (src.classList.contains('selected')) a.className = 'selected';
    a.appendChild(iconFor(src, text));
    a.appendChild(label(text));
    return a;
  }

  /* ---- Status cells become pills ---- */
  function decorateStatuses() {
    var cells = document.querySelectorAll('table.list td.status, div.issue td.status, .attributes td.status');
    Array.prototype.forEach.call(cells, function (td) {
      if (td.querySelector('.rm-pill')) return;
      var txt = td.textContent.trim();
      if (!txt) return;
      td.innerHTML = '<span class="rm-pill" data-s="' + slug(txt) + '">' + esc(txt) + '</span>';
    });
  }

  /* ---- Table <-> board view switch for issue lists ---- */
  function issueViewSwitch() {
    var table = document.querySelector('table.list.issues');
    if (!table) return;
    var statusIdx = colIndex(table, 'status');
    if (statusIdx < 0) return;

    var host = document.querySelector('#content .contextual') || table.parentNode;
    var sw = document.createElement('span');
    sw.className = 'rm-viewswitch';
    sw.innerHTML = '<button type="button" data-v="table">Table</button><button type="button" data-v="board">Board</button>';
    host.insertBefore(sw, host.firstChild);

    var board = null;
    function apply(v) {
      Array.prototype.forEach.call(sw.querySelectorAll('button'), function (b) { b.classList.toggle('on', b.dataset.v === v); });
      if (v === 'board') {
        if (!board) board = buildBoard(table, statusIdx);
        table.style.display = 'none';
        board.style.display = '';
      } else {
        table.style.display = '';
        if (board) board.style.display = 'none';
      }
      ls(K.view, v);
    }
    sw.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) apply(b.dataset.v);
    });
    apply(ls(K.view) === 'board' ? 'board' : 'table');
  }

  function colIndex(table, cls) {
    var ths = table.querySelectorAll('thead th');
    for (var i = 0; i < ths.length; i++) if (ths[i].classList.contains(cls)) return i;
    return -1;
  }

  function buildBoard(table, statusIdx) {
    var order = [], cols = {};
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'), function (tr) {
      var tds = tr.children;
      if (!tds[statusIdx]) return;
      var status = tds[statusIdx].textContent.trim();
      if (!cols[status]) { cols[status] = []; order.push(status); }
      cols[status].push(tr);
    });
    var board = document.createElement('div');
    board.className = 'rm-board';
    order.forEach(function (status) {
      var col = document.createElement('div');
      col.className = 'rm-board-col';
      col.innerHTML = '<h4><span>' + esc(status) + '</span><span>' + cols[status].length + '</span></h4>';
      cols[status].forEach(function (tr) { col.appendChild(card(tr, status)); });
      board.appendChild(col);
    });
    table.parentNode.insertBefore(board, table);
    return board;
  }

  function card(tr, status) {
    function cell(cls) { var td = tr.querySelector('td.' + cls); return td ? td.textContent.trim() : ''; }
    var subject = tr.querySelector('td.subject a'), id = tr.querySelector('td.id a');
    var c = document.createElement('div');
    c.className = 'rm-card';
    c.innerHTML =
      '<a class="rm-card-subject" href="' + (subject ? subject.getAttribute('href') : '#') + '">' +
        esc(subject ? subject.textContent.trim() : '(no subject)') + '</a>' +
      '<div class="rm-card-meta">' +
        '<span class="rm-pill" data-s="' + slug(status) + '">' + esc(cell('priority') || status) + '</span>' +
        '<span>' + esc(id ? id.textContent.trim() : '') + '</span>' +
        '<span style="margin-inline-start:auto">' + esc(cell('assigned_to')) + '</span>' +
      '</div>';
    return c;
  }

  /* ---------------------------------------------------------------
     Issue editor. Stock Redmine drops the whole edit form below the
     history, so adding a comment means scrolling past every journal
     entry, and the four fieldsets stack into a very long column.
     Here the form is lifted directly under the issue details and its
     fieldsets become tabs, with Comment first because that is what
     the form is opened for nine times out of ten.
     --------------------------------------------------------------- */
  function enhanceIssueEditor() {
    var update = document.getElementById('update');
    if (!update || update.dataset.rmEditor) return;

    var history = document.getElementById('history');
    if (history && history.parentNode) history.parentNode.insertBefore(update, history);
    update.dataset.rmEditor = '1';
    update.classList.add('rm-editor');

    var box = update.querySelector('.box');
    if (!box) return;

    var notes = box.querySelector('#add_notes');
    var props = box.querySelector('fieldset.tabular:not(#log_time)');
    var time = box.querySelector('#log_time');
    var files = box.querySelector('#add_attachments');

    var defs = [];
    if (notes) defs.push({ el: notes, name: 'Comment' });
    if (props) defs.push({ el: props, name: 'Properties' });
    if (time) defs.push({ el: time, name: 'Log time' });
    if (files) defs.push({ el: files, name: 'Files' });
    if (defs.length < 2) return;

    var tabs = document.createElement('div');
    tabs.className = 'rm-editor-tabs';
    defs.forEach(function (d, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = d.name;
      b.dataset.i = i;
      tabs.appendChild(b);
    });
    var hint = document.createElement('span');
    hint.className = 'rm-editor-hint';
    tabs.appendChild(hint);
    box.insertBefore(tabs, box.firstChild);

    function show(i) {
      defs.forEach(function (d, j) { d.el.hidden = j !== i; });
      Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
        b.classList.toggle('on', Number(b.dataset.i) === i);
      });
      hint.textContent = defs[i].name === 'Properties' ? 'Changes apply on submit' : '';
      ls(K.tab, String(i));
      var field = defs[i].el.querySelector('textarea, input[type=text], select');
      if (field && defs[i].name === 'Comment') field.focus({ preventScroll: true });
    }
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) show(Number(b.dataset.i));
    });

    /* Sticky action bar, built from the form's own submit and cancel controls. */
    var form = update.querySelector('form') || update;
    var actions = document.createElement('div');
    actions.className = 'rm-editor-actions';
    var submit = form.querySelector('input[type=submit]');
    var cancel = Array.prototype.filter.call(form.querySelectorAll('a'), function (a) {
      return /cancel/i.test(a.textContent);
    })[0];
    if (submit) actions.appendChild(submit);
    if (cancel) actions.appendChild(cancel);
    var spacer = document.createElement('span');
    spacer.className = 'rm-editor-spacer';
    spacer.textContent = 'Ctrl/Cmd + Enter to submit';
    actions.appendChild(spacer);
    box.appendChild(actions);

    form.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && submit) submit.click();
    });

    var saved = Number(ls(K.tab));
    show(saved >= 0 && saved < defs.length ? saved : 0);
  }
})();
