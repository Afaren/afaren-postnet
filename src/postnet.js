/**
 * Created by afaren on 7/28/16.
 */
const vectorTable = [
  '||:::',
  ':::||',
  '::|:|',
  '::||:',
  ':|::|',
  ':|:|:',
  ':||::',
  '|:::|',
  '|::|:',
  '|:|::'
];


function getZipcodeCells(zipcode) {
  return zipcode.split('')
    .map(i => parseInt(i))
    .filter(i => !Object.is(i, NaN));
}

function buildBarcodeBody(zipcodeCells, checkDigit) {
  return [].apply
    .concat([], zipcodeCells, checkDigit)
    .map(i => vectorTable[i])
    .join('');
}

function addFrameToBarcodeBody(barcodeBody) {
  return `|${barcodeBody}|`;
}

function zipcodeHasLegalLength(zipcodeCells) {
  const length = zipcodeCells.length;
  return length === 5 || length === 9;
}

function calculateCheckDigit(zipcodeCells) {

  let digit = getSum(zipcodeCells) % 10;
  return digit > 0 ? 10 - digit : 0;

  function getSum(zipcodeCells) {
    return zipcodeCells.reduce((acc, cur) => acc + cur);
  }

}


function zipcodeToBarcode(zipcode) {
  const zipcodeCells = getZipcodeCells(zipcode);

  if (!zipcodeHasLegalLength(zipcodeCells))
    return {errMsg: 'length is illegal', barcode: null};

  const checkDigit = calculateCheckDigit(zipcodeCells);
  const barcodeBody = buildBarcodeBody(zipcodeCells, checkDigit);
  const barcodeWithFrame = addFrameToBarcodeBody(barcodeBody);
  return barcodeWithFrame;
}


module.exports = {
  getZipcodeCells,
  buildBarcodeBody,
  calculateCheckDigit,
  zipcodeToBarcode,


};