function testGetDuesPayments() {
   const duesPayments = getDuesPayments()
   Logger.log(duesPayments.data[0]) // first dues payment
   Logger.log(duesPayments.totals)
}

function testGetMemberByEmail() {
   const member = getMemberByEmail("jamesgreen.311@gmail.com")
   Logger.log(isEmptyObject(member) ? "No member found" : member)

   if (!isEmptyObject(member)) {
      Logger.log(`Active ${isMemberActive("jamesgreen.311@gmail.com")}`)
      Logger.log(
         `Member is an Exhibitor: ${isMemberExhibitor(
            "jamesgreen.311@gmail.com"
         )}`
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
