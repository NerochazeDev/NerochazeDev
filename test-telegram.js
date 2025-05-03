const TelegramBot = require('node-telegram-bot-api');

// Hardcoded credentials as in the main code
const TELEGRAM_BOT_TOKEN = '7890871059:AAHlDEkfJxsq1bKwqthUBiI1f5dqu8IFavM';
const TELEGRAM_CHAT_ID = '6360165707';

async function testBot() {
  console.log('Testing Telegram bot...');
  
  try {
    console.log(`Initializing Telegram bot with token: ${TELEGRAM_BOT_TOKEN.substring(0, 5)}...`);
    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    
    // Test bot info
    console.log('Attempting to get bot info...');
    const me = await bot.getMe();
    console.log('Bot info:', JSON.stringify(me, null, 2));
    
    // Send test message
    console.log(`Attempting to send test message to chat ID: ${TELEGRAM_CHAT_ID}`);
    const message = `Test message from portfolio website at ${new Date().toISOString()}`;
    const result = await bot.sendMessage(TELEGRAM_CHAT_ID, message);
    console.log('Message sent successfully, message ID:', result.message_id);
    
    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Error during Telegram test:', error);
    if (error.response && error.response.body) {
      console.error('API Response:', JSON.stringify(error.response.body, null, 2));
    }
  }
}

testBot().catch(console.error);