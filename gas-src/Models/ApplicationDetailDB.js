/**
 * Returns a table definition for the specified table
 *
 * @param {string} table name tag for tabel definition
 * @returns {object} table definition
 */
function applicationDetailDB(table) {
   const tables = {
      applicationdetail: {
         name: "Application Detail",
         type: "standard",
         headers: 2,
      },
      settings: {
         name: "Settings",
         type: "standard",
         headers: 3,
      },
      waiting: {
         name: "To Be Juried",
         type: "pivot",
         headers: 1,
      },
   }
   return tables[table]
}

/**
 * Get the list of applicants waiting to be juried
 * Datasource is To Be Juried table
 *
 * @param {string} filter all, applicant email
 * @returns {Array} of waiting to be juried
 */
function getWaitingToBeJuried(filter = "all") {
   const applicationDetailTableDef = applicationDetailDB("waiting")
   const headers = applicationDetailTableDef.headers
   const conn = connect(APPLICANTS_ID)
   const waitingTable = conn.getSheetByName(applicationDetailTableDef.name)
   const waitingSchema = buildTableSchema(waitingTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const numRow = waitingTable.getLastRow() - startRow + 1
   const numCol = waitingTable.getLastColumn()
   const waitingData = waitingTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const waiting = []
   waitingData.forEach((row) => {
      const application = {}
      for (let key in waitingSchema) {
         let col = waitingSchema[key] - 1 //
         application[key] = row[col]
      }
      if (filter === "all") {
         waiting.push(application)
      } else if (filter.toLowerCase() === application.email.toLowerCase()) {
         waiting.push(application)
      }
   })
   return waiting
}

/**
 * Get the application detail for each applicant
 * Datasource is Application Detail table
 *
 * @param {string} filter all, applicant email
 * @returns {array} application detail for each applicant
 */
function getApplicationDetail(filter = "all") {
   const applicationDetailTableDef = applicationDetailDB("applicationdetail")
   const headers = applicationDetailTableDef.headers
   const conn = connect(APPLICANTS_ID)
   const applicationDetailTable = conn.getSheetByName(
      applicationDetailTableDef.name
   )
   const applicationDetailSchema = buildTableSchema(
      applicationDetailTable,
      headers
   )
   const startRow = headers + 1
   const startCol = 1
   const numRow = applicationDetailTable.getLastRow() - startRow + 1
   const numCol = applicationDetailTable.getLastColumn()
   const applicationDetailData = applicationDetailTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const applicants = []
   applicationDetailData.forEach((row) => {
      const applicant = {}
      for (let key in applicationDetailSchema) {
         let col = applicationDetailSchema[key] - 1 // convert to zero-based index
         applicant[key] = row[col]
      }
      if (filter === "all") {
         applicants.push(applicant)
      } else if (applicant["email"].toLowerCase() === filter.toLowerCase()) {
         applicants.push(applicant)
      }
   })
   return applicants
}

/**
 * Get the application settings for the New Member Application
 * Datasource is Settings table
 *
 * @param {string} filter all, any column name
 * @returns {object} application settings
 */
function getApplicationSettings(filter = "all") {
   const applicationSettingsTableDef = applicationDetailDB("settings")
   const headers = applicationSettingsTableDef.headers
   const conn = connect(APPLICANTS_ID)
   const applicationSettingsTable = conn.getSheetByName(
      applicationSettingsTableDef.name
   )
   const applicationSettingsSchema = buildTableSchema(
      applicationSettingsTable,
      headers
   )
   const startRow = headers + 1
   const startCol = 2
   const numRow = applicationSettingsTable.getLastRow() - startRow + 1
   const numCol = applicationSettingsTable.getLastColumn() - startCol + 1
   const applicationSettingsData = applicationSettingsTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const settings = {}
   applicationSettingsData.forEach((row) => {
      for (let key in applicationSettingsSchema) {
         let col = applicationSettingsSchema[key] - startCol // convert to zero-based index
         if (filter === "all") {
            settings[key] = row[col]
         } else if (key === filter) {
            settings[key] = row[col]
            break
         }
      }
   })
   return settings
}

/**
 * Add a new applicant to the Application Detail table
 * Datasource is Application Detail table
 *
 * @param {array} applicants
 */
function addApplicants(applicants) {
   const applicationDetailTableDef = applicationDetailDB("applicationdetail")
   const headers = applicationDetailTableDef.headers
   const conn = connect(APPLICANTS_ID)
   const applicationDetailTable = conn.getSheetByName(
      applicationDetailTableDef.name
   )
   const applicationDetailSchema = buildTableSchema(
      applicationDetailTable,
      headers
   )

   applicationDetailTable.appendRow(applicants)
}
