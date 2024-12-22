const cluster = require('cluster');
const os = require('os');
const path = require('path');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf-8'));
const serverName = config.serverNAME || 'default-game';
const numCPUs = config.serverCPU || os.cpus().length;
const numCores = config.serverCORE || os.cpus().length;

if (cluster.isMaster) {
  console.log(`${serverName} 마스터 프로세스 ${process.pid} 실행 중`);
  console.log(`CPU 수: ${numCPUs}, CORE 수: ${numCores}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`워커 ${worker.process.pid} 종료됨, 새로운 워커 생성 중`);
    cluster.fork();
  });
} else {
  require(path.resolve(__dirname, 'main.js'));
}
