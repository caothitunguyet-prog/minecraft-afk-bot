const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end('Bot is running!')).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'serverthunghiem-FT6U.aternos.me', // Chỉ truyền host
    // Bỏ dòng port: 17086 để mineflayer tự resolve SRV record của Aternos
    username: 'Bot_AFK_247',
    version: false // Tự động nhận diện phiên bản server
  });

  bot.on('login', () => {
    console.log('Bot đã kết nối thành công vào server!');
  });

  bot.on('end', () => {
    console.log('Bot mất kết nối, đang tự động đăng nhập lại...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('Lỗi bot:', err.message));
}

createBot();
