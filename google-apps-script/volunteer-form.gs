/**
 * CBI Forms — Google Apps Script backend
 * ---------------------------------------
 * Handles BOTH site forms from a single Web App URL:
 *
 *   /careers/volunteer                → sheet tab "Applications"
 *   /careers/project-officer/apply    → sheet tab "Job Applications"
 *
 * Routing is by the `formType` field the site sends. Every submission
 * uploads its attached file to the Drive folder and writes a row with a
 * clickable link to that file.
 *
 * SETUP (one-time):
 *   1. Create a Google Sheet → copy its ID from the URL
 *        https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
 *   2. Create a Drive folder for CVs → copy its ID from the URL
 *        https://drive.google.com/drive/folders/THIS_IS_THE_ID
 *   3. Paste both IDs below.
 *   4. script.google.com → New project → paste this file.
 *   5. Run `setup()` once (creates the tabs + header rows; it does NOT
 *      erase existing rows).
 *   6. Deploy ▸ New deployment ▸ "Web app"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the Web app URL.
 *   7. Set it in the site env:
 *        NEXT_PUBLIC_VOLUNTEER_ENDPOINT=<the Web app URL>
 *      (optionally NEXT_PUBLIC_CAREERS_ENDPOINT to split job applications
 *       onto a different deployment later)
 *
 * AFTER EDITING THIS FILE: Deploy ▸ Manage deployments ▸ ✏️ ▸
 * Version: "New version" ▸ Deploy. Editing alone does not update the
 * live URL.
 */

var SHEET_ID  = 'PASTE_YOUR_SHEET_ID_HERE';
var FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';

var VOLUNTEER_SHEET = 'Applications';
var JOBS_SHEET      = 'Job Applications';

var VOLUNTEER_HEADERS = [
  'Timestamp', 'First Name', 'Middle Name', 'Surname', 'Email', 'Gender', 'PWD',
  'State', 'Phone', 'Best Time to Contact', 'Position', 'Why Volunteer',
  'Qualification', 'Certifications', 'CV Link',
];

var JOB_HEADERS = [
  'Timestamp', 'Role', 'Project', 'First Name', 'Middle Name', 'Surname',
  'Email', 'Phone', 'Gender', 'Resident in Yobe', 'State of Residence',
  'Willing to be based in Bade/Jakusko', 'English Fluency', 'Hausa Fluency',
  'Qualification', 'Field of Study', 'Years Experience',
  'Agricultural Knowledge', 'Supervised Field Staff', 'Current Role',
  'LinkedIn/Portfolio', 'Earliest Start Date', 'CV + Cover Letter (PDF)',
];

/** Creates both tabs and their header rows. Safe to re-run — never clears data. */
function setup() {
  ensureSheet(VOLUNTEER_SHEET, VOLUNTEER_HEADERS);
  ensureSheet(JOBS_SHEET, JOB_HEADERS);
}

function ensureSheet(name, headers) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold').setBackground('#0102F1').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var isJob = data.formType === 'job-application';

    var fileLink = saveFile(data, isJob);

    if (isJob) {
      ensureSheet(JOBS_SHEET, JOB_HEADERS).appendRow([
        new Date(),
        data.role || '', data.project || '',
        data.name || '', data.middleName || '', data.surname || '',
        data.email || '', data.phone || '', data.gender || '',
        data.residentYobe || '', data.stateOfResidence || '',
        data.relocate || '', data.englishFluency || '', data.hausaFluency || '',
        data.qualification || '', data.qualificationField || '',
        data.yearsExperience || '', data.agricKnowledge || '',
        data.supervisedStaff || '', data.currentRole || '',
        data.linkedin || '', data.startDate || '',
        fileLink,
      ]);
    } else {
      ensureSheet(VOLUNTEER_SHEET, VOLUNTEER_HEADERS).appendRow([
        new Date(),
        data.name || '', data.middleName || '', data.surname || '', data.email || '',
        data.gender || '', data.pwd || '', data.state || '', data.phone || '',
        data.bestTime || '', data.position || '', data.why || '',
        data.qualification || '', data.certifications || '',
        fileLink,
      ]);
    }

    return json({ result: 'success', formType: data.formType || 'volunteer', cvLink: fileLink });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  }
}

/** Decodes the base64 upload and drops it in the Drive folder. */
function saveFile(data, isJob) {
  if (!data.fileData) return '';
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var ext = (data.fileName && data.fileName.indexOf('.') > -1)
    ? data.fileName.split('.').pop()
    : (String(data.fileMime || '').indexOf('pdf') > -1 ? 'pdf' : 'docx');
  var safe = ((data.surname || '') + '_' + (data.name || '')).replace(/[^a-z0-9_]/gi, '');
  var tag = isJob ? 'JOB' : 'CV';
  var stamp = Utilities.formatDate(new Date(), 'GMT', 'yyyyMMdd-HHmmss');
  var blob = Utilities.newBlob(
    Utilities.base64Decode(data.fileData),
    data.fileMime || 'application/octet-stream',
    safe + '_' + tag + '_' + stamp + '.' + ext
  );
  return folder.createFile(blob).getUrl();
}

function doGet() {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var vol = ss.getSheetByName(VOLUNTEER_SHEET);
    var job = ss.getSheetByName(JOBS_SHEET);
    return json({
      status: 'CBI forms endpoint is live.',
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl(),
      tabs: ss.getSheets().map(function (s) { return s.getName(); }),
      volunteerRows: vol ? Math.max(0, vol.getLastRow() - 1) : 0,
      jobApplicationRows: job ? Math.max(0, job.getLastRow() - 1) : 0,
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
