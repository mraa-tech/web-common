function testArchiveApplication() {
   const testdata = [
      {
         testname: "Archive an application",
         verbose: false,
         filter: "daniel.w@email.com",
         expectedresult: {
            // number of rows in the archive table after the move,
            result1:
               getTableRowCount(
                  APPLICANTS_ID,
                  applicationDetailDB("archives").name
               ) + 1,
            // number of rows in the application detail table after the move,
            result2:
               getTableRowCount(
                  APPLICANTS_ID,
                  applicationDetailDB("applicationdetail").name
               ) - 1,
         },
         // rows after archiving an applicant, archived record will be removed from the application detail table
         skip: false,
      },
   ]
   const conn = connect(APPLICANTS_ID)
   const applicationDetailTable = conn.getSheetByName(
      applicationDetailDB("applicationdetail").name
   )
   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
         return
      }
      const archiveTable = archiveApplication(testdata.filter)
      const rowsAfterAdd = archiveTable.getLastRow()
      const rowsAfterRemove = applicationDetailTable.getLastRow()
      const assert1 =
         rowsAfterAdd === testdata.expectedresult.result1 ? true : false
      const assert2 =
         rowsAfterRemove === testdata.expectedresult.result2 ? true : false
      const assert = assert1 && assert2 ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })
}
function testAddApplicant() {
   const testdata = [
      {
         testname: "Add a new applicant",
         verbose: false,
         filter: "n/a",
         expectedresult:
            getTableRowCount(
               APPLICANTS_ID,
               applicationDetailDB("applicationdetail").name
            ) + 1, // rows after adding a new applicant
         skip: false,
         data: [
            {
               applicantid: generateUniqueId(),
               email: "henry.y@email.com",
               lastname: "Young",
               firstname: "Henry",
               streetaddress1: "123 Main St",
               streetaddress2: "Apt 101",
               city: "Anytown",
               state: "CA",
               zipcode: "90210",
               contactnumber: "7413992323",
               image: "https://example.com/image.jpg",
               membershiptype: "Exhibiting",
               medium: "Oil",
               reasonforinterest: "I love art",
               artistsignature: "Henry Young",
               arteducationbackground: "BFA",
               artassociatedmemberships: "Artists of America",
               exhibitions: "Art Show 1",
               websites: "https://henryyoungfineart.com",
               businessname: "Henry Young Fine Art",
               socialmedialinks: "https://instagram.com/henryyoungart",
               datesubmitted: new Date(),
               skip: "",
               paymentprocessed: false,
               acceptapplication: false,
            },
         ],
      },
   ]
   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
         return
      }

      let rowsAfterAdd = addApplicant(testdata.data).getLastRow()
      let assert =
         rowsAfterAdd === testdata.expectedresult ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)

      if (testdata.verbose) {
         Logger.log(`Test: ${testdata.testname}: > ${assert}`)
         Logger.log(
            `Test: ${testdata.testname}: > ${JSON.stringify(testdata.data)}`
         )
      }
      if (testdata.skip) {
         return
      }
      let applicant = getApplicationDetail(testdata.data[0].email)
      Logger.log(`Test: ${testdata.testname}: > ${JSON.stringify(applicant)}`)
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })
}

function testGetWaitingToBeJuried() {
   const tableDefinition = applicationDetailDB("waiting")
   const testdata = [
      {
         testname: "getWaitingToBeJuried, All",
         verbose: false,
         filter: "all",
         expectedresult:
            getTableRowCount(APPLICANTS_ID, tableDefinition.name) -
            tableDefinition.headers, // number of submissions minus headers,
         skip: false,
      },
      {
         testname: "getWaitingToBeJuried, by email",
         verbose: false,
         filter: "henry.y@email.com",
         expectedresult: 1, // number of submissions,
         skip: false,
      },
      {
         testname: "getWaitingToBeJuried, with bad email",
         verbose: false,
         filter: "TomTester@gmail.com",
         expectedresult: 0, // number of submissions,
         skip: false,
      },
      {
         testname: "getWaitingToBeJuried, email case insensitive",
         verbose: false,
         filter: "Henry.Y@email.com",
         expectedresult: 1, // number of submissions,
         skip: false,
      },
   ]
   // check for empty pivot table
   const emptyPivot = getWaitingToBeJuried("all")
   const emptyResult = emptyPivot[0].columns === "undefined"
   if (emptyResult) {
      Logger.log("getWaitingToBeJuried, empty pivot table")
      return
   }
   Logger.log(`Test: Empty Pivot Table: > ${emptyResult}`)
   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
         return
      }
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
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })
}

function testGetApplicationSettings() {
   const tableDefinition = applicationDetailDB("settings")
   const testdata = [
      {
         testname: "getApplicationSettings, All",
         filter: "all",
         expectedresult:
            getTableColumnCount(APPLICANTS_ID, tableDefinition.name) -
            tableDefinition.headers.columns, // number of settings,
         verbose: false,
         skip: false,
      },
      {
         testname: "getApplicationSettings, by field - Distribution List",
         filter: "distributionlist",
         expectedresult: 1, // number of settings,
         verbose: false,
         skip: false,
      },
   ]
   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
         return
      }
      let settings = getApplicationSettings(testdata.filter)
      let result = Object.keys(settings).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })

   if (testdata.verbose) {
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
}

function testGetApplicationDetail() {
   const tableDefinition = applicationDetailDB("applicationdetail")
   const testdata = [
      {
         testname: "getApplicationDetail, All ",
         filter: "all",
         expectedresult:
            getTableRowCount(APPLICANTS_ID, tableDefinition.name) -
            tableDefinition.headers, // number of applicants,
         verbose: false,
         skip: false,
      },
      {
         testname: "getApplicationDetail, by email ",
         filter: "mia.a@email.com",
         expectedresult: 1, // number of applicants,
         verbose: false,
         skip: false,
      },
      {
         testname: "getApplicationDetail, bad email ",
         filter: "jamesgreen.311@gmail.com",
         expectedresult: 0, // number of applicants,
         verbose: false,
         skip: false,
      },
      {
         testname: "getApplicationDetail, email case insensitive ",
         filter: "Mia.A@email.com",
         expectedresult: 1, // number of applicants,
         verbose: false,
         skip: false,
      },
   ]

   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
         return
      }
      let applicants = getApplicationDetail(testdata.filter)
      let result = Object.keys(applicants).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })

   if (testdata.verbose) {
      Logger.log(getApplicationDetail("mia.a@email.com"))
   }
}

function testApplicantsRunAll() {
   testGetWaitingToBeJuried()
   testGetApplicationSettings()
   testGetApplicationDetail()
   testAddApplicant()
}
