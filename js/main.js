let timerSeconds = 0;
let timerMinutes = 0;
let intime;
let imgNum = 1;
let workoutNumbers = [];

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
  createWorkout();
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
  setTimeout(() => {document.getElementById("theBar").style.opacity = "1";},50);
  workoutInterval();
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
    document.getElementById("elapsedTime").innerHTML=timerMinutes + ":" + (timerSeconds > 9 ? timerSeconds : "0" + timerSeconds);
    }

    function stopwatch2() {
    var now = Date.now(),
    d = now - offset;
    offset = now;
    return d;
    }

setTimeout(() => {document.getElementById("titleArea").style.opacity = "1";},100);

function createWorkout() {

  let cardioNumbers = [];
  let upperLowerBodyNumbers = [];
  let coreNumbers = [];
  let workoutSchemaSort = workoutSchema; // clone workoutSchema

  while (workoutSchemaSort[0] != 0) {
    shuffleArray(workoutSchemaSort);
  }

  for (let i = 0; i<workoutSchemaSort.length; i +=1 ) {
    workoutNumbers.push([workoutSchemaSort[i],0]);
  }

  shuffleArray(workoutSchemaSort);

  for (let i = 0; i<workoutSchemaSort.length; i +=1 ) {
    workoutNumbers.push([workoutSchemaSort[i],0]);
  }

  while (cardioNumbers.length < 2) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[0].length);
      if (cardioNumbers.indexOf(randomNumber) > -1) continue;
      cardioNumbers[cardioNumbers.length] = randomNumber;
    }
    while (upperLowerBodyNumbers.length < 2) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[1].length);
      if (upperLowerBodyNumbers.indexOf(randomNumber) > -1) continue;
      upperLowerBodyNumbers[upperLowerBodyNumbers.length] = randomNumber;
    }
    while (coreNumbers.length < 2) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[2].length);
      if (coreNumbers.indexOf(randomNumber) > -1) continue;
      coreNumbers[coreNumbers.length] = randomNumber;
    }

  for (let i = 0; i < workoutNumbers.length; i += 1 ) {

    if (workoutNumbers[i][0] === 0) {
      workoutNumbers[i][1] = cardioNumbers[0];
      cardioNumbers.splice(0, 1);
    }
    else if (workoutNumbers[i][0] === 1) {
      workoutNumbers[i][1] = upperLowerBodyNumbers[0];
      upperLowerBodyNumbers.splice(0, 1);
    }
    else if (workoutNumbers[i][0] === 2) {
      workoutNumbers[i][1] = coreNumbers[0];
      coreNumbers.splice(0, 1);
    }

  }
  console.log(workoutNumbers);

  console.log(workoutNumbers[0][0]);
}

function shuffleArray(a) {
  // Fisher-Yates algorithm
    for (let i = a.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function workoutInterval() {

  for (let i = 0; i < workoutNumbers.length; i += 1) {

    setTimeout(() => {
      document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[i][0]][workoutNumbers[i][1]] [Object.keys(allWorkouts[ workoutNumbers[i][0] ][ workoutNumbers[i][1] ])[0]];
      document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[workoutNumbers[i][0]][workoutNumbers[i][1]] [Object.keys(allWorkouts[ workoutNumbers[i][0] ][ workoutNumbers[i][1] ])[1]] + `)`;

      if (i < workoutNumbers.length - 1) {
      document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutNumbers[i+1][0]][workoutNumbers[i+1][1]] [Object.keys(allWorkouts[ workoutNumbers[i+1][0] ][ workoutNumbers[i+1][1] ])[0]];
    } else {
      document.getElementById("nextWorkout").innerHTML = "Done!";
    }
  },3000*i);
  }



}

console.log( allWorkouts[2][1] [Object.keys(allWorkouts[2][1])[0]]   );
