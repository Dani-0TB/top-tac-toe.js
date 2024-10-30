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
            return false;
        }
        board[row][col] = symbol;
        return true;
    };

    const checkWinner = () => {
        let symbol = null;
        let rows = [
            board[0],
            board[1],
            board[2]
        ]
        let cols = [
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]]
        ]
        let diags = [
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ]

        if (checkList(rows)) {
            symbol = rows[0][0];
        }
        if (checkList(cols)) {
            symbol = cols[0][0];
        }
        if (checkList(diags)) {
            symbol = diags[0][0];
        }

        let tie = true;
        for(let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === "")
                {
                    tie = false;
                }
            }
        }
        if (tie) {
            return "tied"
        }

        return symbol;
    }

    const checkList = (list) => {

        for (let i = 0; i < list.length; i++)
        {
            let string = list[i][0] + list[i][1] + list[i][2];
            if (string === "XXX" || string === "OOO") {
                return true
            }
        }
        return false;
    }

    const clear = () => {
        for(let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                board[row][col] = "";
            }
        }
    }

    return { print, setCell, clear, checkWinner }

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

const gameState = (function (){
    let gameOver = false;
    let currentPlayer = 0;
    let winner = null;

    const playTurn = (symbol, cell) => {
        if (gameBoard.setCell(symbol, cell) === true)
        {
            currentPlayer = !currentPlayer;
            return true;
        }
        return false;
    }

    const playGame = () => {
        gameBoard.print();
        while(!gameOver) {
            let symbol = currentPlayer ? players.getSymbol(2) : players.getSymbol(1);
            printTurn();
            let index = prompt("Choose square 0-8");
            if (playTurn(symbol, index))
            {
                gameBoard.print();
                let winnerSymbol = gameBoard.checkWinner();
                if (winnerSymbol)
                {
                    winner = winnerSymbol;
                    gameOver = true;
                }
            } else {
                alert("Space occupied, please select another");
            }
        }
        if (winner === "tied") {
            alert("players tied")
        } else {
            alert(`${winner} Won!`)
        }
    }

    const resetGame = () => {
        gameBoard.clear();
        gameOver = false;
        winner = null;
        currentPlayer = 0;
        return true;
    }

    const printTurn = () => {
        console.log(`${currentPlayer ? players.getSymbol(2) : players.getSymbol(1)} to move`);
    }

    return { playTurn, resetGame, playGame }

})();

const boardDisplay = (function () {
    const boardContainer = document.querySelector(".board");

    

})();