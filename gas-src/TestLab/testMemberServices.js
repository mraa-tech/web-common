function testAddSecurityToken() {
   const bm = getBoardMembers()

   bm.forEach((bm) => {
      const token = addSecurityToken(bm.email)
      Logger.log("Token Created: %s", token)
   })
}

function testHasSecurityTokenExpired() {
   const testData = {
      expiredboardmemberemail: "dorrzeigler@gmail.com",
      expiredtoken: "E987F43",
      validboardmemberemail: "jamesgreen.311@gmail.com",
      validtoken: "CA595D59",
      notboardmemberemail: "bowles3@gmail.com",
   }
   const expired = hasSecurityTokenExpired(testData.notboardmemberemail)
   Logger.log("Token expired: %s", expired)
}

function testSecureAccess() {
   const testData = {
      boardmemberemail: "jamesgreen.311@gmail.com",
      goodmemberemail: "bowles3@gmail.com", // not a board member
      badmemberemail: "jackdawson@gmail.com", // not a member
      goodtoken: "CA595D59",
      badtoken: "A123B456",
      invalidtoken: "C56D789", // good token, but not for this member
      expiredtoken: "E987F43", // good token, but expired
   }
   const bm = isBoardMember(testData.boardmemberemail)
   const validtoken = doesMemberHaveValidToken(
      testData.boardmemberemail,
      testData.goodtoken
   )
   Logger.log("Valid board member, %s and valid token, %s", bm, validtoken)
   const happyPath =
      isBoardMember(testData.boardmemberemail) &&
      doesMemberHaveValidToken(testData.boardmemberemail, testData.goodtoken) // test 1
   const validBoardMemberInvalidToken =
      isBoardMember(testData.boardmemberemail) &&
      doesMemberHaveValidToken(testData.boardmemberemail, testData.badtoken) // test 2
   const validMemberValidToken =
      isBoardMember(testData.goodmemberemail) && testData.goodtoken // test 3
   const invalidMemberValidToken =
      isBoardMember(testData.badmemberemail) && testData.goodtoken // test 4
   const validMemberInvalidToken =
      isBoardMember(testData.goodmemberemail) && testData.badtoken // test 5
   const invalidMemberInvalidToken =
      isBoardMember(testData.badmemberemail) && testData.badtoken // test 6
   const validBoardMemberTokenExpired =
      isBoardMember(testData.boardmemberemail) &&
      hasSecurityTokenExpired(testData.expiredtoken) // test 7

   Logger.log(
      "Test 1: Happy Path, expect true: %s",
      happyPath ? "pass" : "fail"
   )
   Logger.log(
      "Test 2: validBoardMemberInvalidToken, expect false: %s",
      !validBoardMemberInvalidToken ? "pass" : "fail"
   )
   Logger.log(
      "Test 3: validMemberValidToken, expect false: %s",
      !validMemberValidToken ? "pass" : "fail"
   )
   Logger.log(
      "Test 4: invalidMemberValidToken, expect false: %s",
      !invalidMemberValidToken ? "pass" : "fail"
   )
   Logger.log(
      "Test 5: validMemberInvalidToken, expect false: %s",
      !validMemberInvalidToken ? "pass" : "fail"
   )
   Logger.log(
      "Test 6: invalidMemberInvalidToken, expect false: %s",
      !invalidMemberInvalidToken ? "pass" : "fail"
   )
}

function testGetMembersEmailList() {
   const emailList = getMembersEmailList("membership")
   Logger.log(emailList)
}
