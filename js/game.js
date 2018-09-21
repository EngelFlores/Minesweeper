const mineImage = {
    image: "images/bomb-5.png",
    identifier: "mine"
};
const minesBoard = document.getElementById("minesweeper");
let mines = []
let selected = null
let cont = 0

function minesBuilder() {
    mines.forEach(function (row) {
        row.forEach(function (mine) {
            let result = mine ? createBomb() : createEmpty();
            result.addEventListener("click", flip);
            minesBoard.appendChild(result);
        });
    });

}

function flip() {
    this.classList.toggle("square--flip");
    this.removeEventListener("click", flip);
    selectedSquare(this)
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
        gameWon()
    }
}

function gameWon() {
    window.location.href = "../Minesweeper/gameWon.html";
}

function gameOver() {
    window.location.href = "../Minesweeper/gameOver.html";
}

function createBomb() {
    let square = document.createElement("div")
    square.className = "square"
    square.dataset.mine = mineImage.identifier
    console.log(square);

    let back = document.createElement("img");
    back.className = 'back--face';
    back.src = mineImage.image
    square.appendChild(back)

    let front = document.createElement("img");
    front.className = 'front--face';
    square.appendChild(front)
    return square
}

function createEmpty() {
    let square = document.createElement("div")
    square.className = "square"

    let back = document.createElement("img");
    back.className = 'back--face';
    square.appendChild(back)

    let front = document.createElement("img");
    front.className = 'front--face';
    square.appendChild(front)
    return square
}

function createMines() {
    for (let i = 0; i < 9; i++) {
        mines.push([])
        for (let j = 0; j < 9; j++) {
            mines[i].push(null)
        }
    }
    for (let i = 0; i < 10; i++) {
        let num1 = Math.floor(Math.random() * 9)
        let num2 = Math.floor(Math.random() * 9)
        if (mines[num1][num2]) {
            num1 = Math.floor(Math.random() * 9)
            num2 = Math.floor(Math.random() * 9)
        }
        mines[num1][num2] = true;
    }
}

(function initializeGame() {
    createMines()
    minesBuilder()
})()

// function randomCards() {
//     
//     let level = parseLevelForm();
//     let newCardsList = cardsList.splice(randomNumber, level)
//     let duplicatedCards = newCardsList.map(function (item) {
//         return [item, item];
//     }).reduce(function (newCardsList, b) { return newCardsList.concat(b) })

//     duplicatedCards.forEach(createCard)
// }