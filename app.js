
const cells = document.querySelectorAll('.cell');
// 隨機出現地鼠
function showMole() {
  clearMole();
  const randomMoleNum = Math.floor(Math.random() * 9);
  currentMole = randomMoleNum;
  cells[randomMoleNum].classList.add('mole');
}

// 清除前任地鼠
function clearMole() {
  cells.forEach(cell => {
    cell.classList.remove('mole');
    currentMole = null;
  });
}

// 開始遊戲、倒數、結束
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

function startGame() {
  startBtn.disabled = true;
  startBtn.innerText = '遊戲中';
  let time = 20;
  let score = 0;
  let timeInterval = null;
  let moleInterval = null;
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.innerText = '得分：';
  clearMole();
  moleInterval = setInterval(showMole, 1500);
  timeInterval = setInterval(updateTime, 1000);

  function updateTime() {
    time--;
    const timeDisplay = document.getElementById('time');
    timeDisplay.innerText = '剩餘時間:' + time + '秒';

    // 點格子
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if (index === currentMole) {
          score++;
          const scoreDisplay = document.getElementById('score');
          scoreDisplay.innerText = '得分:' + score;
          clearMole();
        }
      });
    });

    if (time <= 0) {
      endGame();
    }
  }

  function endGame() {
    clearMole();
    clearInterval(timeInterval);
    clearInterval(moleInterval);
    const timeDisplay = document.getElementById('time');
    timeDisplay.innerText = '時間到！';
    startBtn.disabled = false;
    startBtn.innerText = 'START';
  }
}
