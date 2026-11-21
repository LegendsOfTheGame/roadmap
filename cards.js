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
  version: "3.15.0.15",
  versionGate: "3.5.0.15",
  destination: "goatcorp/DalamudPluginsD17"
};

const PROJECTS = {
  tm:     { name: "Tales of Milestones", short: "MILESTONES", hue: "var(--p-tm)",
            blurb: "The Dalamud plugin, formerly Time Memoria. Quest pacing, read from the game." },
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
  { id: "removed", name: "Removed",
    note: "Shipped, then withdrawn. The card stays and records why it was pulled.",
    empty: "Nothing has been withdrawn." },
  { id: "closed", name: "Closed",
    note: "Decided against, with the reason. Not reopened without new facts.",
    empty: "Nothing closed." }
];

const CARDS = [

  /* ---------------- the submission path ---------------- */

  { id: "d17-submit", p: "tm", c: "parked", gate: "1oct",
    t: "Submit to the official plugin repository",
    d: "A manifest PR into the testing track of goatcorp/DalamudPluginsD17. Both original gates are met: the version passed 3.5.0.15 long ago, and 1 October has gone by. What holds it now is Dalamud API 16. The submission goes in as a 4.x build against API 16, and as of 18 November neither the Dalamud SDK nor KamiToolKit has an API 16 release. The text fixes that did not need API 16 are done. Artwork is compliant — a 512×512 icon and current screenshots.",
    s: "Docs/releasing.md" },

  /* ---------------- Tales of Milestones (formerly Time Memoria) ---------------- */

  { id: "mentor", p: "tm", c: "ready", gate: null,
    t: "Mentor tracking, two tracks per character",
    d: "Battle and Trade side by side, per character. Alphinaud, Alisaie and Haurchefant each hold Trade Mentor; the Warrior of Light is working toward both crowns at once. A single mentor flag would miss the point entirely. Nothing left to find out — commendations and duty counts already export, and the five role quests read as plain quest completion, which carries none of the achievement window's caveats.",
    s: null },

  { id: "gear-gaps", p: "tm", c: "unsettled", gate: null,
    t: "The two shop gates, and item costs",
    d: "Live attribute totals are solved. What is left before gear comparison can be designed: a special shop's entries carry a quest gate and an achievement gate, and “offered by a shop” is not “you can buy this”. Recommending gear from a vendor who will not talk to you is the failure mode to avoid.",
    s: "Docs/gear-and-food.md" },

  { id: "crystarium", p: "tm", c: "unsettled", gate: "after",
    t: "Crystarium Deliveries",
    d: "A real hole in a system that is otherwise tracked end to end: Shadowbringers gave crafters and gatherers no class quest chain at all, and replaced it with a repeatable turn-in. So this is a new tracked category per job with its own rank and delivery count — not missing quest rows. The exact shape is still unprobed.",
    s: null },

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

  { id: "api16", p: "tm", c: "parked", gate: "1oct",
    t: "Rebuild against API 16",
    d: "Now the one thing the submission waits on. The 4.x build that goes to the official repository has to target API 16, and as of 18 November neither the Dalamud SDK nor KamiToolKit has an API 16 release. Unparks when they do. The API digit sorts last in the version, so the rebuild can never disqualify a build.",
    s: "Docs/4.0-checklist.md" },

  { id: "gating-char", p: "tm", c: "ready", gate: null,
    t: "Build the gating test character",
    d: "A main character has done everything, which makes gating easy to write and impossible to test. A fresh character at level 10 with Fisher unlocked leaves one boat unlocked and one locked — permanently. A fixture, not a window that closes as you play. Every progression gate in the plugin needs it.",
    s: "Docs/4.0-checklist.md" },

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
    d: "Half done. legendmemoria.org already serves the Ledger, the Apex tracker and the plugin pages from one origin, which was the point: one browser store. The repositories are still separate, and a workflow copies them into the site. Folding them into one repository, with one licence across the lot, is the part still parked.",
    s: null },

  { id: "split-appjs", p: "studio", c: "parked", gate: "after",
    t: "Split the app into shell and per-game",
    d: "The Ledger's main script is now 396 KB, nearly all of it specific to one game. This is not extra work on top of a shared layout — it is the shared layout. Shell: themes, save indicator, backup bar, and one countdown engine.",
    s: null },

  { id: "reset-engine", p: "studio", c: "parked", gate: "after",
    t: "One reset engine, three schedules",
    d: "Each game resets on its own cadence. One engine reading three configurations — never three copies of the arithmetic, which is the kind of drift that stays invisible until someone's Tuesday is wrong.",
    s: null },

  { id: "challenge-rebirth", p: "studio", c: "parked", gate: "after",
    t: "Challenge trackers on the shared shell",
    d: "The themes already carry shape as well as colour — one sharpens every corner, another rounds them — so a game inheriting the shell inherits real personality, and the accent colour makes per-game identity a single line.",
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
    d: "Fetch times are recorded in naive local time. An autumn clock change repeats an hour, so a stale record could win. Small, and it comes round every November.",
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

  { id: "sh-315", p: "tm", c: "shipped", gate: null,
    t: "3.15.0.15 — an export half the size",
    d: "Every id list in the export writes a run of consecutive ids as a pair, so a full export is about half its old size and quicker to paste. The data is the same. The Ledger reads it already, and exports from older versions still import.",
    s: null },

  { id: "sh-ledger-share", p: "pl", c: "shipped", gate: null,
    t: "Share codes",
    d: "Shipped with 3.15.0.15. Settings makes a short code that opens a read-only view of one character. Each share also stores a backup that your browser encrypts before it goes up, which only your owner key or a one-time recovery code can open. A timed code expires 48 hours after the last share; a permanent one updates itself after you save.",
    s: null },

  { id: "sh-314", p: "tm", c: "shipped", gate: null,
    t: "3.14.0.15 — hunt counts, native parity, /tmwiki groups",
    d: "Hunt group counts in the export, read on demand. Allied society quests in their own group under each expansion in /tmwiki, and held levequests listed by town. Journal re-baseline and Lodestone links in the native window. The Main Scenario rate stops at the final Main Scenario quest, and the Ledger link points at its new home.",
    s: null },

  { id: "kofi-title-heart", p: "tm", c: "shipped", gate: null,
    t: "Ko-fi heart in the title bar",
    d: "Shipped in 3.14.0.15. A heart in the classic main window's title bar opens the Ko-fi page. A link only, beside the one that stays in the Credits tab.",
    s: null },

  { id: "food-location-marker", p: "tm", c: "shipped", gate: null,
    t: "Where each food is",
    d: "Shipped in 3.14.0.15. Each row on the Bonuses tab shows where the food is: B1 to B4 for the inventory block, the same number /isearch gives, and S for the saddlebag. Probed against the game first — 26 of 26 visible food stacks matched.",
    s: null },

  { id: "sh-ledger-layout", p: "pl", c: "shipped", gate: null,
    t: "The Ledger's new layout",
    d: "Shipped with 3.13.0.15. Next Steps is the first screen, with Daily, Weekly and Seasonal in the rail. Each Challenge Log entry has its own row, routines can carry their own boxes, and the Ledger holds up to eight characters. The leftovers — Custom Deliveries boxes, the weekly meter, Armor and GARO cards — followed in 3.14.",
    s: null },

  { id: "sh-313", p: "tm", c: "shipped", gate: null,
    t: "3.13.0.15 — eat from the window",
    d: "An Eat button for each meal on the Bonuses tab and in /tm food, and /tm eat by role. Playtime in the export kept current. The native windows update once a second instead of every frame: about 1.2 ms down to 0.08 ms per frame in a test.",
    s: null },

  { id: "sh-311", p: "tm", c: "shipped", gate: null,
    t: "3.11 — food from accepted quests",
    d: "/tm food lists the quests in your journal that reward food, and an eye on the turn-in window opens it before you choose. Text follows the game's UI theme, so the light themes are readable. The download went from 12.7 MB to 1.3 MB. 3.11.1.15 fixed an unload error that needed a game restart.",
    s: null },

  { id: "sh-rename", p: "tm", c: "shipped", gate: null,
    t: "3.10.1.15 — Time Memoria is now Tales of Milestones",
    d: "A new name and nothing else. Settings, the quest journal and exports stay where they were, and the /tm commands do not change.",
    s: null },

  { id: "sh-310", p: "tm", c: "shipped", gate: null,
    t: "3.10.0.15 — the /tm food window",
    d: "The strongest meal held for each role, and where it is: inventory, saddlebag or a retainer by name. Saddlebag food is found straight after the game starts, not only after the saddlebag is opened. The last five exports per character are kept locally.",
    s: null },

  { id: "sh-38", p: "tm", c: "shipped", gate: null,
    t: "3.8 and 3.9 — the collections export",
    d: "A separate collections export with duty clears, per-expansion quest totals, mount speed, folklore tomes and the Master's Bestiary in 3.8.0.15, and relic stages held in 3.9.0.15.",
    s: null },

  { id: "sh-372", p: "tm", c: "shipped", gate: null,
    t: "3.7.2 to 3.7.7 — /tmwiki and levequests",
    d: "A /tmwiki window that links accepted quests to the wiki, and levequests shown with their job, turn-in count and copyable required items. Plus fixes to the installer buttons and to event names.",
    s: null },

  { id: "domain-move", p: "studio", c: "shipped", gate: null,
    t: "Everything on legendmemoria.org",
    d: "legendmemoria.org serves the Ledger at /lunar, the Apex tracker at /apex and the plugin pages at /plugins, all from one origin. The old Ledger address stays up with a moved notice.",
    s: null },

  { id: "support", p: "studio", c: "shipped", gate: null,
    t: "A way to support the project",
    d: "Shipped. A Ko-fi button in the plugin's settings since 3.7.1.15, a heart in the classic window's title bar since 3.14.0.15, and a plain Ko-fi link on the Ledger and this board. Links only: no counter, no popup, no reminder.",
    s: null },

  { id: "backup-notice", p: "pl", c: "shipped", gate: null,
    t: "“We are moving — download your backup”",
    d: "Shipped. The old github.io address shows a notice that the Ledger has moved, with a Download backup button. Browser storage does not survive a change of origin, so without it every saved character would have been stranded.",
    s: null },

  { id: "duty-grid", p: "pl", c: "shipped", gate: null,
    t: "The duty grid",
    d: "Every dungeon, trial, raid and guildhest per expansion, ticked where done. The rows are generated from the game's own Duty Finder table, so new duties appear on patch day with no hand-kept list, and the grid ticks itself from the plugin's duty export.",
    s: null },

  { id: "relic-checklist", p: "pl", c: "shipped", gate: null,
    t: "Relic checklist",
    d: "Shipped in 3.9.0.15 as its own Relics area, then rebuilt in 3.12 to count weapons and tools rather than quests: one panel per relic line, a By job view, and Armor and GARO cards. Filled from the plugin's relic export, not typed. When a line's first quest is not open yet, the card names the quest to do on the way to it.",
    s: null },

  { id: "hunts-reconcile", p: "pl", c: "shipped", gate: null,
    t: "Reconcile the Hunts tab against the game",
    d: "Shipped in 3.14.0.15. After an import, each A and S rank group shows the game's count beside your ticks — for example “The game counts 5 of 6; you have ticked 4”. It never ticks anything for you.",
    s: null },

  { id: "ledger-url", p: "tm", c: "shipped", gate: null,
    t: "The Ledger address in the plugin",
    d: "Shipped in 3.14.0.15. Open Adventurer's Ledger now goes to legendmemoria.org/lunar, the Ledger's permanent home. The old address stays up and says the Ledger has moved, so older builds still lead somewhere useful.",
    s: null },

  { id: "hunt-flags", p: "tm", c: "shipped", gate: null,
    t: "Hunt group counts in the export",
    d: "Decided yes, as an aggregate, and shipped in 3.14.0.15. The export carries the game's count for each of the 16 A and S rank “Mark of the …” achievements. It is the group count only: the plugin does not record which mark was killed, so the per-mark log stays closed. A Read hunt counts button asks the game for all 16, and only when it is pressed.",
    s: "README.md" },

  { id: "lodestone-link", p: "tm", c: "shipped", gate: null,
    t: "The Lodestone link in the native window",
    d: "Shipped in 3.14.0.15. Maintenance and Active Events rows in the native window have a Read button after the title, and it opens the Lodestone page. A button, so nothing looks clickable that is not.",
    s: "Docs/native-parity.md" },

  { id: "rebaseline-native", p: "tm", c: "shipped", gate: null,
    t: "Native parity for the journal re-baseline",
    d: "Shipped in 3.14.0.15. The native Settings tab can re-baseline the journal, as the classic window has since 3.5.0.15. Select Set Baseline, then select it again within five seconds to confirm.",
    s: "Docs/native-parity.md" },

  { id: "relic-export", p: "tm", c: "shipped", gate: null,
    t: "Relic names and completion",
    d: "Shipped in 3.9.0.15 and extended since. The collections export carries the highest relic stage held for each job, Zodiac to Cosmic Tools, read from the armoury chest, bags, saddlebag, retainers and glamour dresser. 3.12 added Lucis and Resplendent tools; 3.13 added relic armor, GARO gear and the Figmental, Exquisite and Deep Dungeon weapons.",
    s: null },

  { id: "duty-export", p: "tm", c: "shipped", gate: null,
    t: "Export duty completion for the grid",
    d: "Shipped in 3.8.0.15. The export carries every duty the game records as cleared, read straight from the game rather than inferred from the quest that follows it. Quest battles and deep dungeon floors never record a clear there, so the Ledger covers those from quests and achievements. The Hall of the Novice is left out: the game's record of it proved unreliable, and once made an export count 202 duties where the true number was 192.",
    s: null },

  { id: "no-features-sep", p: "tm", c: "shipped", gate: null,
    t: "Feature freeze until the gate",
    d: "Done. The settle week ran from 25 September to 1 October: days of ordinary use on what had already shipped, and nothing new added. The submission then came to wait on API 16 instead, so releases resumed in October.",
    s: null },

  { id: "sh-371", p: "tm", c: "shipped", gate: null,
    t: "3.7.1.15 — Ko-fi, and two panels that scroll",
    d: "An optional Ko-fi button in the classic Credits tab and the native Settings tab. The plugin stays free and nothing changes for anyone who ignores it. The native Overview and Settings tabs now scroll: both had outgrown the window and cut off their last rows.",
    s: null },

  { id: "sh-kofi-sites", p: "pl", c: "shipped", gate: null,
    t: "Ko-fi on the Ledger and this board",
    d: "A plain link, not Ko-fi's widget script. The Ledger promises that your data never leaves your browser, and a third-party script would break that promise.",
    s: null },

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
    d: "A sweep could fire in the gap between logout and login, when the client had already switched characters but the quest data had not. It ran 0.6 seconds before the login event and wrote 615 of Haurchefant's completed quests into the Warrior of Light's journal, stamped with that day's date. The journal now drops an entry the game reports unfinished, so it self-corrects.",
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
