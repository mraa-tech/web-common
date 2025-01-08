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

function testGetOpenCalls() {
   const openCalls = getOpenCalls()

   for (let i = 0; i < openCalls.length; i++) {
      Logger.log(openCalls[i].exhibittitle)
   }

   Logger.log(openCalls)
   Logger.log(openCalls.length)
}

function testGetCFEAppSettings() {
   const appSettings = getCFEAppSettings()
   Logger.log(appSettings)
}

function testGetExhibitConfigById() {
   const exhibit = getExhibitConfigById("176BD2A")
   Logger.log(exhibit)
}

function testCFERunAll() {
   testGetCFEAppSettings()
   testGetExhibitConfigById()
   testGetExhibitEntriesById()
   testGetOpenCalls()
   testGetPaymentsDue()
   testGetCFEMetadata()
}
