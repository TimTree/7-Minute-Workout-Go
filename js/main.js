let timerSeconds = 0;
let timerMinutes = 0;
let intime;

document.getElementById("go").addEventListener("click", function(){
  go();
    /*document.getElementById("body").style.gridTemplateRows = "80px 1fr";
    document.getElementById("body").style.gridTemplateAreas = `"sidebar" "content"`;
    document.getElementById("titleArea").style.display = "none";
    document.getElementById("workoutArea").style.display = "grid";
    document.getElementById("theBar").style.display = "block";*/
});

function titleToCredits() {
  document.getElementById("titleArea").style.opacity = "0";
  document.getElementById("titleArea").style.display = "none";
  document.getElementById("creditsArea").style.display = "block";
  setTimeout(() => {document.getElementById("creditsArea").style.opacity = "1";},50);
}

function creditsToTitle() {
  document.getElementById("creditsArea").style.opacity = "0";
  document.getElementById("titleArea").style.display = "block";
  document.getElementById("creditsArea").style.display = "none";
  setTimeout(() => {document.getElementById("titleArea").style.opacity = "1";},50);
}

function go() {
  document.getElementById("titleArea").style.opacity = "0";
  document.getElementById("titleArea").style.display = "none";
  document.getElementById("countdown").style.display = "flex";
  setTimeout(() => {document.getElementById("countdown").style.opacity = "1";},50);
  document.getElementById("numberCountdown").innerHTML="3";
  setTimeout(() => {document.getElementById("numberCountdown").innerHTML="2";},1000);
  setTimeout(() => {document.getElementById("numberCountdown").innerHTML="1";},2000);
  setTimeout(() => {countdownToWorkout();startTimer();},3000);
}

function countdownToWorkout() {
  document.getElementById("body").style.gridTemplateRows = "80px 1fr";
  document.getElementById("body").style.gridTemplateAreas = `"sidebar" "content"`;
  document.getElementById("countdown").style.display = "none";
  document.getElementById("workoutArea").style.display = "grid";
  document.getElementById("theBar").style.display = "block";
  document.getElementById("active-gauge").style.animationPlayState="running";
  document.getElementById("elapsedTime").style.animationPlayState="running";
  setTimeout(() => {document.getElementById("workoutArea").style.opacity = "1";},50);
}

function startTimer() {
  intime=setInterval(stopwatch,1000);
  offset = Date.now();
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
  }

    function stopwatch() {
    timerSeconds = Math.round((timerSeconds*1+(stopwatch2()/1000)));
    if (timerSeconds >= 60) {
        timerSeconds = 0;
        timerMinutes++;
    }
    document.getElementById("elapsedTime").innerHTML=timerMinutes + ":"+(timerSeconds > 9 ? timerSeconds : "0" + timerSeconds);
    }

    function stopwatch2() {
    var now = Date.now(),
    d = now - offset;
    offset = now;
    return d;
    }

setTimeout(() => {document.getElementById("titleArea").style.opacity = "1";},100);
