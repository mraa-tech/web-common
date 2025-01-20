function testIsMemberExhibitor() {
   const goodEmail = "jamesgreen.311@gmail.com"
   const badEmail = "jamesgreen@gmail.com"

   const exhibitor = isMember(badEmail) && isMemberExhibitor(badEmail)
   Logger.log(exhibitor)
}

function testIsMemberActive() {
   const goodEmail = "jamesgreen.311@gmail.com"
   const badEmail = "jamesgreen@gmail.com"

   const active = isMember(badEmail) && isMemberActive(badEmail)
   Logger.log(active)
}

function testIsMember() {
   const goodEmail = "jamesgreen.311@gmail.com"
   const badEmail = "jamesgreen@gmail.com"

   const member = isMember(badEmail)
   Logger.log(member)
}

function testDoesMemberHaveToken() {
   const result = doesMemberHaveToken("jamesgreen.311@gmail.com")
   Logger.log(result)
}

function testIsBoardMember() {
   const email = "jamesgreen.311@gmail.com"
   const bm = isBoardMember(email)
   Logger.log(bm)

   if (bm) {
      const boardMember = getBoardMember(email)
      Logger.log(boardMember)
   } else {
      Logger.log("Not a board member")
   }
}

function testGetBoardMembers() {
   const boardMembers = getBoardMembers()
   if (!isEmptyObject(boardMembers)) {
      for (let i = 0; i < boardMembers.length; i++) {
         Logger.log(boardMembers[i].boardrole)
      }
   }
   Logger.log(boardMembers)
}

function testGetMemberSecurityToken() {
   const email = "jamesgreen.311@gmail.com"
   const member = getMemberSecurityToken(email)
   Logger.log(isEmptyObject(member) ? "Member not found" : member.token)
   Logger.log(
      isEmptyObject(member)
         ? addSecurityToken(email)
         : renewSecurityToken(member)
   )
}

function testDoesMemberHaveToken() {
   const token = doesMemberHaveToken("jamesgreen.311@gmail.com")
   Logger.log(token)
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

function testMemberRunAll() {
   testGetBoardMembers()
   testGetMemberByEmail()
   testGetDuesPayments()
}
