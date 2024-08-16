const { prettyBoard } = require("./sudoku");
const { read } = require("./sudoku");
const { solve } = require("./sudoku");

(function runner() {
  const readedSudokus = read();
  for (let i = 0; i < readedSudokus.length; i++) {
    prettyBoard(solve(readedSudokus[i]));
  }
})();
