import TelegramBot from "node-telegram-bot-api";

const token = '7053631072:AAHWckut0gq113ryTGIqGuIipTKR1UGEEew';
const bot = new TelegramBot(token, {polling: true});


const copyPasteChatId = -1001852305370
const copyPasteBotTopicId = 131

export const sendMessagesToChat = async (notification) => {
    try {
        await bot.sendMessage(copyPasteChatId, notification, {message_thread_id: copyPasteBotTopicId})
    } catch (e) {
        console.error('Ошибка при отправке сообщения:', e)
    }
}
