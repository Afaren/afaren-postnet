/**
 * Created by afaren on 7/28/16.
 */
import {
  getZipcodeCells,
  zipcodeToBarcode,
  calculateCheckDigit,
  buildBarcodeBody,
  barcodeToZipcode,
  buildZipcode,
  isLegalBarcode,
  removeFrame,
  getBarcodeCells,
  convertBarcodeCellsToZipcodeCells,
  getCheckDigitInBarcode,
} from '../src/postnet'

describe('getZipcodeCells', function () {
  it('should return a cell array of zipcode', function () {
    let zipcode = '45056-1234';
    let actual = getZipcodeCells(zipcode);
    let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4];
    expect(actual).toEqual(expected);

    zipcode = '44556';
    actual = getZipcodeCells(zipcode);
    expected = [4, 4, 5, 5, 6];
    expect(actual).toEqual(expected);

    zipcode = '44556333';
    actual = getZipcodeCells(zipcode);
    expected = [4, 4, 5, 5, 6, 3, 3, 3];
    expect(actual).toEqual(expected);

  })
});

describe('calculateCheckDigit', () => {
  it('should return check digit of zipcodeCells', () => {
    let zipcodeCells = [4, 5, 0, 5, 6];
    let expected = 0;
    let actual = calculateCheckDigit(zipcodeCells);
    expect(actual).toEqual(expected);

    zipcodeCells = [4, 5, 0, 5, 7];
    expected = 9;
    actual = calculateCheckDigit(zipcodeCells);
    expect(actual).toEqual(expected);

    zipcodeCells = [4, 5, 0, 5, 7, 9, 1, 1, 1];
    expected = 7;
    actual = calculateCheckDigit(zipcodeCells);
    expect(actual).toEqual(expected);
  })
});

describe('buildBarcodeBody', ()=> {
  it('should return barcode without frame', () => {
    let zipcodeCells = [4, 5, 0, 5, 6];
    let checkDigit = 0;
    let actual = buildBarcodeBody(zipcodeCells, checkDigit);
    let expected = ':|::| :|:|: ||::: :|:|: :||:: ||:::';
    expect(actual).toEqual(expected);

    zipcodeCells = [5, 4, 0, 5, 6];
    checkDigit = 0;
    actual = buildBarcodeBody(zipcodeCells, checkDigit);
    expected = ':|:|: :|::| ||::: :|:|: :||:: ||:::';
    expect(actual).toEqual(expected)
  })
});

describe('zipcodeToBarcode', function () {
  it('should return a error message when zipcode has illegal length', () => {

    const expected = {errMsg: 'length is illegal', barcode: null};

    let zipcode = '1234';
    let actual = zipcodeToBarcode(zipcode);
    expect(actual).toEqual(expected);


    zipcode = '123456';
    actual = zipcodeToBarcode(zipcode);
    expect(actual).toEqual(expected);

    zipcode = '1234567890';
    actual = zipcodeToBarcode(zipcode);
    expect(actual).toEqual(expected);

  });
  it('should return a barcode without error message when zip is legal', () => {
    let zipcode = '45056';
    let expected = {errMsg: null, barcode: '| :|::| :|:|: ||::: :|:|: :||:: ||::: |'};
    let actual = zipcodeToBarcode(zipcode);
    expect(actual).toEqual(expected);

    zipcode = '54056';
    expected = {errMsg: null, barcode: '| :|:|: :|::| ||::: :|:|: :||:: ||::: |'};
    actual = zipcodeToBarcode(zipcode);
    expect(actual).toEqual(expected);

    zipcode = '45056-1234';
    actual = zipcodeToBarcode(zipcode);
    expected = {errMsg: null, barcode: '| :|::| :|:|: ||::: :|:|: :||:: :::|| ::|:| ::||: :|::| ||::: |'};
    expect(actual).toEqual(expected);

  });

});

describe('removeFrame', () => {
  it('should return barcode body', () => {
    let barcode = '| :|::| :|:|: ||::: :|:|: :||:: :::|| ::|:| ::||: :|::| ||::: |';
    let actual = removeFrame(barcode);
    let expected = ':|::| :|:|: ||::: :|:|: :||:: :::|| ::|:| ::||: :|::| ||:::';
    expect(actual).toEqual(expected)
  })
});

describe('getBarcodeCells', () => {
  it('should return a cell array of barcode', () => {
    let barcodeWithoutFrame = ':|::| :|:|: ||::: :|:|: :||:: :::|| ::|:| ::||: :|::|';
    let expected = [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|'];
    let actual = getBarcodeCells(barcodeWithoutFrame);
    expect(actual).toEqual(expected);

  })
});

describe('convertBarcodeCellsToZipcodeCells', () => {
  it('should return equivalent form of zipcode cells when given a barcodeCells', () => {
    let barcodeCells = [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::'];
    const expected = [4, 5, 0, 5, 6, 1, 2, 3, 4];
    let actual = convertBarcodeCellsToZipcodeCells(barcodeCells);
    expect(actual).toEqual(expected);
  })
});

describe('isLegalBarcode', () => {
  it('should judge a barcode illegal when it contains illegal character', () => {

  });
  it('should judge a barcode illegal when its length is illegal', () => {

  });
  it('should judge a barcode legal when its length is legal and it does not contains illegal character', () => {

  })
});

fdescribe('getCheckDigitInBarcode', () => {
  it('should return check digit in barcode', () => {
    const barcodeCells = [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::'];//  [4, 5, 0, 5, 6, 1, 2, 3, 4];
    const actual = getCheckDigitInBarcode(barcodeCells);
    const expected = 0;
    expect(actual).toEqual(expected);
  })
});

describe('barcodeToZipcode', () => {
  it('should return equivalent zipcode form of barcode when barcode is legal', () => {
    let barcode = '| :|::| :|:|: ||::: :|:|: :||:: :::|| ::|:| ::||: :|::| ||::: |';
    let actual = barcodeToZipcode(barcode);
    let expected = '45056-1234';
    expect(actual).toEqual(expected)

  })
});
