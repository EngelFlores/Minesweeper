const mineImage = "images/bomb-5.png";
const minesBoard = document.getElementById("minesweeper");
let mines = []

function minesBuilder() {

    let board = document.createElement("div");
    board.className = '1'

    let front = document.createElement("img");
    front.className = '2'
    board.appendChild(front)

    let back = document.createElement("img");
    back.src = mineImage;
    back.className = '3';

    let square = document.createElement("div");
    square.innerText = 'VAZIO';
    square.className = '4';

    mines.forEach(function(row) {
        row.forEach(function(mine) {
            let result = (mine == true) ? createBomb() : createEmpty();
            board.appendChild(result);
        });
    });

    minesBoard.appendChild(board);

}
function createBomb() {
    
}

function createEmpty(){
    
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
        mines.map(function (row, index) {
            if (index == num1) {
                row[num2] = !row[num2] ? true : null
            }
        })
    }
}

// function randomCards() {
//     
//     let level = parseLevelForm();
//     let newCardsList = cardsList.splice(randomNumber, level)
//     let duplicatedCards = newCardsList.map(function (item) {
//         return [item, item];
//     }).reduce(function (newCardsList, b) { return newCardsList.concat(b) })

//     duplicatedCards.forEach(createCard)
// }