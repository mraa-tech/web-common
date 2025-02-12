function testGetApplicationSettings() {
   const testdata = [
      {
         testname: "getApplicationSettings, All",
         filter: "all",
         expectedresult: 4, // number of settings,
      },
      {
         testname: "getApplicationSettings, by field - Distribution List",
         filter: "distributionlist",
         expectedresult: 1, // number of settings,
      },
   ]
   testdata.forEach((testdata) => {
      let settings = getApplicationSettings(testdata.filter)
      let result = Object.keys(settings).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
   })

   Logger.log(
      `Test: Get Distribution List: ${
         getApplicationSettings("distributionlist").distributionlist
      }`
   )

   const emaillist =
      getApplicationSettings("distributionlist").distributionlist.split(",")
   const listtype = typeof emaillist
   Logger.log(
      `Test: Get Distribution List is type: ${listtype} with ${emaillist.length} entries`
   )
}

function testGetApplicationDetail() {
   const testdata = [
      {
         testname: "getApplicationDetail, All ",
         filter: "all",
         expectedresult: 6, // number of applicants,
      },
      {
         testname: "getApplicationDetail, by email ",
         filter: "sssmith45@verizon.net",
         expectedresult: 1, // number of applicants,
      },
      {
         testname: "getApplicationDetail, bad email ",
         filter: "jamesgreen.311@gmail.com",
         expectedresult: 0, // number of applicants,
      },
      {
         testname: "getApplicationDetail, email case insensitive ",
         filter: "SSsmith45@verizon.net",
         expectedresult: 1, // number of applicants,
      },
   ]

   testdata.forEach((testdata) => {
      let applicants = getApplicationDetail(testdata.filter)
      let result = Object.keys(applicants).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
   })

   Logger.log(getApplicationDetail("SSsmith45@verizon.net"))
}
