const mineflayer = require('mineflayer');
const http = require('http');

// 1. Web server giả lập giữ cho dịch vụ Render luôn chạy
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot AFK Minecraft đang hoạt động!');
}).listen(PORT, () => {
  console.log(`Web server đang chạy trên port ${PORT}`);
});

// 2. Cấu hình thông tin Server Aternos từ hình ảnh của bạn
const CONFIG = {
  host: 'brooktrout.aternos.host', // DynIP lấy từ Aternos
  port: 17086,                     // Port 17086 chuẩn
  username: 'Bot_AFK_247',
  version: false                   // Tự động tương thích phiên bản Minecraft
};

// Đặt mật khẩu tự động cho bot tại đây (bạn có thể thay đổi tùy ý)
const BOT_PASSWORD = 'MatKhauBot123456'; 

// 3. Hàm khởi tạo và quản lý Bot
function createBot() {
  console.log('Đang thử kết nối vào server Minecraft...');
  const bot = mineflayer.createBot(CONFIG);

  // Khi bot vào server thành công
  bot.on('login', () => {
    console.log(`==> Bot ${CONFIG.username} đã kết nối vào server thành công!`);
  });

  // Tự động nhận diện tin nhắn từ plugin AuthMe / nLogin để Đăng ký / Đăng nhập
  bot.on('message', (message) => {
    const text = message.toString().toLowerCase();
    console.log(`[CHAT]: ${message.toAnsi()}`);

    // Yêu cầu đăng ký
    if (text.includes('/register') || text.includes('dang ky') || text.includes('đăng ký')) {
      setTimeout(() => {
        bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
        console.log('==> Đã gửi lệnh tự động ĐĂNG KÝ tài khoản!');
      }, 1000);
    }

    // Yêu cầu đăng nhập
    if (text.includes('/login') || text.includes('dang nhap') || text.includes('đăng nhập')) {
      setTimeout(() => {
        bot.chat(`/login ${BOT_PASSWORD}`);
        console.log('==> Đã gửi lệnh tự động ĐĂNG NHẬP!');
      }, 1000);
    }
  });

  // Dự phòng: Tự động gửi lệnh đăng ký & đăng nhập khi spawn vào thế giới
  bot.on('spawn', () => {
    console.log('Bot đã xuất hiện trong game.');
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 2000);
  });

  // Tự động kết nối lại sau 10 giây nếu bị ngắt kết nối hoặc bị kick
  bot.on('end', (reason) => {
    console.log(`Bot bị ngắt kết nối (Lý do: ${reason}). Đang thử kết nối lại sau 10 giây...`);
    setTimeout(createBot, 10000);
  });

  // Bắt lỗi kết nối
  bot.on('error', (err) => {
    console.log(`Lỗi kết nối: ${err.message}`);
  });
}

// Khởi chạy Bot
createBot();
