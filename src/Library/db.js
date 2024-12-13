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
   const header = sheet.getRange(headerStart, 1, 1, sheet.getLastColumn()).getDisplayValues()[0]
   header.forEach((fld, i) => {
      schema[fld.replace(/\s/g, '').toLowerCase()] = i + 1
   })
   return schema
}