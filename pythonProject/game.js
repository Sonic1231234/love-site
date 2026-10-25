// --- Игра "Поймай сердечко" ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let hearts = [];
let score = 0;

function drawHeart(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x-10, y-15, x-25, y+10, x, y+25);
  ctx.bezierCurveTo(x+25, y+10, x+10, y-15, x, y);
  ctx.fill();
}

function spawnHeart() {
  let x = Math.random() * (canvas.width - 30) + 15;
  hearts.push({x: x, y: 0});
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    let h = hearts[i];
    h.y += 2;
    drawHeart(h.x, h.y);
    if (h.y > canvas.height) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

canvas.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  for (let i = 0; i < hearts.length; i++) {
    let h = hearts[i];
    if (Math.abs(mouseX - h.x) < 20 && Math.abs(mouseY - h.y) < 20) {
      hearts.splice(i, 1);
      score++;
      document.getElementById("score").innerText = "Очки: " + score;
      break;
    }
  }
});

setInterval(update, 30);
setInterval(spawnHeart, 1000);

// --- Викторина ---
let quizScore = 0;

function checkAnswer(question, result) {
  if (result === 'правильно') {
    quizScore++;
  }
  if (question === 3) { // после последнего вопроса показываем результат
    document.getElementById("quizResult").innerText =
      "Ты набрала " + quizScore + " из 3 баллов! 💖 " +
      (quizScore === 3 ? "Ты знаешь нашу любовь идеально!" : "Но я всё равно тебя люблю бесконечно 💕");
    quizScore = 0; // сброс для повторного прохождения
  }
}
