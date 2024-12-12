function testGetMemberByEmail() {
   const member = getMemberByEmail("jamesgreen.311@gmail.com")
   Logger.log(member ? member : "No member found")

   const statusFldPos = getFldPos(
      masterTabDef("memberdirectory").schema,
      "status"
   )
   const statusMsg = statusFldPos
      ? `Status Index: ${statusFldPos} `
      : "Status not found"
   Logger.log(`${statusMsg}`)

   Logger.log(`Active: ${isMemberActive("jamesgreen.311@gmail.com")}`)
   Logger.log(`Exhibitor: ${isMemberExhibitor("jamesgreen.311@gmail.com")}`)
}
