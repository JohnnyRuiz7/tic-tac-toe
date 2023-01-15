const Game = (() => {

    let board = document.querySelectorAll('.squares')
    const gameMode = [singleplayer, multiplayer]
    const difficulty = ['Easy', 'Medium', 'Hard']
    const players = [
        { name: '', mark: 'x' },
        { name: '', mark: 'o' }
    ]
    let moves = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let chosenDifficulty = 0
    let gameType = 0
    let playerMoveCount = 0
    let cpuMoves = 1
    let moveCount = 0
    let playerTurn = 0
    let startGameButton = document.createElement('button')
    startGameButton.textContent = 'Start Game'
    startGameButton.setAttribute('id', 'start-button')
    startGameButton.setAttribute('type', 'button')
    let startMessage = document.querySelector('#start-message')
    let gameSettings = document.querySelector('.game-settings')
    let buttonsContainer = document.querySelector('.buttons-container')
    let onePlayerButton = document.querySelector('#one-player-button')
    let twoPlayersButton = document.querySelector('#two-players-button')
    let mainMenuButton = document.querySelector('#main-menu-button')
    let rematchButton = document.querySelector('#rematch-button')
    let boardContainer = document.querySelector('#game-board')
    let boardCorners = document.querySelectorAll('.corner')
    let boardSides = document.querySelectorAll('.side')
    let winMessage = document.querySelector('#win-message')
    let gameContainer = document.querySelector('.game-container')
    let difficultyButtons 
    let markbuttons
    let playerOneName
    let xMark
    let oMark

    mainMenuButton.addEventListener('click', mainMenu)
    onePlayerButton.addEventListener('click', onePlayerGame)
    twoPlayersButton.addEventListener('click', twoPlayerGame)

    function singleplayer(e) {
        player1Move(e)
        checkWinner()
        if (winMessage.style.display === 'flex') {
            return
        }
        playerTurn++
        computerMove()
        checkWinner()
        playerTurn--
    }

    function multiplayer(e) {
        if (playerTurn === 0) {
            player1Move(e)
            checkWinner()
            playerTurn++
        }
        else {
            player2Move(e)
            checkWinner()
            playerTurn--
        }
    }

    function onePlayerGame() {
        clearForm(gameSettings)
        let marksContainer = document.createElement('div')
        let playerContainer = document.createElement('div')
        let playerNameContainer = document.createElement('div')
        let playerNameInput = document.createElement('input')
        let playerLabel = document.createElement('label')
        let difficultyContainer = document.createElement('div')
        let difficultyButtonsContainer = document.createElement('div')
        marksContainer.setAttribute('class', 'marks')
        marksContainer.textContent = "Choose your mark ('x' goes first!)"
        playerContainer.setAttribute('class', 'player-container')
        playerNameContainer.setAttribute('class', 'player-name-container')
        playerNameInput.setAttribute('type', 'text')
        playerNameInput.setAttribute('id', `player-1-name`)
        playerLabel.setAttribute('for', `player-1-name`)
        playerLabel.textContent = `Player name: `
        difficultyContainer.setAttribute('class', 'difficulty-container')
        difficultyContainer.textContent = 'Choose difficulty'
        difficultyButtonsContainer.setAttribute('class', 'difficulty-buttons')
        playerContainer.append(playerLabel, playerNameInput)
        difficultyContainer.append(difficultyButtonsContainer)
        gameSettings.append(playerContainer, marksContainer, difficultyContainer, startGameButton)
        for (let i = 0; i < players.length; i++) {
            let markButton = document.createElement('input')
            let markLabel = document.createElement('label')
            markButton.setAttribute('type', 'radio')
            markButton.setAttribute('class', 'game-mode-buttons')
            markButton.setAttribute('name', 'mark-buttons')
            markButton.setAttribute('id', `${players[i].mark}-mark-button`)
            markLabel.setAttribute('for', `${players[i].mark}-mark-button`)
            markLabel.textContent = `${players[i].mark}`
            marksContainer.append(markButton, markLabel)
        }
        for (let i = 0; i < difficulty.length; i++) {
            let difficultyButton = document.createElement('input')
            let difficultyLabel = document.createElement('label')
            difficultyButton.setAttribute('type', 'radio')
            difficultyButton.setAttribute('class', 'game-mode-buttons')
            difficultyButton.setAttribute('name', 'difficulty-buttons')
            difficultyButton.setAttribute('id', `${difficulty[i]}`)
            difficultyLabel.setAttribute('for', `${difficulty[i]}`)
            difficultyLabel.textContent = `${difficulty[i]}`
            difficultyButtonsContainer.append(difficultyButton, difficultyLabel)
        }

        // Rest of bottom starter logic
        let startButton = document.querySelector('#start-button')
        difficultyButtons = document.querySelector('.difficulty-buttons')
        markbuttons = document.querySelector('.marks')
        playerOneName = document.querySelector('#player-1-name')
        xMark = document.querySelector('#x-mark-button')
        oMark = document.querySelector('#o-mark-button')
        easyDifficulty = document.querySelector('#Easy')
        xMark.setAttribute('checked', 'checked')
        easyDifficulty.setAttribute('checked', 'checked')
        players[1].name = 'the CPU'
        startButton.addEventListener('click', startGame)
    }
    
    function twoPlayerGame() {
        clearForm(gameSettings)
        gameType = 1
        for (let i = 0; i < players.length; i++) {
            let playerContainer = document.createElement('div')
            let playerNameInput = document.createElement('input')
            let playerLabel = document.createElement('label')
            playerContainer.setAttribute('class', 'player-container')
            playerLabel.setAttribute('for', `player-${i + 1}-name`)
            playerNameInput.setAttribute('id', `player-${i + 1}-name`)
            playerNameInput.setAttribute('type', 'text')
            playerLabel.textContent = `(${players[i].mark}) Player ${i + 1} name: `
            gameSettings.append(playerContainer, startGameButton)
            playerContainer.append(playerLabel, playerNameInput)
        }

        // Rest of bottom starter logic
        let startButton = document.querySelector('#start-button')
        startButton.addEventListener('click', startGame)
        playerOneName = document.querySelector('#player-1-name')
        playerTwoName = document.querySelector('#player-2-name')
    }

    function playerMark() {
        if (xMark.checked) {
            players[0].mark = 'x'
            players[1].mark = 'o'
            playerTurn = 0
        }
        else if (oMark.checked) {
            players[0].mark = 'o'
            players[1].mark = 'x'
            playerTurn = 1
        }
    }

    function setDifficulty() {
        difficultyButtons.childNodes.forEach(e => {
            if (e.checked) {
                chosenDifficulty = e.getAttribute('id')
            }
        })
    }

    function startGame() {
        if (gameType == 0) {
            if (playerOneName.value === '') {
                alert('PLEASE ENTER A VALID NAME')
            }
            else {
                board.forEach(element => element.addEventListener('click', gameMode[gameType], { once: true }))
                boardContainer.style.display = 'flex'
                players[0].name = playerOneName.value
                setDifficulty()
                playerMark()
                gameSettings.remove()
                cpuMoves = 1
                if (playerTurn === 1) {
                    computerMove()
                    playerTurn--
                }
            }
        }
        else {
            if (playerOneName.value === '' || playerTwoName.value === '') {
                alert('PLEASE ENTER A VALID NAME')
            }
            else {
                board.forEach(element => element.addEventListener('click', gameMode[gameType], { once: true }))
                gameSettings.remove()
                boardContainer.style.display = 'flex'
                players[0].name = playerOneName.value
                players[1].name = playerTwoName.value
            }
        }
    }

    function player1Move(e) {
        let playerChoice = e.target
        playerChoice.textContent = players[playerTurn].mark
        moves[playerChoice.id.slice(-1) - 1] = players[playerTurn].mark
        playerMoveCount++
    }

    function player2Move(e) {
        let playerChoice = e.target
        playerChoice.textContent = players[playerTurn].mark
        moves[playerChoice.id.slice(-1) - 1] = players[playerTurn].mark
    }

    function randomMove() {
        let move = Math.floor(Math.random() * moves.length)
        if (typeof moves[move] === 'number') {
            board[move].textContent = players[playerTurn].mark
            board[move].removeEventListener('click', gameMode[gameType])
            moves[move] = players[playerTurn].mark
        }
        else {
            randomMove()
        }
    }

    function mediumAI() {
        if (cpuMoves === 1) {
            initialMove()
            cpuMoves++
        }
        else if (cpuMoves === 2){
            blockPlayer()
            cpuMoves++
        }
        else {
            randomMove()
            cpuMoves++
        }
    }

    function playCorner() {
        let randomCorner = Math.floor(Math.random() * boardCorners.length)
        let cornerMove = boardCorners[randomCorner].id.slice(-1) - 1
        if (typeof moves[cornerMove] === 'number') {
            movement(cornerMove)
        }
        else {
            playCorner()
        }
    }

    function playSide() {
        let randomSide = Math.floor(Math.random() * boardSides.length)
        let sideMove = boardSides[randomSide].id.slice(-1) - 1
        if (typeof moves[sideMove] === 'number') {
            movement(sideMove)
        }
        else {
            playSide()
        }
    }

    function Strategy(cpuMark) {
        let movesCheck = [1, 2, 3]
        if (cpuMark === 'x') {
            for (let i = 0; i < boardSides.length; i++) {
                if (typeof moves[boardSides[i].id.slice(-1) - 1] !== 'number' && typeof moves[4] === 'number' && playerMoveCount === 1) {
                    return movement(4)
                }
                else if (cpuMoves !== moveCount && playerMoveCount === 2) {
                    for (let i = 0; i < moves.length; i += 3) {
                        movesCheck = [moves[i], moves[i + 1], moves[i + 2]]
                        if (!movesCheck.includes('o') && i !== 3 && !movesCheck.every(Number)) {
                            let move = movesCheck.find(element => {if (typeof element === 'number' && element % 2 !== 0) {return element}})
                            return movement(move - 1)
                        }
                    }
                    for (let i = 0; i < 3; i++) {
                        movesCheck = [moves[i], moves[i + 3], moves[i + 6]]
                        if (!movesCheck.includes('o') && i != 1 && 
                            typeof (moves[movesCheck.indexOf('x')] + 6)) {
                            let move = movesCheck.find(element => {if (typeof element === 'number' && element % 2 !== 0) {return element}})
                            return movement(move - 1)
                        }
                    }
                }
            }
            for (let i = 0; i < boardSides.length; i++) {
                if (typeof moves[boardSides[i].id.slice(-1) - 1] === 'number' && typeof moves[Math.abs(8 - moves.indexOf(players[1].mark))] === 'number') {
                    let oppositeCorner = Math.abs(8 - moves.indexOf(players[1].mark))
                    return movement(oppositeCorner)
                }
                else if (i === boardSides.length - 1 && cpuMoves !== moveCount) {
                    return playCorner()
                }
            }
            if (cpuMoves !== moveCount) {
                randomMove()
            }
        }

        else if (cpuMark === 'o') {
            if (playerMoveCount === 2 && moves.indexOf(players[0].mark) + moves.lastIndexOf(players[0].mark) === 8) {
                return playSide()
            }
            
            else {
                if (typeof moves[4] === 'number') {
                    console.log('h')
                    return movement(4)
                }
                
                for (let i = 0; i < boardSides.length; i++) {
                    if (moves[boardSides[i].id.slice(-1) - 1] === 'x') {
                        let move = boardSides[i].id.slice(-1) - 1
                        console.log(move)
                        if ((move === 1 || move === 7) && typeof moves[move - 1] === 'number') {
                            move--
                            return movement(move)
                        }
                        else if ((move === 3 || move === 5) && typeof moves[move - 3] === 'number') {
                            move -= 3
                            return movement(move)
                        }
                        else if (cpuMoves !== moveCount) {
                            return randomMove()
                        }
                    }
                }
            }
        }
    }

    function winAttempt() {
        let AIMoves = [1, 2, 3]
        for (let i = 0; i < moves.length; i += 3) {
            AIMoves = [moves[i], moves[i + 1], moves[i + 2]]
            if (AIMoves.indexOf(players[1].mark) !== AIMoves.lastIndexOf(players[1].mark) && typeof moves[AIMoves.find(Number) - 1] === 'number') {
                return movement(AIMoves.find(Number) - 1)
            }
        }
        for (let i = 0; i < moves.length; i++) {
            AIMoves = [moves[i], moves[i + 3], moves[i + 6]]
            if (AIMoves.indexOf(players[1].mark) !== AIMoves.lastIndexOf(players[1].mark) && typeof moves[AIMoves.find(Number) - 1] === 'number') {
                return movement(AIMoves.find(Number) - 1)
            }
        }
        for (let i = 0; i < 3; i += 2) {
            AIMoves = [moves[i], moves[4], moves[8 - i]]
            if (AIMoves.indexOf(players[1].mark) !== AIMoves.lastIndexOf(players[1].mark) && typeof moves[AIMoves.find(Number) - 1] === 'number') {
                return movement(AIMoves.find(Number) - 1)
            }
            else if (i === 2 && cpuMoves !== moveCount) {
                blockPlayer()
            }
        }
    }
    
    function blockPlayer() {
        let playerMoves = [1, 2, 3]
        for (let i = 0; i < moves.length; i += 3) {
            playerMoves = [moves[i], moves[i + 1], moves[i + 2]]
            if (playerMoves.indexOf(players[0].mark) !== playerMoves.lastIndexOf(players[0].mark) && typeof moves[playerMoves.find(Number) - 1] === 'number') {
                return movement(playerMoves.find(Number) - 1)
            }
        }
        for (let i = 0; i < moves.length; i++) {
            playerMoves = [moves[i], moves[i + 3], moves[i + 6]]
            if (playerMoves.indexOf(players[0].mark) !== playerMoves.lastIndexOf(players[0].mark) && typeof moves[playerMoves.find(Number) - 1] === 'number') {
                return movement(playerMoves.find(Number) - 1)
            }
        }
        for (let i = 0; i < 3; i += 2) {
            playerMoves = [moves[i], moves[4], moves[8 - i]]
            if (playerMoves.indexOf(players[0].mark) !== playerMoves.lastIndexOf(players[0].mark) && typeof moves[playerMoves.find(Number) - 1] === 'number') {
                return movement(playerMoves.find(Number) - 1)
            }
            else if (i === 2 && cpuMoves !== moveCount) {
                return Strategy(players[1].mark)
            }
        }
    }
    
    function movement(move) {
        if (typeof moves[move] === 'number') {
            board[move].textContent = players[playerTurn].mark
            board[move].removeEventListener('click', gameMode[gameType])
            moves[move] = players[playerTurn].mark
            moveCount++
        }
        else {
            return
        }
    }

    function initialMove() {
        let movesCheck = [1, 2, 3]
        let possibleMoves = []
        for (let i = 0; i < boardCorners.length; i++) {
            if (typeof moves[boardCorners[i].id.slice(-1) - 1] !== 'number') {
                return movement(4)
            }
        }
        for (let i = 0; i < moves.length; i += 3) {
            movesCheck = [moves[i], moves[i + 1], moves[i + 2]]
            if (movesCheck.includes('x')) {
                for (element of movesCheck) {if (typeof element === 'number' && element + moves.indexOf('x') !== 9) {possibleMoves.push(element - 1)}}
            }
        }
        for (let i = 0; i < moves.length; i++) {
            movesCheck = [moves[i], moves[i + 3], moves[i + 6]]
            if (movesCheck.includes('x')) {
                for (element of movesCheck) {if (typeof element === 'number' && element + moves.indexOf('x') !== 9) {possibleMoves.push(element - 1)}}
                let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
                return movement(move)
            }
        }
        if (cpuMoves !== moveCount) {
             return playCorner()
        }
    }

    function hardAI() {
        if (cpuMoves === 1) {
            initialMove()
            cpuMoves++
        }
        else {
            winAttempt()
            cpuMoves++
        }
    }

    function computerMove() {

        switch (chosenDifficulty) {
            case 'Easy':
                randomMove()
                break;
            case 'Medium':
                mediumAI()
                break;
            case 'Hard':
                hardAI()
                break;
        }
    }

    function clearForm(node) {
        while (node.firstChild) {
            node.firstChild.remove();
        }
    }

    function mainMenu() {
        moves = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        board.forEach(element => element.textContent = '')
        board.forEach(element => element.removeEventListener('click', gameMode[gameType]))
        boardContainer.style.display = 'none'
        cpuMoves = 1
        moveCount = 0
        gameType = 0
        playerMoveCount = 0
        playerTurn = 0
        players[0].mark = 'x'
        players[1].mark = 'o'
        clearForm(gameSettings)
        gameContainer.append(gameSettings)
        gameSettings.append(startMessage, buttonsContainer)
    }

    function rematch() {
        moves = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        board.forEach(element => element.textContent = '')
        board.forEach(element => element.addEventListener('click', gameMode[gameType], { once: true }))
        cpuMoves = 1
        moveCount = 0
        playerMoveCount = 0
        playerTurn = 0
        if (players[0].mark === 'o') {
            playerTurn = 1
            computerMove()
            playerTurn--
        }
    }

    function showWinner() {
        board.forEach(element => element.removeEventListener('click', gameMode[gameType]))
        winMessage.textContent = `The winner is ${players[playerTurn].name}`
        gameContainer.style.filter = 'blur(5px)'
        winMessage.style.display = 'flex'
        setTimeout(() => {
            winMessage.style.display = 'none'
            winMessage.textContent = ''
            gameContainer.style.filter = 'blur(0px)'
            rematchButton.addEventListener('click', rematch, { once: true })
        }, 3000);
    }

    function checkWinner() {
        for (let i = 0; i < moves.length; i += 3) {
            if (moves[i] === moves[i + 1] && moves[i + 1] === moves[i + 2]) {
                return showWinner()
            }
        }
        for (let i = 0; i < moves.length; i++) {
            if (moves[i] === moves[i + 3] && moves[i + 3] === moves[i + 6]) {
                return showWinner()
            }
        }
        for (let i = 0; i < 4; i += 2) {
            if (moves[i] === moves[8 - i] && moves[4] === moves[i]) {
                return showWinner()
            }
            else if (i === 2 && moves.every((element) => isNaN(element))) {
                showWinner()
                winMessage.textContent = `It's a draw`
            }
        }
    }
})()