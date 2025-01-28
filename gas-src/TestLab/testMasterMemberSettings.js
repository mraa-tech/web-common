function testTokenExpiresIn() {
   const expected = 30
   const tokenExpiresIn = getTokenExpiresIn()
   const test = tokenExpiresIn === expected ? "Pass" : "Fail"
   Logger.log(
      `getTokenExpiresIn:  ${test} - Expected: ${expected}, Actual: ${tokenExpiresIn}`
   )

   return true
}

function testMasterMemberSettings() {
   const settings = getMasterMemberSettings()
   const test = isEmptyObject(settings) ? "Fail" : "Pass"
   Logger.log(`getMasterMemberSettings: ${test}`)
   if (test === "Pass") {
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
