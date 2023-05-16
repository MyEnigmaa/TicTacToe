//Variables & Objectes
const board = document.getElementById("board");
const newGameBtn = document.getElementById("newGame");
const xSource = "./img/X_icon.svg";
const oSource = "./img/O_icon.svg";
var activePlayer=1;

const gameboard = (() => {
    const boardArr = new Array(3).fill(0).map(()=>new Array (3).fill(0));

    function createTile(number, row, column){
        number = number;
        tileRow = row;
        tileColumn = column;
        var divTile;
        var playerPicked = 0;
        return{

            selectTile(activePlayer,e){
                let y = document.createElement("img");
                if(activePlayer==1){
                    y.src = xSource;
                }
                else {
                    y.src = oSource;
                }
                y.className = "pressed-img";
                e.target.appendChild(y);
                
            },
            createDomElement(){
                divTile = document.createElement("div");
                divTile.id = number;
                divTile.className = "plate";
                board.appendChild(divTile);
                divTile.addEventListener("click", (e)=>{player(e);})
            },
            setPlayer(player){
                playerPicked = player;
            },
            getPlayer(){
                return playerPicked;
            }

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
    const restartGame = ()=>{
        gameboard.clearBoard();
        timesPressed = 0;
    }
    const checkForWin = (row, column, entrie)=>{//Checking for winning condition

        timesPressed++;
        if(timesPressed<5) return;//winner only after 5 picks

        //cheking diagonal
        if(gameboard.boardArr[1][1].getPlayer() != 0) 
        {
            if(gameboard.boardArr[0][0].getPlayer()== gameboard.boardArr[1][1].getPlayer())
            {
                if(gameboard.boardArr[2][2].getPlayer()==gameboard.boardArr[1][1].getPlayer()){
                    winner(gameboard.boardArr[1][1].getPlayer());
                    return;
                }
            }
            if((gameboard.boardArr[0][2].getPlayer()== gameboard.boardArr[1][1].getPlayer()))
            {
                if(gameboard.boardArr[2][0].getPlayer()==gameboard.boardArr[1][1].getPlayer()){
                    winner(gameboard.boardArr[1][1].getPlayer());
                    return;
                }
            }
        }

        //checking horizontal and vertical

        if(gameboard.boardArr[1][0].getPlayer()!=0)//second row, first column
        {
            if(gameboard.boardArr[1][2].getPlayer() == gameboard.boardArr[1][0].getPlayer()) //second row check
            {
                if(gameboard.boardArr[1][0].getPlayer() == gameboard.boardArr[1][1].getPlayer())
                {
                    winner(gameboard.boardArr[1][0].getPlayer());
                    return;
                }
            }

            if(gameboard.boardArr[1][0].getPlayer() == gameboard.boardArr[0][0].getPlayer()){//first column vertical
                if(gameboard.boardArr[1][0].getPlayer() == gameboard.boardArr[2][0].getPlayer()){
                    winner(gameboard.boardArr[1][0].getPlayer());
                    return;
                }
            }
        }

        if(gameboard.boardArr[0][1].getPlayer()!=0)//first row, second column
        {
            if(gameboard.boardArr[0][1].getPlayer() == gameboard.boardArr[0][0].getPlayer()) //first row
            {
                if(gameboard.boardArr[0][1].getPlayer() == gameboard.boardArr[0][2].getPlayer()){
                    winner(gameboard.boardArr[0][1].getPlayer());
                    return;
                }
            }
            if(gameboard.boardArr[0][1].getPlayer() ==  gameboard.boardArr[1][1].getPlayer())
            {
                if(gameboard.boardArr[0][1].getPlayer() == gameboard.boardArr[2][1].getPlayer())//second column
                {
                    winner(gameboard.boardArr[0][1].getPlayer());
                    return;
                }
            }
        }

        if(gameboard.boardArr[1][2].getPlayer() != 0)//second row, third column
        {
            if(gameboard.boardArr[1][2].getPlayer() == gameboard.boardArr[0][2].getPlayer())//third column
            {
                if(gameboard.boardArr[1][2].getPlayer() == gameboard.boardArr[2][2].getPlayer())
                {
                    winner(gameboard.boardArr[1][2].getPlayer());
                    return;
                }
            }
        }

        if(gameboard.boardArr[2][1].getPlayer() != 0)//third row, second column
        {
            if(gameboard.boardArr[2][1].getPlayer() == gameboard.boardArr[2][0].getPlayer())//third row
            {
                if(gameboard.boardArr[2][1].getPlayer() == gameboard.boardArr[2][2].getPlayer())
                {
                    winner(gameboard.boardArr[2][1].getPlayer());
                    return;
                }
            }
        }

        


        if(timesPressed==9){//draw if theres no winner after 9 picks
            winner(0);
        }
        return;
    }

    const winner = (player) => {
        if(player==0){
            console.log("draw");
        }
        console.log("player " + player + " won");
    }

    return {checkForWin, restartGame};
})();

//Functions
newGameBtn.addEventListener("click", ()=>{game.restartGame()}); //Clears the Board

function player(e){
    if(e.target != e.currentTarget)return; //prevents childs from triggering
    let row = Math.floor(e.target.id/3);
    let column = e.target.id%3;
    gameboard.boardArr[row][column].selectTile(activePlayer,e);
    gameboard.boardArr[row][column].setPlayer(activePlayer);
    game.checkForWin(row, column,activePlayer);
    activePlayer == 1 ? activePlayer=2 : activePlayer=1;
}

window.onload = ()=>{

    console.log("player 1 x, player 2 o")
    gameboard.createBoard();
}