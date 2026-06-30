/**
 * CBI Volunteer Application — Google Apps Script backend
 * ------------------------------------------------------
 * Receives the volunteer form, saves the CV to Google Drive,
 * and appends a row to a Google Sheet — exactly like a Google Form.
 *
 * SETUP (one-time):
 *   1. Create a Google Sheet → copy its ID from the URL
 *        https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
 *   2. Create a Drive folder for CVs → copy its ID from the URL
 *        https://drive.google.com/drive/folders/THIS_IS_THE_ID
 *   3. Paste both IDs below.
 *   4. Go to script.google.com → New project → paste this file.
 *   5. Deploy ▸ New deployment ▸ type "Web app"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the Web app URL.
 *   6. In the website, set the env var:
 *        NEXT_PUBLIC_VOLUNTEER_ENDPOINT = <the Web app URL>
 *   7. Run `setup()` once from the editor to create the header row.
 */

var SHEET_ID  = 'PASTE_YOUR_SHEET_ID_HERE';
var FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';
var SHEET_NAME = 'Applications';

var HEADERS = [
  'Timestamp', 'First Name', 'Middle Name', 'Surname', 'Email', 'Gender', 'PWD',
  'State', 'Phone', 'Best Time to Contact', 'Position', 'Why Volunteer',
  'Qualification', 'Certifications', 'CV Link',
];

function setup() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sheet.clear();
  sheet.appendRow(HEADERS);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0102F1').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // ── Save CV to Drive ──
    var cvLink = '';
    if (data.fileData) {
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var ext = (data.fileName && data.fileName.indexOf('.') > -1)
        ? data.fileName.split('.').pop()
        : (data.fileMime && data.fileMime.indexOf('pdf') > -1 ? 'pdf' : 'docx');
      var safe = ((data.surname || '') + '_' + (data.name || '')).replace(/[^a-z0-9_]/gi, '');
      var stamp = Utilities.formatDate(new Date(), 'GMT', 'yyyyMMdd-HHmmss');
      var blob = Utilities.newBlob(
        Utilities.base64Decode(data.fileData),
        data.fileMime || 'application/octet-stream',
        safe + '_CV_' + stamp + '.' + ext
      );
      var file = folder.createFile(blob);
      cvLink = file.getUrl();
    }

    // ── Append row to Sheet ──
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { sheet = ss.insertSheet(SHEET_NAME); sheet.appendRow(HEADERS); }

    sheet.appendRow([
      new Date(),
      data.name || '', data.middleName || '', data.surname || '', data.email || '',
      data.gender || '', data.pwd || '', data.state || '', data.phone || '',
      data.bestTime || '', data.position || '', data.why || '',
      data.qualification || '', data.certifications || '', cvLink,
    ]);

    return json({ result: 'success', cvLink: cvLink });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  }
}

function doGet() {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    return json({
      status: 'CBI volunteer endpoint is live.',
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl(),
      tabs: ss.getSheets().map(function (s) { return s.getName(); }),
      applicationsTabExists: !!sheet,
      rowCount: sheet ? sheet.getLastRow() : 0,
    });
  } catch (err) {
    return json({ status: 'live but Sheet check failed', error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
