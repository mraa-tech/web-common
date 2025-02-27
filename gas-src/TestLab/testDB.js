function testGetMasterMemberId() {
   const masterMemberId = getMasterMemberId()
   Logger.log(`Master Member ID: ${masterMemberId}`)
}

function testGetCallForEntriesId() {
   const callForEntriesId = getCallForEntriesId()
   Logger.log(`Call For Entries ID: ${callForEntriesId}`)
}

function testBuildTableSchema() {
   const testdata = [
      {
         testname: "Build table schema with labels",
         table: {
            name: masterTabDef("memberdirectory").name,
            headers: 2,
            withLabels: true,
         },
         verbose: false,
         filter: "n/a",
         expectedresult:
            getTableColumnCount(
               MASTERMEMBER_ID,
               masterTabDef("memberdirectory").name
            ) - 1, // table has one blank column that won't be included in the schema

         // rows after archiving an applicant, archived record will be removed from the application detail table
         skip: false,
      },
      {
         testname: "Build table schema without labels",
         table: {
            name: masterTabDef("memberdirectory").name,
            headers: 2,
            withLabels: false,
         },
         verbose: false,
         filter: "n/a",
         expectedresult:
            getTableColumnCount(
               MASTERMEMBER_ID,
               masterTabDef("memberdirectory").name
            ) - 1, // table has one blank column that won't be included in the schema

         // rows after archiving an applicant, archived record will be removed from the application detail table
         skip: false,
      },
   ]

   const conn = connect(MASTERMEMBER_ID)

   testdata.forEach((testdata, t) => {
      if (testdata.skip) {
         Logger.log(`Test: ${testdata.testname}: > SKIPPED`)
         return
      }
      const table = conn.getSheetByName(testdata.table.name)
      const schema = buildTableSchema(
         table,
         testdata.table.headers,
         testdata.table.withLabels
      )
      if (t === 0) {
         Logger.log(schema.email.colToIndex())
         Logger.log(schema.email.label)
      }
      const result = Object.keys(schema).length
      const assert = result === testdata.expectedresult ? "Passed" : "FAILED"
      Logger.log(`Test: ${testdata.testname}: > ${assert}`)
      Logger.log(
         `================= End of test ${++t}) ${
            testdata.testname
         } =================`
      )
   })
}

function testGetFldPos(fldName) {
   const membersTable = masterTabDef("memberdirectory")
   const membersSchema = membersTable.schema
   const fldPos = getFldPos(membersSchema, fldName)
   Logger.log(
      `Calculated field position for ${fldName} in the ${membersTable.name}: ${fldPos}`
   )
}

function testGetTables() {
   const membersTable = masterTabDef("memberdirectory")
   Logger.log(
      `Member Directory Schema; Name: ${membersTable.name}, Type: ${membersTable.type}, Headers: ${membersTable.headers}`
   )

   const duesTable = masterTabDef("duespayments")
   Logger.log(
      `Dues Payments Schema; Name: ${duesTable.name}, Type: ${duesTable.type}, Headers: ${duesTable.headers}`
   )

   const boardTable = masterTabDef("boardmembers")
   Logger.log(
      `Board Members Schema; Name; ${boardTable.name}, Type: ${boardTable.type}, Headers: ${boardTable.headers}`
   )

   const cfeExhibitsTable = cfeTabDef("exhibits")
   for (let key in cfeExhibitsTable) {
      Logger.log(`Exhibits Metadata Schema; ${key}: ${cfeExhibitsTable[key]}`)
   }

   const cfeConfigTable = cfeTabDef("config")
   for (let key in cfeConfigTable) {
      Logger.log(`CFE Config Metadata Schema; ${key}: ${cfeConfigTable[key]}`)
   }

   const cfeAppSettingsTable = cfeTabDef("appsettings")
   for (let key in cfeAppSettingsTable) {
      Logger.log(
         `CFE App Settings Metadata Schema; ${key}: ${cfeAppSettingsTable[key]}`
      )
   }

   const cfeOpenCallsTable = cfeTabDef("opencalls")
   for (let key in cfeOpenCallsTable) {
      Logger.log(
         `CFE Open Calls Metadata Schema; ${key}: ${cfeOpenCallsTable[key]}`
      )
   }

   const cfePaymentsTable = cfeTabDef("payments")
   for (let key in cfePaymentsTable) {
      Logger.log(
         `CFE Payments Metadata Schema; ${key}: ${cfePaymentsTable[key]}`
      )
   }

   const cfePaymentDashboardTable = cfeTabDef("paymentdashboard")
   for (let key in cfePaymentDashboardTable) {
      Logger.log(
         `CFE Payment Dashboard Metadata Schema; ${key}: ${cfePaymentDashboardTable[key]}`
      )
   }
}

function testDBRunAll() {
   testGetMasterMemberId()
   testGetCallForEntriesId()
   testBuildTableSchema()
   testGetTables()
}
