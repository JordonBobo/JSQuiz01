
//Variables and hiding items not ready to be displayed
var start = document.getElementById("start");
var clock = document.getElementById("clock");
var result = document.getElementById("result");
var form1 = document.getElementById("form1");
form1.style.visibility = "hidden";
var timeLeft = 60;
var score = 5;
var whichQuestion = 0;
var answerX = "";
var scores = document.getElementById("scores");
var saveInitials = document.getElementById("initials");
saveInitials.style.visibility = "hidden";


//Questions that will generate
var theQuestions = [
    {question: "q1",
    answer1: "a1-1",
    answer2: "a1-2",
    answer3: "a1-3",
    answer4: "a1-4",
    correct: "a1-1"},

    {question: "q2",
    answer1: "a2-1",
    answer2: "a2-2",
    answer3: "a2-3",
    answer4: "a2-4",
    correct: "a2-1"},

    {question: "q3",
    answer1: "a3-1",
    answer2: "a3-2",
    answer3: "a3-3",
    answer4: "a3-4",
    correct: "a3-1"},

    {question: "q4",
    answer1: "a4-1",
    answer2: "a4-2",
    answer3: "a4-3",
    answer4: "a4-4",
    correct: "a4-2"},

    {question: "q5",
    answer1: "a5-1",
    answer2: "a5-2",
    answer3: "a5-3",
    answer4: "a5-4",
    correct: "a5-1"},
]


//The button that starts everything,
start.addEventListener("click", test);
function test() {
    start.style.visibility = "hidden";
    clock.innerHTML = "you have " + timeLeft + " seconds left";
    form1.style.visibility = "visible";
        setInterval(function(){
            if (timeLeft > 0) {
                clock.innerHTML = "you have " + timeLeft + " seconds left";
                timeLeft--;
                }
            else {
                end();
                }
        }
        , 1000);
    question(whichQuestion);
}


//ScoreBoard stuff:
var prepArea = JSON.parse(localStorage.getItem("scores")) || [];


//Generates the leaderboard from localstorage if there is any
for (let i = 0; i < prepArea.length; i++) {
    var ScoreBoard = document.createElement("li");
    var person = document.createTextNode(prepArea[i].name + " " + prepArea[i].score);
    ScoreBoard.appendChild(person);
    scores.appendChild(ScoreBoard);
}


document.getElementById("submit").addEventListener("click", addScore);
var individualScore = {}
function addScore(){
    var userInput = document.getElementById("initialsInput").value;
    if (userInput !== ""){
        individualScore.name = userInput;
        individualScore.score = score;
        prepArea.push(individualScore);     
        arangeScore();
        storeScore();
    }
}


function arangeScore() {
    prepArea.sort(function (a,b) { return b.score - a.score});
    if (prepArea.length > 3) {prepArea.length = 3};
}      


function storeScore() {
    var localPush = JSON.stringify(prepArea);
    localStorage.setItem ("scores", localPush);
}


//End of the game, either time ran out or the last question was answered
function end() {
    result.innerHTML = "you got a score of " + score;
    saveInitials.style.visibility = "visible";
    clock.innerHTML = "";
    form1.style.visibility = "hidden";
    clearTimer();
    console.log(1)
    console.log(score)
}


//Function that ends the timer
function clearTimer() {
    clearInterval(clock);
}


//Displays the questions one at a time
function question(x) {
    if (whichQuestion > theQuestions.length -1) {
        score = score + timeLeft;
        end();
    }
    else {
        document.getElementById("q1").innerHTML = theQuestions[x].question;
        document.getElementById("a1").innerHTML = theQuestions[x].answer1;
        document.getElementById("a2").innerHTML = theQuestions[x].answer2;
        document.getElementById("a3").innerHTML = theQuestions[x].answer3;
        document.getElementById("a4").innerHTML = theQuestions[x].answer4;
    }
}


//Waits for the response, and compares that response to the correct answer
function answer1() {
    checkAnswer(1)}
function answer2() {
    checkAnswer(2)}
function answer3() {
    checkAnswer(3)}
function answer4() {
    checkAnswer(4)}
document.getElementById("a1").addEventListener("click", answer1);
document.getElementById("a2").addEventListener("click", answer2);
document.getElementById("a3").addEventListener("click", answer3);
document.getElementById("a4").addEventListener("click", answer4);
//document.getElementById(“a1”).addEventListener(“click”, () => { checkAnswer(1) })
//This was told to me and it does work, but I have no idea why, so I didn't use it.


function checkAnswer(x) {
    answerX = eval("theQuestions[" + whichQuestion + "].answer" + x);
    if (answerX == theQuestions[whichQuestion].correct) {
        score = score + 5;
        whichQuestion++;
        question(whichQuestion);
    }
    else {
        timeLeft = timeLeft - 5;
        score = score - 5;
        whichQuestion++;
        question(whichQuestion)}
}

