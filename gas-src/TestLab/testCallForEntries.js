const testexhibit = {
   exhibitid: "176BD2A",
   exhibittitle: "Training",
   cfeopendate: "",
   cfeclosedate: "",
   maxentriesperartist: 12,
   maxentriespershow: "",
   imagefolderid: "1q-0nR65wPFDHoG3iK025eSbR8EC3Kmwu",
   allownfs: "NO",
   status: "SHOWING",
   payfeeonly: "",
   purchaselimit: "",
   showdropoffdate: new Date("2025-04-01 00:00:00"),
   showpickupdate: new Date("2025-05-31 00:00:00"),
   entryfee: 11,
   registrationlink:
      "https://script.google.com/macros/s/AKfycbwWop0xEdxCe2wk87EXC6AXvBWYeoO-dzAw8wgXLwvCfrT4zTK7oCsmjzWpElkDSuEX0w/exec?v=176BD2A",
   applicationversion: 21,
   feestructure: "",
   maxprice: "",
   location: "Testing",
   entryfeecashdiscount: 1,
   test: true,
}

const testappsettings = {
   maximagesizemb: 2,
   cfecontact: "mraa-exhibits@metrorichmondart.org",
   statuslist: "PLANNING",
   applicationlink:
      "https://script.google.com/macros/s/AKfycbwWop0xEdxCe2wk87EXC6AXvBWYeoO-dzAw8wgXLwvCfrT4zTK7oCsmjzWpElkDSuEX0w/exec?v=",
   applicationversion: 21,
   feestructurekey: 1,
   feestructurevalue: "entry",
   pricelimit: "NO",
   treasurername: "Michael Haubenstock",
   treasureremail: "mhauby@gmail.com",
   confirmationdocumentid: "1SBNv89ogCtrsfZJMD9Vaat23TRn5TxXrwF-SPABcnws",
   destinationfolderid: "1u5xL9-jI0A3j7iCtosMJvF3dX6lXno3P",
}

const testopencall = "28ED453"
const testopenshow = "176BD2A"

function testGetOpenShows() {
   const testdata = {
      testname: "testGetOpenShows",
      expectedresult: testopenshow,
   }

   const openShows = getOpenShows()
   const result = openShows.some((call) => {
      return call.exhibitid === testdata.expectedresult
   })
   const assert = result ? "Passed" : "FAILED"
   Logger.log(`Test ${testdata.testname}: > ${assert}`)
}

function testGetOpenCalls() {
   const testdata = {
      testname: "testGetOpenCalls",
      expectedresult: testopencall,
   }
   const openCalls = getOpenCalls()

   const result = openCalls.some((call) => {
      return call.exhibitid === testdata.expectedresult
   })

   const assert = result ? "Passed" : "FAILED"
   Logger.log(`Test ${testdata.testname}: > ${assert}`)
}

function testGetTotalsByExhibitName() {
   const payments = getTotalsByExhibitName()
   for (let key in payments) {
      Logger.log(`Totals By Exhibit Name; ${key}: ${payments[key]}`)
   }
}

function testGetCFEPDPivotTablesData() {
   const payments = getCFEPDPivotTablesData("totalsbyexhibitname")
   for (let key in payments) {
      Logger.log(`CFE Payment Dashboard Metadata; ${key}: ${payments[key]}`)
   }
}

function testGetCFEPDPivotTablesSchema() {
   const payments = getCFEPDPivotTablesSchema("totalsbyexhibitname")
   for (let key in payments) {
      Logger.log(
         `CFE Payment Dashboard Metadata Schema; ${key}: ${payments[key]}`
      )
   }
   for (let key in payments.schema) {
      Logger.log(
         `CFE Payment Dashboard Pivot Tables Schema; ${key}: ${payments.schema[key]}`
      )
   }
}

