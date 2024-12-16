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
}
