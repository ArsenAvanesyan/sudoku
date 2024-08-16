const fs = require("fs");

function read() {
  const puzzles = fs.readFileSync("./puzzles.txt", "utf-8").split("");
  const allSudokus = [];
  const allSudokusSorted = [];
  for (let i = 0; i < puzzles.length; i++) {
    let sudoku = [];
    for (let i = 0; i < 81; i++) {
      let nextEl = puzzles.shift();
      if (nextEl === "\n" || nextEl === "\r") {
        i -= 1;
        continue;
      }
      sudoku.push(nextEl);
    }
    allSudokus.push(sudoku);
  }
  for (let index = 0; index < allSudokus.length; index++) {
    const sudokuPlace = [];
    const sudokuPlace1 = [];
    const sudokuPlace2 = [];
    const sudokuPlace3 = [];

    for (let i = 0; i < allSudokus[index].length; i++) {
      let block = [];
      for (let i = 0; i < 9; i++) {
        let nextEl = allSudokus[index].shift();
        block.push(nextEl);
      }
      sudokuPlace1.push(block);
    }

    for (let i = 0; i < 9; i++) {
      let block = [];
      for (let j = 0; j < 9; j++) {
        block.push(sudokuPlace1[j][i]);
      }
      sudokuPlace2.push(block);
    }

    for (let i = 0; i < 9; i++) {
      sudokuPlace3.push([]);
    }

    for (let t = 0; t < 9; t += 3) {
      for (let i = t; i < t + 3; i++) {
        let level = 0;
        for (let block = t; block < t + 3; block++) {
          for (let j = level; j < 3 + level; j++) {
            sudokuPlace3[block].push(sudokuPlace1[i][j]);
          }
          level += 3;
        }
      }
    }
    allSudokusSorted.push(sudokuPlace1);
  }

  return allSudokusSorted;
}

function solve(board) {
  const len = 9;
  const boxLen = 3;
  const findEmpty = (board) => {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (board[i][j] === "-") {
          return [i, j];
        }
      }
    }
    return null;
  };

  const validate = (num, pos, board) => {
    const [i, j] = pos;

    // Проверка строки
    for (let n = 0; n < len; n++) {
      if (board[n][j] === num && n !== i) {
        return false;
      }
    }

    // Проверка стобца
    for (let n = 0; n < len; n++) {
      if (board[i][n] === num && n !== j) {
        return false;
      }
    }

    // Проверка бокса
    const boxRow = Math.floor(i / boxLen) * boxLen;
    const boxCol = Math.floor(j / boxLen) * boxLen;

    for (let n = boxRow; n < boxRow + boxLen; n++) {
      for (let g = boxCol; g < boxCol + boxLen; g++) {
        if (board[n][g] === num && n !== i && g !== j) {
          return false;
        }
      }
    }
    return true;
  };

  const solver = () => {
    const currPos = findEmpty(board);
    if (currPos === null) {
      return true;
    }

    for (let i = 1; i <= len; i++) {
      const currNum = i.toString();
      const isValid = validate(currNum, currPos, board);

      if (isValid) {
        const [x, y] = currPos;
        board[x][y] = currNum;

        if (solver()) {
          return true;
        }
        board[x][y] = "-";
      }
    }
    return false;
  };
  solver();
  return board;
}

function prettyBoard(board) {
  const table = board.map((n) => (n === "-" ? " " : n));
  console.table(table);
}

module.exports = {
  read,
  solve,
  prettyBoard,
};