function testGetCFEMetadata() {
   const exhibits = getCFEExhibitsMetadata()
   for (let key in exhibits) {
      Logger.log(`Exhibits Metadata Schema; ${key}: ${exhibits[key]}`)
   }
   const config = getCFEConfigMetadata()
   for (let key in config) {
      Logger.log(`CFE Config Metadata Schema; ${key}: ${config[key]}`)
   }
   const appsettings = getCFEAppsettingsMetadata()
   for (let key in appsettings) {
      Logger.log(
         `CFE App Settings Metadata Schema; ${key}: ${appsettings[key]}`
      )
   }
   const openCalls = getCFEOpenCallsMetadata()
   for (let key in openCalls) {
      Logger.log(`CFE Open Calls Metadata Schema; ${key}: ${openCalls[key]}`)
   }
   const payments = getCFEPaymentsMetadata()
   for (let key in payments) {
      Logger.log(`CFE Payments Metadata Schema; ${key}: ${payments[key]}`)
   }
   const paymentDashboard = getCFEPaymentDashboardMetadata()
   for (let key in paymentDashboard) {
      Logger.log(
         `CFE Payment Dashboard Metadata; ${key}: ${paymentDashboard[key]}`
      )
   }
   for (let key in paymentDashboard.schema) {
      Logger.log(
         `CFE Payment Dashboard Metadata Schema; ${key}: ${paymentDashboard.schema[key]}`
      )
   }
}

function testGetExhibitEntriesById() {
   const entries = getExhibitEntriesById("176BD2A")

   Logger.log(`Entries for exhibit ${entries[0].exhibittitle}`)

   for (let i = 0; i < entries.length; i++) {
      Logger.log(entries[i].worktitle)
   }

   Logger.log(entries)
}

function testGetPaymentsDue() {
   const paymentsDue = getPaymentsDue()
   for (let i = 0; i < paymentsDue.length; i++) {
      Logger.log(paymentsDue[i].exhibittitle)
      Logger.log(Number(paymentsDue[i].amountpaid).toFixed(2))
   }
   Logger.log(paymentsDue)
   Logger.log(paymentsDue.length)
}

function testGetCFEAppSettings() {
   const testdata = {
      testname: "testGetCFEAppSettings",
      expectedresult: testappsettings,
   }

   const appSettings = getCFEAppSettings()
   let result = false
   for (let key in appSettings) {
      if (appSettings[key] != testdata.expectedresult[key]) {
         Logger.log(
            `App Settings ${key} - ${appSettings[key]} (${typeof appSettings[
               key
            ]}) --> Test Data ${key} - ${
               testdata.expectedresult[key]
            } (${typeof testdata.expectedresult[key]})`
         )
         result = false
         break // if any are false then test is a failure
      } else {
         result = true
      }
   }
   const assert = result ? "Passed" : "FAILED"
   Logger.log(`Test ${testdata.testname}: > ${assert}`)
}

function testGetExhibitConfigById() {
   const testdata = {
      testname: "testGetExhibitConfigById",
      exhibitid: "176BD2A",
      expectedresult: testexhibit,
   }

   const exhibit = getExhibitConfigById(testdata.exhibitid)
   let result = false
   for (let key in exhibit) {
      // only test the first 9 keys
      if (key === "payfeeonly") {
         break
      }
      if (exhibit[key] != testdata.expectedresult[key]) {
         Logger.log(
            `Exhibit ${key} - ${exhibit[key]} (${typeof exhibit[
               key
            ]}) --> Test Data ${key} - ${
               testdata.expectedresult[key]
            } (${typeof testdata.expectedresult[key]})`
         )
         result = false
         break // if any are false then test is a failure
      } else {
         result = true
      }
   }

   const assert = result ? "Passed" : "FAILED"
   Logger.log(`Test ${testdata.testname}: > ${assert}`)
}

function testCFERunAll() {
   testGetCFEAppSettings()
   testGetExhibitConfigById()
   testGetExhibitEntriesById()
   testGetOpenCalls()
   testGetPaymentsDue()
   testGetCFEMetadata()
   testGetCFEPDPivotTablesData()
   testGetCFEPDPivotTablesSchema()
   testGetTotalsByExhibitName()
   testGetOpenShows()
}
