/* Forget Nothing Board — rendering and local arrangement.
 *
 * cards.js is the board. This file only draws it.
 *
 * A visitor may drag cards around; that arrangement is kept in this browser
 * and nowhere else, so it never changes what anyone else sees. The Export
 * button writes the arrangement back out as a replacement cards.js, which is
 * how a rearrangement becomes the published board: export, commit, push.
 */

(function () {
  "use strict";

  var LS_PLACEMENTS = "fnb.placements.v1";
  var LS_THEME = "fnb.theme.v1";

  var placements = {};
  var filterProjects = new Set(Object.keys(PROJECTS));
  var onlyGate = false;
  var hideDone = false;

  var HISTORY = ["shipped", "removed"];

  var $ = function (id) { return document.getElementById(id); };

  /* ---------------- movement rules ----------------
   *
   * Shipped and Removed are history. What shipped, shipped — a card does not
   * travel back into the planning columns and pretend it never went out.
   * The only way out of Shipped is a withdrawal, and the only way out of
   * Removed is the withdrawal being reversed.
   *
   * Removed is also unreachable from anywhere else: nothing can be pulled
   * that was never released.
   */

  function canMove(from, to) {
    if (from === to) return false;
    if (to === "removed") return from === "shipped";
    if (from === "shipped") return to === "removed";
    if (from === "removed") return to === "shipped";
    return true;
  }

  function refuseReason(from, to) {
    if (to === "removed") return "Only something released can be withdrawn.";
    if (from === "shipped") return "What shipped, shipped. It can only be withdrawn.";
    if (from === "removed") return "A withdrawn card returns to Shipped, or stays put.";
    return "";
  }

  /* ---------------- storage ---------------- */

  function readStore() {
    try {
      var raw = localStorage.getItem(LS_PLACEMENTS);
      if (raw) placements = JSON.parse(raw) || {};
    } catch (err) {
      placements = {};
    }
  }

  function writeStore() {
    try {
      if (Object.keys(placements).length) {
        localStorage.setItem(LS_PLACEMENTS, JSON.stringify(placements));
      } else {
        localStorage.removeItem(LS_PLACEMENTS);
      }
    } catch (err) {
      /* Private window, or site data blocked. The board still works. */
    }
  }

  function colOf(card) {
    return placements[card.id] || card.c;
  }

  function moved() {
    return Object.keys(placements).length;
  }

  /* ---------------- theme ---------------- */

  function applyTheme(mode) {
    if (mode === "light" || mode === "dark") {
      document.documentElement.setAttribute("data-theme", mode);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(LS_THEME); } catch (err) { saved = null; }
    applyTheme(saved);

    $("theme").addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : current === "light" ? null : "dark";
      applyTheme(next);
      try {
        if (next) localStorage.setItem(LS_THEME, next);
        else localStorage.removeItem(LS_THEME);
      } catch (err) { /* ignore */ }
    });
  }

  /* ---------------- render ---------------- */

  function render() {
    var board = $("board");
    board.textContent = "";

    var visible = CARDS.filter(function (c) {
      if (!filterProjects.has(c.p)) return false;
      if (onlyGate && c.gate !== "1oct") return false;
      return true;
    });

    COLUMNS.forEach(function (col) {
      if (hideDone && (HISTORY.indexOf(col.id) !== -1 || col.id === "closed")) return;

      var section = document.createElement("section");
      section.className = "col";
      section.dataset.col = col.id;

      var head = document.createElement("div");
      head.className = "col-head";

      var nameRow = document.createElement("div");
      nameRow.className = "col-name";
      var h2 = document.createElement("h2");
      h2.textContent = col.name;
      var count = document.createElement("span");
      count.className = "col-count";
      nameRow.append(h2, count);

      var noteEl = document.createElement("p");
      noteEl.className = "col-note";
      noteEl.textContent = col.note;
      head.append(nameRow, noteEl);

      var stack = document.createElement("div");
      stack.className = "stack";

      var mine = visible.filter(function (c) { return colOf(c) === col.id; });
      count.textContent = String(mine.length);

      if (!mine.length) {
        var e = document.createElement("p");
        e.className = "empty";
        e.textContent = col.empty;
        stack.append(e);
      } else {
        mine.forEach(function (c) { stack.append(cardEl(c, col.id)); });
      }

      section.append(head, stack);
      wireDrop(section, col.id);
      board.append(section);
    });

    var onPath = CARDS.filter(function (c) {
      var where = colOf(c);
      return c.gate === "1oct" && HISTORY.indexOf(where) === -1 && where !== "closed";
    }).length;
    $("blockcount").textContent = onPath + (onPath === 1 ? " card" : " cards");

    document.querySelectorAll("#filters .chip").forEach(function (chip) {
      var on = filterProjects.has(chip.dataset.project);
      chip.setAttribute("aria-pressed", String(on));
      chip.classList.toggle("off", !on);
    });

    $("export").hidden = !moved();
    $("reset").hidden = !moved();
    $("localnote").textContent = moved()
      ? moved() + (moved() === 1 ? " card moved" : " cards moved") + " in this browser"
      : "";
  }

  function cardEl(c, colId) {
    var proj = PROJECTS[c.p];
    var el = document.createElement("article");
    el.className = "card";
    el.draggable = true;
    el.dataset.id = c.id;

    var top = document.createElement("div");
    top.className = "card-top";

    var tag = document.createElement("span");
    tag.className = "tag";
    tag.style.setProperty("--hue", proj ? proj.hue : "var(--ink-3)");
    tag.textContent = proj ? proj.short : c.p.toUpperCase();
    top.append(tag);

    if (c.gate === "1oct") {
      var g = document.createElement("span");
      g.className = "tag gate";
      g.textContent = "1 OCT";
      top.append(g);
    } else if (c.gate === "after") {
      var a = document.createElement("span");
      a.className = "tag after";
      a.textContent = "AFTER";
      top.append(a);
    }

    var h3 = document.createElement("h3");
    h3.textContent = c.t;
    el.append(top, h3);

    if (c.d) {
      var p = document.createElement("p");
      p.textContent = c.d;
      el.append(p);
    }
    if (c.s) {
      var s = document.createElement("p");
      s.className = "src";
      s.textContent = c.s;
      el.append(s);
    }

    var foot = document.createElement("div");
    foot.className = "card-foot";
    var idx = COLUMNS.findIndex(function (x) { return x.id === colId; });

    foot.append(
      stepBtn(c, colId, idx, -1, "←", "left"),
      stepBtn(c, colId, idx, 1, "→", "right")
    );

    if (placements[c.id]) {
      var here = document.createElement("span");
      here.className = "src";
      here.textContent = "moved by you";
      foot.append(here);
    }

    el.append(foot);

    el.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", c.id);
      e.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", function () { el.classList.remove("dragging"); });

    return el;
  }

  function stepBtn(card, colId, idx, step, glyph, direction) {
    var target = COLUMNS[idx + step];
    var b = document.createElement("button");
    b.type = "button";
    b.className = "move";
    b.textContent = glyph;

    if (!target) {
      b.disabled = true;
      b.title = "No column that way.";
      b.setAttribute("aria-label", "No column " + direction + " of " + COLUMNS[idx].name);
      return b;
    }

    if (!canMove(colId, target.id)) {
      b.disabled = true;
      b.title = refuseReason(colId, target.id);
      b.setAttribute("aria-label", b.title);
      return b;
    }

    b.title = "Move to " + target.name;
    b.setAttribute("aria-label", "Move “" + card.t + "” to " + target.name);
    b.addEventListener("click", function () { moveCard(card.id, target.id); });
    return b;
  }

  function wireDrop(section, colId) {
    section.addEventListener("dragover", function (e) {
      /* dragging holds the card being dragged; its column decides the drop. */
      var from = dragFrom();
      if (from === null || !canMove(from, colId)) return;   /* no preventDefault: refuse */
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      section.classList.add("drop");
    });
    section.addEventListener("dragleave", function () {
      section.classList.remove("drop");
    });
    section.addEventListener("drop", function (e) {
      e.preventDefault();
      section.classList.remove("drop");
      var id = e.dataTransfer.getData("text/plain");
      if (id) moveCard(id, colId);
    });
  }

  function dragFrom() {
    var el = document.querySelector(".card.dragging");
    if (!el) return null;
    var card = CARDS.find(function (c) { return c.id === el.dataset.id; });
    return card ? colOf(card) : null;
  }

  function moveCard(id, colId) {
    var card = CARDS.find(function (c) { return c.id === id; });
    if (!card) return;
    if (!canMove(colOf(card), colId)) return;
    if (card.c === colId) delete placements[id];
    else placements[id] = colId;
    writeStore();
    render();
  }

  /* ---------------- export ---------------- */

  function jsStr(value) {
    if (value === null || value === undefined) return "null";
    return JSON.stringify(value);
  }

  function buildCardsFile() {
    var stamp = new Date().toISOString().slice(0, 10);
    var out = [];

    out.push("/* ------------------------------------------------------------------------");
    out.push(" * cards.js — the board's contents.");
    out.push(" *");
    out.push(" * Exported from the board on " + stamp + ", grouped by column.");
    out.push(" * This file is the source of truth: the page renders it and nothing else.");
    out.push(" *");
    out.push(" * gate: \"1oct\"  on the submission path");
    out.push(" *       \"after\" deliberately placed after submission");
    out.push(" *       null    the gate does not care either way");
    out.push(" * --------------------------------------------------------------------- */");
    out.push("");
    out.push("const META = " + JSON.stringify(META, null, 2) + ";");
    out.push("");
    out.push("const PROJECTS = " + JSON.stringify(PROJECTS, null, 2) + ";");
    out.push("");
    out.push("const COLUMNS = " + JSON.stringify(COLUMNS, null, 2) + ";");
    out.push("");
    out.push("const CARDS = [");

    COLUMNS.forEach(function (col) {
      var mine = CARDS.filter(function (c) { return colOf(c) === col.id; });
      if (!mine.length) return;
      out.push("");
      out.push("  /* ---------------- " + col.name + " ---------------- */");
      out.push("");
      mine.forEach(function (c) {
        out.push("  { id: " + jsStr(c.id) + ", p: " + jsStr(c.p) +
                 ", c: " + jsStr(col.id) + ", gate: " + jsStr(c.gate) + ",");
        out.push("    t: " + jsStr(c.t) + ",");
        out.push("    d: " + jsStr(c.d) + ",");
        out.push("    s: " + jsStr(c.s) + " },");
      });
    });

    out.push("];");
    out.push("");
    return out.join("\n");
  }

  function exportFile() {
    var blob = new Blob([buildCardsFile()], { type: "text/javascript" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "cards.js";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* ---------------- chrome ---------------- */

  function buildFilters() {
    var wrap = $("filters");
    Object.keys(PROJECTS).forEach(function (key) {
      var p = PROJECTS[key];
      var n = CARDS.filter(function (c) { return c.p === key; }).length;

      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.dataset.project = key;
      b.style.setProperty("--hue", p.hue);
      b.title = p.blurb;

      var dot = document.createElement("span");
      dot.className = "dot";
      var label = document.createElement("span");
      label.textContent = p.name;
      var num = document.createElement("span");
      num.className = "n";
      num.textContent = String(n);

      b.append(dot, label, num);
      b.addEventListener("click", function () {
        if (filterProjects.has(key)) filterProjects.delete(key);
        else filterProjects.add(key);
        if (!filterProjects.size) filterProjects = new Set(Object.keys(PROJECTS));
        render();
      });
      wrap.append(b);
    });
  }

  function setHeader() {
    $("destination").textContent = META.destination;
    $("versiongate").textContent = META.version + "  ≥  " + META.versionGate;
    $("dategate").textContent = META.gateDateLabel;

    var now = Date.now();
    var days = Math.ceil((META.gateDate - now) / 86400000);
    var stamp = new Date(now).toISOString().slice(0, 10);

    var clock = $("clock");
    clock.textContent = stamp + " · ";
    var b = document.createElement("b");
    b.textContent = days > 0
      ? days + (days === 1 ? " day to the date gate" : " days to the date gate")
      : "date gate met";
    clock.append(b);

    if (days <= 0) {
      $("dategate").classList.remove("unmet");
      $("dategate").classList.add("met");
    }
  }

  $("only-gate").addEventListener("click", function (e) {
    onlyGate = !onlyGate;
    e.currentTarget.setAttribute("aria-pressed", String(onlyGate));
    render();
  });

  $("hide-done").addEventListener("click", function (e) {
    hideDone = !hideDone;
    e.currentTarget.setAttribute("aria-pressed", String(hideDone));
    render();
  });

  $("reset").addEventListener("click", function () {
    placements = {};
    writeStore();
    render();
  });

  $("export").addEventListener("click", exportFile);

  readStore();
  initTheme();
  buildFilters();
  setHeader();
  render();
})();
