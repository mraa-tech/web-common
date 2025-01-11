/**
 * Contains the definition of all necessary tables in the Call for Entries spreadsheet
 * For standard tables, use the buildSchema() function to build the schema from the header row.
 * For pivot tables, use of the schema property or the buildSchema() function should be decided by the developer.
 * For dashboard sheets, use the schema property.
 *
 * @param {object} table
 * @returns {object} table definition
 *
 */
function cfeTabDef(table) {
   const tables = {
      exhibits: {
         name: "Exhibits",
         type: "standard",
         headers: 1,
      },
      config: {
         name: "Config",
         type: "standard",
         headers: 1,
      },
      appsettings: {
         name: "AppSettings",
         type: "standard",
         headers: 1,
      },
      opencalls: {
         name: "Open Calls",
         type: "pivot",
         headers: 1,
         summary: "none",
      },
      payments: {
         name: "Payments",
         type: "standard",
         headers: 1,
      },
      totalsbyexhibitname: {
         name: "Totals By Exhibit Name",
         type: "pivot",
         headers: 1,
         summary: 1,
      },

      paymentdashboard: {
         name: "Payment Dashboard",
         type: "dashboard",
         pivottables: {
            exhibittotals: {
               name: "Exhibit Totals",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  exhibitname: "a",
                  totalentries: "b",
                  totalpaid: "c",
               },
            },
            totalsbyemail: {
               name: "Exhibit Totals By Artist Email",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  artistemail: "d",
                  exhibitname: "e",
                  exhibitid: "f",
                  qtyentered: "g",
                  amountpaid: "h",
               },
            },
            totalsbyexhibitname: {
               // this has been moved to it's own table in sheets. validate it is no longer needed here before removing this
               name: "Exhibit Totals By Exhibit Name",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  exhibitname: "j",
                  artistlastname: "k",
                  artistfirstname: "l",
                  qtyentered: "m",
                  amountpaid: "n",
               },
            },
         },
      },
   }
   return tables[table]
}

/**
 * Totals by exhibit name is a pivot table that summarizes the total entries and total paid for each exhibit by artist.
 * 
 * @returns {array} An array of exhibit entries
 */
function getTotalsByExhibitName() {
   const cfeTotalsByExhibitNameTableDef = cfeTabDef("totalsbyexhibitname")
   const headers = cfeTotalsByExhibitNameTableDef.headers
   const cfeTotalsByExhibitName = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeTotalsByExhibitNameTableDef.name
   )
   const cfeTotalsByExhibitNameSchema = buildTableSchema(
      cfeTotalsByExhibitName,
      headers
   )
   const startRow = headers + 1
   const startCol = 1
   const endRow = cfeTotalsByExhibitName.getLastRow() - 1
   const endCol = cfeTotalsByExhibitName.getLastColumn()
   const cfeTotalsByExhibitNameData = cfeTotalsByExhibitName.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   return cfeTotalsByExhibitNameData
}

/**
 * Get the metadata for the exhibits sheet.
 * Defines data about the exhibits sheet that is needed to process the file.
 * @returns {object} Exhibits Metadata object
 */
function getCFEExhibitsMetadata() {
   const cfeExhibitsMetadata = cfeTabDef("exhibits")
   return cfeExhibitsMetadata
}

/**
 * Get the metadata for the config sheet.
 * Defines data about the config sheet that is needed to process the file.
 * @returns {object} Config Metadata object
 */
function getCFEConfigMetadata() {
   const cfeConfigMetadata = cfeTabDef("config")
   return cfeConfigMetadata
}

/**
 * Get the metadata for the app settings sheet.
 * Defines data about the app settings sheet that is needed to process the file.
 * @returns {object} App settings metadata object
 */
function getCFEAppsettingsMetadata() {
   const cfeAppsettingsMetadata = cfeTabDef("appsettings")
   return cfeAppsettingsMetadata
}

/**
 * Get the metadata for the open calls sheet.
 * Defines data about the open calls sheet that is needed to process the file.
 * @returns {object} Open Calls Metadata object
 */
