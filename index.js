const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end('Bot AFK Alive')).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'serverthunghiem-FT6U.aternos.me', // Ví dụ: 'xxxx.aternos.host'
    port: 17086,                // Điền số Port 5 chữ số vừa copy ở trên (không dùng 17086)
    username: 'Bot_AFK_247',
    version: false
  });

  bot.on('login', () => console.log('Bot đã kết nối thành công vào server!'));
  bot.on('end', () => {
    console.log('Bot mất kết nối, thử lại sau 10 giây...');
    setTimeout(createBot, 10000);
  });
  bot.on('error', err => console.log('Lỗi kết nối:', err.message));
}

createBot();
