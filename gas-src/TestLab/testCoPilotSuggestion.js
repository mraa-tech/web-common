function testBuildTableSchema2(table = "Board Members", headers = 1) {
   Logger.log(`Table: ${table}, Headers: ${headers}`)

   const tableSheet = connect(MASTERMEMBER_ID).getSheetByName(table)
   const tableSchema = buildTableSchema(tableSheet, headers)

   for (let key in tableSchema) {
      Logger.log(`Table Built Schema; ${key}: ${tableSchema[key]}`)
   }
}
