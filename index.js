const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running');
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'faceoff.aternos.me',
    port: 25565,
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
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('Bot Error:', err.message));
}

createBot();
