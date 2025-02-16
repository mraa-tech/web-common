function testTokenExpiresIn() {
   const expected = 30
   const tokenExpiresIn = getTokenExpiresIn()
   const test = tokenExpiresIn === expected ? "Passed" : "FAILED"
   Logger.log(
      `getTokenExpiresIn:  ${test} - Expected: ${expected}, Actual: ${tokenExpiresIn}`
   )

   return true
}

function testMasterMemberSettings() {
   const settings = getMasterMemberSettings()
   const test = isEmptyObject(settings) ? "FAILED" : "Passed"
   Logger.log(`getMasterMemberSettings: ${test}`)
   if (test === "Passed") {
      Logger.log(settings)
   } else {
      Logger.log("Settings not found")
   }

   return true
}

function testSettingsRunAll() {
   testTokenExpiresIn()
   testMasterMemberSettings()
}
