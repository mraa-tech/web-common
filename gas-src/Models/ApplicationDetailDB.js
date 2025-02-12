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
   }
   return tables[table]
}

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
