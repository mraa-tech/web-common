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

function testGetExhibitById() {
   const exhibit = getExhibitById("176BD2A")
   Logger.log(exhibit)
}
