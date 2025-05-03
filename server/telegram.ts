import TelegramBot from 'node-telegram-bot-api';

// Environment variables for Telegram credentials with fallback to hardcoded values
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7890871059:AAHlDEkfJxsq1bKwqthUBiI1f5dqu8IFavM';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6360165707';

// HTML escaping function for telegram message formatting
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
    
    // Escape HTML characters in message fields
    const escapedName = escapeHtml(message.name);
    const escapedEmail = escapeHtml(message.email);
    const escapedSubject = escapeHtml(message.subject);
    const escapedMessage = escapeHtml(message.message);
    
    // Using HTML formatting for better display in Telegram
    const text = `
<b>📬 NEW CONTACT MESSAGE</b>

<b>👤 From:</b> ${escapedName}
<b>📧 Email:</b> ${escapedEmail}
<b>📝 Subject:</b> ${escapedSubject}
<b>💬 Message:</b>
${escapedMessage}
`;

    const result = await bot.sendMessage(TELEGRAM_CHAT_ID, text, { parse_mode: 'HTML' });
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
    
    // Escape HTML characters in message fields
    const escapedTitle = escapeHtml(message.projectTitle);
    const escapedName = escapeHtml(message.name);
    const escapedEmail = escapeHtml(message.email);
    const escapedPhone = message.phone ? escapeHtml(message.phone) : null;
    const escapedMessage = escapeHtml(message.message);
    
    // Using HTML formatting for better display in Telegram
    const text = `
<b>🚀 NEW PROJECT INTEREST</b>

<b>📂 Project:</b> ${escapedTitle} (ID: ${message.projectId})
<b>👤 From:</b> ${escapedName}
<b>📧 Email:</b> ${escapedEmail}
${escapedPhone ? `<b>📱 Phone:</b> ${escapedPhone}` : ''}
<b>💬 Message:</b>
${escapedMessage}

<i>Payment Method: USDT TRC20 only</i>
`;

    const result = await bot.sendMessage(TELEGRAM_CHAT_ID, text, { parse_mode: 'HTML' });
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