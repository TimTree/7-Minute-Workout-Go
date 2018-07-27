let timerSeconds = 0;
let timerMinutes = 0;
let intime;
let imgNum = 1;
let workoutCategory = [];
let workoutName = [];

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
  // 0 = cardio, 1 = upper/lower body, 2 = core
  let workoutSchema = [2, 1, 0]; // clone workoutSchema

  // Cardio must always go first, so shuffle the schema until 0 appears first
  while (workoutSchema[0] != 0) {
    shuffleArray(workoutSchema);
  }

  // Load the workout numbers to the workoutCategory array.
  // These are the first 3 workout orders based on the category.
  for (let i = 0; i<workoutSchema.length; i +=1 ) {
    workoutCategory.push(workoutSchema[i]);
  }

  // Get another set of three workout orders. Cardio can be anywhere
  // this time.
  shuffleArray(workoutSchema);

  for (let i = 0; i<workoutSchema.length; i +=1 ) {
    workoutCategory.push(workoutSchema[i]);
  }

  // Randomly select workouts from each of the categories.
  // Workouts cannot be repeated.
  let cardioNumbers = [];
  let upperLowerBodyNumbers = [];
  let coreNumbers = [];
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

  for (let i = 0; i < workoutCategory.length; i += 1 ) {

    if (workoutCategory[i] === 0) { // if cardio
      workoutName[i] = cardioNumbers[0];
      cardioNumbers.splice(0, 1);
    }
    else if (workoutCategory[i] === 1) { // if upper/lower body
      workoutName[i] = upperLowerBodyNumbers[0];
      upperLowerBodyNumbers.splice(0, 1);
    }
    else if (workoutCategory[i] === 2) { // if core
      workoutName[i] = coreNumbers[0];
      coreNumbers.splice(0, 1);
    }

  }

  console.log(workoutCategory);
  console.log(workoutName);
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

  let workoutOn = 0;
  let intervalTimer = 30;
  document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";

  let start = Date.now();
  let a = setInterval(() => {

  let diff = Date.now() - start;
  let elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
  if (elapsed==intervalTimer&&elapsed%1==0){elapsed=parseInt(elapsed);};

  if (elapsed != 0) {
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
  } else {
    if (intervalTimer === 30) {
    intervalTimer = 10;
    start = Date.now();
    diff = Date.now() - start;
    elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
  } else {
    intervalTimer = 30;
    start = Date.now();
    diff = Date.now() - start;
    elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
    }
  }
},1000);

  let counter = 1;

  let b = setInterval(() => {
    if (counter === 1) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[workoutCategory[workoutOn]][workoutName[workoutOn]].img2 + `)`;
      counter += 1;
    }
    else if (counter === 2) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[workoutCategory[workoutOn]][workoutName[workoutOn]].img3 + `)`;
      counter += 1;
    }
    else if (counter === 3) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[workoutCategory[workoutOn]][workoutName[workoutOn]].img4 + `)`;
      counter += 1;
    }
    else if (counter === 4) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[workoutCategory[workoutOn]][workoutName[workoutOn]].img1 + `)`;
      counter = 1;
    }
  },780);

  // Workout 1
  document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[0]][workoutName[0]].name;
  document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[workoutCategory[0]][workoutName[0]].img1 + `)`;
  document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[0+1]][workoutName[0+1]].name;

  // Break 1
  setTimeout(() => {
    workoutOn += 1;
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },30000);

  // Workout 2
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[1]][workoutName[1]].name;
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[1+1]][workoutName[1+1]].name;
  },40000);

  // Break 2
  setTimeout(() => {
    workoutOn += 1;
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },70000);

  // Workout 3
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[2]][workoutName[2]].name;
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[2+1]][workoutName[2+1]].name;
  },80000);

  // Break 3
  setTimeout(() => {
    workoutOn += 1;
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },110000);

  // Workout 4
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[3]][workoutName[3]].name;
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[3+1]][workoutName[3+1]].name;
  },120000);

  // Break 4
  setTimeout(() => {
    workoutOn += 1;
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },150000);

  // Workout 5
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[4]][workoutName[4]].name;
    document.getElementById("footage").style.opacity = 1;
    document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[4+1]][workoutName[4+1]].name;
  },160000);

  // Break 5
  setTimeout(() => {
    workoutOn += 1;
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
    document.getElementById("footage").style.opacity = 0;
  },190000);

  // Workout 6
  setTimeout(() => {
    document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[5]][workoutName[5]].name;
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
console.log(allWorkouts[2][1].name);
