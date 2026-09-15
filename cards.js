/* ---------------------------------------------------------------------------
 * cards.js — the board's contents.
 *
 * This file is the source of truth. The page renders it and nothing else.
 * To change the board, edit this file and commit: a card's text, its column,
 * its gate marker. Rearranging cards in the browser only changes that
 * browser's copy — use the Export button to write the result back here.
 *
 * gate: "1oct"  the card is on the submission path
 *       "after" deliberately placed after submission; starting it early
 *               costs the date
 *       null    the gate does not care either way
 * ------------------------------------------------------------------------ */

const META = {
  gateDate: Date.UTC(2026, 9, 1),        // 1 October 2026
  gateDateLabel: "1 October 2026",
  version: "3.7.0.15",
  versionGate: "3.5.0.15",
  destination: "goatcorp/DalamudPluginsD17"
};

const PROJECTS = {
  tm:     { name: "Time Memoria",  short: "TIME MEMORIA", hue: "var(--p-tm)",
            blurb: "The Dalamud plugin. Quest pacing, read from the game." },
  pl:     { name: "The Ledger",    short: "LEDGER",       hue: "var(--p-pl)",
            blurb: "Pandora Lunar's Adventurer's Ledger, the web companion." },
  studio: { name: "Studio web",    short: "STUDIO",       hue: "var(--p-studio)",
            blurb: "legendmemoria.org and the trackers that live on it." },
  wiki:   { name: "Wiki corpus",   short: "WIKI",         hue: "var(--p-wiki)",
            blurb: "The local wiki mirror the generated data comes from." },
  probe:  { name: "Probe",         short: "PROBE",        hue: "var(--p-probe)",
            blurb: "Questions asked of the game before anything is built on them." }
};

const COLUMNS = [
  { id: "unsettled", name: "Unsettled",
    note: "A question comes before a design. Probe the game, or make the call.",
    empty: "Nothing waiting on an answer." },
  { id: "ready", name: "Ready to build",
    note: "The shape is known. Nothing left to find out first.",
    empty: "Nothing ready. Look left." },
  { id: "flight", name: "In flight",
    note: "Being built right now. This column stays short on purpose.",
    empty: "Nothing in flight." },
  { id: "parked", name: "Parked",
    note: "Deferred on purpose, each with the condition that unparks it.",
    empty: "Nothing parked." },
  { id: "shipped", name: "Shipped",
    note: "Released and verified in game. A build that compiles does not count.",
    empty: "Nothing shipped yet." },
  { id: "closed", name: "Closed",
    note: "Decided against, with the reason. Not reopened without new facts.",
    empty: "Nothing closed." }
];

