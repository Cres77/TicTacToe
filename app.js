gameActive=false
const gameboard = (()=>{
    const playArea = document.querySelector(".gameboard")

    let gameSpots = ["","","","","","","","",""]
    let chosen="X"


    const createGrid = ()=>{
         for(i=0; i<(gameSpots.length); i++){
            const spot = document.createElement("div")
            spot.setAttribute("data-placement", (i))
            spot.classList.add("spot")
            spot.textContent = gameSpots[i]
            spot.addEventListener("click",()=>{
                if(gameSpots[spot.getAttribute("data-placement")]=="" && gameActive==true){
                    if(chosen=="X"){
                        gameSpots[spot.getAttribute("data-placement")]="X"
                        spot.textContent = "X"
                        chosen="O"
                        return
                    }
                    else if(chosen=="O"){
                        gameSpots[spot.getAttribute("data-placement")]="O"
                        spot.textContent = "O"
                        chosen="X"
                        return 
                    }
                    else return
                }
                else return
                
            })
            playArea.appendChild(spot)
        }
    }
    return{
        createGrid,
        gameSpots,
        chosen
    }   
})()
gameboard.createGrid()


//ScoreBoard
const Scoreboard = (()=>{
    const score = document.querySelector(".score")
    const winnerDisplay = document.querySelector(".winner")

    let P1Score = 0
    let P2Score = 0

    return{
        P1Score,
        P2Score,
        score,
        winnerDisplay
    }
})()


//Game win and start function
const Game = ()=>{
    function playNewGame(){
        gameActive=true
        for(i=0; i<(gameboard.gameSpots.length); i++){
            const spots = document.querySelectorAll(".gameboard div")
            spots.forEach(spot=>{
                if(gameboard.gameSpots[spot.getAttribute("data-placement")]!=""){
                spot.textContent=""
                gameboard.gameSpots[i]=""
                }
            })   
        }
    }
    win=false
    //Ends Game by deciding Win or Tie
    function gameEnd(){
        const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        const spots = document.querySelectorAll(".spot")
        spots.forEach(spot=>{
            spot.addEventListener("click",()=>{
                for(i=0;i<8;i++){//WIN
                    if(gameboard.gameSpots[winConditions[i][0]]=="X" && gameboard.gameSpots[winConditions[i][1]]=="X" && gameboard.gameSpots[winConditions[i][2]]=="X" && roundOver==false){
                        gameActive=false
                        roundOver=true
                        playGame.style.visibility="visible"
                        if(P1.choice=="X"){
                            Scoreboard.winnerDisplay.style.visibility = "visible"
                            Scoreboard.P1Score +=1
                            Scoreboard.score.textContent = Scoreboard.P1Score+ "-" + Scoreboard.P2Score
                            Scoreboard.winnerDisplay.textContent = "The winner is " + P1.name + "!"
                            return 
                        }
                        else{
                            Scoreboard.winnerDisplay.style.visibility = "visible"
                            Scoreboard.P2Score +=1
                            Scoreboard.score.textContent = Scoreboard.P1Score+ "-" + Scoreboard.P2Score
                            Scoreboard.winnerDisplay = "The winner is " + P2.name + "!"
                            return 
                        }
                        
                    }
                    else if(gameboard.gameSpots[winConditions[i][0]]=="O" && gameboard.gameSpots[winConditions[i][1]]=="O" && gameboard.gameSpots[winConditions[i][2]]=="O" && roundOver==false){
                        gameActive=false
                        roundOver=true
                        playGame.style.visibility="visible"
                        if(P1.choice=="O"){
                            Scoreboard.winnerDisplay.style.visibility = "visible"
                            Scoreboard.P1Score +=1
                            Scoreboard.score.textContent = Scoreboard.P1Score+ "-" + Scoreboard.P2Score
                            Scoreboard.winnerDisplay.textContent = "The winner is " + P1.name + "!"
                            return 
                        }
                        else{
                            Scoreboard.winnerDisplay.style.visibility = "visible"
                            Scoreboard.P2Score +=1
                            Scoreboard.score.textContent = Scoreboard.P1Score+ "-" + Scoreboard.P2Score
                            Scoreboard.winnerDisplay.textContent = "The winner is " + P2.name + "!"
                            return 
                        }
                    }  
                }
                    if(gameActive==true && gameboard.gameSpots.filter(spot=>spot!="").length==9 && roundOver==false){
                        Scoreboard.winnerDisplay.style.visibility = "visible"
                        playGame.style.visibility="visible"
                        gameActive=false
                        roundOver=true
                        Scoreboard.winnerDisplay.textContent = "TIE!"
                        return 
                    }
            })
        })
    }

  return{
        playNewGame,
        gameEnd,
    }
}       


