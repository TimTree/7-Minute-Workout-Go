let timerSeconds = 0;
let timerMinutes = 0;
let intime;
let imgNum = 1;
let workoutCategory = [];
let workoutName = [];
let workoutOn;
let counter;
const timePerExercise = 30;
const timePerBreak = 10;
let b;

document.getElementById("go").addEventListener("click", function(){
  go();
});

function titleToCredits() {
  hide("titleArea");
  show("creditsArea")
}

function creditsToTitle() {
  hide("creditsArea");
  show("titleArea");
}

function go() {
  createWorkout();
  hide("titleArea");
  show("countdown", "flex");
  document.getElementById("numberCountdown").innerHTML="3";
  setTimeout(() => {document.getElementById("numberCountdown").innerHTML="2";},1000);
  setTimeout(() => {document.getElementById("numberCountdown").innerHTML="1";},2000);
  setTimeout(() => {
    countdownToWorkout();startTimer();},3000);
}

function countdownToWorkout() {
  showTheBar();
  hide("countdown");
  show("workoutArea", "grid");
  document.getElementById("active-gauge").style.animationPlayState="running";
  document.getElementById("elapsedTime").style.animationPlayState="running";
  workoutInterval();
}

function hoorayToTitle() {
  hideTheBar();
  hide("hooray");
  show("titleArea");
}

function startTimer() {
  timerSeconds = 0;
  timerMinutes = 0;
document.getElementById("elapsedTime").innerHTML="0:00";
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
        timerMinutes+=1;
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

  workoutCategory = [];
  workoutName = [];

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

/*
  // Get another set of three workout orders. Cardio can be anywhere
  // this time.
  shuffleArray(workoutSchema);

  for (let i = 0; i<workoutSchema.length; i +=1 ) {
    workoutCategory.push(workoutSchema[i]);
  }

*/
  // Randomly select workouts from each of the categories.
  // Workouts cannot be repeated.
  let cardioNumbers = [];
  let upperLowerBodyNumbers = [];
  let coreNumbers = [];
  while (cardioNumbers.length < 1) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[0].length);
      if (cardioNumbers.indexOf(randomNumber) > -1) continue;
      cardioNumbers[cardioNumbers.length] = randomNumber;
    }
    while (upperLowerBodyNumbers.length < 1) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[1].length);
      if (upperLowerBodyNumbers.indexOf(randomNumber) > -1) continue;
      upperLowerBodyNumbers[upperLowerBodyNumbers.length] = randomNumber;
    }
    while (coreNumbers.length < 1) {
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

  workoutOn = 0;
  counter = 1;
  b = setInterval(imageInterval,780);
  showWorkout();
}

function showWorkout() {

  let intervalTimer = timePerExercise;
  document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
  let start = Date.now();
  let a = setInterval(() => {

    let diff = Date.now() - start;
    let elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
    if (elapsed==intervalTimer&&elapsed%1==0){elapsed=parseInt(elapsed);};
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
  },1000);

  document.getElementById("footage").style.opacity = 1;
  document.getElementById("nameOfWorkout").innerHTML = allWorkouts[workoutCategory[workoutOn]][workoutName[workoutOn]].name;
  document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[workoutCategory[workoutOn]][workoutName[workoutOn]].img1 + `)`;
  if (workoutOn === workoutCategory.length-1) {
    document.getElementById("nextWorkout").innerHTML = "Done!";
  var debugOnly = setTimeout(() => {finishWorkout();clearInterval(a);},timePerExercise*1000);
  document.onkeydown = function(e) {
    if (e.keyCode == 39) {clearTimeout(debugOnly);finishWorkout();clearInterval(a);}
  }
  } else {
  document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[workoutOn+1]][workoutName[workoutOn+1]].name;
  var debugOnly = setTimeout(() => {showBreak();clearInterval(a);},timePerExercise*1000);
  document.onkeydown = function(e) {
    if (e.keyCode == 39) {clearTimeout(debugOnly);showBreak();clearInterval(a);}
  }
  }
}

function showBreak() {

  let intervalTimer = timePerBreak;
  document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
  let start = Date.now();
  let a = setInterval(() => {

    let diff = Date.now() - start;
    let elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
    if (elapsed==intervalTimer&&elapsed%1==0){elapsed=parseInt(elapsed);};
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
  },1000);

  workoutOn += 1;
  document.getElementById("nameOfWorkout").innerHTML = "Rest";
  document.getElementById("footage").style.opacity = 0;
  var debugOnly = setTimeout(() => {showWorkout();clearInterval(a);},timePerBreak*1000);
  document.onkeydown = function(e) {
    if (e.keyCode == 39) {clearTimeout(debugOnly);showWorkout();clearInterval(a);}
  }
}

function finishWorkout() {
  clearInterval(b);
  hide("workoutArea");
  show("hooray");
  document.getElementById("active-gauge").style.animationPlayState="paused";
  document.getElementById("elapsedTime").style.animationPlayState="paused";
    setTimeout(() => {clearInterval(intime);},1);
    document.onkeydown = function(e) {
      if (e.keyCode == 39) {}
    }
}

function imageInterval() {
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
}

function hide(elementName) {
  document.getElementById(elementName).style.opacity = "0";
  document.getElementById(elementName).style.display = "none";
}

function show(elementName, display) {
  if (display === "flex") {
    document.getElementById(elementName).style.display = "flex";
  } else if (display === "grid") {
    document.getElementById(elementName).style.display = "grid";
  } else {
    document.getElementById(elementName).style.display = "block";
  }
  setTimeout(() => {document.getElementById(elementName).style.opacity = "1";},50);
}

function showTheBar() {
  document.getElementById("body").style.gridTemplateRows = "80px 1fr";
  document.getElementById("body").style.gridTemplateAreas = `"sidebar" "content"`;
  document.getElementById("theBar").style.display = "block";
  setTimeout(() => {document.getElementById("theBar").style.opacity = "1";},50);
}

function hideTheBar() {
  document.getElementById("body").style.gridTemplateRows = "1fr";
  document.getElementById("body").style.gridTemplateAreas = `"content"`;
  document.getElementById("theBar").style.display = "none";
  document.getElementById("theBar").style.opacity = "0";
}
