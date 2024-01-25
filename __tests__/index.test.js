const {
  echo,
  invert,
  flatten,
  sum,
  multiply,
  convertCsvToJson
} = require('../index');

const csvFilePath = `${process.cwd()}/matrix.csv`;
let testData; 

describe('Unit Testing for CSV data Operations', () => {

  beforeAll(async () => {
    try {
      testData = await convertCsvToJson(csvFilePath);
    } catch (error) {
      console.error(`Error reading CSV file: ${error.message}`);
    }
  });
  
  test('echo should return the matrix as a string in matrix format', async () => {
    const result = await echo(testData);
    expect(typeof result).toBe('string');
  });

  test('invert should return a valid matrix string with inverted rows and columns', async () => {
    const result = await invert(testData);
    expect(typeof result).toBe('string');

    // check if has correct number of rows
    const rows = result.split('\n');
    expect(rows.length).toBe(testData[0].split(',').length);

    // check if has correct number of columns
    const columns = rows.map(row => row.split(',').length);
    const expectedColumns = testData.length;
    expect(columns.every(colCount => colCount === expectedColumns)).toBe(true);

    // check if properly inverted
    const initData = testData.map(row => row.split(',').map(Number));
    const expectedInvertedValues = initData[0].map((col, i) =>
      initData.map(row => row[i]).join(',')
    ).join('\n');
    expect(result).toEqual(expectedInvertedValues);
  });

  test('flatten should return the matrix as a 1 line string with values separated by commas', async () => {
    const result = await flatten(testData);
    expect(typeof result).toBe('string');

    // check if properly flattened
    const initData = testData.map(row => row.split(',').map(Number));
    const expectedOutput  = initData.flat().join(',');
    expect(result).toEqual(expectedOutput);
  });

  test('sum should return the sum of integers in the matrix', async () => {
    const result = await sum(testData);
    expect(typeof result).toBe('number');

    // check if properly has gotten the sum
    const expectedSum = testData
      .map(row => row.split(',').map(Number))
      .flat()
      .reduce((acc, num) => acc + num, 0);

    expect(result).toEqual(expectedSum);
  });

  test('multiply should return the product of integers in the matrix', async () => {
    const result = await multiply(testData);
    expect(typeof result).toBe('number');

    // check if properly multiplied
    const expectedProduct = testData
      .map(row => row.split(',').map(Number))
      .flat()
      .reduce((acc, num) => acc * num, 1);

    expect(result).toEqual(expectedProduct);
  });
});
