const express = require('express');
const bot = require('./index.js');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});

app.use(limiter);

app.post('/send-message', async (req, res) => {
    const { chatId, message } = req.body;

    try {
        await bot.sendMessage(chatId, message);
        res.status(200).json({
            status: 'success',
            message: 'Mensagem enviada com sucesso'
        });
    } catch (err) {
        console.error('Erro ao enviar mensagem:', err);
        res.status(500).json({
            status: 'error',
            error: err.message
        });
    }
});

app.use((err, req, res, next) => {
    console.error('Erro inesperado:', err);
    res.status(500).json({
        status: 'error',
        error: 'Erro inesperado. Por favor, tente novamente mais tarde.'
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
