# League Backend Challenge

This is a test challenge for backend using nodejs & js. I added in unit testing via jest. Below would be the commands to run my code.


## Requirements

Basic requirements you need to run this code.

-   [x] Node: v20.11.0 (optional version)
-   [x] Yarn: v1.22.21 (optional but preferred)
-   [x] Npm: v10.2.4 (optional version)

## Run 

1. `yarn install` or `npm install` (depending on preference)
2. `yarn start "<file_path>"` (this will run the whole code)
3. `yarn test` (this will run my unit tests)

## Available Scripts


#### `yarn start "<file_path>"`
Runs my whole code base and goes through all the test cases. The purpose of wrapping the path to `" "` is to prevent path's with backslashes to be ommited. If file path isn't in the argument then it will run just the `matrix.csv` file on the current directory by default.

#### `yarn test`

This is for unit testing which uses jest and automatically runs the test suite & cases.

#### `yarn prettier`
Fixes all js files with prettier.


## Unit Testing
I've written extra for the unit testing using jest. Under __tests__ directory there is an `index.test.js` file which contains the whole test suite and cases of the functions. You can change the path of the csv file (`line 10`) to whichever test matrix file you have.

#### `yarn test`
Runs by default the matrix.csv file included in the current directory.

---

If you run into issues please reach out to [Fredrick Garingo](mailto:fredrickjohng7@gmail.com).