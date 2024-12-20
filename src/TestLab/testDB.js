function testDBRunAll() {
   testGetMasterMemberId()
   testGetCallForEntriesId()
   testBuildTableSchema("Member Directory", 2)

   testGetTables()
}

function testGetMasterMemberId() {
   const masterMemberId = getMasterMemberId()
   Logger.log(`Master Member ID: ${masterMemberId}`)
}

function testGetCallForEntriesId() {
   const callForEntriesId = getCallForEntriesId()
   Logger.log(`Call For Entries ID: ${callForEntriesId}`)
}

function testBuildTableSchema(table, headers = 1) {
   Logger.log(`Table: ${table}, Headers: ${headers}`)
   const tableSheet = connect(MASTERMEMBER_ID).getSheetByName(table)

   const tableSchema = buildTableSchema(tableSheet, headers)
   for (let key in tableSchema) {
      Logger.log(`Table Built Schema; ${key}: ${tableSchema[key]}`)
   }
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
