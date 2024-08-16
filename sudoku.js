const fs = require("fs");

function read() {}

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

function prettyBoard() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Выводит в консоль/терминал судоку.
   * Подумай, как симпатичнее его вывести.
   */
}

module.export = {
  read,
  solve,
  prettyBoard,
};
