

// 遊戲總時間（毫秒），這裡設定為 60 秒
const GAME_TIME = 60000;

// 取得所有 class 為 'cell' 的格子元素，這些就是打地鼠的格子
const cells = document.querySelectorAll('.cell');

// 用來存放遊戲循環和計時器的 id，方便之後停止
let gameInterval = null;
let timerInterval = null;

// 遊戲開始的主要函式
function startGame() {
  // 禁用開始按鈕，避免重複點擊
  document.getElementById('startButton').disabled = true;
  document.getElementById('startButton').innerText = 'In Play...';

  // 設定剩餘時間（秒）
  let timeLeft = GAME_TIME / 1000;
  updateTimer(timeLeft); // 更新畫面上的時間顯示

  // 每 2 秒隨機選一個格子顯示地鼠
  gameInterval = setInterval(() => {
    // 先把所有格子的 active 樣式移除
    cells.forEach(cell => cell.classList.remove('active'));
    // 隨機選一個格子加上 active 樣式
    const randomCell = cells[Math.floor(Math.random() * cells.length)];
    randomCell.classList.add('active');
  }, 2000);

  // 每 1 秒更新一次倒數計時
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);
    // 如果時間到，結束遊戲
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // 遊戲總時間到後自動結束
  setTimeout(endGame, GAME_TIME);
}

// 更新畫面上的倒數計時文字
function updateTimer(time) {
  document.getElementById('timer').innerText = `Time Left: ${time}s`;
}

// 結束遊戲，重設按鈕與計時器
function endGame() {
  clearInterval(gameInterval); // 停止地鼠出現
  clearInterval(timerInterval); // 停止倒數計時
  document.getElementById('startButton').innerText = 'Start Game';
  document.getElementById('startButton').disabled = false;
  alert('Game Over!'); // 跳出遊戲結束提示
}

// 處理格子被點擊的事件
function handleCellClick(event) {
  // 取得被點擊的格子
  const cell = event.currentTarget;
  // 如果這個格子有 active 樣式（代表有地鼠）
  if (cell.classList.contains('active')) {
    // 取得分數元素
    const scoreElement = document.getElementById('score');
    // 解析目前分數（假設格式是 'Score: 數字'）
    let score = parseInt(scoreElement.innerText.split(': ')[1]);
    score++; // 分數加一
    scoreElement.innerText = `Score: ${score}`; // 更新分數顯示
    cell.classList.remove('active'); // 點擊後移除地鼠
  }
}

// 幫每個格子加上點擊事件監聽，點擊時執行 handleCellClick
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

/*
流程設計：
1. 先取得所有地鼠格子（cell），並設計分數、時間、開始按鈕等基本元素。
2. 遊戲開始時，禁用開始按鈕並啟動兩個計時器：
  - 一個每2秒隨機顯示地鼠（active 樣式）。
  - 一個每1秒更新倒數計時。
3. 玩家點擊格子時，判斷該格子是否有地鼠（active），有則分數加一並移除地鼠。
4. 時間到或倒數歸零時，結束遊戲並重設按鈕與計時器。
5. 所有事件監聽、分數更新、時間顯示都用簡單明確的 DOM 操作。
*/
