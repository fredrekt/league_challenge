const csv = require('csvtojson');
const path = require('path');

/* 
---------------------------
Converting CSV file to JSON
returns: JSON with headers as property names
---------------------------
*/
const convertCsvToJson = async (file) => {
	try {
		return await csv({
			noheader: true,
			output: 'line'
		}).fromFile(file);
	} catch (err) {
		throw new Error(`Error reading CSV file: ${err.message}`);
	}
};

/*
---------------------------
Echo
returns: The matrix as a string in matrix format.
---------------------------
*/
const echo = async (data) => {
	try {
		console.log('----------- Running Echo -----------');
		let ouput = '';
		for (let value of data) {
			ouput += value + '\n';
		}
		console.log(ouput);
		return ouput;
	} catch (error) {
		console.error('Error echoing values. ', error);
	}
};

/*
---------------------------
Invert
returns: The matrix as a string in matrix format where the columns and rows are inverted
---------------------------
*/
const invert = async (data) => {
	try {
		console.log('---------- Running Invert ----------');
		const initData = data.map((row) => row.split(',').map(Number));
		const mutatedData = initData[0].map((col, i) => initData.map((row) => row[i]));
		const output = mutatedData.map((row) => row.join(',')).join('\n');
		console.log(output);
		return output;
	} catch (error) {
		console.error('Error inverting values. ', error);
	}
};

/*
---------------------------
Flatten
returns: The matrix as a 1 line string, with values separated by commas.
---------------------------
*/
const flatten = async (data) => {
	try {
		console.log('---------- Running Flatten ---------');
		const parsedData = data.map((row) => row.split(',').map(Number));
		const output = parsedData.flat().join(',');
		console.log(output);
		return output;
	} catch (error) {
		console.error('Error flattening values. ', error);
	}
};

/*
---------------------------
Sum
returns: The sum of the integers in the matrix.
---------------------------
*/
const sum = async (data) => {
	try {
		console.log('----------- Running Sum -----------');
		const parsedData = data.map((row) => row.split(',').map(Number));
		const totalSum = parsedData.flat().reduce((acc, num) => acc + num, 0);
		console.log(totalSum);
		return totalSum;
	} catch (error) {
		console.error('Error calculating sum. ', error);
	}
};

/*
---------------------------
Multiply
returns: The product of the integers in the matrix.
---------------------------
*/
const multiply = async (data) => {
	try {
		console.log('-------- Running Multiply --------');
		const parsedData = data.map((row) => row.split(',').map(Number));
		const totalProduct = parsedData.flat().reduce((acc, num) => acc * num, 1);
		console.log(totalProduct);
		return totalProduct;
	} catch (error) {
		console.error('Error calculating product. ', error);
	}
};


/*
---------------------------
Normalize path
function: parses forward slashes to avoid errors on file read or parsing.
---------------------------
*/
const normalizePath = (pathTo) => {
    const normalizedPath = path.normalize(pathTo);
    return normalizedPath.replace(/\//g, '\\');
};


/*
---------------------------
Parent Function
function: calls all the function but has a global variable to reuse the parsed data from the csv document.
---------------------------
*/
const main = async (filePath) => {
    const normalizedFilePath = normalizePath(filePath);
    console.log('filepath: ', normalizedFilePath)
	let data = [];
	try {
		data = await convertCsvToJson(normalizedFilePath);
	} catch (error) {
		console.error(`Something wen't wrong in parsing csv data. `, error);
	}

	if (!Array.isArray(data) || !data.length) {
		console.log('File seems to be empty.');
		return;
	}

	await echo(data);
	await invert(data);
	await flatten(data);
	await sum(data);
	await multiply(data);
};

const filePath = process.argv[2];

if (!filePath) {
    main(`${process.cwd()}/matrix.csv`);
} else {
    main(filePath);
}

module.exports = {
	convertCsvToJson,
	echo,
	invert,
	flatten,
	sum,
	multiply
};
