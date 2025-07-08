const quizQues = document.getElementById('quiz-ques-text');
const nextBtn = document.getElementById('next-btn');
const quizOptions = document.getElementById('option-container');
const prevBtn = document.getElementById("prev-btn");
const resultBtn = document.getElementById("result-btn");
const quesCounter = document.getElementById('ques-counter');
const quizPage = document.querySelector(".quiz-app")
const resultPage = document.getElementById("result-container");

let currentQuestionIndex = 0
let userAns = null
let score = 1
let initialQuestionCount = 1
let seconds = 0;
let minutes = 0;

const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        id: 2,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        id: 3,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        id: 4,
        question: "What is the boiling point of water?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: "100°C"
    },
    {
        id: 5,
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        answer: "Harper Lee"
    },
    {
        id: 6,
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        answer: "Au"
    },
    {
        id: 7,
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    },
    {
        id: 8,
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answer: "Blue Whale"
    },
    {
        id: 9,
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Pepper"],
        answer: "Avocado"
    },
    {
        id: 10,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Quartz"],
        answer: "Diamond"
    }

];

function showQues() {

    quizQues.innerHTML = questions[currentQuestionIndex].question;
    quizOptions.innerHTML = "";



    questions[currentQuestionIndex].options.map((option) => {
        quizOptions.innerHTML += `<div onclick="saveAns(event)" id="opt">
        <label class="label" name="abc"><input type="radio" value="${option}" name="abc"> ${option}</label></div>`
    });

}
showQues()

function saveAns(event) {

    document.querySelectorAll("#opt").forEach(opt => {
        opt.classList.remove("selected-opt")
    });
    event.currentTarget.classList.add("selected-opt")

    let selectedRadio = document.querySelector('input[type="radio"]:checked')
    if (selectedRadio) {
        userAns = selectedRadio.value
    }
    else {
        userAns = null
    }
}

function nextQues() {

    if (userAns == null) {
        alert("Please select an option to proceed.");
        return;
    }

    initialQuestionCount++

    quesCounter.textContent = initialQuestionCount
    if (initialQuestionCount > 10) {
        quesCounter.textContent = "10"
    }

    if (userAns == questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++

    if (currentQuestionIndex == questions.length) {

        nextBtn.style.display = "none"
        prevBtn.style.display = "none"
        resultBtn.style.display = "block";

    }

    showQues()
}

function prevQues() {

    if (currentQuestionIndex > 0) {
        if (initialQuestionCount > 1) {
            initialQuestionCount--;
        }

        quesCounter.textContent = initialQuestionCount;
        currentQuestionIndex--;
        userAns = null;

        if (score > 1) {
            score--;
        }

        showQues();
    }
}

function result() {

    resultPage.style.display = "block";

    quizPage.style.opacity = "0.5";
    quizPage.style.filter = "blur(10px)"

    const scoreValue = (score - 1) * 10;
    const correctAnswers = score - 1;

    const scoreText = document.getElementById("circle-score");
    scoreText.textContent = `${scoreValue}/100`;

    document.getElementById("correct-ans").textContent = correctAnswers;
    document.getElementById("total-ques").textContent = questions.length;

    const circleProgress = document.getElementById("circle-progress");
    circleProgress.setAttribute("stroke-dasharray", `${scoreValue}, 100`);
}

function restartQuiz() {
    score = 1
    initialQuestionCount = 1
    currentQuestionIndex = 0
    userAns = null

    seconds = 0;
    minutes = 0;

    quesCounter.textContent = "1"

    quizPage.style.opacity = "1";
    quizPage.style.filter = "blur(0px)"
    resultPage.style.display = "none";

    nextBtn.style.display = "block";
    prevBtn.style.display = "block"
    resultBtn.style.display = "none";

    showQues()

}

function startTimer() {

    let secondElement = document.getElementById('second');
    let minuteElement = document.getElementById('minute');
    let colonElement = document.getElementById('colon');

    setInterval(() => {

        seconds++;
        secondElement.textContent = seconds;

        if (seconds == 60) {
            seconds = 0;
            colonElement.textContent = ':';
            minutes++;
            minuteElement.textContent = minutes;
        }

    }, 1000);

}
window.onload = startTimer;

let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
];

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}

function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }

    return results;
}

window.addEventListener(
    "resize",
    function () {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();





