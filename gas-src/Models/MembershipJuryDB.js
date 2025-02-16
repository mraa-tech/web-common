/**
 * Returns a table definition for the specified table
 *
 * @param {string} table name tag for tabel definition
 * @returns {object} table definition
 */
function membershipJuryDB(table) {
   const tables = {
      jurysubmissions: {
         name: "Submissions",
         type: "standard",
         headers: 3,
      },
      juryreview: {
         name: "Jury Review",
         type: "standard",
         headers: 3,
      },
      settings: {
         name: "App Settings",
         type: "standard",
         headers: 3,
      },
      votes: {
         name: "Applicants Total Votes",
         type: "pivot",
         headers: 2,
         footer: {
            rows: 1,
            columns: 4,
            text: "Grand Total",
         },
         countcolumn: "grandtotal",
      },
      reviewers: {
         name: "Applicants Total Reviewers",
         type: "pivot",
         headers: 1,
         footer: {
            rows: 1, // total by applicant email is one row
            columns: 4, // vote count is the last column
            text: "Total", // applicant email plus the string Total
         },
         countcolumn: "votecount", // total count for each applicant in the footer row
      },
      submissioncounts: {
         name: "Applicants Total Submissions",
         type: "pivot",
         headers: 2,
         footer: {
            rows: 1, // total by applicant email is one row
            columns: 5, // vote count is the last column
            text: "Grand Total", // applicant email plus the string Total
         },
         countcolumn: "grandtotal",
      },
   }
   return tables[table]
}

/**
 * Gets reviewers for each applicant
 * Datasource is Applicants Total Reviewers pivot table
 * @param {string} filter all, applicant email,
 * @returns {array} of jury reviewers
 */
