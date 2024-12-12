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
