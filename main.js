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

    const getCell = function (cellNumber) {
        let row = Math.floor(cellNumber / 3);
        let col = cellNumber % 3;
        return board[row][col];
    }

    const checkWinner = () => {
        let won = 0;
        let tie = true;

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
            won = 1;
        }
        if (checkList(cols)) {
            won = 1;
        }
        if (checkList(diags)) {
            won = 1;
        }

        if (!won) {
            for(let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[row].length; col++) {
                    if (board[row][col] === "")
                    {
                        tie = false;
                    }
                }
            }
            if (tie) {
                return 2;
            }
        }

        return won;
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

    return { print, getCell, setCell, clear, checkWinner }

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

    const getSymbol = function(player) {
        return player ? O.symbol : X.symbol;
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
    let tied = false;

    const playTurn = (cell) => {
        let symbol = players.getSymbol(currentPlayer);

        if (gameBoard.setCell(symbol, cell))
        {
            currentPlayer = !currentPlayer;
            return true;
        }
        return false;
    }

    // Function to play a game in the console
    const playGame = () => {
        gameBoard.print();
        while(!gameOver) {
            let symbol = currentPlayer ? players.getSymbol(2) : players.getSymbol(1);
            printTurn(symbol);
            
            let index = prompt("Choose square 0-8");

            if (playTurn(symbol, index))
            {
                gameBoard.print();
                let won = gameBoard.checkWinner();
                
                if (won === 2) {
                    tied = true;
                    gameOver = true;
                    continue;
                }

                if (won) {
                    winner = symbol;
                    gameOver = true;
                    continue;
                }
            } else {
                alert("Space occupied, please select another");
            }
        }
        if (tied) {
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
        tied = false;
        return true;
    }

    const printTurn = (symbol) => {
        console.log(`${ symbol } to move`);
    }

    const getCurrentPlayer = function() {
        return currentPlayer;
    }
    return { playTurn, resetGame, playGame, getCurrentPlayer }

})();

const boardDisplay = (function () {
    const gameDisplay = document.querySelector(".game-display");
    const currentPlayer = document.querySelector(".current-player");

    const initDisplay = function() {
        for (let i = 0; i < 9; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-id", i);
            gameDisplay.appendChild(square);
            
            square.addEventListener("click", (updateCell));
        }

        updateDisplay();
    }

    const updateCell = function(e) {
        let target = e.target;
        if (gameState.playTurn(target.dataset.id))
        {
            let icon = gameBoard.getCell(target.dataset.id) === "O" ?
                        `<svg class="symbol" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>`:
                        `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="symbol"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg`;
            target.innerHTML = icon;
            gameBoard.print();
        }

        updateDisplay();
    }

    const updateDisplay = function() {
        currentPlayer.innerText = gameState.getCurrentPlayer() ? "O to play" : "X to play";
    }

    initDisplay();
})();