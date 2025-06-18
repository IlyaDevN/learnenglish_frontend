import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Only POST requests are allowed.' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('Ошибка: Переменная окружения GEMINI_API_KEY не установлена.');
    return res.status(500).json({ message: 'Server configuration error: Gemini API Key not set.' });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  try {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ success: false, message: 'Prompt is required.' });
    }

    console.log('Отправка запроса в Gemini с промптом:', prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let generatedText = response.text().trim();

    console.log('Сгенерированный текст от Gemini (предполагается JSON):', generatedText);

    // ************* НАЧАЛО ИСПРАВЛЕНИЯ *************
    // Удаляем обертку с блоком кода маркдауна, если она присутствует
    if (generatedText.startsWith('```json') && generatedText.endsWith('```')) {
      generatedText = generatedText.substring(7, generatedText.length - 3).trim();
    }
    // ************* КОНЕЦ ИСПРАВЛЕНИЯ *************

    // Попытаемся распарсить ответ как JSON
    let parsedContent;
    try {
        parsedContent = JSON.parse(generatedText);
    } catch (parseError) {
        console.error('Ошибка парсинга JSON ответа от Gemini:', parseError);
        console.error('Невалидный JSON ответ (после попытки очистки):', generatedText);
        return res.status(500).json({ success: false, message: 'Failed to parse AI response as JSON.', rawResponse: generatedText });
    }

    // *** ИСПРАВЛЕНИЕ: ПРОВЕРЯЕМ, ЧТО parsedContent ЯВЛЯЕТСЯ МАССИВОМ ОБЪЕКТОВ С НУЖНЫМИ ПОЛЯМИ ***
    if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
        return res.status(500).json({ success: false, message: 'Invalid JSON structure from AI. Expected an array of objects.', parsedContent });
    }

    // Дополнительная проверка, что каждый элемент массива имеет нужные поля
    for (const item of parsedContent) {
        if (typeof item !== 'object' || item === null || !('russian' in item) || !('english' in item)) {
            return res.status(500).json({ success: false, message: 'Invalid JSON structure from AI. Each item in the array must be an object with "russian" and "english" fields.', parsedContent });
        }
    }
    // *** КОНЕЦ ИСПРАВЛЕНИЯ ***

    // 6. Отправка успешного ответа клиенту
    // Изменяем 'pair' на 'pairs', чтобы соответствовать массиву
    res.status(200).json({ success: true, pairs: parsedContent }); // <--- Изменено с 'pair' на 'pairs'

  } catch (error) {
    console.error('Ошибка при взаимодействии с Gemini API:', error);
    // Отправка более подробного сообщения об ошибке, если это возможно
    res.status(500).json({ success: false, message: 'Failed to generate content from AI.', error: error.message });
  }
}