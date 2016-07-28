/**
 * Created by afaren on 7/28/16.
 */
import {getZipcodeCells, zipcodeToBarcode, calculateCheckDigit, buildBarcodeBody} from '../src/postnet'

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


fdescribe('buildBarcodeBody', ()=> {
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
  it('should return a error message when zipcode has illegal length', function () {

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

});
