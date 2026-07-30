/**
 * Habit Tracker — Google Drive backend
 *
 * Stores all habit data in ONE JSON file in your Google Drive.
 * Paste this into script.google.com, change the PIN below, then deploy
 * as a Web App (Execute as: Me · Who has access: Anyone with the link).
 *
 * The deployment URL + PIN are what you enter in the app's ⚙️ screen.
 */

// ⬇️ CHANGE THIS to any private phrase you and your partner will both use.
const PIN = 'change-me-1234';

// Name of the data file created in your Drive. Leave as is unless you prefer another name.
const FILE_NAME = 'habit-tracker-data.json';


/* ------------------------------------------------------------------ */

function doGet(e)  { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  try {
    const params = (e && e.parameter) || {};

    let body = {};
    if (e && e.postData && e.postData.contents) {
      try { body = JSON.parse(e.postData.contents) || {}; } catch (err) { body = {}; }
    }

    const pin = String(body.pin || params.pin || '');
    if (pin !== String(PIN)) {
      return json({ error: 'wrong PIN' });
    }

    const action = String(body.action || params.action || 'read');

    if (action === 'write') {
      // serialise writes so two phones saving at once can't clobber the file
      const lock = LockService.getScriptLock();
      lock.waitLock(20000);
      try {
        const file = getDataFile();
        file.setContent(JSON.stringify(body.data || {}));
        return json({ ok: true, savedAt: new Date().toISOString() });
      } finally {
        lock.releaseLock();
      }
    }

    // default: read
    const file = getDataFile();
    let data = {};
    try { data = JSON.parse(file.getBlob().getDataAsString() || '{}') || {}; }
    catch (err) { data = {}; }
    return json({ ok: true, data: data });

  } catch (err) {
    return json({ error: String(err) });
  }
}

function getDataFile() {
  const it = DriveApp.getFilesByName(FILE_NAME);
  while (it.hasNext()) {
    const f = it.next();
    if (!f.isTrashed()) return f;
  }
  return DriveApp.createFile(FILE_NAME, '{}', MimeType.PLAIN_TEXT);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: run this once from the editor to confirm the file is created
 * and Drive permission is granted before you deploy.
 */
function testSetup() {
  const f = getDataFile();
  Logger.log('File ready: %s (%s bytes)', f.getName(), f.getSize());
}
