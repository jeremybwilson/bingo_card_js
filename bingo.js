/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */

const bingoCard = [
  8,  29,   35,     54, 65,
  13, 24,   44,     48, 67,
  9,  21,   'FREE', 59, 63,
  7,  19,   34,     53, 61,
  1,  20,   33,     46, 72
];

// Test cases - created manually
const drawnNumbers = [8, 24, 'FREE', 53, 72];  // should return true against diagonal with 'FREE' check
// const drawnNumbers = [13, 24, 44, 48, 67];     // should return true against horizontal check
// const drawnNumbers = [9, 21, 59, 63];          // should return true against horizontal with 'FREE' check
// const drawnNumbers = [29, 24, 21, 19, 20];     // should return true against vertical check
// const drawnNumbers = [1, 25, 33, 46, 75];         // should return false

// create an object to store the winning combo patterns.  we may use this for comparisons
const winningCombinations = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24]
];

// isBingo flag to use later for eliminating repeated 'checkBingo' function executions
let isBingo = false;

// function to pass when needed to reset the bingoCheckCounter
const resetBingoCheckCounter = () => {
  // console.log(`.:: DEBUG ::. Resetting bingoCheckCounter to 0`);
  bingoCheckCounter = 0;
}

// announce win function
function youWin(sq1, sq2, sq3, sq4, sq5) {
  console.log("BINGO! You win!");
  // console.log(`.:: DEBUG ::. Your winning values are:  ${sq1}, ${sq2}, ${sq3}, ${sq4}, ${sq5}`);
  resetBingoCheckCounter();
}

// function to check lines (drawnNumbrs) with bingoCard array values passed from 'checkBingo' functions 
function checkLines(sq1, sq2, sq3, sq4, sq5) {
  
  const isBingoWithFree = drawnNumbers.includes(parseInt(sq1)) && drawnNumbers.includes(parseInt(sq2)) && sq3 == 'FREE' && drawnNumbers.includes(parseInt(sq4)) && drawnNumbers.includes(parseInt(sq5));
  // console.log(`.:: DEBUG ::. isBingoWithFree: ${isBingoWithFree}`);
  
  const isBingoWithoutFree = drawnNumbers.includes(parseInt(sq1)) && drawnNumbers.includes(parseInt(sq2)) && drawnNumbers.includes(parseInt(sq3)) && drawnNumbers.includes(parseInt(sq4)) && drawnNumbers.includes(parseInt(sq5));
  // console.log(`.:: DEBUG ::. isBingoWithoutFree: ${isBingoWithoutFree}`);
  
  if(!isBingo){

    // check drawnNumbers array combinations 
      // with the word 'FREE' or without the word 'FREE'
    if ( isBingoWithFree || isBingoWithoutFree ) {

      // if (isBingoWithFree) {  // debugging messages, can remove later
      //   console.log(`.:: DEBUG ::. Checking drawnNumbers[] array with the word 'FREE'`);
      // } else if (isBingoWithoutFree){
      //   console.log(`.:: DEBUG ::. Checking drawnNumbers[] array without the word 'FREE'`);
      // } else {
      //   console.log(`.:: DEBUG ::. Something went wrong comparing the drawnNumbers[] array.`);
      // }

      // update our 'isBingo variable to true if all checks here pass
      isBingo = true;

      console.log(`setting isBingo flag to:`, isBingo);
      // console.log(`${sq1}, ${sq2}, ${sq3}, ${sq4}, ${sq5}`);
      
      // if successful, fire the youWin() function
      youWin(sq1, sq2, sq3, sq4, sq5);
      return true;  // if successful match, return true
      
    } else {
      console.log(`Not a valid bingo! Keep trying!`);
      return false; // if no match found, return false
    }
  }  // end the (!isBingo) block
}

/* Assign drawnNumbers array position values vertical bingo pattern, 
 * then run checkLines function 
 */
function checkVerticalBingo() { // checking for vertical bingo patterns here

  let bingoCheckCounter = 0;
  
  if(!isBingo) {  // if isBingo == false, loop through array 
    for (let i = 0; i < 5; i++) {       // for 0 - 4 positions, assign sq variables
      var sq1 = bingoCard[i];        // for i = 0,  =>   0,  1,  2,  3,  4,
      var sq2 = bingoCard[i + 5];    // for i = 1,  =>   5,  6,  7,  8,  9
      var sq3 = bingoCard[i + 10];   // for i = 2,  =>   10, 11, 12, 13, 14
      var sq4 = bingoCard[i + 15];   // for i = 3,  =>   15, 16, 17, 18, 19
      var sq5 = bingoCard[i + 20];   // for i = 4,  =>   20, 21, 22, 23, 24
      
      // counting the number of times this for loop is firing
      // bingoCheckCounter++;
      
      checkLines(sq1, sq2, sq3, sq4, sq5);
    }
  };
  // console.log(`.:: DEBUG ::. the checkVerticalBingo fn was run ${bingoCheckCounter} times.`);
}

