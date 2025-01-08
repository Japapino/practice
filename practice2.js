/**
 * @param {number} N - length
 * @param {string} C - string to be parsed
 * @param {number} X - min dist
 * @param {number} Y - max dist
 * @return {number}
 */
function getArtisticPhotographCount(N, C, X, Y) {
  // PAB
  // BAP
  // distance between P and A is between X and Y (inclusive) f-> P_i - A_i < |X - Y|
  // distance between A and B is between X and Y (inclusive)

  // return the number of artistic photographs that can be taken at the set.
  // photo sare different if any of the P, A, or B cells are moved.

  // APABA
  // 1,2 = art = 1;

  // we can use 2 pointer to crawl the string, the min window length can be `(X*2) + 1` and `(Y*2) + 1`;

  let count = 0;
  let len = N;

  for (let i = 1; i < len; i++) {
    if (C[i] != "A") continue;
    let l = i - X;
    // expand from center
    for (; l >= i - Y && l >= 0; l--) {
      let r = i + X;

      // for each P or B we find going left,
      // we will iterate R until we find a match,
      if (C[l] != "P" && C[l] != "B") continue;

      // find which letter we are missing
      let other = C[l] == "P" ? "B" : "P";

      // search for missing letter on the right
      for (; r < len && r <= i + Y; r++) {
        if (C[r] == other) {
          count++;
        }
      }
    }
  }

  return count;
}

let C = ".PBAAP.B";
let N = C.length;

console.log(getArtisticPhotographCount(N, C, 1, 3));