const CARDS = [

  /* ---------------- the submission path ---------------- */

  { id: "d17-submit", p: "tm", c: "parked", gate: "1oct",
    t: "Submit to the official plugin repository",
    d: "A manifest PR into the testing track of goatcorp/DalamudPluginsD17. Two gates have to be met, not either one: a version at or above 3.5.0.15, and the date. The version gate is already met. Artwork is compliant — a 512×512 icon and current screenshots.",
    s: "Docs/releasing.md" },

  { id: "no-features-sep", p: "tm", c: "ready", gate: "1oct",
    t: "Feature freeze until the gate",
    d: "The last week before submission is for settling, not adding: days of ordinary use on what already shipped, and no new surface to go wrong. Every card marked AFTER is more interesting than this one, and not one of them moves the date.",
    s: null },

  /* ---------------- Time Memoria ---------------- */

  { id: "mentor", p: "tm", c: "ready", gate: null,
    t: "Mentor tracking, two tracks per character",
    d: "Battle and Trade side by side, per character. G'raha Tia, Y'shtola and Alphinaud each hold Trade Mentor; the Warrior of Light is working toward both crowns at once. A single mentor flag would miss the point entirely. Nothing left to find out — commendations and duty counts already export, and the five role quests read as plain quest completion, which carries none of the achievement window's caveats.",
    s: null },

  { id: "gear-gaps", p: "tm", c: "unsettled", gate: null,
    t: "The two shop gates, and item costs",
    d: "Live attribute totals are solved. What is left before gear comparison can be designed: a special shop's entries carry a quest gate and an achievement gate, and “offered by a shop” is not “you can buy this”. Recommending gear from a vendor who will not talk to you is the failure mode to avoid.",
    s: "Docs/gear-and-food.md" },

  { id: "crystarium", p: "tm", c: "unsettled", gate: "after",
    t: "Crystarium Deliveries",
    d: "A real hole in a system that is otherwise tracked end to end: Shadowbringers gave crafters and gatherers no class quest chain at all, and replaced it with a repeatable turn-in. So this is a new tracked category per job with its own rank and delivery count — not missing quest rows. The exact shape is still unprobed.",
    s: null },

  { id: "lodestone-link", p: "tm", c: "ready", gate: null,
    t: "The Lodestone link in the native window",
    d: "The last open item in native parity. The closest existing node draws a full list-item hover bar, so a row that reads as a clickable label is real work rather than one property. Left out of the last parity pass rather than shipping something that looks clickable and is not.",
    s: "Docs/native-parity.md" },

  { id: "rebaseline-native", p: "tm", c: "ready", gate: null,
    t: "Native parity for the journal re-baseline",
    d: "The re-baseline controls shipped in the classic settings window first. The native window still needs them.",
    s: "Docs/native-parity.md" },

  { id: "duty-export", p: "tm", c: "ready", gate: "after",
    t: "Export duty completion for the grid",
    d: "Three tiers of certainty. Exact, from quest data: the quest that follows a duty gives the true answer for every dungeon and trial the story gates. Exact, from achievements: 53 Extreme and Minstrel's Ballad clears. A floor, from Mapping the Realm, which is a discovery achievement and must never overwrite a higher stored value. Guildhests stay hand-ticked, and say so.",
    s: null },

  { id: "relic-export", p: "tm", c: "ready", gate: "after",
    t: "Relic names and completion",
    d: "Relic quests already arrive in the export — the game files them under Class & Job Quests. Names come from the game's own achievement sheet, so the plugin can send name plus done and the Ledger seeds nothing by hand.",
    s: null },

  { id: "hunt-flags", p: "tm", c: "unsettled", gate: null,
    t: "May the plugin export the hunt group flags?",
    d: "A decision, not a probe. A per-mark kill record is a combat log and is permanently out of scope. But the plugin already exports duty and commendation counts, so a profile aggregate is not new ground. The principle wants settling before the Ledger asks for the data.",
    s: "README.md" },

  { id: "ocean-build", p: "tm", c: "parked", gate: "after",
    t: "Ocean Fishing",
    d: "The game already computes this and only shows it at the ferry dock. Routes and rotation come from the route table — 144 rows, one twelve-element sequence shifted a place per day. Both boats, the next voyages, stops in order, unlocks read from the route's own quest column. Schedule from the game; bait and bite windows stay community measurement.",
    s: "Docs/ocean-fishing.md" },

  { id: "deeplinks", p: "tm", c: "parked", gate: "after",
    t: "Quest deep links",
    d: "Today the wiki button fires a quest's words at a search box, because a quest name does not reliably map to a page title. A generated id-to-title file retires that compromise and falls back to the search when an id is unknown.",
    s: "Docs/4.0-checklist.md" },

  { id: "storypatch", p: "tm", c: "parked", gate: "after",
    t: "Story patch numbers",
    d: "The only planned change that alters what someone mid-A Realm Reborn sees, and the only one the game genuinely cannot supply. A level 50 Seventh Astral Era quest should rank as 2.x, not as the patch its id belongs to.",
    s: "Docs/4.0-checklist.md" },

  { id: "api16", p: "tm", c: "parked", gate: "after",
    t: "Rebuild against API 16",
    d: "Unparks when API 16 reaches general release. The API digit sorts last in the version, so it can never disqualify a build — but a forced update is a moment worth spending on something.",
    s: "Docs/4.0-checklist.md" },

  { id: "gating-char", p: "tm", c: "ready", gate: null,
    t: "Build the gating test character",
    d: "A main character has done everything, which makes gating easy to write and impossible to test. A fresh character at level 10 with Fisher unlocked leaves one boat unlocked and one locked — permanently. A fixture, not a window that closes as you play. Every progression gate in the plugin needs it.",
    s: "Docs/4.0-checklist.md" },

  { id: "ledger-url", p: "tm", c: "unsettled", gate: null,
    t: "The Ledger address is compiled in",
    d: "Every released build points at the current address for good, and the site is moving to its own domain. Redirects hold for now, which is the only reason this is not already a problem. Decide whether the plugin should read the address from somewhere that can change.",
    s: null },

  /* ---------------- probes ---------------- */

  { id: "ocean-probe", p: "probe", c: "unsettled", gate: "after",
    t: "Is the current voyage readable from the client?",
    d: "The probe that decides whether Ocean Fishing can claim nothing is guessed at. If the client will not say which voyage is running, the alternative is shipping a fixed starting point — which is a guess wearing a number.",
    s: "Docs/ocean-fishing.md" },

  { id: "ocean-time", p: "probe", c: "unsettled", gate: "after",
    t: "Resolve the route's time-of-day column",
    d: "Day, sunset and night are encoded in one column. Settle what its values mean before any stop list prints a time.",
    s: "Docs/4.0-checklist.md" },

  { id: "mogpendium", p: "probe", c: "unsettled", gate: null,
    t: "Is Moogle Treasure Trove progress readable?",
    d: "Nothing in the game's sheets named the mechanic before the event went live, and the one existing community plugin reads only the reward shop. So nothing is known either way yet. The earliest useful moment to look is after the window has been opened in game.",
    s: null },

  { id: "pvp-streak", p: "probe", c: "unsettled", gate: null,
    t: "How far does the Frontline loss bonus stack?",
    d: "One consecutive loss paid exactly ten per cent more. Two, three, whether it caps and whether a win resets it are all unknown. It only affects how tight a range a projection can quote — and the range already errs toward overstating the work.",
    s: null },

  { id: "pvp-series", p: "probe", c: "unsettled", gate: null,
    t: "Read a series rollover cleanly",
    d: "A series rollover resets the rank and finally populates the previous-series field. The window to catch the transition is open now and narrows as the series runs on.",
    s: null },

  /* ---------------- the Ledger ---------------- */

  { id: "backup-notice", p: "pl", c: "ready", gate: null,
    t: "“We are moving — download your backup”",
    d: "The one piece of the move worth doing early. Its clock starts when the notice goes up, not when the domain switches, and browser storage does not survive a change of origin. Without it every saved character is stranded.",
    s: null },

  { id: "duty-grid", p: "pl", c: "ready", gate: "after",
    t: "The duty grid",
    d: "Every dungeon, trial, raid and guildhest per expansion, ticked where done. Rows generated from the game's own content table, so no hand-kept list and new duties appear on patch day. The plugin supplies the exact answer where the story gates a duty, which is the part a Lodestone-only tracker cannot do.",
    s: null },

  { id: "relic-checklist", p: "pl", c: "ready", gate: "after",
    t: "Relic checklist",
    d: "Fed by the relic export. Ticked from the game rather than typed.",
    s: null },

  { id: "hunts-reconcile", p: "pl", c: "ready", gate: null,
    t: "Reconcile the Hunts tab against the game",
    d: "The game tracks unique elite mark kills, but only ever reports how many, never which. That count is still worth surfacing. The Warrior of Light's tab had none of the six La Noscea A ranks ticked; the game reported five. A line reading “the game says 5, you have ticked 0” is the whole feature.",
    s: null },

  { id: "hunts-late", p: "pl", c: "parked", gate: null,
    t: "Later expansions have no hunt source",
    d: "Group achievements cover A Realm Reborn, Heavensward and Stormblood — 70 of 127 marks. Everything after that has counter achievements only. Those 57 stay hand-ticked, and the tab should say so plainly rather than look broken.",
    s: null },

  { id: "crystarium-ledger", p: "pl", c: "parked", gate: "after",
    t: "Crystarium Deliveries in the Ledger",
    d: "Unparks once the plugin settles what shape the data takes. Adding it to the job quest lists would be wrong — it is a repeatable turn-in with a rank, not a list of quests.",
    s: null },

  { id: "oceanbait-home", p: "pl", c: "unsettled", gate: null,
    t: "Where does the bait table get published?",
    d: "Thirteen zones, four of them verified by catch, generated by a script and currently sitting in a data repository. Where it belongs is undecided.",
    s: null },

  { id: "manual-entry", p: "pl", c: "closed", gate: null,
    t: "Retire manual entry once the plugin exports",
    d: "No. The Ledger serves a whole free company, most of whom do not run the plugin — which is why the quest totals carry an “I don't use the plugin” toggle. Plugin data replaces the typing, never the feature.",
    s: null },

  /* ---------------- studio web ---------------- */

  { id: "web-merge", p: "studio", c: "parked", gate: "after",
    t: "One origin for everything web-facing",
    d: "The hub, the Ledger and the challenge trackers serve from one domain. One origin means one browser store, which is the whole point: a routine ticked on the checklist is ticked in the Ledger. Subdomains stay as redirects so existing addresses keep working.",
    s: null },

  { id: "split-appjs", p: "studio", c: "parked", gate: "after",
    t: "Split the app into shell and per-game",
    d: "The Ledger is one 199 KB script, nearly all of it specific to one game. This is not extra work on top of a shared layout — it is the shared layout. Shell: themes, save indicator, backup bar, and one countdown engine.",
    s: null },

  { id: "reset-engine", p: "studio", c: "parked", gate: "after",
    t: "One reset engine, three schedules",
    d: "Each game resets on its own cadence. One engine reading three configurations — never three copies of the arithmetic, which is the kind of drift that stays invisible until someone's Tuesday is wrong.",
    s: null },

  { id: "challenge-rebirth", p: "studio", c: "parked", gate: "after",
    t: "Challenge trackers on the shared shell",
    d: "The themes already carry shape as well as colour — one sharpens every corner, another rounds them — so a game inheriting the shell inherits real personality, and the accent colour makes per-game identity a single line.",
    s: null },

  { id: "support", p: "studio", c: "ready", gate: null,
    t: "A way to support the project",
    d: "A donate link in the plugin's own settings window and on the sites. Donate links are common among approved plugins; it will be confirmed with the approval group at submission rather than assumed.",
    s: null },

  { id: "ads-ledger", p: "studio", c: "closed", gate: null,
    t: "Advertising on the Ledger",
    d: "Never. The Ledger states in writing that your data never leaves your browser, and ad scripts make that false. Breaking a published promise costs more than the pennies. This exclusion is not about taste.",
    s: null },

  { id: "tm-in-merge", p: "studio", c: "closed", gate: null,
    t: "Fold the plugin into the web repository",
    d: "No, and not while submission is pending. The plugin's manifest points at a commit in its own repository, it is C# against an entirely different toolchain, and restructuring it risks the date for no benefit.",
    s: null },

  /* ---------------- wiki corpus ---------------- */

  { id: "daily-rc", p: "wiki", c: "ready", gate: null,
    t: "Rebuild the daily update on recent changes",
    d: "It polls a thousand pages a day and takes 112 days to come round. The wiki will simply say what changed. That collapses a 13 MB state file to a single watermark. Page moves have to be handled, or a renamed title strands its old entry.",
    s: null },

  { id: "smw", p: "wiki", c: "unsettled", gate: null,
    t: "Does the wiki expose typed fields directly?",
    d: "12.8 million property values and 531 properties are in use. If they can be queried as typed fields, the infobox parser — and the class of bug that comes with hand-parsing templates — was never necessary. Worth answering before building anything further on the parser.",
    s: null },

  { id: "gen-patches", p: "wiki", c: "unsettled", gate: "after",
    t: "Generate the patch table from the corpus",
    d: "5,326 hand-carried entries, the last hand-maintained data in the plugin, and the thing the README singles out as unavoidable. Quest infoboxes carry the game's own quest id, so it can be generated. Two things to settle first: the wiki is CC BY-SA and that has to sit properly beside the plugin's own licence, and the existing file is sound — every one of the 5,005 quests resolves today.",
    s: "README.md" },

  { id: "jsonl-compact", p: "wiki", c: "ready", gate: null,
    t: "Compact the update log",
    d: "Append-only and never compacted. Small, and it only grows.",
    s: null },

  { id: "naive-time", p: "wiki", c: "ready", gate: null,
    t: "Timestamps ignore daylight saving",
    d: "Fetch times are recorded in naive local time. An autumn clock change repeats an hour, so a stale record could win. Small, and it will happen in November.",
    s: null },

  /* ---------------- closed, with the reason ---------------- */

  { id: "crosschar", p: "tm", c: "closed", gate: null,
    t: "Link characters by account",
    d: "Closed, not blocked. The account identifier is a real and distinct field, and it is never to be read or stored regardless. Tracking stays per character.",
    s: "README.md" },

  { id: "mark-log", p: "tm", c: "closed", gate: null,
    t: "A per-mark kill log in the plugin",
    d: "Never. That is a combat kill record, which is the wrong side of the plugin's own promise, however well the machinery would fit. The website is a different product with different rules, which is why the Hunts tab lives there.",
    s: "README.md" },

  { id: "mark-bitmap", p: "probe", c: "closed", gate: null,
    t: "Search again for per-mark kill data",
    d: "Settled negative. The client's entire progress message is three integers, so there is nowhere for a list of sub-items to arrive. A full scan of the two candidate structures came back empty, and the one hunt-shaped structure on the client belongs to the bill board, which never issues the ranks in question.",
    s: null },

  { id: "testing-channel", p: "tm", c: "closed", gate: null,
    t: "A testing channel in the custom repository",
    d: "Rejected. The official repository supplies one as a directory. Imitating it means publishing prereleases and teaching the manifest builder a second set of links, on a path the documentation itself calls minimally supported — all of it to be deleted on submission.",
    s: "Docs/releasing.md" },

  /* ---------------- shipped ---------------- */

  { id: "sh-37", p: "tm", c: "shipped", gate: null,
    t: "3.7.0.15 — unfinished lists per expansion",
    d: "The native Quests panel now surfaces every expansion's unfinished list.",
    s: null },

  { id: "sh-36", p: "tm", c: "shipped", gate: null,
    t: "3.6.0.15 — list a whole expansion at once",
    d: "A command to list every unfinished quest in an expansion, with a message instead of a blank pane when there are none. Also corrected: patch 7.56 continues the current story arc rather than opening a new one.",
    s: null },

  { id: "sh-35", p: "tm", c: "shipped", gate: null,
    t: "3.5.0.15 — journal hardening",
    d: "Re-baseline, completion timestamps to the second, rotating backups, and long-term snapshots on the 1st and 15th held for 32 days. This is the release that cleared the version gate.",
    s: null },

  { id: "sh-34", p: "tm", c: "shipped", gate: null,
    t: "3.4.x — festivals, map flags, quest levels",
    d: "Seasonal availability read from the game's own festival field instead of a hand-kept list of hidden ids. A quest's issuer flagged on the map — which also fixed the classic window's map-open, broken since it first existed. And an offset applied so Allied Society quests show their real level.",
    s: null },

  { id: "sh-journal", p: "tm", c: "shipped", gate: null,
    t: "One character's journal stays its own",
    d: "A sweep could fire in the gap between logout and login, when the client had already switched characters but the quest data had not. It ran 0.6 seconds before the login event and wrote 615 of Alphinaud's completed quests into the Warrior of Light's journal, stamped with that day's date. The journal now drops an entry the game reports unfinished, so it self-corrects.",
    s: null },

  { id: "sh-attrs", p: "tm", c: "shipped", gate: null,
    t: "Live attribute totals",
    d: "The client reports a character's live, capped stat totals — and already includes any active food, confirmed by repeated fed and unfed readings. Food ranking now scores against the stats the equipped job actually uses, which fixed a real bug: a healer could be told to eat for skill speed.",
    s: null },

  { id: "sh-hunts", p: "pl", c: "shipped", gate: null,
    t: "The Hunts tab",
    d: "All 127 A and S rank elite marks, per character. Live trackers answer where a mark is right now; this answers whether you have ever killed it, which nothing else does.",
    s: null }
];
