const mineflayer = require('mineflayer');
const http = require('http');

// 1. Web server giả lập giữ cho Render không bị ngắt
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot AFK Minecraft đang hoạt động!');
}).listen(PORT, () => {
  console.log(`Web server đang chạy trên port ${PORT}`);
});

// 2. Cấu hình thông tin Server và Mật khẩu Bot
const CONFIG = {
  host: 'serverthunghiem-FT6U.aternos.me', // Hoặc điền DynIP
  port: 17086,                             // Điền Port 5 chữ số từ Aternos
  username: 'Bot_AFK_247',
  version: false
};

// Đặt mật khẩu bạn muốn dùng cho Bot tại đây:
const BOT_PASSWORD = 'MatKhauBot123456'; 

// 3. Hàm khởi tạo Bot
function createBot() {
  console.log('Đang thử kết nối vào server Minecraft...');
  const bot = mineflayer.createBot(CONFIG);

  bot.on('login', () => {
    console.log(`==> Bot ${CONFIG.username} đã kết nối vào server thành công!`);
  });

  // Tự động nhận diện tin nhắn từ server để Đăng ký hoặc Đăng nhập
  bot.on('message', (message) => {
    const text = message.toString().toLowerCase();
    console.log(`[CHAT]: ${message.toAnsi()}`);

    // Kiểm tra nếu server yêu cầu /register
    if (text.includes('/register') || text.includes('dang ky') || text.includes('đăng ký')) {
      setTimeout(() => {
        bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
        console.log('==> Đã gửi lệnh tự động ĐĂNG KÝ tài khoản!');
      }, 1000);
    }

    // Kiểm tra nếu server yêu cầu /login
    if (text.includes('/login') || text.includes('dang nhap') || text.includes('đăng nhập')) {
      setTimeout(() => {
        bot.chat(`/login ${BOT_PASSWORD}`);
        console.log('==> Đã gửi lệnh tự động ĐĂNG NHẬP!');
      }, 1000);
    }
  });

  // Dự phòng: Tự động gõ cả 2 lệnh khi xuất hiện trong game (nếu server không gửi tin nhắn chat)
  bot.on('spawn', () => {
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 2000);
  });

  // Tự động kết nối lại nếu bị gián đoạn
  bot.on('end', (reason) => {
    console.log(`Bot bị ngắt kết nối (${reason}). Đang thử kết nối lại sau 10 giây...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log(`Lỗi kết nối: ${err.message}`);
  });
}

// Khởi chạy
createBot();
