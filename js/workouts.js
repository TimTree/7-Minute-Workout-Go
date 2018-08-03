let saveData = {
  name: "",
  completedWorkoutDates: [],
  streakHistory: [0]
}

const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
  "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
];

const allWorkouts = [
  /* Cardio */ [
    { name: "Jumping Jacks",
      img1:"./img/JumpingJack1.png",
      img2:"./img/JumpingJack2.png",
      img3:"./img/JumpingJack1.png",
      img4:"./img/JumpingJack2.png",
    },
    { name: "High Knees",
      img1:"./img/HighKnees1.png",
      img2:"./img/HighKnees2.png",
      img3:"./img/HighKnees1.png",
      img4:"./img/HighKnees2.png",
    },
    { name: "Butt Kicks",
      img1:"./img/ButtKick1.png",
      img2:"./img/ButtKick2.png",
      img3:"./img/ButtKick1.png",
      img4:"./img/ButtKick2.png",
    },
    { name: "Quick Feet",
      img1:"./img/QuickFeet1.png",
      img2:"./img/QuickFeet2.png",
      img3:"./img/QuickFeet1.png",
      img4:"./img/QuickFeet2.png",
    },
    { name: "Step Ups",
      img1:"./img/StepUp1.png",
      img2:"./img/StepUp2.png",
      img3:"./img/Stepup3.png",
      img4:"./img/StepUp2.png",
    },
    { name: "Seal Jacks",
      img1:"./img/SealJack1.png",
      img2:"./img/SealJack2.png",
      img3:"./img/SealJack1.png",
      img4:"./img/SealJack2.png",
    },
  ],
  /* Upper/Lower Body */ [
    { name: "Wall Sit",
      img1:"./img/WallSit.png",
      img2:"./img/WallSit.png",
      img3:"./img/WallSit.png",
      img4:"./img/WallSit.png",
    },
    { name: "Push Ups",
      img1:"./img/PushUp1.png",
      img2:"./img/PushUp2.png",
      img3:"./img/PushUp1.png",
      img4:"./img/PushUp2.png",
    },
    { name: "Squats",
      img1:"./img/JumpingJack1.png",
      img2:"./img/Squat.png",
      img3:"./img/JumpingJack1.png",
      img4:"./img/Squat.png",
    },
    { name: "Triceps Dip",
      img1:"./img/TricepsDip1.png",
      img2:"./img/TricepsDip2.png",
      img3:"./img/TricepsDip1.png",
      img4:"./img/TricepsDip2.png",
    },
    { name: "Lunges",
      img1:"./img/Lunge1.png",
      img2:"./img/Lunge2.png",
      img3:"./img/Lunge1.png",
      img4:"./img/Lunge2.png",
    },
    { name: "Push Ups With Rotation",
      img1:"./img/PushUp1.png",
      img2:"./img/PushUp2.png",
      img3:"./img/PushUpRotation.png",
      img4:"./img/PushUp2.png",
    },
  ],
  /* Core */ [
    { name: "Sit Ups",
      img1:"./img/SitUp1.png",
      img2:"./img/SitUp2.png",
      img3:"./img/SitUp1.png",
      img4:"./img/SitUp2.png",
    },
    { name: "Plank",
      img1:"./img/Plank.png",
      img2:"./img/Plank.png",
      img3:"./img/Plank.png",
      img4:"./img/Plank.png",
    },
    { name: "The Bridge",
      img1:"./img/Bridge.png",
      img2:"./img/Bridge.png",
      img3:"./img/Bridge.png",
      img4:"./img/Bridge.png",
    },
    { name: "Mountain Climbers",
      img1:"./img/PushUp1.png",
      img2:"./img/MountainClimberRight.png",
      img3:"./img/PushUp1.png",
      img4:"./img/MountainClimberLeft.png",
    },
    { name: "Bicycle Crunches",
      img1:"./img/BicycleCrunch1.png",
      img2:"./img/BicycleCrunch2.png",
      img3:"./img/BicycleCrunch1.png",
      img4:"./img/BicycleCrunch2.png",
    },
    { name: "Plank Walk Up",
      img1:"./img/Plank.png",
      img2:"./img/PushUp1.png",
      img3:"./img/Plank.png",
      img4:"./img/PushUp1.png",
    },
  ],
  /* Last 1 Minute */ [
    { name: "Side Plank",
      right1:"./img/SidePlankRight.png",
      right2:"./img/SidePlankRight.png",
      left1:"./img/SidePlankLeft.png",
      left2:"./img/SidePlankLeft.png",
    },
    { name: "Bulgarian Split Squat",
      right1:"./img/BulgarianSplitSquatRight1.png",
      right2:"./img/BulgarianSplitSquatRight2.png",
      left1:"./img/BulgarianSplitSquatLeft1.png",
      left2:"./img/BulgarianSplitSquatLeft2.png",
    },
  ],
];