function getCFEOpenCallsMetadata() {
   const cfeOpenCallsMetadata = cfeTabDef("opencalls")
   return cfeOpenCallsMetadata
}

/**
 * Get the metadata for the payments sheet.
 * Defines data about the payments sheet that is needed to process the file.
 * @returns {object} Payments Metadata object
 */
function getCFEPaymentsMetadata() {
   const cfePaymentsMetadata = cfeTabDef("payments")
   return cfePaymentsMetadata
}

/**
 * Get the metadata for the payment dashboard sheet.
 * Defines data about the payment dashboard sheet that is needed to process the file.
 * @returns {object} Payment Dashboard Metadata object
 */
function getCFEPaymentDashboardMetadata() {
   const cfePaymentDashboardMetadata = cfeTabDef("paymentdashboard")
   return cfePaymentDashboardMetadata
}

/**
 * CFE (call for entries) PD (payment dashboard) pivot table schema
 * @param {string} pt Name of the pivot table
 * @returns {object} Pivot table schema
 */
function getCFEPDPivotTablesSchema(pt = "exhibittotals") {
   const cfePaymentDashboardMetadata = getCFEPaymentDashboardMetadata()
   return cfePaymentDashboardMetadata.pivottables[pt]
}

/**
 * Read the pivot table data from the Payment Dashboard sheet in the Call for Entries spreadsheet.
 * 
 * @param {string} pt name of the pivot table to retrive data from
 * @returns {array} An array of pivot table data
 */
function getCFEPDPivotTablesData(pt = "exhibittotals") {
   const cfePaymentDashboardMetadata = getCFEPaymentDashboardMetadata()
   const cfePaymentDashboardSchema = getCFEPDPivotTablesSchema(pt)
   const cfePaymentDashboardTable = connect(CALLFORENTRIES_ID).getSheetByName(
      cfePaymentDashboardMetadata.name
   )
   const startRow = cfePaymentDashboardSchema.headers // includes column headers
   const startCol = cfePaymentDashboardSchema.schema.exhibitname.colToIndex()
   const endRow = cfePaymentDashboardTable.getLastRow() - startRow + 1
   const endCol = cfePaymentDashboardSchema.schema.amountpaid.colToIndex()
   const cfePaymentDashboardData = cfePaymentDashboardTable.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )
   let cfePDDataArr = []
   for (let i = 0; i < cfePaymentDashboardData.length; i++) {
      let row = []
      for (let j = 0; j < cfePaymentDashboardData[i].length; j++) {
         row.push(cfePaymentDashboardData[i][j])
      }
      cfePDDataArr.push(row)
   }

   return cfePDDataArr
}

/**
 * Retrieve a show from the Config tab
 *
 * @param {string} id Unique show identifier
 * @returns {object} Show object
 */
function getExhibitConfigById(id) {
   // connect to file and open sheet
   const cfeConfigTableDef = cfeTabDef("config")
   const headers = cfeConfigTableDef.headers

   const cfeConfig = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeConfigTableDef.name
   )
   const cfeConfigSchema = buildTableSchema(cfeConfig, headers)

   const idPos = cfeConfigSchema.exhibitid - 1 // zero based index
   const startRow = headers + 1
   const startCol = 1
   const endRow = cfeConfig.getLastRow() - headers
   const endCol = cfeConfig.getLastColumn()

   const cfeConfigData = cfeConfig.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )
   const showData = cfeConfigData.filter(
      (d) => d[idPos].toLowerCase() === id.toLowerCase()
   )[0]

   /**
    * Convert the array of data to an object
    */
   let show = {}
   for (let key in cfeConfigSchema) {
      let fldPos = cfeConfigSchema[key] - 1
      show[key] = showData[fldPos]
   }

   return show
}

/**
 * Retrieve all settings for the Call for Entries application
 *
 * @returns {object} App settings object
 */
