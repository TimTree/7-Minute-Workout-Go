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

let workoutSetNumber = 0;
let workoutSetNumberMinusBreaks = 0;

  let intervalTimer = 30;
  let a = setInterval(() => {
    intervalTimer -= 1;
    if (intervalTimer != 0) {
    document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
  } else {
    if (workoutSetNumber % 2 === 0) {
    intervalTimer = 10;
    document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
    workoutSetNumber += 1;
    workoutSetNumberMinusBreaks += 1;
  } else {
    intervalTimer = 30;
    document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
    workoutSetNumber += 1;
  }
  }
  },1000);

  let counter = 2;

  let b = setInterval(() => {
    document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[workoutNumbers[workoutSetNumberMinusBreaks][0]][workoutNumbers[workoutSetNumberMinusBreaks][1]] [Object.keys(allWorkouts[ workoutNumbers[workoutSetNumberMinusBreaks][0] ][ workoutNumbers[workoutSetNumberMinusBreaks][1] ])[counter]] + `)`;
    counter += 1;
        if(counter === 5) {
            counter = 1;
        }
  },780);

  // Workout 1
  document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[0][0]][workoutNumbers[0][1]] [Object.keys(allWorkouts[ workoutNumbers[0][0] ][ workoutNumbers[0][1] ])[0]];
  document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[workoutNumbers[0][0]][workoutNumbers[0][1]] [Object.keys(allWorkouts[ workoutNumbers[0][0] ][ workoutNumbers[0][1] ])[1]] + `)`;
  document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutNumbers[0+1][0]][workoutNumbers[0+1][1]] [Object.keys(allWorkouts[ workoutNumbers[0+1][0] ][ workoutNumbers[0+1][1] ])[0]];

  // Break 1
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },30000);

  // Workout 2
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[1][0]][workoutNumbers[1][1]] [Object.keys(allWorkouts[ workoutNumbers[1][0] ][ workoutNumbers[1][1] ])[0]];
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutNumbers[1+1][0]][workoutNumbers[1+1][1]] [Object.keys(allWorkouts[ workoutNumbers[1+1][0] ][ workoutNumbers[1+1][1] ])[0]];
  },40000);

  // Break 2
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },70000);

  // Workout 3
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[2][0]][workoutNumbers[2][1]] [Object.keys(allWorkouts[ workoutNumbers[2][0] ][ workoutNumbers[2][1] ])[0]];
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutNumbers[2+1][0]][workoutNumbers[2+1][1]] [Object.keys(allWorkouts[ workoutNumbers[2+1][0] ][ workoutNumbers[2+1][1] ])[0]];
  },80000);

  // Break 3
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },110000);

  // Workout 4
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[3][0]][workoutNumbers[3][1]] [Object.keys(allWorkouts[ workoutNumbers[3][0] ][ workoutNumbers[3][1] ])[0]];
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutNumbers[3+1][0]][workoutNumbers[3+1][1]] [Object.keys(allWorkouts[ workoutNumbers[3+1][0] ][ workoutNumbers[3+1][1] ])[0]];
  },120000);

  // Break 4
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },150000);

  // Workout 5
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[4][0]][workoutNumbers[4][1]] [Object.keys(allWorkouts[ workoutNumbers[4][0] ][ workoutNumbers[4][1] ])[0]];
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutNumbers[4+1][0]][workoutNumbers[4+1][1]] [Object.keys(allWorkouts[ workoutNumbers[4+1][0] ][ workoutNumbers[4+1][1] ])[0]];
  },160000);

  // Break 5
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },190000);

  // Workout 6
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutNumbers[5][0]][workoutNumbers[5][1]] [Object.keys(allWorkouts[ workoutNumbers[5][0] ][ workoutNumbers[5][1] ])[0]];
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = "Done!";
  },200000);

  // Done
  setTimeout(() => {
    clearInterval(a);
    clearInterval(b);
    clearInterval(intime);
    document.getElementById("workoutArea").style.opacity = "0";
    document.getElementById("hooray").style.display = "block";
    document.getElementById("workoutArea").style.display = "none";
    setTimeout(() => {document.getElementById("hooray").style.opacity = "1";},50);
  },230000);

}

console.log( allWorkouts[2][1] [Object.keys(allWorkouts[2][1])[0]]   );
