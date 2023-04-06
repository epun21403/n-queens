/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var solution = new Board({'n': n});

  var helper = function(count) {
    if (count === n) {
      return solution;
    }

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (!solution.hasAnyRooksConflicts()) {
          solution.togglePiece(i, j);
          count++;
        }


        if (solution.hasAnyRooksConflicts()) {
          solution.togglePiece(i, j);
          count--;
        }
      }
    }
  };

  helper(0);
  console.log(solution.rows());
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;
  var solution = new Board({'n': n});
  var validIndices = [];
  for (let i = 0; i < n; i++) {
    validIndices.push(i);
  }

  var helper = function(count) {

    if (count === n) {
      solutionCount++;
      return;
    }

    for (var column = 0; column < n; column++) {
      solution.togglePiece(count, column);

      if (!solution.hasColConflictAt(column)) {
        helper(count + 1);
      }

      solution.togglePiece(count, column);
    }
  };

  helper(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});

  var helper = function(count) {
    var row = count;
    if (count === n) {
      return true;
    }

    for (var column = 0; column < n; column++) {
      solution.togglePiece(row, column);


      if (!solution.hasAnyQueensConflicts()) {
        if (helper(count + 1)) {
          return true;
        }
      }

      solution.togglePiece(row, column);
    }
  };

  helper(0);
  console.log(solution.rows());
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var solution = new Board({'n': n});

  var helper = function(count) {

    if (count === n) {
      solutionCount++;
      return;
    }

    for (var column = 0; column < n; column++) {
      solution.togglePiece(count, column);

      if (!solution.hasAnyQueensConflicts()) {
        helper(count + 1);
      }

      solution.togglePiece(count, column);
    }
  };

  helper(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