function getJuryReviewers(filter = "all") {
   const juryReviewersTableDef = membershipJuryDB("reviewers")
   const headers = juryReviewersTableDef.headers
   const conn = connect(JURY_ID)
   const juryReviewersTable = conn.getSheetByName(juryReviewersTableDef.name)
   const juryReviewersSchema = buildTableSchema(juryReviewersTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const numRow = juryReviewersTable.getLastRow() - startRow + 1
   const numCol = juryReviewersTable.getLastColumn()
   const juryReviewersData = juryReviewersTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const juryReviewers = []
   juryReviewersData.forEach((row) => {
      const juryReviewer = {}
      for (let key in juryReviewersSchema) {
         let col = juryReviewersSchema[key] - 1 //
         juryReviewer[key] = row[col]
      }
      if (filter === "all") {
         juryReviewers.push(juryReviewer)
      } else if (
         juryReviewer["applicantemail"].toLowerCase() === filter.toLowerCase()
      ) {
         juryReviewers.push(juryReviewer)
      }
   })
   return juryReviewers
}

/**
 * Get the total votes for each applicant
 * Datasource is Applicants Total Votes pivot table
 * @param {string} filter all, applicant email, nototal, grandtotal
 * @returns {array} of jury votes
 */
function getJuryVotes(filter = "all") {
   const juryVotesTableDef = membershipJuryDB("votes")
   const headers = juryVotesTableDef.headers
   const conn = connect(JURY_ID)
   const juryVotesTable = conn.getSheetByName(juryVotesTableDef.name)
   const juryVotesSchema = buildTableSchema(juryVotesTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const numRow = juryVotesTable.getLastRow() - startRow + 1
   const numCol = juryVotesTable.getLastColumn()
   const juryVotesData = juryVotesTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )

   const juryVotes = []
   juryVotesData.forEach((row, i) => {
      const juryVote = {}
      for (let key in juryVotesSchema) {
         let col = juryVotesSchema[key] - 1 //
         juryVote[key] = row[col]
      }
      if (filter === "all") {
         juryVotes.push(juryVote)
      } else if (
         filter.toLowerCase() === juryVote.applicantemail.toLowerCase()
      ) {
         juryVotes.push(juryVote)
      } else if (filter === "nototal") {
         if (i < juryVotesData.length - 1) {
            juryVotes.push(juryVote)
         }
      } else if (filter === "grandtotal") {
         if (i === juryVotesData.length - 1) {
            juryVotes.push(juryVote)
         }
      }
   })
   return juryVotes
}

/**
 * Get application settings
 * Datasource is App Settings table
 * @returns {object} of app settings
 */
function getJuryAppSettings() {
   const appSettingsTableDef = membershipJuryDB("settings")
   const headers = appSettingsTableDef.headers
   const conn = connect(JURY_ID)
   const appSettingsTable = conn.getSheetByName(appSettingsTableDef.name)
   const appSettingsSchema = buildTableSchema(appSettingsTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const numRow = appSettingsTable.getLastRow() - startRow + 1
   const numCol = appSettingsTable.getLastColumn()
   const appSettingsData = appSettingsTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const appSettings = {}
   appSettingsData.forEach((row) => {
      for (let key in appSettingsSchema) {
         let col = appSettingsSchema[key] - 1 // convert to zero-based index
         appSettings[key] = row[col]
      }
   })
   return appSettings
}

/**
 * Get the total submissions for each applicant
 * Datasource is Submissions table
 * @param {string} filter all, applicant email
 * @returns
 */
function getJurySubmissions(filter = "all") {
   const jurySubmissionsTableDef = membershipJuryDB("jurysubmissions")
   const headers = jurySubmissionsTableDef.headers
   const conn = connect(JURY_ID)
   const jurySubmissionsTable = conn.getSheetByName(
      jurySubmissionsTableDef.name
   )

   const jurySubmissionsSchema = buildTableSchema(jurySubmissionsTable, headers)

   const startRow = headers + 1
   const startCol = 1
   const numRow = jurySubmissionsTable.getLastRow() - startRow + 1
   const numCol = jurySubmissionsTable.getLastColumn()
   const jurySubmissionsData = jurySubmissionsTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )

   const jurySubmissions = []
   jurySubmissionsData.forEach((row) => {
      const jurySubmission = {}
      for (let key in jurySubmissionsSchema) {
         let col = jurySubmissionsSchema[key] - 1 //
         jurySubmission[key] = row[col]
      }
      if (filter === "all") {
         jurySubmissions.push(jurySubmission)
      } else if (
         jurySubmission["email"].toLowerCase() === filter.toLowerCase()
      ) {
         jurySubmissions.push(jurySubmission)
      }
   })
   return jurySubmissions
}

/**
 * Get the total reviews for each applicant
 * Datasource is Jury Review table
 * @param {string} filter all, reviewer email
 * @returns {array} of jury reviews
 */
function getJuryReviews(filter = "all") {
   const juryReviewTableDef = membershipJuryDB("juryreview")
   const headers = juryReviewTableDef.headers
   const conn = connect(JURY_ID)
   const juryReviewTable = conn.getSheetByName(juryReviewTableDef.name)
   const juryReviewSchema = buildTableSchema(juryReviewTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const numRow = juryReviewTable.getLastRow() - startRow + 1
   const numCol = juryReviewTable.getLastColumn()
   const juryReviewData = juryReviewTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const juryReview = []
   juryReviewData.forEach((row) => {
      const juryReviewItem = {}
      for (let key in juryReviewSchema) {
         let col = juryReviewSchema[key] - 1 // convert to zero-based index
         juryReviewItem[key] = row[col]
      }
      if (filter === "all") {
         juryReview.push(juryReviewItem)
      } else if (
         juryReviewItem["revieweremail"].toLowerCase() === filter.toLowerCase()
      ) {
         juryReview.push(juryReviewItem)
      }
   })

   return juryReview
}

/**
 * Get the total submissions for each applicant
 * @param {string} filter nototal, all
 * @returns {array} of submission counts from the pivot table
 */
function getJurySubmissionCounts(filter = "nototal") {
   const jurySubmissionsTableDef = membershipJuryDB("submissioncounts")
   const headers = jurySubmissionsTableDef.headers
   const conn = connect(JURY_ID)
   const jurySubmissionsTable = conn.getSheetByName(
      jurySubmissionsTableDef.name
   )
   const jurySubmissionsSchema = buildTableSchema(jurySubmissionsTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const numRow = jurySubmissionsTable.getLastRow() - startRow + 1
   const numCol = jurySubmissionsTable.getLastColumn()
   const jurySubmissionsData = jurySubmissionsTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const jurySubmissions = []
   jurySubmissionsData.forEach((row, i) => {
      const jurySubmission = {}
      for (let key in jurySubmissionsSchema) {
         let col = jurySubmissionsSchema[key] - 1 // convert to zero-based index
         jurySubmission[key] = row[col]
      }
      if (filter === "nototal") {
         if (i < numRow - 1) jurySubmissions.push(jurySubmission)
      } else {
         jurySubmissions.push(jurySubmission)
      }
   })
   return jurySubmissions
}

function addJuryReview(review) {
   const juryReviewTableDef = membershipJuryDB("juryreview")
   const headers = juryReviewTableDef.headers
   const conn = connect(JURY_ID)
   const juryReviewTable = conn.getSheetByName(juryReviewTableDef.name)
   const juryReviewSchema = buildTableSchema(juryReviewTable, headers)

   /**
    * appendRow expects an array of values, not an object.
    * review will be coming as a FormData object.
    * convert from object to array, position of element in array is the column number.
    * only one review is added at a time.
    * it's being sent as an array of one object, this may change in the future.
    */
   const juryReview = []
   review.forEach((row) => {
      for (let key in juryReviewSchema) {
         let col = juryReviewSchema[key] - 1 // convert to zero-based index
         juryReview[col] = row[key]
      }
   })
   return juryReviewTable.appendRow(juryReview)
}

