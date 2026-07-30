# Habit Tracker — Setup (Safari friendly)

Tracks 5 things per person, per day: 🍺 alcohol · 🚬 smoke · 🍰 sugar · 🛁 bath · 💪 gym.


You need **two repos**: one public for the app, one private for the data.
The app file has no data in it. All your marks live in the private repo only.

---

## 1. Private data repo (holds your data)

1. github.com → **New repository**
2. Name: `habit-data`
3. Visibility: **Private** ✅
4. Check **Add a README file**
5. Create repository
6. Note the branch name shown (usually `main`)

## 2. Public app repo (holds the calendar page)

1. github.com → **New repository**
2. Name: `habit-tracker`
3. Visibility: **Public**
4. Create repository
5. Click **uploading an existing file** → upload `index.html` → Commit
6. Repo **Settings** → **Pages** (left sidebar)
7. Source: *Deploy from a branch* · Branch: `main` · Folder: `/ (root)` → **Save**
8. Wait ~1 minute. Your URL is:
   `https://YOUR-USERNAME.github.io/habit-tracker/`

Only the calendar code is public. Your data is not in this repo.

## 3. Access token

1. github.com → click your avatar → **Settings**
2. Left sidebar bottom → **Developer settings**
3. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
4. Fill in:
   - Token name: `habit tracker`
   - Expiration: **1 year** (or *No expiration*)
   - Repository access: **Only select repositories** → pick **`habit-data`** only
   - Permissions → Repository permissions → **Contents** → **Read and write**
5. **Generate token** → **copy it now** (shown only once)

This token can only touch `habit-data`. Nothing else in your account.

## 4. Connect each phone

1. Open your Pages URL in Safari
2. Tap **⚙️**
3. Enter:
   - GitHub username: `YOUR-USERNAME`
   - Private data repo name: `habit-data`
   - File path: `data.json`
   - Branch: `main`
   - Access token: paste it
4. **Save & connect** → the pill should say **synced**
5. Share → **Add to Home Screen** so it opens like an app

Repeat on his phone with the same values.

---

## How it behaves

| | |
|---|---|
| Where data lives | `data.json` in your private `habit-data` repo |
| On open | pulls latest, merges, renders |
| On a tap | saves locally, pushes ~1 second later |
| No internet | keeps working; syncs when back online |
| Both phones edit | merged — nothing lost |
| Same person + same day on both | the later edit wins |
| Backup | ⚙️ → Download backup copy, plus full history in GitHub commits |

## Sync status pill

- `synced 6:42 PM` — all good
- `saving…` / `syncing…` — in progress
- `offline — saved locally` — will retry
- `Read failed (401)` — token wrong or expired → make a new one
- `Read failed (404)` — check username / repo name / branch spelling

## Security notes

- Keep `habit-data` **private**. If it's public, your data is public.
- The token is stored in each phone's browser only. Lost phone → delete the token on GitHub (Developer settings) and generate a new one.
- Set an expiry on the token and renew it. ⚙️ → *Remove token from this device* clears it from a phone.
