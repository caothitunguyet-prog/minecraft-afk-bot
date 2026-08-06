const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'serverthunghiem-FT6U.aternos.me', // Thay IP server Aternos của bạn vào đây
    port: 17086,                           // Mặc định là 25565
    username: 'Bot_AFK_247'                // Tên của bot trong game
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