function checkHorizontalBingo() { // checking for horizontal bingo patterns here

  let bingoCheckCounter = 0;

  if(!isBingo) {  // if isBingo == false, loop through array or continue to loop
    
    j = 0;
    for (let i = 0; i < 5; i++) {
      switch(i) {
        case 0:   // check row 1
          var sq1 = bingoCard[i];
          var sq2 = bingoCard[i + 1];
          var sq3 = bingoCard[i + 2];
          var sq4 = bingoCard[i + 3];
          var sq5 = bingoCard[i + 4];
          break;
        case 1:   // check row 2
          var sq1 = bingoCard[i + 4];
          var sq2 = bingoCard[i + 5];
          var sq3 = bingoCard[i + 6];
          var sq4 = bingoCard[i + 7];
          var sq5 = bingoCard[i + 8];
          break;
        case 2:   // check row 3
          var sq1 = bingoCard[i + 8];
          var sq2 = bingoCard[i + 9];
          var sq3 = bingoCard[i + 10];
          var sq4 = bingoCard[i + 11];
          var sq5 = bingoCard[i + 12];
          break;
        case 3:   // check row 4
          var sq1 = bingoCard[i + 12];
          var sq2 = bingoCard[i + 13];
          var sq3 = bingoCard[i + 14];
          var sq4 = bingoCard[i + 15];
          var sq5 = bingoCard[i + 16];
          break;
        case 4:   // check row 5
          var sq1 = bingoCard[i + 16];
          var sq2 = bingoCard[i + 17];
          var sq3 = bingoCard[i + 18];
          var sq4 = bingoCard[i + 19];
          var sq5 = bingoCard[i + 20];
          break;
      }
      
      // counting the number of times this function is being run
      // bingoCheckCounter++;

      checkLines(sq1, sq2, sq3, sq4, sq5);
    }
  };
  // console.log(`.:: DEBUG ::. the checkHorizontalBingo fn was run ${bingoCheckCounter} times.`);
}

function checkDiagonalBingo() {

  let bingoCheckCounter = 0;

  if(!isBingo) {  // if isBingo == false, then loop through array 

    // loop through possible combinations
    for (let i = 0; i < 2; i++) {  // only two diagonal options can occur, limiting i < 2
      switch(i) {
        case 0:   // upper left to lower right, only positions matter, order is irrelevant
          var sq1 = bingoCard[0];    // for i = 0,  =>  bingoCard array position 0
          var sq2 = bingoCard[6];    // for i = 0,  =>  bingoCard array position 6
          var sq3 = bingoCard[12];   // for i = 0,  =>  bingoCard array position 12
          var sq4 = bingoCard[18];   // for i = 0,  =>  bingoCard array position 18
          var sq5 = bingoCard[24];   // for i = 0,  =>  bingoCard array position 24
          break;
        case 1:   // lower left to upper right, only positions matter, order is irrelevant
          var sq1 = bingoCard[4];    // for i = 1,  =>  bingoCard array position 4
          var sq2 = bingoCard[8];    // for i = 1,  =>  bingoCard array position 8
          var sq3 = bingoCard[12];   // for i = 1,  =>  bingoCard array position 12
          var sq4 = bingoCard[16];   // for i = 1,  =>  bingoCard array position 16
          var sq5 = bingoCard[20];   // for i = 1,  =>  bingoCard array position 20
          break;
      }
      
      // counting the number of times this function is being run
      // bingoCheckCounter++;
      
      checkLines(sq1, sq2, sq3, sq4, sq5);
    }
  };
  // console.log(`.:: DEBUG ::. the checkDiagonalBingo fn was run ${bingoCheckCounter} times.`);
}

function checkForBingo (bingoCard, drawnNumbers) {
  
  // this code for debug purposes, you can remove.
  // console.log('Bingo Card: ' + JSON.stringify(bingoCard));
  // this code for debug purposes, you can remove.
  console.log('Drawn Numbers: ' + JSON.stringify(drawnNumbers));

  // how do we skip these functions if we know the drawnNumbers array is already 1) diagonal, 2) horizontal, or 3) vertical
  checkDiagonalBingo();
  checkHorizontalBingo();
  checkVerticalBingo();
  // return false;
}

// module.exports = checkForBingo;

// Test cases for BINGO function
checkForBingo(bingoCard, drawnNumbers);
// checkForBingo(bingoCard, drawnNumbers1);  // should return win / true
// checkForBingo(bingoCard, drawnNumbers2);  // should return win / true
// checkForBingo(bingoCard, drawnNumbers3);  // should return win / true
// checkForBingo(bingoCard, drawnNumbers4);  // should return win / true
// checkForBingo(bingoCard, drawnNumbers5);  // should return false