import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // 1. Проверка метода запроса
  // Этот API маршрут будет обрабатывать только POST-запросы.
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Only POST requests are allowed.' });
  }

  // 2. Получение API-ключа Gemini из переменных окружения
  // Ключ должен быть установлен в файле .env.local (Шаг 4).
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('Ошибка: Переменная окружения GEMINI_API_KEY не установлена.');
    return res.status(500).json({ message: 'Server configuration error: Gemini API Key not set.' });
  }

  // 3. Инициализация Gemini API
  const genAI = new GoogleGenerativeAI(API_KEY);
  // Выбираем ту же модель, которая у вас работала ранее
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  try {
    // 4. Получение данных из тела запроса
    // Сейчас мы просто берем пример промпта, но позже сюда будут приходить
    // данные о сложности, существующих предложениях и т.д.
    const { prompt = 'Сгенерируй одно короткое русское предложение.' } = req.body;

    // 5. Вызов Gemini для генерации контента
    console.log('Отправка запроса в Gemini с промптом:', prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text().trim();

    console.log('Сгенерированный текст от Gemini:', generatedText);

    // 6. Отправка успешного ответа клиенту
    res.status(200).json({ success: true, sentence: generatedText });

  } catch (error) {
    // 7. Обработка ошибок
    console.error('Ошибка при генерации предложения с помощью Gemini:', error);
    // Возвращаем сообщение об ошибке, но без раскрытия конфиденциальной информации
    res.status(500).json({ success: false, message: 'Failed to generate sentence.', error: error.message });
  }
}