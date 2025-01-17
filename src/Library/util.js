/**
 * Generates a random nearly unique string to be used as a token.
 * @see https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21175230#21175230
 * @returns {string} token
 */
function generateToken() {
   const token = Utilities.getUuid().split("-")[0].toUpperCase()
   return token
}

/**
 * Check if an object is empty.
 * @param {object} obj
 * @returns {boolean} True if object is empty, false otherwise.
 */
function isEmptyObject(obj) {
   return Object.keys(obj).length === 0
}
