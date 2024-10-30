'use strict';

const gameBoard = (function() {
    
    const board = [
        ["","",""],
        ["","",""],
        ["","",""],
    ]

    // Prints the board to the
    const print = () => {
        let boardString = "TOP-TAC-TOE\n---------------\n";
        for (let row = 0; row < board.length; row++)
        {
            for(let cell = 0; cell < board[row].length; cell++)
            {
                let cellString = board[row][cell]
                boardString += "|[" + `${cellString === "" ? " " : cellString}`  + "]|";
            }
            boardString += "\n---------------\n";
        }
        console.log(boardString);
    };

    // Sets the cell in the board given a cell index starting at 0
    // returns error message if cell is ocupied
    const setCell = function (symbol, cellNumber) {
        let row = Math.floor(cellNumber / 3);
        let col = cellNumber % 3;
        if (board[row][col] != "") {
            return "Error: There is already something here"
        }
        board[row][col] = symbol;
        return `${symbol} placed at (${row},${col}).`
    };

    const clear = () => {
        for(let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                board[row][col] = "";
            }
        }
    }

    return { print, setCell, clear }

})();

const players = (function() {
    const X = {
        name: "Player X",
        symbol: "X",
    }

    const O = {
        name: "Player O",
        symbol: "O",
    }

    const getSymbol = function(player = 1) {
        return player === 1 ? X.symbol : O.symbol;
    }

    const setName = function(name, player = 1) {
        if (name.length < 1)
        {
            return "Error: Name too short"
        }

        player === 1 ? X.name = name : O.name = name;
        return true;
    }

    const getName = function(player = 1) {
        return player === 1 ? X.name : O.name;
    }

    return { getSymbol, setName, getName }
})();