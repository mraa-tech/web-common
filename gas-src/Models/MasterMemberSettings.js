/**
 * Master Member Settings Metadata defines the data about the master member settings table that is needed to read the table.
 * The metadata is used to build the schema for the table.
 *
 * @returns {object} metadata for the master member settings table
 */
function _getMMSettingsMetadata() {
   const masterMemberSettingsMetadata = {
      name: "Settings",
      type: "standard",
      headers: 2,
   }
   return masterMemberSettingsMetadata
}

/**
 * Read the master member settings table and return an array of settings.
 * @returns {object} an array master member settings objects
 */
function getMasterMemberSettings() {
   const conn = connect(MASTERMEMBER_ID)
   const masterMemberSettingsMetadata = _getMMSettingsMetadata()
   const masterMemberSettingsTable = conn.getSheetByName(
      masterMemberSettingsMetadata.name
   )
   const masterMemberSettingsSchema = buildTableSchema(
      masterMemberSettingsTable,
      masterMemberSettingsMetadata.headers
   )
   const headers = masterMemberSettingsMetadata.headers
   const startRow = headers + 1
   const startCol = 1
   const numRow = masterMemberSettingsTable.getLastRow() - startRow + 1
   const numCol = masterMemberSettingsTable.getLastColumn() - startCol + 1

   const settings = masterMemberSettingsTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )

   const s = []
   settings.forEach((row) => {
      const s1 = {}
      for (let key in masterMemberSettingsSchema) {
         let col = masterMemberSettingsSchema[key] - 1 // convert to zero-based index
         s1[key] = row[col]
      }
      s.push(s1)
   })

   return s
}

/**
 * Get the number of days that a token is valid for.
 * If the token expires in is not set, then the default is 30 days.
 *
 * @returns {number} token expires in days
 */
function getTokenExpiresIn() {
   const defaultTokenExpiresIn = 30
   const settings = getMasterMemberSettings()[0]
   if (settings.tokenexpiresin === "") {
      return defaultTokenExpiresIn
   } else {
      return settings.tokenexpiresin
   }
}
