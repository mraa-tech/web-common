function testGetWaitingToBeJuried() {
   const testdata = [
      {
         testname: "getWaitingToBeJuried, All",
         verbose: true,
         filter: "all",
         expectedresult: 5, // number of submissions,
      },
      {
         testname: "getWaitingToBeJuried, by email",
         verbose: true,
         filter: "russellb100@gmail.com",
         expectedresult: 1, // number of submissions,
      },
      {
         testname: "getWaitingToBeJuried, with bad email",
         verbose: true,
         filter: "TomTester@gmail.com",
         expectedresult: 0, // number of submissions,
      },
      {
         testname: "getWaitingToBeJuried, email case insensitive",
         verbose: true,
         filter: "RussellB100@gmail.com",
         expectedresult: 1, // number of submissions,
      },
   ]
   // check for empty pivot table
   const emptyPivot = getWaitingToBeJuried("all")
   const emptyResult = emptyPivot[0].columns ? "FAILED" : "Passed"
   if (emptyResult === "FAILED") {
      Logger.log("getWaitingToBeJuried, empty pivot table")
      return
   }
   Logger.log(`Test: ${testdata.testname}: > ${emptyResult}`)
   testdata.forEach((testdata) => {
      let waiting = getWaitingToBeJuried(testdata.filter)
      let result = waiting.length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      if (testdata.verbose) {
         waiting.forEach((submission) => {
            Logger.log(
               `Applicant waiting to be juried: ${submission.email}, ${submission.firstname} ${submission.lastname}`
            )
         })
      }
   })
}

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
