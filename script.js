//Variables & Objectes
const board = document.getElementById("board");
const newGameBtn = document.getElementById("newGame");
const xSource = "./img/X_icon.svg";
const oSource = "./img/O_icon.svg";
var plates;

const gameboard = (() => {
    const boardArr = new Array(3).fill(0).map(()=>new Array (3).fill(0));


    const createBoard = () => {
        let x=0;
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                let temp = document.createElement("div");
                boardArr[i][j] = temp;
                boardArr[i][j].id = x;
                boardArr[i][j].className = "plate";
                board.appendChild(boardArr[i][j]);
                x++;
            }
        }
        plates = document.querySelectorAll(".plate");
        plates.forEach(element => {
            element.addEventListener("click", (element)=>{
                platePressed(element);
            })
        });
    };
    const clearBoard = () => {
        board.innerHTML = '';
        createBoard();
    };

    const platePressed = (e) => {
        if(e.target != e.currentTarget)return; //prevents childs from triggering

        if(!e.target.firstChild ){
            let y = document.createElement("img");
            y.src = xSource;
            y.style.display = "block";
            e.target.appendChild(y);
        }
    }
    return {createBoard, clearBoard};
})();


//Functions
newGameBtn.addEventListener("click", ()=>{gameboard.clearBoard()}); //Clears the Board



function player(){
}

window.onload = ()=>{
    gameboard.createBoard();
}