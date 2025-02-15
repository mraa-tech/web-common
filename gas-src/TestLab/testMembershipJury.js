function testAddJuryReview() {
   const tableDefinition = membershipJuryDB("juryreview")
   const testdata = [
      {
         testname: "Add a new jury review",
         verbose: false,
         filter: "all",
         expectedresult: getTableRowCount(tableDefinition.name) + 1, // "rows before adding a new review",
         skip: false,
         data: [
            {
               applicantemail: "AvaWhite@email.com",
               applicantlastname: "White",
               applicantfirstname: "Ava",
               revieweremail: "StevenWright@email.com",
               reviewerlastname: "Wright",
               reviewerfirstname: "Steven",
               vote: "Accept",
               reasonforvote: "Good work",
               timestamp: new Date(),
               reviewerfullname: "Steven Wright",
               applicantfullname: "Ava White",
            },
         ],
      },
   ]
   testdata.forEach((testdata) => {
      let rowsAfterAdd = addJuryReview(testdata.data).getLastRow()

      let assert =
         rowsAfterAdd === testdata.expectedresult ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
   })
}

function testGetJurySubmissionCounts() {
   const testdata = [
      {
         testname: "getJurySubmissionCounts, All",
         verbose: false,
         filter: "all",
         expectedresult: 5, // number of submissions,
      },
      {
         testname: "getJurySubmissionCounts, with no grand total",
         verbose: false,
         filter: "nototal",
         expectedresult: 4, // number of submissions,
      },
   ]
   // check for empty pivot table
   const emptyPivot = getJurySubmissionCounts()
   const emptyResult = !emptyPivot[0].columns === "undefined"
   if (emptyResult) {
      Logger.log("getJurySubmissionCounts, empty pivot table")
      return
   }

   testdata.forEach((testdata, t) => {
      let submissions = getJurySubmissionCounts(testdata.filter)
      let result = Object.keys(submissions).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      if (testdata.verbose) {
         Object.keys(submissions).forEach((key) => {
            Logger.log(
               `Submission: ${submissions[key].email}, ${submissions[key].firstname} ${submissions[key].lastname}`
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

function testGetJuryVotes() {
   const testdata = [
      {
         testname: "getJuryVotes, All",
         verbose: false,
         filter: "all",
         expectedresult: 16, // number of votes,
         skip: false,
      },
      {
         testname: "getJuryVotes, by email",
         verbose: false,
         filter: "AvaWhite@email.com",
         expectedresult: 1, // number of votes,
         skip: false,
      },
      {
         testname: "getJuryVotes, with bad email",
         verbose: false,
         filter: "BadActor@gmail.com",
         expectedresult: 0, // number of votes,
         skip: false,
      },
      {
         testname: "getJuryVotes, email case insensitive",
         verbose: false,
         filter: "avawhite@email.com",
         expectedresult: 1, // number of votes,
         skip: false,
      },
      {
         testname: "getJuryVotes, with no total",
         verbose: false,
         filter: "nototal",
         expectedresult: 15, // number of votes,
         skip: false,
      },
      {
         testname: "getJuryVotes, with grand total",
         verbose: false,
         filter: "grandtotal",
         expectedresult: 1, // number of votes,
         skip: false,
      },
   ]
   // check for empty pivot table
   const emptyPivot = getJuryVotes("all")
   const emptyResult = !emptyPivot[0].columns === "undefined"
   if (emptyResult) {
      Logger.log("getJuryVotes, empty pivot table")
      return
   }
   Logger.log(`Test: Empty Pivot Table: > ${emptyResult}`)
   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
      } else {
         let votes = getJuryVotes(testdata.filter)
         let result = votes.length === testdata.expectedresult
         let assert = result ? "Passed" : "FAILED"
         Logger.log(`Test: ${testdata.testname}: > ${assert}`)
         if (testdata.verbose) {
            votes.forEach((vote) => {
               Logger.log(
                  `Vote for: ${vote.applicantemail}, Vote to Accept: ${vote.accept}, Vote to Reject: ${vote.reject}`
               )
            })
         }
      }
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })
}

function testGetJuryAppSettings() {
   const testdata = [
      {
         testname: "getJuryAppSettings, All",
         type: "all",
         expectedresult: 5, // number of settings,
      },
   ]
   const settings = getJuryAppSettings()
   testdata.forEach((testdata) => {
      let result = Object.keys(settings).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
   })
   Logger.log(`Test: Get Image Type List: ${settings.imagetypelist}`)
   const imagetypelist = settings.imagetypelist.split(",")

   const listtype = typeof imagetypelist
   Logger.log(
      `Test: Get Image Type List is type: ${listtype} with ${imagetypelist.length} entries`
   )
}

function testGetJuryReviews() {
   const tableDefinition = membershipJuryDB("juryreview")
   const testdata = [
      {
         testname: "getJuryReviews, All",
         verbose: false,
         filter: "all",
         expectedresult:
            getTableRowCount(tableDefinition.name) - tableDefinition.headers, // "rows before adding a new review"
      },
      {
         testname: "getJuryReviews, by email",
         verbose: false,
         filter: "StevenWright@email.com",
         expectedresult: 2, // number of submissions,
      },
      {
         testname: "getJuryReviews, with bad email",
         verbose: false,
         filter: "TomTester@gmail.com",
         expectedresult: 0, // number of submissions,
      },
      {
         testname: "getJuryReviews, email case insensitive",
         verbose: false,
         filter: "stevenwright@email.com",
         expectedresult: 2, // number of submissions,
      },
   ]
   testdata.forEach((testdata) => {
      let juryReview = getJuryReviews(testdata.filter)
      let result = juryReview.length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      if (testdata.verbose) {
         juryReview.forEach((review) => {
            Logger.log(
               `Review by: ${review.revieweremail}, Vote: ${review.vote}, Comments: ${review.reasonforvote}`
            )
         })
      }
   })
}

function testGetJurySubmissions() {
   const testdata = [
      {
         testname: "getJurySubmissions, All",
         verbose: false,
         filter: "all",
         expectedresult: 33, // number of submissions,
      },
      {
         testname: "getJurySubmissions, by email",
         verbose: false,
         filter: "EmilyJohnson@email.com",
         expectedresult: 7, // number of submissions,
      },
      {
         testname: "getJurySubmissions, with bad email",
         verbose: false,
         filter: "jamesgreen.311@gmail.com",
         expectedresult: 0, // number of submissions,
      },
      {
         testname: "getJurySubmissions, email case insensitive",
         verbose: false,
         filter: "emilyjohnson@email.com",
         expectedresult: 7, // number of submissions,
      },
   ]
   testdata.forEach((testdata) => {
      let submissions = getJurySubmissions(testdata.filter)
      let result = Object.keys(submissions).length === testdata.expectedresult
      let assert = result ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      if (testdata.verbose) {
         submissions.forEach((submission) => {
            Logger.log(
               `Submission by: ${submission.email}, Work Title: ${submission.worktitle}`
            )
         })
      }
   })
}

function testJuryRunAll() {
   testGetJuryAppSettings()
   testGetJurySubmissions()
   testGetJuryReviews()
   testGetJuryVotes()
}