//Start Game button
const playGame = document.querySelector(".playButton")
let roundOver = false
playGame.addEventListener("click",()=>{
    playGame.style.visibility="hidden"
    document.querySelector(".scoreboard").style.visibility = "visible"
    roundOver = false
    Scoreboard.winnerDisplay.style.visibility = "hidden"

    const newGame = Game()
        newGame.playNewGame()
        newGame.gameEnd()
    
    function newPlayers(){
        if(Scoreboard.P1Score == 0 && Scoreboard.P2Score == 0){
        const Player1Area = document.querySelector(".player1 .name")
        const Player2Area = document.querySelector(".player2 .name")
        const P1nameBox = document.querySelector("#p1NameBox")
        const P2nameBox = document.querySelector("#p2NameBox")
        const P1BigName = document.createElement("div")
        const P2BigName = document.createElement("div")

        P1BigName.classList.add("P1BigName")
        P1BigName.textContent = P1nameBox.value

        P2BigName.classList.add("P2BigName")
        P2BigName.textContent = P2nameBox.value

        P1 = createPlayer(P1nameBox.value, document.querySelector(".currentChoiceBut").textContent)
        P2 = createPlayer(P2nameBox.value, document.querySelector(".player2Choice").textContent)  

        Player1Area.removeChild(P1nameBox)
        Player2Area.removeChild(P2nameBox)
        Player1Area.appendChild(P1BigName)
        Player2Area.appendChild(P2BigName)  
        return P1,P2 
        }
    }
    newPlayers()
    
})


//createPlayer Factory Function (player1,player2,choice)   
const createPlayer = (name,choice)=>{ 
    
    this.name= name
    this.choice = choice

    function showPlayersChoice(){
        const currentChoiceBut = document.querySelector(".currentChoiceBut")
        const notCurrentChoice = document.querySelector(".notCurrentChoiceBut")
        const B1 = document.querySelector(".B1")
        const B2 = document.querySelector(".B2")
        const player2Choice = document.querySelector(".player2Choice")
        if(gameActive==true){
            currentChoiceBut.classList.add("permaChoice")
            B1.classList.remove("B1")
            B2.classList.remove("B2")
            notCurrentChoice.style.visibility="hidden"
        }
        else{
            B1.addEventListener("click",()=>{
            if(B1.classList.contains="currentChoiceBut" && gameActive==false && Scoreboard.P1Score==0 && Scoreboard.P2Score==0){
                B1.classList.add("notCurrentChoiceBut")
                B1.classList.remove("currentChoiceBut") 
                B2.classList.add("currentChoiceBut")
                B2.classList.remove("notCurrentChoiceBut")
                player2Choice.textContent = "X"
                }
            })
            B2.addEventListener("click",()=>{
            if(B2.classList.contains="currentChoiceBut" && gameActive==false && Scoreboard.P1Score==0 && Scoreboard.P2Score==0){
                B2.classList.add("notCurrentChoiceBut")
                B2.classList.remove("currentChoiceBut")
                B1.classList.add("currentChoiceBut")
                B1.classList.remove("notCurrentChoiceBut")
                player2Choice.textContent = "O"
            }   
            })
        }  
    }
    return{
        name,
        choice,
        showPlayersChoice
    }
}

//PFP image chooser
const PfPChooser = (()=>{

    function P1Img(){
        const img1 = document.querySelector(".player1 img")
        const ImgChooser = document.querySelector(".p1ImgChooser")
        img1.addEventListener("click",()=>{
            ImgChooser.style.visibility = "visible"
        })
        document.addEventListener("click",(e)=>{
            if(e.target.closest(".p1ImgChooser")){
                return
            }
            else if(e.target.closest(".player1 .playerPhoto")){
                return
            }
            else ImgChooser.style.visibility = "hidden"
        })
        const img1Options = document.querySelectorAll(".img1Options")
        img1Options.forEach(img => {
            img.addEventListener("click",(e)=>{
            if(e.target.closest("img")){
                imgLocation= img.getAttribute("src")
                return img1.setAttribute("src",imgLocation)    
            }
            }) 
        })    
    } 

    function P2Img(){
        const img2 = document.querySelector(".player2 img")
        const ImgChooser = document.querySelector(".p2ImgChooser")
        img2.addEventListener("click",()=>{
            ImgChooser.style.visibility = "visible"
        })
        document.addEventListener("click",(e)=>{
            if(e.target.closest(".p2ImgChooser")){
                return
            }
            else if(e.target.closest(".player2 .playerPhoto")){
                return
            }
            else ImgChooser.style.visibility = "hidden"
        })
        const img2Options = document.querySelectorAll(".img2Options")
        img2Options.forEach(img => {
            img.addEventListener("click",(e)=>{
            if(e.target.closest("img")){
                imgLocation= img.getAttribute("src")
                return img2.setAttribute("src",imgLocation)    
            }
            }) 
        })    
    }

    return{
        P1Img,
        P2Img
    }

})()

const test = createPlayer()
test.showPlayersChoice()
PfPChooser.P1Img()
PfPChooser.P2Img()