function getCFEAppSettings() {
   const cfeAppsettingsTableDef = cfeTabDef("appsettings")
   const headers = cfeAppsettingsTableDef.headers

   const cfeAppsettings = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeAppsettingsTableDef.name
   )
   const cfeAppsettingsSchema = buildTableSchema(cfeAppsettings, headers)

   const startRow = headers + 1
   const endRow = startRow
   const startCol = 1
   const endCol = cfeAppsettings.getLastColumn()
   const cfeAppsettingsData = cfeAppsettings.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   let settings = {}
   for (let key in cfeAppsettingsSchema) {
      let fldPos = cfeAppsettingsSchema[key] - 1 // zero based index
      settings[key] = cfeAppsettingsData[0][fldPos]
   }
   return settings
}

/**
 * Retrieve all open calls from pivot table
 *
 * @returns {object} An array of Open calls objects
 */
function getOpenCalls() {
   const cfeOpenCallsTableDef = cfeTabDef("opencalls")
   const headers = cfeOpenCallsTableDef.headers

   const cfeOpenCalls = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeOpenCallsTableDef.name
   )
   const cfeOpenCallsSchema = buildTableSchema(cfeOpenCalls, headers)

   const startRow = headers + 1
   const startCol = 1
   const endRow = cfeOpenCalls.getLastRow() - 1
   const endCol = cfeOpenCalls.getLastColumn()
   const cfeOpenCallsData = cfeOpenCalls.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   let openCalls = []
   for (let row = 0; row < endRow; row++) {
      let call = {}
      for (let key in cfeOpenCallsSchema) {
         let fldPos = cfeOpenCallsSchema[key] - 1 // zero based index
         call[key] = cfeOpenCallsData[row][fldPos]
      }
      openCalls.push(call)
   }

   return openCalls
}

/**
 * Retrieve all payments due for open calls from pivot table
 *
 * @returns {object} An array of Open calls objects
 */
function getPaymentsDue() {
   const cfePaymentsTableDef = cfeTabDef("payments")
   const headers = cfePaymentsTableDef.headers

   const cfePayments = connect(CALLFORENTRIES_ID).getSheetByName(
      cfePaymentsTableDef.name
   )
   const cfePaymentsSchema = buildTableSchema(cfePayments, headers)

   const startRow = headers + 1
   const startCol = 1
   const endRow = cfePayments.getLastRow() - 1
   const endCol = cfePayments.getLastColumn()

   const cfePaymentsData = cfePayments.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   let payments = []
   for (let row = 0; row < endRow; row++) {
      let payment = {}
      for (let key in cfePaymentsSchema) {
         let fldPos = cfePaymentsSchema[key] - 1 // zero based index
         payment[key] = cfePaymentsData[row][fldPos]
      }
      payments.push(payment)
   }

   return payments
}

/** 
 * Get the exhibit entries for a given exhibit id.
 * @param {string} id Unique exhibit identifier
 * @returns {object} An array of exhibit entries objects
 */
function getExhibitEntriesById(id) {
   // get table definition
   const exhibitTableDef = cfeTabDef("exhibits")
   // set header rows
   const headers = exhibitTableDef.headers
   // connect and get table
   const cfeExhibitEntries = connect(CALLFORENTRIES_ID).getSheetByName(
      exhibitTableDef.name
   )
   // build schema from table header row
   const exhibitEntriesSchema = buildTableSchema(cfeExhibitEntries, headers)
   const idPos = exhibitEntriesSchema.exhibitid - 1

   // set start and end of data range
   const startRow = headers + 1
   const startCol = 1
   const endRow = cfeExhibitEntries.getLastRow() - headers
   const endCol = cfeExhibitEntries.getLastColumn()
   // get data
   const exhibitEntriesData = cfeExhibitEntries.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   // filter for requested exhibit id
   const data = exhibitEntriesData.filter(
      (d) => d[idPos].toLowerCase() === id.toLowerCase()
   )

   let entries = []
   for (let row = 0; row < data.length; row++) {
      let entry = {}
      for (let key in exhibitEntriesSchema) {
         let fldPos = exhibitEntriesSchema[key] - 1 // zero based index
         entry[key] = data[row][fldPos]
      }
      entries.push(entry)
   }

   return entries
}
