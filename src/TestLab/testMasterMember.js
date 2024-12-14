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
   Logger.log(boardMembers)
}

function testMemberRunAll() {
   testGetBoardMembers()
   testGetMemberByEmail()
}