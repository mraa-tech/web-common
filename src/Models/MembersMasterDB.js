/**
 * Contains the definition of all necessary tables in the master members spreadsheet.
 * For standard tables, use the buildSchema() function to build the schema from the header row.
 * For pivot tables, use of the schema property or the buildSchema() function should be decided by the developer.
 * For dashboard sheets, use the schema property.
 *
 * @param {object} table
 * @returns {object} table definition
 */
function masterTabDef(table) {
   const tables = {
      memberdirectory: {
         name: "Member Directory",
         type: "standard",
         headers: 2,
      },
      duespayments: {
         name: "Dues Payments",
         type: "standard",
         headers: 2,
         summary: {
            rows: 2,
            type: "total",
            schema: {
               text: 0,
               grossamount: 2,
               netamount: 3,
            },
         },
      },
      boardmembers: {
         name: "Board Members",
         type: "pivot",
         headers: 2,
      },
      security: {
         name: "Security",
         type: "dashboard",
         headers: 1,
      },
   }
   return tables[table]
}

function getSecurityMetadata() {
   const securityMetadata = masterTabDef("security")
   return securityMetadata
}

/**
 * Get the metadata for the member directory sheet.
 * Defines data about the member directory sheet that is needed to process the file.
 * @returns {object} Member Directory Metadata object
 */
function getMemberMetadata() {
   const memberMetadata = masterTabDef("memberdirectory")
   return memberMetadata
}

/**
 * Get the metadata for the dues payments sheet.
 * Defines data about the dues payments sheet that is needed to process the file.
 * @returns {object} Dues Payments Metadata object
 */
function getDuesPaymentsMetadata() {
   const duesPaymentsMetadata = masterTabDef("duespayments")
   return duesPaymentsMetadata
}

/**
 * Get the metadata for the board members sheet.
 * Defines data about the board members sheet that is needed to process the file.
 * @returns {object} Board Members Metadata object
 */
function getBoardMembersMetadata() {
   const boardMembersMetadata = masterTabDef("boardmembers")
   return boardMembersMetadata
}

/**
 * Get the dues payments from the master members spreadsheet
 *
 * @returns {object} Dues Payments object
 */
function getDuesPayments() {
   const duesPaymentsTableDef = masterTabDef("duespayments")
   const headers = duesPaymentsTableDef.headers
   const summary = duesPaymentsTableDef.summary

   const duesPaymentsTable = connect(MASTERMEMBER_ID).getSheetByName(
      duesPaymentsTableDef.name
   )
   const duesPaymentsSchema = buildTableSchema(duesPaymentsTable, headers)

   const startRow = headers + 1
   const endRow = duesPaymentsTable.getLastRow() - summary.rows
   const startCol = 1
   const endCol = duesPaymentsTable.getLastColumn()

   /**
    * Get the dues payments data from the dues payments table.
    */
   const duesPaymentsData = duesPaymentsTable.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   /**
    * Get the dues totals data from the summary rows.
    */
   const duesTotalsData = duesPaymentsTable.getSheetValues(
      endRow + 1,
      startCol,
      summary.rows,
      startCol + summary.schema.netamount + 1
   )

   /**
    * Builds an array of dues payment objects from the dues payments data.
    * @returns {array} Dues payment objects
    */
   let duesPaymentsArr = []
   for (let row = 0; row < duesPaymentsData.length; row++) {
      let duesPayment = {}
      for (let key in duesPaymentsSchema) {
         let col = duesPaymentsSchema[key] - 1 // zero based index
         duesPayment[key] = duesPaymentsData[row][col]
      }
      duesPaymentsArr.push(duesPayment)
   }

   /**
    * Builds an array of dues totals objects from the dues totals data.
    * @returns {array} Dues totals objects
    */
   let duesTotalsArr = []
   for (let row = 0; row < duesTotalsData.length; row++) {
      let duesTotal = {}
      for (let key in summary.schema) {
         let col = summary.schema[key]
         duesTotal[key] = duesTotalsData[row][col]
      }
      duesTotalsArr.push(duesTotal)
   }

   /**
    * Builds an object of dues payments and totals
    * @returns {object} Dues payments and totals
    */
   const duesPaymentsAll = {
      data: duesPaymentsArr,
      totals: duesTotalsArr,
   }

   return duesPaymentsAll
}

