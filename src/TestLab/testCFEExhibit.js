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
}
