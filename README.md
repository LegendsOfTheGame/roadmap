# Forget Nothing Board

The public roadmap for [Legends of the Game](https://legendmemoria.org): what is
being built next for **Time Memoria** and the **Adventurer's Ledger**, what is
parked, and what was decided against.

The board has six columns. A card moves left to right as it becomes more
certain, not as it becomes more finished:

| Column | Meaning |
|---|---|
| Unsettled | A question comes before a design. Probe the game, or make the call. |
| Ready to build | The shape is known. Nothing is left to find out first. |
| In flight | Work in progress. |
| Parked | Deferred on purpose. Each card names the condition that unparks it. |
| Shipped | Released and verified in game. |
| Removed | Shipped, then withdrawn. The card records why it was pulled. |
| Closed | Decided against, with the reason. |

**Closed is not a bin.** Each card in that column records a decision and the
reason for it. The column prevents the same decision from being made again.

## Movement rules

What shipped, shipped. A released card does not go back into the planning
columns.

- A card in **Shipped** moves only to **Removed**.
- A card in **Removed** moves only to **Shipped**, if the withdrawal is
  reversed.
- **Removed** is unreachable from every other column. Nothing can be withdrawn
  that was never released.
- All other columns move freely.

The rules apply to the arrow buttons and to drag and drop. A refused arrow is
disabled and states the reason. A refused column does not accept a drop.

**The rules do not apply to `cards.js`.** A card's `c` field is set by hand. Use
that to correct a mistake. Use the columns to record what happened.

## Gate markers

Time Memoria goes to the official Dalamud plugin repository. Two conditions
must be met, not one: a minimum version, and a date. A card carries a marker
when it bears on that:

- `1 OCT` — the card is on the submission path.
- `AFTER` — the card is placed after submission on purpose. Work on it early
  costs the date.
- No marker — the gate does not apply.

## Structure

```
index.html   the page
style.css    all colour and layout
cards.js     the board's contents — this file is the source of truth
board.js     rendering, drag and drop, export
```

The page has no build step and no dependencies. Open `index.html` in a browser
to see the current board.

## How to change the board

1. Edit `cards.js`.
2. Commit the change.
3. Push to `main`.

GitHub Pages serves `main` at the repository's own address.

### Card fields

| Field | Content |
|---|---|
| `id` | A stable identifier. Do not change it after a card is published. |
| `p` | The project key, from `PROJECTS`. |
| `c` | The column id, from `COLUMNS`. |
| `gate` | `"1oct"`, `"after"`, or `null`. |
| `t` | The card title. |
| `d` | One paragraph. State the reason, not only the task. |
| `s` | A public source file, or `null`. |

### To move cards in the browser

A visitor can drag cards, or move them with the arrow buttons on each card.
The arrangement is written to that browser's local storage only. It changes
nothing for other visitors.

To publish an arrangement:

1. Move the cards.
2. Select **Export cards.js**. The browser downloads a replacement file.
3. Replace `cards.js` with the downloaded file.
4. Commit and push.

**CAUTION:** The exported file is grouped by column. It does not keep the
section comments of a hand-edited file. To keep the comments, edit `cards.js`
by hand instead.

## Themes

The page follows the visitor's system theme. The **Theme** button overrides it
in three steps: dark, light, then system again. The choice is stored in the
browser.

## Character names

A card that cites a real reading names the character after an ally from the
game's own story. The reading is real. The name stands in for the character that
produced it.

Two rules hold the stand-ins together:

1. Use the same stand-in for the same character every time, or the cards stop
   describing one history.
2. Match the character's sex.

## What this repository is not

This board holds the public view of the work. It records decisions and their
reasons. It does not hold private planning, revenue figures, or anything told
in confidence.

## Licence

GPL-3.0. See [LICENSE](LICENSE).
