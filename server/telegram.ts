import TelegramBot from 'node-telegram-bot-api';

// Hardcoded Telegram credentials as requested
const TELEGRAM_BOT_TOKEN = '7890871059:AAHlDEkfJxsq1bKwqthUBiI1f5dqu8IFavM';
const TELEGRAM_CHAT_ID = '6360165707';

let bot: TelegramBot | null = null;

try {
  console.log(`Initializing Telegram bot with token: ${TELEGRAM_BOT_TOKEN.substring(0, 5)}...`);
  bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
  
  // Test the bot to ensure it's working
  bot.getMe()
    .then(me => {
      console.log(`Telegram bot initialized successfully: @${me.username} (${me.first_name})`);
    })
    .catch(error => {
      console.error('Error verifying Telegram bot:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    });
} catch (error) {
  console.error('Error initializing Telegram bot:', error);
  if (error instanceof Error) {
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
  }
}

export async function sendContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  if (!bot) {
    console.error('Telegram bot not initialized');
    return false;
  }

  try {
    console.log(`Attempting to send contact message to Telegram chat ID: ${TELEGRAM_CHAT_ID}`);
    
    const text = `
📬 New Contact Message:
-----------------------
👤 From: ${message.name}
📧 Email: ${message.email}
📝 Subject: ${message.subject}
💬 Message:
${message.message}
-----------------------
`;

    const result = await bot.sendMessage(TELEGRAM_CHAT_ID, text);
    console.log('Telegram contact message sent successfully:', result.message_id);
    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
}

export async function sendProjectInterestMessage(message: {
  projectId: number;
  projectTitle: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}): Promise<boolean> {
  if (!bot) {
    console.error('Telegram bot not initialized');
    return false;
  }

  try {
    console.log(`Attempting to send project interest message to Telegram chat ID: ${TELEGRAM_CHAT_ID}`);
    
    const text = `
🚀 New Project Interest:
-----------------------
📂 Project: ${message.projectTitle} (ID: ${message.projectId})
👤 From: ${message.name}
📧 Email: ${message.email}
${message.phone ? `📱 Phone: ${message.phone}` : ''}
💬 Message:
${message.message}
-----------------------
Payment Method: USDT TRC20 only
`;

    const result = await bot.sendMessage(TELEGRAM_CHAT_ID, text);
    console.log('Telegram project interest message sent successfully:', result.message_id);
    return true;
  } catch (error) {
    console.error('Error sending project interest to Telegram:', error);
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
}