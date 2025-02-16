function runTest() {
   testColumnToIndex("az")
}

/**
 * Not working. May have to abandon this approach.
 * Process is intended to convert a spreadsheet column letter to an array index when columns exceed Z, suchas AA, AB, AC, etc.
 */
function testColumnToIndex(col) {
   const arr = col.split("").reverse()
   // let index = 0

   // let arrIndex = 0
   // let charIndex = 0
   // let base = 26
   // let lowerBound = 9

   // for (let arrIndex = 0; arrIndex < arr.length; arrIndex++) {
   //    index += parseInt(arr[arrIndex], 36) * arrIndex * base - lowerBound
   // }
   const n = arr.map((c, i) => parseInt(c, 36) + i * 26 - 9)
   const index = n[0]
   Logger.log(index)
}
