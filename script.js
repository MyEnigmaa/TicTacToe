//Variables & Objectes
const board = document.getElementById("board");
const newGameBtn = document.getElementById("newGame");
const xSource = "./img/X_icon.svg";
const oSource = "./img/O_icon.svg";
var player = true;

const gameboard = (() => {
    const boardArr = new Array(3).fill(0).map(()=>new Array (3).fill(0));

    function createTile(number, row, column){
        number = number;
        tileRow = row;
        tileColumn = column;
        tileTaken = false;
        var divTile;
        return{

            selectTile(e){
                if(this.tileTaken==true || e.target != e.currentTarget) return;
                let y = document.createElement("img");
                if(player==true){
                    y.src = xSource;
                    player = false;
                }
                else {
                    y.src = oSource;
                    player = true;
                }
                y.className = "pressed-img";
                e.target.appendChild(y);
                tileTaken=true;
            },
            createDomElement(){
                divTile = document.createElement("div");
                divTile.id = number;
                divTile.className = "plate";
                board.appendChild(divTile);
                divTile.addEventListener("click", (element)=>{platePressed(element);})
            },

        }
    }


    const createBoard = () => {
        let x=0;
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                boardArr[i][j] = createTile(x,i,j);
                boardArr[i][j].createDomElement();
                x++;
            }
        }
    };
    const clearBoard = () => {
        board.innerHTML = '';
        createBoard();
    };




    return {createBoard, clearBoard, boardArr};
})();


const game = (()=>{
    var timesPressed = 0;

    const checkForWin = ()=>{

        

        if(timesPressed==8){
            prompt("no Winner")
        }
    }


})();

//Functions
newGameBtn.addEventListener("click", ()=>{gameboard.clearBoard()}); //Clears the Board

function platePressed(e){
    if(e.target != e.currentTarget)return; //prevents childs from triggering
    gameboard.boardArr[Math.floor(e.target.id/3)][e.target.id%3].selectTile(e);
}

function player(){
}

window.onload = ()=>{
    gameboard.createBoard();
}