function testBuildTableSchema() {
   const membersTable = masterTabDef("boardmembers")
   const membersSchema = buildTableSchema(
      MASTERMEMBER_ID,
      membersTable.name,
      membersTable.headers
   )
   Logger.log(membersSchema)
   Logger.log(membersSchema.boardrole)
   Logger.log(membersSchema.firstname)
}

function testGetMemberFldPos() {
   testGetFldPos("email")
   testGetFldPos("lastname")
}

function testGetFldPos(fldName) {
   const membersTable = masterTabDef("memberdirectory")
   const membersSchema = membersTable.schema
   const fldPos = getFldPos(membersSchema, fldName)
   Logger.log(fldPos)
}

function testGetTables() {
   const membersTable = masterTabDef("memberdirectory")
   Logger.log(membersTable)

   const duesTable = masterTabDef("duespayments")
   Logger.log(duesTable)

   const boardTable = masterTabDef("boardmembers")
   Logger.log(boardTable)

   const membersSchema = membersTable.schema
   Logger.log(membersSchema)

   const cfeExhibitsTable = cfeTabDef("exhibits")
   Logger.log(cfeExhibitsTable)

   const cfeConfigTable = cfeTabDef("config")
   Logger.log(cfeConfigTable)

   const cfeAppSettingsTable = cfeTabDef("appsettings")
   Logger.log(cfeAppSettingsTable)

   const cfeOpenCallsTable = cfeTabDef("opencalls")
   Logger.log(cfeOpenCallsTable)

   const cfePaymentsTable = cfeTabDef("payments")
   Logger.log(cfePaymentsTable)

   const cfePaymentDashboardTable = cfeTabDef("paymentdashboard")
   Logger.log(cfePaymentDashboardTable)
}
