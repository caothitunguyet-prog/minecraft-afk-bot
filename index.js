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

// 2. Cấu hình Server
const CONFIG = {
  host: 'brooktrout.aternos.host',
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

  // Tự động đăng nhập và bật chế độ chống AFK
  bot.on('spawn', () => {
    console.log('Bot đã xuất hiện trong game.');
    
    // Tự động gửi lệnh đăng nhập
    setTimeout(() => {
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 1500);

    // ANTI-AFK: Nhảy nhẹ và xoay nhìn xung quanh mỗi 15 giây để tránh bị kick timeout
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        
        // Tự xoay hướng nhìn ngẫu nhiên
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI / 2;
        bot.look(yaw, pitch, true);
      }
    }, 15000);
  });

  // Tự động kết nối lại nếu bị ngắt
  bot.on('end', (reason) => {
    console.log(`Bot bị ngắt kết nối (${reason}). Kết nối lại sau 10 giây...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log(`Lỗi: ${err.message}`);
  });
}

createBot();