/**
 * Gets a member from the master spreadsheet by email (primary key)
 *
 * @param {string} email
 * @returns {object} member object
 */
function getMemberByEmail(email) {
   const memberTablesDef = masterTabDef("memberdirectory")
   const conn = connect(MASTERMEMBER_ID)
   const membersTable = conn.getSheetByName(memberTablesDef.name)
   const memberSchema = buildTableSchema(membersTable, memberTablesDef.headers)
   const emailPos = memberSchema.email - 1 // 0-based index
   const headers = memberTablesDef.headers
   const startRow = headers + 1 // skip the header row
   const startCol = 1
   const endRow = membersTable.getLastRow()
   const endCol = membersTable.getLastColumn()

   const membersData = membersTable.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )

   /*
    * Filter the data to find the member with the matching email address.
    * The data variable is an array of arrays.
    * The member data is in the first element of the array.
    */
   const member = membersData.filter(
      (m) => m[emailPos].toLowerCase() === email.toLowerCase()
   )[0]

   let m = {}
   if (member !== undefined) {
      /**
       * Convert the array of data to an object
       */
      for (let key in memberSchema) {
         let col = memberSchema[key] - 1 // convert to zero-based index
         m[key] = member[col]
      }
   }

   return m
}

/**
 * Retrieve a list of board members from the Master Member spreadsheet pivot table.
 *
 * @returns array of board members
 */
function getBoardMembers() {
   const boardMembersTableDef = masterTabDef("boardmembers")
   const conn = connect(MASTERMEMBER_ID)
   const boardMembersTable = conn.getSheetByName(boardMembersTableDef.name)
   const boardMembersSchema = buildTableSchema(
      boardMembersTable,
      boardMembersTableDef.headers
   )
   const headers = boardMembersTableDef.headers
   const startRow = headers + 1
   const numRows = boardMembersTable.getLastRow() - headers // skip the header rows
   const startCol = 1
   const numCols = boardMembersTable.getLastColumn()

   const boardMembersData = boardMembersTable.getSheetValues(
      startRow,
      startCol,
      numRows,
      numCols
   )

   /**
    * Convert the array of data to an object
    * The boardMembersData variable is an array of arrays.
    */
   let boardMembers = []
   for (let row = 0; row < numRows; row++) {
      let boardMember = {}
      for (let key in boardMembersSchema) {
         let fldPos = boardMembersSchema[key] - 1 // zero based index
         boardMember[key] = boardMembersData[row][fldPos]
      }
      boardMembers.push(boardMember)
   }
   return boardMembers
}

function getBoardMember(email) {
   const boardMembers = getBoardMembers()
   return boardMembers.filter((m) => m.email === email)
}

/**
 * Validates the email address of the member.
 * @param {string} email
 * @returns boollean
 */
function isMember(email) {
   const member = getMemberByEmail(email)
   return member !== undefined
}

/**
 * Returns true if the member is active, false otherwise
 *
 * @param {string} email
 * @returns boolean
 */
function isMemberActive(email) {
   const member = getMemberByEmail(email)

   return member.status.toLowerCase() === "active"
}

/**
 * Returns true if the member is an exhibitor, false otherwise
 *
 * @param {string} email
 * @returns
 */
function isMemberExhibitor(email) {
   const member = getMemberByEmail(email)

   return member.membership.toLowerCase() === "exhibiting"
}

function isBoardMember(email) {
   const boardMembers = getBoardMembers()
   return boardMembers.some((m) => m.email === email)
}

/**
 * Checks if the member has a token in the security table.
 * Returns the token if it exists, otherwise returns null.
 *
 * @param {string} email
 * @returns string | null
 */
