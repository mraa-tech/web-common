// Id for Membership Spreadsheet File
const MASTERMEMBER_ID = "1puqturm6WCBtfL3uaT_YICKHI9StLcPA4SosBuMs4ZY"
// Id for Call For Entries Spreadsheet File
const CALLFORENTRIES_ID = "1eJuLyL_MhXy_s8kKm8sYkUsJkzLMP7M-kfVzp_LxAVQ"
// Id for Applicants Spreadsheet File
// const APPLICANTS_ID = "1t7KG2DUdTyT8e7tVYLYvsY0Zy1bBShTcJvIg9QoqJGs" // version 1
const APPLICANTS_ID = "1BaykYbCbeXTBBytcdpwxgrOj9yLlEcCTGta040BOMFM" // version 2
// Id for Jury Spreadsheet File
// const JURY_ID = "1W4xT_-t8rEBOMIYLKMKQQVFkatS6LXZzZqN6fNJlUZQ" // version 1
const JURY_ID = "1tSX35-vDnxrBYBDbCWuUF8g_S-B-xJ97V1t8ufFyA0k" // version 2

/**
 * Get the application spreadsheet file ID
 * Expose ID so it's available in MRAACommonLibraries
 * 
 * @returns {string} Application ID
 */
function getApplicationId() {
   return APPLICANTS_ID
}

/**
 * Get the jury spreadsheet file ID
 * Expose ID so it's available in MRAACommonLibraries
 * 
 * @returns {string} Jury ID
 */
function getJuryId() {
   return JURY_ID
}

/**
 * Get the master member spreadsheet file ID
 * Expose ID so it's available in MRAACommonLibraries
 *
 * @returns {string} Master Member ID
 */
function getMasterMemberId() {
   return MASTERMEMBER_ID
}

/**
 * Get the call for entries spreadsheet file ID
 * Expose ID so it's available in MRAACommonLibraries
 *
 * @returns {string} Call for Entries ID
 */
function getCallForEntriesId() {
   return CALLFORENTRIES_ID
}

/**
 * Opens a google sheet. Each tab in the spreadsheet will be treated like a table
 *
 * @param  {string} id Spreadsheet id
 * @returns {object} SpreadsheetApp object
 */
function connect(id) {
   let conn
   if (id) {
      conn = SpreadsheetApp.openById(id)
   } else {
      conn = SpreadsheetApp.getActiveSpreadsheet()
   }
   return conn
}

/**
 * Converts a spreadsheet column letter into an array index.
 * Note: does not currently support double letter columns. Supports only A - Z columns
 *
 * @param {object} schema
 * @param {string} fldName
 * @returns {Integer} index of field
 */
function getFldPos(schema, fldName) {
   const fldPos = schema[fldName] ? schema[fldName].colToIndex() : null
   return parseInt(fldPos)
}

/**
 * Builds a table schema from a spreadsheet with a header row.
 * Works best if the sheet is not a dashboard type.
 * Note: dashboard is defined as a sheet wit multiple pivot tables.
 *
 * @param {object} sheet
 * @param {Integer} headerStart (default 1)
 * @returns {object} schema
 * @example buildTableSchema(memberdirectory, 2)
 */
function buildTableSchema(sheet, headerStart = 1) {
   const schema = {}
   const header = sheet
      .getRange(headerStart, 1, 1, sheet.getLastColumn())
      .getDisplayValues()[0]
   header.forEach((fld, i) => {
      // If column name is blank do not include it in the schema.
      if (fld) {
         schema[fld.replace(/\s/g, "").toLowerCase()] = i + 1
      }
   })
   return schema
}

/**
 * Builds a table schema from a spreadsheet with a header row.
 * Works best if the sheet is not a dashboard type.
 * Note: dashboard is defined as a sheet wit multiple pivot tables.
 *
 * @param {object} sheet
 * @param {Integer} headerStart (default 1)
 * @returns {object} schema
 * @example buildTableSchema(memberdirectory, 2)
 */
function buildTableSchemaWithLabels(sheet, headerStart = 1) {
   const schema = {}
   const header = sheet
      .getRange(headerStart, 1, 1, sheet.getLastColumn())
      .getDisplayValues()[0]
   header.forEach((fld, i) => {
      // If column name is blank do not include it in the schema.
      if (fld) {
         schema[fld] = i + 1
      }
   })
   return schema
}

/**
 * Get the number of rows in a table
 * @param {string} table name
 * @returns {number} number of rows in table
 */
function getTableRowCount(id, table) {
   const conn = connect(id)
   const sheet = conn.getSheetByName(table)
   return sheet.getLastRow()
}

/**
 * Get the number of columns in a table
 *
 * @param {string} id
 * @param {string} table name
 * @return {number} number of columns in table
 */
function getTableColumnCount(id, table) {
   const conn = connect(id)
   const sheet = conn.getSheetByName(table)
   return sheet.getLastColumn()
}