/** helperColToIndex(char)
 * Convert a spreadsheet column letter into an array index.
 *
 * Note: does not currently support double letter columns. Supports only A - Z columns
 *
 * @param {char} col
 * @returns int
 */
function helperColToIndex(col) {
   if (!col) {
      col = this
   }
   const indexOffset = 65
   const lowerBound = indexOffset
   const upperBound = parseInt("Z".charCodeAt(0))
   const uc = col.toUpperCase()
   const colToAscii = uc.charCodeAt(0)
   if (colToAscii < lowerBound && colToAscii > upperBound) {
      // bad data
      console.error("Index out of bounds.")
   }
   return colToAscii - indexOffset
}
String.prototype.colToIndex = helperColToIndex

function isEmptyObject(obj) {
   return Object.keys(obj).length === 0
}