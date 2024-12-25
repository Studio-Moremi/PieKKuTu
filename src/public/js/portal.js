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
let userLoggedIn = false;  // 로그인 상태

function openLoginModal() {
  if (!userLoggedIn) {
    document.getElementById('loginModal').style.display = 'flex';
  }
}

function setNickname() {
  const nickname = document.getElementById('nickname').value;

  const regex = /^[a-zA-Z0-9가-힣]{3,15}$/;
  if (regex.test(nickname)) {
    localStorage.setItem('nickname', nickname);
    document.querySelector('.login').textContent = nickname;
    closeLoginModal();
  } else {
    alert('닉네임이 유효하지 않습니다.');
  }
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function logout() {
  if (confirm('로그아웃을 하시겠어요?')) {
    localStorage.removeItem('nickname');
    document.querySelector('.login').textContent = '로그인';
  }
}

window.onload = () => {
  const nickname = localStorage.getItem('nickname');
  if (nickname) {
    document.querySelector('.login').textContent = nickname;
    userLoggedIn = true;
  }
};
