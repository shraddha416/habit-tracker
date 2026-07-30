# Habit Tracker — Setup

Tracks 5 things per person, per day: 🍺 alcohol · 🚬 smoke · 🍰 sugar · 🛁 bath · 💪 gym.

Data lives in **one JSON file in Shraddha's Google Drive**. The app talks to it through
a small Apps Script you own. Nothing is stored on anyone else's server.

The page itself is already live at
**https://shraddha416.github.io/habit-tracker/**

---

## 1. Create the Apps Script (once, ~5 minutes)

1. Go to **script.google.com** → **New project**
2. Delete the sample code in the editor
3. Paste the entire contents of **AppsScript.gs**
4. On line 12, change the PIN:
   ```js
   const PIN = 'change-me-1234';   →   const PIN = 'something-only-you-two-know';
   ```
5. Rename the project (top left) to `Habit Tracker` and press **Save** 💾
6. Optional check: pick `testSetup` in the function dropdown → **Run** →
   approve the Drive permission prompt. It creates `habit-tracker-data.json` in your Drive.

## 2. Deploy it

1. **Deploy** (top right) → **New deployment**
2. Click the ⚙️ next to "Select type" → **Web app**
3. Set:
   - Description: `habit tracker`
   - **Execute as: Me** (your account)
   - **Who has access: Anyone with the link**
4. **Deploy** → approve the permissions if asked
5. Copy the **Web app URL**. It ends in `/exec` — keep it, you'll need it twice.

> "Anyone with the link" sounds alarming but only grants access to *this script*,
> not your Drive. The script refuses every request without the correct PIN.

## 3. Connect each phone

1. Open **https://shraddha416.github.io/habit-tracker/** in Safari/Chrome
2. Tap **⚙️**
3. Paste the **Web app URL** and type the **PIN**
4. **Save & connect** → the pill should read **synced**
5. Share → **Add to Home Screen** so it opens like an app

Repeat on Shivam's phone with the same URL and PIN. That's all he needs.

---

## How it behaves

| | |
|---|---|
| Where data lives | `habit-tracker-data.json` in Shraddha's Google Drive |
| On open | pulls the file, merges, renders |
| On a tap | saves on the phone, pushes ~1 second later |
| No internet | keeps working; syncs when back online |
| Both phones edit | merged — nothing lost |
| Same person + same habit + same day | the later edit wins |
| Backup | ⚙️ → Download backup copy (also: Drive keeps file versions) |

## Sync status pill

| Shows | Meaning |
|---|---|
| `synced 6:42 PM` | all good |
| `saving…` / `syncing…` | in progress |
| `offline — saved locally` | will retry automatically |
| `Wrong PIN` | PIN doesn't match the script |
| `Bad response — check the /exec URL` | wrong URL, or deployment not set to "Anyone with the link" |
| `Drive error (401/403)` | re-deploy the script and use the new URL |

## If you edit the script later

Changing the code does **not** update the live URL automatically.
Go to **Deploy → Manage deployments → ✏️ edit → Version: New version → Deploy**.
The URL stays the same, so the phones keep working.

## Notes

- The URL + PIN together are the key to your data. Don't post them anywhere.
- To lock someone out, change the PIN in the script and redeploy, then re-enter it on your phones.
- ⚙️ → *Disconnect this device* clears the URL and PIN from a phone.
- Recover an older version any time: right-click the file in Drive → **File information → Manage versions**.
