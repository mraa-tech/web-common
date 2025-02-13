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
      },
      reviewers: {
         name: "Applicants Total Reviewers",
         type: "pivot",
         headers: 1,
         footer: {
            rows: 1,
            columns: 3,
            text: "Total",
         },
      },
   }
   return tables[table]
}

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

function getJuryReview(filter = "all") {
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