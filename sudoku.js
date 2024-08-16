const { log } = require("console");
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
    sudokuPlace.push(sudokuPlace1, sudokuPlace2, sudokuPlace3);
    allSudokusSorted.push(sudokuPlace);
  }

  return allSudokusSorted;
}

function solve() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции read.
   * Возвращает игровое поле после попытки его решить.
   */
}

function isSolved() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Возвращает булевое значение — решено это игровое поле или нет.
   */
}

function prettyBoard() {
  /**
   * Принимает игровое поле в том формате, в котором его вернули из функции solve.
   * Выводит в консоль/терминал судоку.
   * Подумай, как симпатичнее его вывести.
   */
}
