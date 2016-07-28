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
  return zipcodeCells
    .concat(checkDigit)
    .map(i => vectorTable[i])
    .join(' ');
}

function addFrameToBarcodeBody(barcodeBody) {
  return `| ${barcodeBody} |`;
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
  return {errMsg: null, barcode: barcodeWithFrame};
}

function isLegalBarcode(barcode) {
  return true;
}

function removeFrame(barcode) {
  return barcode.substring(2, barcode.length - 2); // 注意边界
}

function getBarcodeCells(barcodeWithoutFrame) {
  const delimiter = ' ';
  return barcodeWithoutFrame.split(delimiter);
}

function buildZipcode(zipcodeCells) {
  return zipcodeCells.join('');
}

function convertBarcodeCellsToZipcodeCells(barcodeCells) {
  const length = barcodeCells.length;
  return barcodeCells
    .filter((v, k) => k < length - 1)
    .map(i => vectorTable.indexOf(i));
}

function getCheckDigitInBarcode(barcodeCells) {
  return barcodeCells.indexOf(barcodeCells.length - 1);
}

function barcodeToZipcode(barcode) {
  if (!isLegalBarcode(barcode)) {
    return {errMsg: 'illegal barcode', zipcode: null};
  }
  const barcodeWithoutFrame = removeFrame(barcode);
  const barcodeCells = getBarcodeCells(barcodeWithoutFrame);
  const zipcodeCells = convertBarcodeCellsToZipcodeCells(barcodeCells);
  const checkDigitCalculated = calculateCheckDigit(zipcodeCells);
  const checkDigitInBarcode = getCheckDigitInBarcode(barcodeCells);

  if (checkDigitCalculated !== checkDigitInBarcode) {
    return {errMsg: 'check digit error', zipcode: null};
  }

  const zipcode = buildZipcode(zipcodeCells);
  return zipcode;
}

// function isValidatedCheckDigit(barcodeCells) {
//   const length = barcodeCells.length;
//   const checkDigitInBarcode = barcodeCells.indexOf(length - 1);
//   const barcodeBodyCells = barcodeCells.filter((v, k) => k < length - 1);
//   const zipcodeCells = barcodeBodyCells.map(i => vectorTable.indexOf(i));
//   const checkDigitCalculated = calculateCheckDigit(zipcodeCells);
//
//   return checkDigitCalculated === checkDigitInBarcode;
// }



module.exports = {
  getZipcodeCells,
  buildBarcodeBody,
  calculateCheckDigit,
  zipcodeToBarcode,
  barcodeToZipcode,
  buildZipcode,
  isLegalBarcode,
  removeFrame,
  getBarcodeCells,
  convertBarcodeCellsToZipcodeCells
};