function doesMemberHaveToken(email) {
   const securityTableDef = masterTabDef("security")
   const securityTable = connect(MASTERMEMBER_ID).getSheetByName(
      securityTableDef.name
   )
   const securitySchema = buildTableSchema(
      securityTable,
      securityTableDef.headers
   )
   const pkey = securitySchema.email - 1 // 0-based index
   const startRow = securityTableDef.headers + 1
   const startCol = 1
   const endRow = securityTable.getLastRow()
   const endCol = securityTable.getLastColumn()
   const securityData = securityTable.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )
   const member = securityData.filter(
      (m) => m[pkey].toLowerCase() === email.toLowerCase()
   )[0]

   return member !== undefined ? member[securitySchema.token - 1] : null
}

/**
 * Get the security token for the member.
 * Returns the member's security record with token.
 * The row number of the security record where the token is stored is returned in the schema.
 * The row number is used to update the token if it has expired.
 *
 * @param {string} email
 * @returns object
 */
function getMemberSecurityToken(email) {
   const securityTableDef = masterTabDef("security")
   const securityTable = connect(MASTERMEMBER_ID).getSheetByName(
      securityTableDef.name
   )
   const securitySchema = buildTableSchema(
      securityTable,
      securityTableDef.headers
   )
   securitySchema.row = Object.keys(securitySchema).length + 1 // add row number to schema

   const pkey = securitySchema.email - 1 // 0-based index
   const startRow = securityTableDef.headers + 1
   const startCol = 1
   const endRow = securityTable.getLastRow()
   const endCol = securityTable.getLastColumn()
   const securityData = securityTable.getSheetValues(
      startRow,
      startCol,
      endRow,
      endCol
   )
   const member = securityData.filter(function (m, i) {
      if (m[pkey].toLowerCase() === email.toLowerCase()) {
         m.push(i + 1 + securityTableDef.headers) // add row number to array, 1-based index, plus header row
         return m
      }
   })

   const m = {}
   if (member !== undefined && member.length > 0) {
      /**
       * Convert the array of data to an object
       */
      for (let key in securitySchema) {
         let col = securitySchema[key] - 1 // convert to zero-based index
         m[key] = member[0][col]
      }
   }
   return m
}

/**
 * Adds a security token for the member requested to the security table.
 * Token expiration is hard-coded to 7 days.
 *
 * @param {string} email
 * @returns void
 */
function addSecurityToken(email) {
   const securityTableDef = masterTabDef("security")
   const conn = connect(MASTERMEMBER_ID)
   const securityTable = conn.getSheetByName(securityTableDef.name)
   const securitySchema = buildTableSchema(
      securityTable,
      securityTableDef.headers
   )
   const startRow = securityTable.getLastRow() + 1
   const startCol = 1
   const endCol = securityTable.getLastColumn()
   const now = new Date()
   // TODO - make token expiration configurable
   const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7) // 7 days
   const securityData = [
      email,
      generateToken(),
      tokenExpiry.toLocaleDateString(),
   ]

   securityTable
      .getRange(startRow, startCol, 1, endCol)
      .setValues([securityData])

   return
}

/**
 * Generates a new token and resets the expiration date.
 *
 * @param {object} member
 * @returns {array} range of data updated
 */
function renewSecurityToken(member) {
   const securityTableDef = masterTabDef("security")
   const conn = connect(MASTERMEMBER_ID)
   const securityTable = conn.getSheetByName(securityTableDef.name)
   const securitySchema = buildTableSchema(
      securityTable,
      securityTableDef.headers
   )
   const pkey = securitySchema.email - 1 // 0-based index
   const token = generateToken()
   const now = new Date()
   const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7) // 7 days
   const startRow = member.row
   const startCol = 1
   const endRow = 1
   const endCol = securityTable.getLastColumn()
   const securityData = [
      member.email,
      generateToken(),
      tokenExpiry.toLocaleDateString(),
   ]
   securityTable
      .getRange(startRow, startCol, 1, endCol)
      .setValues([securityData])

   return securityData
}