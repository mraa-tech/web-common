function testGetExhibitEntriesById() {
   const entries = getExhibitEntriesById("176BD2A")
   Logger.log(entries)
}

function testGetPaymentsDue() {
   const payments = getPaymentsDue()
   Logger.log(payments)
   Logger.log(payments.length)
}

function testGetOpenCalls() {
   const openCalls = getOpenCalls()
   Logger.log(openCalls)
   Logger.log(openCalls.length)
}

function testGetAppSettings() {
   const appSettings = getAppSettings()
   Logger.log(appSettings)
}

function testGetExhibitConfigById() {
   const exhibit = getExhibitConfigById("176BD2A")
   Logger.log(exhibit)
}

function testCFERunAll() {
   testGetAppSettings()
   testGetExhibitConfigById()
   testGetExhibitEntriesById()
   testGetOpenCalls()
   testGetPaymentsDue()
}
