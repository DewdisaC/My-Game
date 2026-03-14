var runSound = new Audio("run.mp3");
runSound.loop = true;
var jumpSound = new Audio("jump.mp3");

var deadSound = new Audio("dead.mp3");

function keyCheck(event) {
    if (event.which == 13) {

        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runSound.play();

            backgroundWorckerId = setInterval(background, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }



    }



    if (event.which == 32) {
        if (JumpworkerId == 0) {
            clearInterval(runWorkerId);
            runWorkerId=-1;
            runSound.pause();

            JumpworkerId = setInterval(Jump, 100);
            jumpSound.play();


        }

    }


}
var boyId = document.getElementById("boy");
var runWorkerId = 0;
var runImageNumber = 1;
function run() {
    runImageNumber++;
    if (runImageNumber == 9) {

        runImageNumber = 1;

    }
    boyId.src = "Run (" + runImageNumber + ").png";

}

var JumpworkerId = 0;
var JumpImageNumber = 1;
var boyMarginTop = 450;
function Jump() {
    JumpImageNumber++;
    if (JumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

    if (JumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

    if (JumpImageNumber == 13) {
        JumpImageNumber = 1;
        clearInterval(JumpworkerId);
        runWorkerId = setInterval(run, 100);
        runSound.play();
        JumpworkerId = 0;

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);

        }
        if (createBlockWorkerId == 0) {
            createBlockWorkerId = setInterval(createBlock, 100);
        }
        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }
        if (backgroundWorckerId == 0) {
            backgroundWorckerId = setInterval(background, 100);
        }
    }
    boyId.src = "Jump (" + JumpImageNumber + ").png";

}
var backgroundId = document.getElementById("background");
var positionX = 0;
var backgroundWorckerId = 0;
function background() {
    positionX = positionX - 20;
    backgroundId.style.backgroundPositionX = positionX + "px";
}
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore() {

    newScore++;
    scoreId.innerHTML = newScore;

}
var createBlockWorkerId = 0;
var blockMarginLeft = 500;
var blockNumber = 1;

function createBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockNumber;

    blockNumber++;
    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";


    document.getElementById("background").appendChild(block);

}

var moveBlockWorkerId = 0;
function moveBlock() {

    for (var i = 1; i <= blockNumber; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";
        //alart (newBlockMarginLeft);

        if (newBlockMarginLeft < 139 & newBlockMarginLeft > 39) {
            // alart(boyMarginTop);
            //alart("Dead");
            if (boyMarginTop > 410) {
                clearInterval(runWorkerId);
                runSound.pause();
                clearInterval(JumpworkerId);
                JumpworkerId = -1;

                clearInterval(backgroundWorckerId);
                clearInterval(scoreWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockWorkerId);

                deadWorkerId = setInterval(dead, 100);
                deadSound.play();
                //alert("Dead");

            }
        }
    }

}
var deadWorkerId = 0;
var deadImageNumber = 1;

function dead() {

    deadImageNumber++;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        boyId.style.marginTop = "450px";
        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;

    }

    boyId.src = "Dead (" + deadImageNumber + ").png";
}

function reload() {
    location.reload();
}