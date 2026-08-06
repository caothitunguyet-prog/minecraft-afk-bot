const mineflayer = require('mineflayer');
const http = require('http');

// Mở một server web nhỏ để Render chấp nhận cho chạy miễn phí
http.createServer((req, res) => res.end('Bot is running!')).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'serverthunghiem-FT6U.aternos.me', 
    port: 17086,                           
    username: 'Bot_AFK_247'                
  });

  bot.on('login', () => {
    console.log('Bot đã kết nối thành công vào server!');
  });

  bot.on('end', () => {
    console.log('Bot mất kết nối, đang tự động đăng nhập lại...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log(err));
}

createBot();
