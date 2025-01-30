function testIsMemberExhibitor() {
   const testData = [
      {
         testName: "Exhibitor with Good Email Address",
         email: "jamesgreen.311@gmail.com",
         expectedResult: true,
      },
      {
         testName: "Exhibitor with Bad Email Address",
         email: "jimgreen.311@gmail.com",
         expectedResult: false,
      },
      {
         testName: "Exhibitor with Case Sensitive Email Address",
         email: "Jamesgreen.311@gmail.com",
         expectedResult: true,
      },
   ]

   for (r in testData) {
      const test = testData[r]
      const result = isMember(test.email) && isMemberExhibitor(test.email)
      const assert = result === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
}

function testIsMemberActive() {
   const testData = [
      {
         testName: "Active Member with Good Email Address",
         email: "jamesgreen.311@gmail.com",
         expectedResult: true,
      },
      {
         testName: "Active Member with Bad Email Address",
         email: "jimgreen.311@gmail.com",
         expectedResult: false,
      },
      {
         testName: "Active Member with Case Sensitive Email Address",
         email: "Jamesgreen.311@gmail.com",
         expectedResult: true,
      },
   ]

   for (r in testData) {
      const test = testData[r]
      const result = isMember(test.email) && isMemberActive(test.email)
      const assert = result === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
}

function testIsMember() {
   const testData = [
      {
         testName: "Member with Good Email Address",
         email: "jamesgreen.311@gmail.com",
         expectedResult: true,
      },
      {
         testName: "Member with Bad Email Address",
         email: "jimgreen.311@gmail.com",
         expectedResult: false,
      },
      {
         testName: "Member with Case Sensitive Email Address",
         email: "Jamesgreen.311@gmail.com",
         expectedResult: true,
      },
   ]
   for (r in testData) {
      const test = testData[r]
      const result = isMember(test.email)
      const assert = result === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
}

function testDoesMemberHaveToken() {
   const testData = [
      {
         testName: "Member with Good Email Address",
         email: "jamesgreen.311@gmail.com",
         expectedResult: "7266F104",
      },
      {
         testName: "Member with Bad Email Address",
         email: "jimgreen.311@gmail.com",
         expectedResult: null,
      },
      {
         testName: "Member with Case Sensitive Email Address",
         email: "Jamesgreen.311@gmail.com",
         expectedResult: "7266F104",
      },
   ]
   for (r in testData) {
      const test = testData[r]
      const result = doesMemberHaveToken(test.email)
      const assert = result === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
}

function testIsBoardMember() {
   const testData = [
      {
         testName: "Board Member with Good Email Address",
         email: "jamesgreen.311@gmail.com",
         expectedResult: true,
      },
      {
         testName: "Board Member with Bad Email Address",
         email: "jimgreen.311@gmail.com",
         expectedResult: false,
      },
      {
         testName: "Board Member with Case Sensitive Email Address",
         email: "Jamesgreen.311@gmail.com",
         expectedResult: true,
      },
   ]
   for (r in testData) {
      const test = testData[r]
      const result = isBoardMember(test.email)
      const assert = result === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
}

function testGetBoardMembers() {
   const testData = [
      {
         testName: "Board Members",
         expectedResult: typeof {},
      },
   ]
   for (r in testData) {
      const test = testData[r]
      const result = typeof getBoardMembers()
      const assert = result === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
   const boardMembers = getBoardMembers()
   if (!isEmptyObject(boardMembers)) {
      for (let i = 0; i < boardMembers.length; i++) {
         Logger.log(boardMembers[i].boardrole)
      }
   }
   Logger.log(boardMembers)
}

function testGetMemberSecurityToken() {
   const testData = [
      {
         testName: "Member with Good Email Address",
         email: "jamesgreen.311@gmail.com",
         expectedResult: "7266F104",
      },
      {
         testName: "Member with Bad Email Address",
         email: "jimgreen.311@gmail.com",
         expectedResult: undefined,
      },
      {
         testName: "Member with Case Sensitive Email Address",
         email: "Jamesgreen.311@gmail.com",
         expectedResult: "7266F104",
      },
   ]
   for (r in testData) {
      const test = testData[r]
      const result = getMemberSecurityToken(test.email)
      const assert = result.token === test.expectedResult ? "Pass" : "Fail"
      Logger.log(`${test.testName} > ${assert}`)
   }
}

function testGetDuesPayments() {
   const duesPayments = getDuesPayments()
   const data = duesPayments.data
   const totals = duesPayments.totals

   for (let i = 0; i < data.length; i++) {
      Logger.log(data[i].lastname)
   }

   for (let i = 0; i < totals.length; i++) {
      Logger.log(totals[i].netamount.toFixed(2))
   }

   Logger.log(duesPayments.data[0]) // first dues payment
   Logger.log(duesPayments.totals)
}

function testGetMemberByEmail() {
   const email = "jamesgreen.311@gmail.com"
   const member = getMemberByEmail(email)
   Logger.log(isEmptyObject(member) ? "No member found" : member)

   if (!isEmptyObject(member)) {
      Logger.log(
         `Is status active for ${member.firstname} ${member.lastname}? ${
            isMemberActive(email) ? "yes" : "no"
         }`
      )
      Logger.log(
         `Is member an Exhibitor? ${isMemberExhibitor(email) ? "yes" : "no"}`
      )
   }
}

function testMasterMemberRunAll() {
   testIsMember()
   testIsMemberActive()
   testIsMemberExhibitor()
   testIsBoardMember()
   testDoesMemberHaveToken()
   testGetMemberSecurityToken()
   testGetBoardMembers()
   testGetMemberByEmail()
   testGetDuesPayments()
}
