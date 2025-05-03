import TelegramBot from 'node-telegram-bot-api';

// Hardcoded Telegram credentials as requested
const TELEGRAM_BOT_TOKEN = '7890871059:AAHlDEkfJxsq1bKwqthUBiI1f5dqu8IFavM';
const TELEGRAM_CHAT_ID = '6360165707';

let bot: TelegramBot | null = null;

try {
  bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
  console.log('Telegram bot initialized successfully');
} catch (error) {
  console.error('Error initializing Telegram bot:', error);
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

    await bot.sendMessage(TELEGRAM_CHAT_ID, text);
    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
}

export async function sendProjectInterestMessage(message: {
  projectId: number;
  projectTitle: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<boolean> {
  if (!bot) {
    console.error('Telegram bot not initialized');
    return false;
  }

  try {
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

    await bot.sendMessage(TELEGRAM_CHAT_ID, text);
    return true;
  } catch (error) {
    console.error('Error sending project interest to Telegram:', error);
    return false;
  }
}