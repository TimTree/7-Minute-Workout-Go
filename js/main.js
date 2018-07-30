let timerSeconds = 0;
let timerMinutes = 0;
let intime;
let imgNum = 1;
let workoutCategory = [];
let workoutName = [];
let lastMinuteWorkout;
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


  // Get two other sets of three workout orders. Cardio can be anywhere
  // this time.

  for (let j = 1; j < 3; j += 1) {
    shuffleArray(workoutSchema);

    for (let i = 0; i<workoutSchema.length; i +=1 ) {
      workoutCategory.push(workoutSchema[i]);
    }
  }

  // Randomly select workouts from each of the categories.
  // Workouts cannot be repeated.
  let cardioNumbers = [];
  let upperLowerBodyNumbers = [];
  let coreNumbers = [];
  while (cardioNumbers.length < 3) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[0].length);
      if (cardioNumbers.indexOf(randomNumber) > -1) continue;
      cardioNumbers[cardioNumbers.length] = randomNumber;
    }
    while (upperLowerBodyNumbers.length < 3) {
      let randomNumber = Math.floor(Math.random()*allWorkouts[1].length);
      if (upperLowerBodyNumbers.indexOf(randomNumber) > -1) continue;
      upperLowerBodyNumbers[upperLowerBodyNumbers.length] = randomNumber;
    }
    while (coreNumbers.length < 3) {
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
  if (workoutOn === workoutCategory.length) {
    showWorkoutLastMinute1();
  } else {
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
      lastMinuteWorkout = Math.floor(Math.random() * allWorkouts[3].length);
      document.getElementById("nextWorkout").innerHTML = allWorkouts[3][lastMinuteWorkout].name;
    } else {
  document.getElementById("nextWorkout").innerHTML = allWorkouts[workoutCategory[workoutOn+1]][workoutName[workoutOn+1]].name;
}
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
  if (workoutOn === workoutCategory.length) {
    document.getElementById("nameOfWorkout").innerHTML = "Rest (Last minute!)";
    counter = 1;
  } else {
    document.getElementById("nameOfWorkout").innerHTML = "Rest";
  }
  document.getElementById("footage").style.opacity = 0;
  var debugOnly = setTimeout(() => {showWorkout();clearInterval(a);},timePerBreak*1000);
  document.onkeydown = function(e) {
    if (e.keyCode == 39) {clearTimeout(debugOnly);showWorkout();clearInterval(a);}
  }
}

function showWorkoutLastMinute1() {
  let intervalTimer = 30;
  document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
  let start = Date.now();
  let a = setInterval(() => {

    let diff = Date.now() - start;
    let elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
    if (elapsed==intervalTimer&&elapsed%1==0){elapsed=parseInt(elapsed);};
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
  },1000);
  document.getElementById("footage").style.opacity = 1;
  document.getElementById("nameOfWorkout").innerHTML = allWorkouts[3][lastMinuteWorkout].name;
  document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[3][lastMinuteWorkout].right1 + `)`;
  document.getElementById("nextWorkout").innerHTML = "Switch sides!";
var debugOnly = setTimeout(() => {showWorkoutLastMinute2();clearInterval(a);},timePerExercise*1000);
document.onkeydown = function(e) {
  if (e.keyCode == 39) {clearTimeout(debugOnly);showWorkoutLastMinute2();clearInterval(a);}
}

}

function showWorkoutLastMinute2() {
  counter = 3;
  let intervalTimer = 30;
  document.getElementById("secondsLeft").innerHTML = intervalTimer + " seconds left";
  let start = Date.now();
  let a = setInterval(() => {

    let diff = Date.now() - start;
    let elapsed = (intervalTimer-Math.round(Math.floor(diff/100)/10));
    if (elapsed==intervalTimer&&elapsed%1==0){elapsed=parseInt(elapsed);};
    document.getElementById("secondsLeft").innerHTML = elapsed + " seconds left";
  },1000);
  document.getElementById("nameOfWorkout").innerHTML = "Switch sides!";
  document.getElementById("footage").style.backgroundImage = `url( `+ allWorkouts[3][lastMinuteWorkout].left1 + `)`;
  document.getElementById("nextWorkout").innerHTML = "Done!";
var debugOnly = setTimeout(() => {finishWorkout();clearInterval(a);},timePerExercise*1000);
document.onkeydown = function(e) {
  if (e.keyCode == 39) {clearTimeout(debugOnly);finishWorkout();clearInterval(a);}
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

  if (workoutOn === workoutCategory.length) {
    if (counter === 1) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[3][lastMinuteWorkout].right2 + `)`;
      counter += 1;
    }
    else if (counter === 2) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[3][lastMinuteWorkout].right1 + `)`;
      counter = 1;
    }
    else if (counter === 3) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[3][lastMinuteWorkout].left2 + `)`;
      counter += 1;
    }
    else if (counter === 4) {
      document.getElementById("footage").style.backgroundImage =
      `url( `+ allWorkouts[3][lastMinuteWorkout].left1 + `)`;
      counter = 3;
    }
  } else {
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
