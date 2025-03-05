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
         headers: {
            rows: 3,
            columns: 1,
         },
      },
      waiting: {
         name: "To Be Juried",
         type: "pivot",
         headers: 1,
      },
      archives: {
         name: "Application Archives",
         type: "standard",
         headers: 3,
      },
   }
   return tables[table]
}

/**
 * Move an application from the application detail table to the application archive table
 * @param {string} applicantemail 
 * @returns {object} application archive table
 */
function archiveApplication(applicantemail) {
   const conn = connect(APPLICANTS_ID)
   const applicationDetailTableDef = applicationDetailDB("applicationdetail")
   const applicationDetailTable = conn.getSheetByName(
      applicationDetailTableDef.name
   )
   const applicationArchiveTableDef = applicationDetailDB("archives")
   const applicationArchiveTable = conn.getSheetByName(
      applicationArchiveTableDef.name
   )

   // get application detail can return multiple rows, but in this case it should only return one row.
   const application = getApplicationDetail(applicantemail)[0]
   // row number is needed to delete this applicant from the applicants detail table
   const row = application.row
   // remove row number before the application row is added to the archive table
   delete application.row
   applicationArchiveTable.appendRow(Object.values(application))
   applicationDetailTable.deleteRow(row)

   return applicationArchiveTable
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
function getApplicationDetail(filter = "all", withColumnLabels = false) {
   const applicationDetailTableDef = applicationDetailDB("applicationdetail")
   const headers = applicationDetailTableDef.headers
   const conn = connect(APPLICANTS_ID)
   const applicationDetailTable = conn.getSheetByName(
      applicationDetailTableDef.name
   )

   const startRow = headers + 1
   const startCol = 1
   const numRow = applicationDetailTable.getLastRow() - startRow + 1
   const numCol = applicationDetailTable.getLastColumn()
   const applicationDetailData = applicationDetailTable
      .getRange(startRow, startCol, numRow, numCol)
      .getDisplayValues()

   let applicationDetailSchema = {}
   if (withColumnLabels) {
      applicationDetailSchema = buildTableSchemaWithLabels(
         applicationDetailTable,
         headers
      )
   } else {
      applicationDetailSchema = buildTableSchema(
         applicationDetailTable,
         headers
      )
   }
   const applicants = []
   applicationDetailData.forEach((row, i) => {
      const applicant = {}
      for (let key in applicationDetailSchema) {
         let col = applicationDetailSchema[key] - 1 // convert to zero-based index
         applicant[key] = row[col]
      }

      let applicantEmail = ""
      if (withColumnLabels) {
         applicantEmail = applicant["Email"].toLowerCase()
      } else {
         applicantEmail = applicant["email"].toLowerCase()
      }

      if (filter === "all") {
         applicants.push(applicant)
      } else if (applicantEmail === filter.toLowerCase()) {
         applicant.row = i + 1 + headers
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
   const headerRows = applicationSettingsTableDef.headers.rows
   const headerColumns = applicationSettingsTableDef.headers.columns
   const conn = connect(APPLICANTS_ID)
   const applicationSettingsTable = conn.getSheetByName(
      applicationSettingsTableDef.name
   )
   const applicationSettingsSchema = buildTableSchema(
      applicationSettingsTable,
      headerRows
   )
   const startRow = headerRows + 1
   const startCol = headerColumns + 1
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
function addApplicant(application) {
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

   const a = []
   application.forEach((row) => {
      for (let key in applicationDetailSchema) {
         let col = applicationDetailSchema[key] - 1 // convert to zero-based index
         a[col] = row[key]
      }
   })

   /**
    * add new row to the Application Detail table and then make the Payment Processed and Accept Application columns checkboxes
    */
   const t = applicationDetailTable.appendRow(a)
   if (applicationDetailSchema.acceptapplication) {
      t.getRange(
         applicationDetailTable.getLastRow(),
         applicationDetailSchema.acceptapplication
      ).insertCheckboxes()
   }
   if (applicationDetailSchema.paymentprocessed) {
      t.getRange(
         applicationDetailTable.getLastRow(),
         applicationDetailSchema.paymentprocessed
      ).insertCheckboxes()
   }
   if (applicationDetailSchema.contactnumber) {
      t.getRange(
         applicationDetailTable.getLastRow(),
         applicationDetailSchema.contactnumber
      ).setNumberFormat("(###) ###-####")
   }
   return t
}
