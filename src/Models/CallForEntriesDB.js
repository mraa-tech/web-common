// Id for Call For Entries Spreadsheet File
const CALLFORENTRIES_ID = "1eJuLyL_MhXy_s8kKm8sYkUsJkzLMP7M-kfVzp_LxAVQ"

function cfeTabDef(table) {
   const tables = {
      exhibits: {
         name: "Exhibits",
         type: "standard",
         headers: 1,
         schema: {
            eventid: "a",
            eventtitle: "b",
            firstname: "c",
            lastname: "d",
            email: "e",
            phone: "f",
            worktitle: "g",
            medium: "h",
            width: "i",
            height: "j",
            price: "k",
            filename: "l",
            fileid: "m",
            member: "n",
            availablity: "o", // not currently used
            hidden: "p", // not currently used
            fullname: "q", // not currently used
            timestamp: "r", // not currently used
            securitytoken: "s", // not currently used
         },
      },
      config: {
         name: "Config",
         type: "standard",
         headers: 1,
         schema: {
            id: "a",
            exhibitname: "b",
            cfeopendate: "c",
            cfeclosedate: "d",
            maxentriesperartist: "e",
            maxentriespershow: "f",
            imagefolderid: "g",
            allownfs: "h",
            status: "i",
            payfeeonly: "j",
            purchaselimit: "k",
            showopendate: "l",
            showclosedate: "m",
            entryfee: "n",
            registrationlink: "o",
            applicationversion: "p",
            feestructure: "q",
            maxprice: "r",
            showfee: "s",
            location: "t",
            cashdiscount: "u",
         },
      },
      appsettings: {
         name: "AppSettings",
         type: "standard",
         headers: 1,
         schema: {
            maximagesize: "a",
            cfecontact: "b",
            // statuslist: "c2:c", // Moved to Data List sheet
            applicationlink: "d",
            applicationversion: "e",
            treasurername: "i",
            treasureremail: "j",
            confirmationdocid: "k",
            destinationfolderid: "l",
         },
      },
      opencalls: {
         name: "Open Calls",
         type: "pivot",
         headers: 1,
         summary: "none",
         schema: {
            cfeclosedate: "a",
            exhibitid: "b",
            exhibitname: "c",
            maxentriesperartist: "d",
            entryfee: "e",
            imagefolderid: "f",
         },
      },
      payments: {
         name: "Payments",
         type: "standard",
         headers: 1,
         schema: {
            exhibitid: "a",
            exhibitname: "b",
            exhibitlocation: "c", // in config file
            artistemail: "d",
            artistlastname: "e",
            artistfirstname: "f",
            qtyentered: "g",
            amountpaid: "h", // blank - entered by treasurer when payment is made
            datereceived: "i", // blank - entered by treasurer when payment is made
            timestamp: "j",
         },
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
 * Retrieve a show from the Config tab
 *
 * @param {string} id Unique show identifier
 * @returns {object} Show object
 */
function getExhibitById(id) {
   // connect to file and open sheet
   const cfeConfigTableDef = cfeTabDef("config")
   const cfeConfigSchema = cfeConfigTableDef.schema
   const idPos = getFldPos(cfeConfigSchema, "id")
   const headers = cfeConfigTableDef.headers
   const startRow = headers + 1
   const startCol = 1
   const cfeConfig = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeConfigTableDef.name
   )
   const cfeConfigData = cfeConfig.getSheetValues(
      startRow,
      startCol,
      cfeConfig.getLastRow() - headers,
      cfeConfig.getLastColumn()
   )
   const showData = cfeConfigData.filter(
      (d) => d[idPos].toLowerCase() === id.toLowerCase()
   )[0]

   /**
    * Convert the array of data to an object
    */
   let show = {}
   for (let key in cfeConfigSchema) {
      show[key] = showData[cfeConfigSchema[key].colToIndex()]
   }

   return show
}

/**
 * Retrieve all settings for the Call for Entries application
 *
 * @returns {object} App settings object
 */
function getAppSettings() {
   const cfeAppsettingsTableDef = cfeTabDef("appsettings")
   const cfeAppsettingsSchema = cfeAppsettingsTableDef.schema
   const headers = cfeAppsettingsTableDef.headers
   const startRow = headers + 1
   const endRow = startRow
   const startCol = 1
   const cfeAppsettings = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeAppsettingsTableDef.name
   )
   const cfeAppsettingsData = cfeAppsettings.getSheetValues(
      startRow,
      startCol,
      endRow,
      cfeAppsettings.getLastColumn()
   )

   let settings = {}
   for (let key in cfeAppsettingsSchema) {
      settings[key] =
         cfeAppsettingsData[0][cfeAppsettingsSchema[key].colToIndex()]
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
   const cfeOpenCallsSchema = cfeOpenCallsTableDef.schema
   const headers = cfeOpenCallsTableDef.headers
   const startRow = headers + 1
   const startCol = 1
   const cfeOpenCalls = connect(CALLFORENTRIES_ID).getSheetByName(
      cfeOpenCallsTableDef.name
   )
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
         call[key] = cfeOpenCallsData[row][cfeOpenCallsSchema[key].colToIndex()]
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
   const cfePaymentsSchema = cfePaymentsTableDef.schema
   const headers = cfePaymentsTableDef.headers
   const startRow = headers + 1
   const startCol = 1
   const cfePayments = connect(CALLFORENTRIES_ID).getSheetByName(
      cfePaymentsTableDef.name
   )
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
         payment[key] =
            cfePaymentsData[row][cfePaymentsSchema[key].colToIndex()]
      }
      payments.push(payment)
   }

   return payments
}
