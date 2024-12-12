// Id for Membership Spreadsheet File
const MASTERMEMBER_ID = "1puqturm6WCBtfL3uaT_YICKHI9StLcPA4SosBuMs4ZY"

function masterTabDef(table) {
   const tables = {
      memberdirectory: {
         name: "Member Directory",
         type: "standard",
         headers: 2,
         schema: {
            email: "a", // primary key
            firstname: "b",
            lastname: "c",
            preferredname: "d",
            status: "e",
            streetaddress: "f",
            streetaddressextended: "g",
            city: "h",
            state: "i",
            zipcode: "j",
            primarycontactnumber: "k",
            alternatecontactnumber: "l",
            membership: "m",
            jurydate: "n",
            medium: "o", // not currently used
            datejoined: "p", // not currently used
            artistsignature: "q", // not currently used
            businessname: "r", // not currently used
            comments: "s",
            boardmember: "t", // binary
            boardrole: "u", // list
            jurycommittee: "v", // binary
            website: "w",
         },
      },
      duespayments: {
         name: "Dues Payments",
         type: "standard",
         headers: 2,
         schema: {
            email: "a", // primary key
            paymentdate: "b", // date
            grossamount: "c",
            netamount: "d", // calculated
            expires: "e",
            paymentmethod: "f", // list
            comments: "g",
            lastname: "h", // calculated lookup
            firstname: "i", // calculated lookup
            membership: "j", // calculated lookup
            phonenumber: "k", // calculated lookup
            businessname: "l", // calculated lookup
         },
      },
      boardmembers: {
         name: "Board Members",
         type: "pivot",
         headers: 2,
         schema: {
            boardrole: "a",
            lastnamename: "b",
            firstname: "c",
            email: "d",
            total: "e",
         },
      },
   }
   return tables[table]
}

/**
 * Gets a member from the master spreadsheet by email (primary key)
 *
 * @param {string} email
 * @returns [] array of member data
 */
function getMemberByEmail(email) {
   const memberTablesDef = masterTabDef("memberdirectory")
   const membersTable = connect(MASTERMEMBER_ID).getSheetByName(
      memberTablesDef.name
   )
   const memberSchema = memberTablesDef.schema
   const emailPos = getFldPos(memberSchema, "email")
   const headers = memberTablesDef.headers
   const startRow = headers + 1
   const startCol = 1
   const data = membersTable
      .getRange(
         startRow,
         startCol,
         membersTable.getLastRow() - headers,
         membersTable.getLastColumn()
      )
      .getDisplayValues()

   /*
    * Filter the data to find the member with the matching email address.
    * The data variable is an array of arrays.
    * The member data is in the first element of the array.
    */
   const member = data.filter(
      (m) => m[emailPos].toLowerCase() === email.toLowerCase()
   )[0]

   let m = {}
   if (member !== undefined) {
      /**
       * Convert the array of data to an object
       */
      for (let key in memberSchema) {
         m[key] = member[memberSchema[key].colToIndex()]
      }
   }

   return m
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
