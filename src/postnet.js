/**
 * Created by afaren on 7/28/16.
 */

function getZipcodeCells(zipcode) {
  return zipcode.split('').map(Number).filter(i => !Object.is(i, NaN));
}


module.exports = {
  getZipcodeCells
}