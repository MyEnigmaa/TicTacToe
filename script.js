//Variables & Objectes
const board = document.getElementById("board");
const gameboard = (() => {
    const boardArr = new Array(3).fill(0).map(()=>new Array (3).fill(0));

    const createBoard = () =>{
        
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                boardArr[i][j] = document.createElement("div");
                boardArr[i][j].className = "plate";
                board.appendChild(boardArr[i][j]);
            }

        }
    };

    return {createBoard};
})();


function player(){

}

window.onload = ()=>{
    gameboard.createBoard();
}