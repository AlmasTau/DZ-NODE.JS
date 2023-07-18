const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const axios = require('axios');

const log = console.log;

const TOKEN = "6272770842:AAFUeZBg5v4Jk5ZkKm0ka3-8fpifdj0cMMk";
const bot = new TelegramBot(TOKEN, { polling: true });

let isBotStarted = false;
let arrOfThreeDaysWeather = [];
let arrOfTenDaysWeather = [];

bot.on('message', (message) => {
    const chatId = message.chat.id;
    let messageText = message.text.toLowerCase();
    if (messageText === '/start') {
        let response = "Введите название города, для которого вы хотите получить информацию о погоде";
        bot.sendMessage(chatId, response);
        isBotStarted = true;
    } else {
        if (isBotStarted) {
            getWeatherData(messageText, chatId);

        } else {
            bot.sendMessage(chatId, "Сначала напишите /start");
        }
    }
});

bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;
    deleteLastMessage(chatId);
    
    const callbackData = msg.data;
    if (callbackData === 'threedays') {
        try {
            let response = getThreeDayWeather(arrOfThreeDaysWeather);
            bot.sendMessage(chatId, response, {
                parse_mode: "HTML"
            });
        } catch (error) {
            console.error(error);
        }
    } else if (callbackData === 'tendays') {
        try {
            let response = getTenDayWeather(arrOfTenDaysWeather);
            bot.sendMessage(chatId, response, {
                parse_mode: "HTML"
            });
        } catch (error) {
            console.error(error);
        }
    }
});

let lastMessageId;

async function getWeatherData(city, chatId) {
    try {
        const keyWeather = 'cf5b57c21ae743cea3f172828230305';
        const getUrl = `http://api.weatherapi.com/v1/forecast.json?key=${cf5b57c21ae743cea3f172828230305}&q=${city}&days=10&aqi=no&alerts=no&lang=ru`;

        const getResponse = await axios.get(getUrl);
        const apiResponse = getResponse.data;
        arrOfThreeDaysWeather = [...apiResponse.forecast.forecastday.slice(0, 3)];
        arrOfTenDaysWeather = apiResponse.forecast.forecastday.map((day) => ({ ...day }));

        let response = getCurrTimeWeather(apiResponse);
        bot.sendMessage(chatId, response, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Подробный прогноз на 3 дня', callback_data: 'threedays' }],
                    [{ text: 'Краткий прогноз на 10 дней', callback_data: 'tendays' }]
                ]
            }
        })

            .then((sentMessage) => {
                lastMessageId = sentMessage.message_id;
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

function deleteLastMessage(chatId) {
    if (lastMessageId) {
        bot.deleteMessage(chatId, lastMessageId)
            .then(() => {
                log('Сообщение удалено');
                lastMessageId = undefined;
            })
            .catch((error) => {
                console.error('Ошибка при удалении сообщения:', error);
            });
    }
}

function getCurrTimeWeather(apiResponse) {
    const {
        location: { name },
        current: {
            temp_c,
            feelslike_c,
            humidity,
            wind_kph,
            wind_dir,
            condition: { text, icon },
        },
    } = apiResponse;
    const currentDate = new Date().toLocaleString();
    const weatherMessage = `Город: <b>${name}</b>\n
    Дата и время: ${currentDate}\n
    ${getWeatherEmoji(icon)} ${text}\n
    Температура: ${temp_c}°C\n
    Ощущается как: ${feelslike_c}°C\n
    Влажность: ${humidity}%\n
    Скорость ветра: ${wind_kph} км/ч\n
    Направление ветра: ${wind_dir}`;

    return weatherMessage;
}

function getThreeDayWeather(weatherData) {
    let response = "Прогноз на 3 дня:\n\n";
    for (let i = 0; i < 3; i++) {
        const {
            date,
            day: { condition: { text, icon }, maxtemp_c, mintemp_c },
        } = weatherData[i];

        response += `${getDateFormatted(date)}\n${getWeatherEmoji(icon)} ${text}\nМаксимальная температура: ${maxtemp_c}°C\nМинимальная температура: ${mintemp_c}°C\n\n`;
    }

    return response;
}

function getTenDayWeather(weatherData) {
    let response = "Прогноз на 10 дней:\n\n";
    for (let i = 0; i < weatherData.length; i++) {
        const {
            date,
            day: { condition: { text, icon }, maxtemp_c, mintemp_c },
        } = weatherData[i];

        response += `${getDateFormatted(date)}\n${getWeatherEmoji(icon)} ${text}\nМаксимальная температура: ${maxtemp_c}°C\nМинимальная температура: ${mintemp_c}°C\n\n`;
    }

    return response;
}

function getDateFormatted(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
}

function getWeatherEmoji(icon) {
    const emojiMap = {
        'clear': ':sunny:',
        'partly-cloudy': ':partly_sunny:',
        'cloudy': ':cloud:',
        'overcast': ':cloud:',
        'light-rain': ':white_sun_rain_cloud:',
        'moderate-rain': ':white_sun_rain_cloud:',
        'heavy-rain': ':cloud_rain:',
        'thunderstorm': ':thunder_cloud_rain:',
        'snow': ':cloud_snow:',
        'mist': ':fog:',
    };
    return emojiMap[icon] || '';
}

bot.on("polling_error", (err) => {
    console.error(err);
});

bot.on("webhook_error", (error) => {
    console.error(error);
});
