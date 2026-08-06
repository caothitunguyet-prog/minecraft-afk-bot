const mineflayer = require('mineflayer');
const http = require('http');

// 1. Web server giả lập giữ cho Render chạy 24/7
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot AFK Minecraft đang hoạt động!');
}).listen(PORT, () => {
  console.log(`Web server đang chạy trên port ${PORT}`);
});

// 2. Cấu hình Server theo đúng thông tin mới nhất từ Aternos
const CONFIG = {
  host: 'serverthunghiem-FT6U.aternos.me',
  port: 17086,
  username: 'Bot_AFK_247',
  version: false
};

const BOT_PASSWORD = 'MatKhauBot123456'; 

// 3. Hàm khởi tạo Bot
function createBot() {
  console.log('Đang thử kết nối vào server Minecraft...');
  const bot = mineflayer.createBot(CONFIG);

  bot.on('login', () => {
    console.log(`==> Bot ${CONFIG.username} đã kết nối vào server thành công!`);
  });

  bot.on('spawn', () => {
    console.log('Bot đã xuất hiện trong game.');
    
    setTimeout(() => {
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 1500);

    // ANTI-AFK: Nhảy và xoay người mỗi 15 giây tránh bị kick
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI / 2;
        bot.look(yaw, pitch, true);
      }
    }, 15000);
  });

  // Tự động kết nối lại sau 15 giây nếu mất kết nối
  bot.on('end', (reason) => {
    console.log(`Bot bị ngắt kết nối (${reason}). Thử kết nối lại sau 15 giây...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log(`Lỗi kết nối: ${err.message}`);
  });
}

createBot();
