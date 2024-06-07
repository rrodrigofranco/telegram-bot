const TelegramBot = require('node-telegram-bot-api');
const token = '6559339623:AAGIGBDhabDpBSov95J72e0ISbvI7Z2aC94';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text.toLowerCase() === 'ping') {
        bot.sendMessage(chatId, 'pong');
    }
});

console.log('Bot do Telegram está rodando...');

module.exports = bot;
