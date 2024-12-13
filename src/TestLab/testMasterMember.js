function testGetMemberByEmail() {
   const member = getMemberByEmail("jamesgreen.311@gmail.com")
   Logger.log(isEmptyObject(member) ? "No member found" : member)

   Logger.log(isMemberActive("jamesgreen.311@gmail.com"))
   Logger.log(isMemberExhibitor("jamesgreen.311@gmail.com"))
}

function testGetBoardMembers() {
   const boardMembers = getBoardMembers()
   Logger.log(boardMembers)
}
