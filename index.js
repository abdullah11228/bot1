const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 🔒 Keep-alive route for Zeabur
app.get('/', (req, res) => res.send('Bot is alive!'));
app.get('/health', (req, res) => res.send('OK'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('✅ Web server running on port ' + port);
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'CrystalMc0.aternos.me',
    port: 26109,
    username: 'JarvisBot',
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ Bot joined server');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected, retrying in 5 sec...');
    setTimeout(createBot, 5000); // Auto-reconnect
  });

  bot.on('error', (err) => {
    console.log('⚠️ Bot Error:', err.message);
  });
}

// 🧠 Never crash the app
process.on('uncaughtException', (err) => {
  console.log('💥 Uncaught Exception:', err.message);
});

createBot();

