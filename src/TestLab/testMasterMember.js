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
   const member = getMemberByEmail("jamesgreen.311@gmail.com")
   Logger.log(isEmptyObject(member) ? "No member found" : member)

   if (!isEmptyObject(member)) {
      Logger.log(
         `Is status active for ${member.firstname} ${member.lastname}? ${
            isMemberActive("jamesgreen.311@gmail.com") ? "yes" : "no"
         }`
      )
      Logger.log(
         `Is member an Exhibitor? ${
            isMemberExhibitor("jamesgreen.311@gmail.com") ? "yes" : "no"
         }`
      )
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

function testMemberRunAll() {
   testGetBoardMembers()
   testGetMemberByEmail()
   testGetDuesPayments()
}
