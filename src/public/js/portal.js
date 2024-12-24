document.querySelector('.login').addEventListener('click', () => {
    alert('아직은 구현 중');
  });

  const startBtn = document.querySelector('.start-btn');
  startBtn.addEventListener('mouseover', () => {
    startBtn.classList.add('scale-105');
  });
  startBtn.addEventListener('mouseout', () => {
    startBtn.classList.remove('scale-105');
  });

  document.querySelector('.discord').addEventListener('click', () => {
    window.open('https://discord.gg/eMrZFCk3Xa', '_blank');
  });
  