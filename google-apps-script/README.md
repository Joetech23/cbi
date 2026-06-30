# CBI Volunteer Form → Google Sheet + Google Drive

The volunteer application form at `/careers/volunteer` submits to a **Google Apps Script Web App**,
which writes each application to a Google Sheet and uploads the CV to a Google Drive folder —
exactly the way a Google Form does, but fully styled and embedded in the site.

## One-time setup

1. **Create the Sheet** — make a new Google Sheet. Copy its ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`SHEET_ID`**`/edit`

2. **Create the Drive folder** — make a folder to hold CVs. Copy its ID:
   `https://drive.google.com/drive/folders/`**`FOLDER_ID`**

3. **Create the script** — go to <https://script.google.com> → **New project**.
   Delete the placeholder code and paste the contents of [`volunteer-form.gs`](./volunteer-form.gs).
   Replace `PASTE_YOUR_SHEET_ID_HERE` and `PASTE_YOUR_DRIVE_FOLDER_ID_HERE`.

4. **Initialise headers** — in the script editor, select the `setup` function and click **Run**.
   Approve the permission prompt (Drive + Sheets). This creates the header row.

5. **Deploy** — click **Deploy ▸ New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**

   Copy the **Web app URL** (ends in `/exec`).

6. **Point the site at it** — add the URL to the frontend environment:

   ```bash
   # cbi/frontend/.env.local
   NEXT_PUBLIC_VOLUNTEER_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec
   ```

   On Vercel: Project → Settings → Environment Variables → add the same key/value, then redeploy.

## Notes

- The form sends the CV as base64 inside a JSON body using `Content-Type: text/plain`
  to avoid a CORS preflight (Apps Script does not return CORS headers for preflight).
- Max upload is **10 MB** (enforced client-side).
- To change the columns, edit `HEADERS` and the `appendRow([...])` order in the script,
  then run `setup()` again (note: `setup()` clears existing rows).
- Each CV is named `Surname_Firstname_CV_<timestamp>.<ext>` in the Drive folder; the row in the
  Sheet stores a clickable link to that file.
