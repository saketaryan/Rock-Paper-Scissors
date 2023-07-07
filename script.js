let playerScore = 0;
let computerScore = 0;

function main() {
    softReset();
    if(localStorage.getItem("player-score") === null) localStorage.setItem("player-score", 0);
    if(localStorage.getItem("computer-score") === null) localStorage.setItem("computer-score", 0);
    playerScore = localStorage.getItem("player-score");
    computerScore = localStorage.getItem("computer-score");

    document.getElementById('reset').classList.remove("hidden");

    // updating the score
    if(playerScore === null) playerScore = 0;
    document.getElementById("player-score").innerHTML = playerScore;
    if(computerScore === null) computerScore = 0;
    document.getElementById("computer-score").innerHTML = computerScore;
}

const rock = 
`<div class="circle select-none circleh border-blue">
<img class="mx-auto" src="./assets/rock.svg" />
</div>`;

const paper =
`<div class="circle select-none circleh border-yellow">
<img class="mx-auto" src="./assets/paper.svg" />
</div>`;

const scissors =
`<div class="circle select-none circleh border-purple">
<img class="mx-auto" src="./assets/scissor.svg" />
</div>`;

const toggleRules = () => {
    const rules = document.getElementById("game-rules");
    if (rules.classList.contains("hidden")) {
        rules.classList.remove("hidden");
    }
    else {
        rules.classList.add("hidden");
    }
}

const playAgain = () => {
    softReset();
    document.getElementById("result-text2").innerHTML = "AGAINST COMPUTER";
    document.getElementById("result-btn").innerHTML = "PLAY AGAIN";
}

const hardReset = () => {
    localStorage.setItem("player-score", 0);
    localStorage.setItem("computer-score", 0);
    computerScore = 0;
    playerScore = 0;
    displayResult("reset", "reset", "reset");
    softReset();
}

const softReset = () => {
    document.getElementById('initial-page').classList.remove('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    document.getElementById('result-page').classList.add('hidden');
    document.getElementById('hurray').classList.add('hidden');
    document.getElementById("next").classList.add("hidden");
    document.getElementById("reset").classList.add("hidden");
    document.getElementById("game-rules").classList.add("hidden");
    document.getElementById('result-btn').classList.remove('hidden');
}

const gotoWin = () => {
    softReset();
    document.getElementById('initial-page').classList.add('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('rules').classList.add('hidden');
    document.getElementById('hurray').classList.remove('hidden');
}

const play = (playerChoice) => {
    if(playerScore >= 15 || computerScore >= 15) return;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    // saving the score
    if(result === "player") {
        playerScore++;
        localStorage.setItem("player-score", playerScore);
    }else if(result === "computer") {
        computerScore++;
        localStorage.setItem("computer-score", computerScore);
    }
    displayResult(result, playerChoice, computerChoice);
    if(playerScore >= 15&&computerScore<15) {
        document.getElementById("next").classList.remove("hidden");
        localStorage.setItem("player-score", 0);
    }
    else if(playerScore < 15&&computerScore>=15) {
        document.getElementById("reset").classList.remove("hidden");
        localStorage.setItem("computer-score", 0);
    }

}

const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * 3);
    return choices[random];
}

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return "draw";
    }
    else if (playerChoice === "rock") {
        if (computerChoice === "paper") {
            return "computer";
        }
        else {
            return "player";
        }
    }
    else if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
            return "computer";
        }
        else {
            return "player";
        }
    }
    else if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
            return "computer";
        }
        else {
            return "player";
        }
    }
}

const displayResult = (result, playerChoice, computerChoice) => {

    if(playerScore>=15||computerScore>=15) {
        document.getElementById('result-btn').classList.add('hidden');
    }

    if(result === "reset") {
        document.getElementById("player-score").innerHTML = 0;
        document.getElementById("computer-score").innerHTML = 0;
    }

    if(result === "player") {
        document.getElementById("player-score").innerHTML = playerScore;
    }else if(result === "computer") {
        document.getElementById("computer-score").innerHTML = computerScore;
    }

    document.getElementById('initial-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');

    switch (playerChoice) {
        case "rock":
            document.getElementById("result-left").innerHTML = rock;
            break;
        case "paper":
            document.getElementById("result-left").innerHTML = paper;
            break;
        case "scissors":
            document.getElementById("result-left").innerHTML = scissors;
            break;
    }

    switch (computerChoice) {
        case "rock":
            document.getElementById("result-right").innerHTML = rock;
            break;
        case "paper":
            document.getElementById("result-right").innerHTML = paper;
            break;
        case "scissors":
            document.getElementById("result-right").innerHTML = scissors;
            break;
    }

    if(result === "player") {
        document.getElementById("result-text1").innerHTML = "YOU WIN";
        document.querySelector("#result-left .circle").classList.add("win");
    }else if(result === "computer") {
        document.getElementById("result-text1").innerHTML = "YOU LOSE";
        document.querySelector("#result-right .circle").classList.add("win");
    }else {
        document.getElementById("result-text1").innerHTML = "TIE UP";
        document.getElementById("result-text2").innerHTML = "";
        document.getElementById("result-btn").innerHTML = "REPLAY";
    }

}

main();