function getSecurityMetadata() {
   const securityMetadata = {
      name: "Security",
      type: "standard",
      headers: 2,
   }
   return securityMetadata
}

function getSecurityDB() {
   const conn = connect(MASTERMEMBER_ID)
   const securityMetadata = getSecurityMetadata()
   const securityTable = conn.getSheetByName(securityMetadata.name)
   const securitySchema = buildTableSchema(
      securityTable,
      securityMetadata.headers
   )
   const headers = securityMetadata.headers
   const startRow = headers + 1
   const startCol = 1
   const numRow = securityTable.getLastRow() - startRow + 1
   const numCol = securityTable.getLastColumn() - startCol + 1
   const security = securityTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   const s = []
   security.forEach((row) => {
      const s1 = {}
      for (let key in securitySchema) {
         let col = securitySchema[key] - 1 // convert to zero-based index
         s1[key] = row[col]
      }
      s.push(s1)
   })
   return s
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
 * Checks if the member has a valid token.
 * Returns true if the token is valid, false otherwise.
 *
 * @param {string} email
 * @param {string} token2
 * @returns boolean
 */
function doesMemberHaveValidToken(email, token2) {
   const token1 = doesMemberHaveToken(email)
   return token1 !== null && token1 === token2
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
   const numRow = 1
   const numCol = securityTable.getLastColumn()
   const now = new Date()
   // TODO - make days to expiration configurable
   const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7) // 7 days
   const newToken = generateToken()
   const securityData = [
      email,
      "member email",
      newToken,
      tokenExpiry.toLocaleDateString(),
   ]

   securityTable
      .getRange(startRow, startCol, numRow, numCol)
      .setValues([securityData])

   return securityData
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
   // TODO - make days to expiration configurable
   const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7) // 7 days
   const startRow = member.row
   const startCol = 1
   const numRow = 1
   const numCol = securityTable.getLastColumn()

   const securityData = [
      member.email,
      "member email",
      generateToken(),
      tokenExpiry.toLocaleDateString(),
   ]
   securityTable
      .getRange(startRow, startCol, numRow, numCol)
      .setValues([securityData])

   return securityData
}

/**
 * Determines if the security token has expired.
 *
 * @param {string} email
 * @returns boolean
 */
function hasSecurityTokenExpired(email) {
   const securityTableDef = masterTabDef("security")
   const conn = connect(MASTERMEMBER_ID)
   const securityTable = conn.getSheetByName(securityTableDef.name)
   const securitySchema = buildTableSchema(
      securityTable,
      securityTableDef.headers
   )
   const pkey = securitySchema.email - 1 // 0-based index
   const expireson = securitySchema.expireson - 1 // 0-based index
   const headers = securityTableDef.headers + 1
   const startRow = headers
   const startCol = 1

   const numRow = securityTable.getLastRow() - headers
   const numCol = securityTable.getLastColumn()
   const securityData = securityTable.getSheetValues(
      startRow,
      startCol,
      numRow,
      numCol
   )
   let hasExpired = true // assume expired

   const boardMember = isBoardMember(email)
   if (boardMember) {
      const member = securityData.filter(
         (m) => m[pkey].toLowerCase() === email.toLowerCase()
      )[0]
      const tokenExpiry = new Date(member[expireson])
      const now = new Date()
      hasExpired = tokenExpiry < now
   }

   return hasExpired
}
