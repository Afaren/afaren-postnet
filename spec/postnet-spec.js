/**
 * Created by afaren on 7/28/16.
 */
import { getZipcodeCells } from '../src/postnet'

fdescribe('getZipcodeCells', function () {
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

