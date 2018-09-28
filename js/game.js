const mineImage = {
    image: "images/bomb-5.png",
    identifier: "mine",
    isOpen: "open"
};
const minesBoard = document.getElementById("minesweeper");
let mines = []
let selected = null
let cont = 0

function minesBuilder() {
    mines.forEach(function (row, x) {
        row.forEach(function (mine, y) {
            let result = (mine == -1) ? createBomb(x, y) : createEmpty(mine, x, y);
            result.addEventListener("click", flipFuncBuilder);
            minesBoard.appendChild(result);
        });
    });
}

function coordinates() {
    mines.forEach(function (row, x) {
        row.forEach(function (mine, y) {
            if (mine == -1) { mineCounter(x, y) }
        });
    });
}

function flipFuncBuilder() {
    flip(this);
}

function flip(element) {
    element.classList.toggle("square--flip");
    removeClick(element);
    selectedSquare(element);
    element.dataset.isOpen = mineImage.isOpen;
    let x = parseFloat(element.dataset.x)
    let y = parseFloat(element.dataset.y)
    let cell = mines[x][y]

    if (cell == 0) {
        shouldOpen(x - 1, y)
        shouldOpen(x + 1, y)
        shouldOpen(x, y - 1)
        shouldOpen(x, y + 1)
        shouldOpen(x - 1, y - 1)
        shouldOpen(x - 1, y + 1)
        shouldOpen(x + 1, y + 1)
        shouldOpen(x + 1, y - 1)
    }
}

function shouldOpen(x, y) {
    if (mines[x] && mines[x][y] !== undefined && mines[x][y] > -1) {
        let item = document.querySelectorAll(`[data-x="${x}"][data-y="${y}"]`)[0];
        if (!item.dataset.isOpen) {
            return flip(item);
        }
    }
    return;
}

function removeClick(board) {
    board.removeEventListener("click", flipFuncBuilder);
}

function selectedSquare(selected) {
    mineFound(selected)
}

function mineFound(selected) {
    if (selected.dataset.mine == "mine") {
        setTimeout(gameOver, 1500);
    } else {
        cont++
        contEmptySquare(cont)
    }
}
function contEmptySquare(cont) {
    if (cont == 71) {
        setTimeout(gameWon, 1500);
    }
}

function gameWon() {
    window.location.href = "../Minesweeper/gameWon.html";
}

function gameOver() {
    window.location.href = "../Minesweeper/gameOver.html";
}

function createBomb(x, y) {
    let square = document.createElement("div")
    square.className = "square"
    square.dataset.mine = mineImage.identifier
    square.setAttribute("data-x", x)
    square.setAttribute("data-y", y)

    let front = document.createElement("img");
    front.className = 'front--face';
    square.appendChild(front)

    let back = document.createElement("img");
    back.className = 'back--face';
    back.src = mineImage.image
    square.appendChild(back)
    return square
}

function createEmpty(mine, x, y) {
    let square = document.createElement("div")
    square.className = "square"
    square.setAttribute("data-x", x)
    square.setAttribute("data-y", y)

    let front = document.createElement("img");
    front.className = 'front--face';
    square.appendChild(front)

    let back = document.createElement("div");
    back.className = 'back--face';
    back.innerText = mine
    square.appendChild(back)
    mine == 0 ? back.style.color = "white" : 0
    mine == 1 ? back.style.color = "#339933" : 0
    mine == 2 ? back.style.color = "#cc6666" : 0
    mine == 3 ? back.style.color = "#6600cc" : 0
    mine == 4 ? back.style.color = "#cc00cc" : 0
    mine == 5 ? back.style.color = "#ff3399" : 0
    mine == 6 ? back.style.color = "#ffcc00" : 0
    mine == 7 ? back.style.color = "#ff6600" : 0
    mine == 8 ? back.style.color = "#ff0000" : 0
    return square
}

function createMines() {
    for (let i = 0; i < 9; i++) {
        mines.push([])
        for (let j = 0; j < 9; j++) {
            mines[i].push(0)
        }
    }
    for (let i = 0; i < 10; i++) {
        let num1 = Math.floor(Math.random() * 9)
        let num2 = Math.floor(Math.random() * 9)
        if (mines[num1][num2]) {
            num1 = Math.floor(Math.random() * 9)
            num2 = Math.floor(Math.random() * 9)
        }
        mines[num1][num2] = -1;
    }
}

(function initializeGame() {
    createMines()
    coordinates()
    minesBuilder()
    console.log(mines);

})()

function mineCounter(x, y) {
    isMine(x - 1, y - 1) ? mines[x - 1][y - 1]++ : 0
    isMine(x - 1, y) ? mines[x - 1][y]++ : 0
    isMine(x - 1, y + 1) ? mines[x - 1][y + 1]++ : 0
    isMine(x, y - 1) ? mines[x][y - 1]++ : 0
    isMine(x, y + 1) ? mines[x][y + 1]++ : 0
    isMine(x + 1, y - 1) ? mines[x + 1][y - 1]++ : 0
    isMine(x + 1, y) ? mines[x + 1][y]++ : 0
    isMine(x + 1, y + 1) ? mines[x + 1][y + 1]++ : 0
}

function isMine(x, y) {
    return mines[x] && mines[x][y] !== undefined && mines[x][y] > -1
}
