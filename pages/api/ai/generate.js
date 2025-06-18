import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Логирование: Некорректный метод запроса
    console.warn(`[API/generate] Received ${req.method} request, but only POST is allowed.`);
    return res.status(405).json({ message: 'Method Not Allowed. Only POST requests are allowed.' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    // Логирование: Отсутствует API ключ
    console.error('[API/generate] Ошибка: Переменная окружения GEMINI_API_KEY не установлена.');
    return res.status(500).json({ message: 'Server configuration error: Gemini API Key not set.' });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  // Используется 'gemini-1.5-flash-latest' как в вашем коде
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  try {
    const { prompt } = req.body;

    if (!prompt) {
        // Логирование: Отсутствует промпт
        console.warn('[API/generate] Получен запрос без промпта.');
        return res.status(400).json({ success: false, message: 'Prompt is required.' });
    }

    // Логирование: Отправляемый промпт (обрезанный для читаемости)
    console.log('[API/generate] Отправка запроса в Gemini с промптом (начало):', prompt.substring(0, 500) + (prompt.length > 500 ? '...' : ''));
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let generatedText = response.text().trim();

    // Логирование: Сырой текст, полученный от Gemini
    console.log('[API/generate] Сырой текст от Gemini (до обработки Markdown):', generatedText);

    // Удаляем обертку с блоком кода маркдауна, если она присутствует
    if (generatedText.startsWith('```json') && generatedText.endsWith('```')) {
      generatedText = generatedText.substring(7, generatedText.length - 3).trim();
      console.log('[API/generate] Удалена обертка Markdown. Оставшийся текст:', generatedText);
    } else {
      console.log('[API/generate] Обертка Markdown не найдена/не удалена.');
    }

    // Попытаемся распарсить ответ как JSON
    let parsedContent;
    try {
        parsedContent = JSON.parse(generatedText);
        // Логирование: Успешный парсинг JSON
        console.log('[API/generate] Успешно распарсенный JSON от Gemini:', parsedContent);
    } catch (parseError) {
        // Логирование: Ошибка парсинга JSON
        console.error('[API/generate] Ошибка парсинга JSON ответа от Gemini:', parseError);
        console.error('[API/generate] Невалидный JSON ответ (после попытки очистки):', generatedText);
        return res.status(500).json({ success: false, message: 'Failed to parse AI response as JSON.', rawResponse: generatedText });
    }

    if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
        // Логирование: Некорректная структура: не массив или пустой массив
        console.error('[API/generate] Некорректная структура JSON от AI: ожидался непустой массив.', parsedContent);
        return res.status(500).json({ success: false, message: 'Invalid JSON structure from AI. Expected a non-empty array of objects.', parsedContent });
    }

    // Дополнительная проверка, что каждый элемент массива имеет нужные поля
    for (const item of parsedContent) {
        if (typeof item !== 'object' || item === null || !('russian' in item) || !('english' in item)) {
            // Логирование: Некорректная структура: элементы массива
            console.error('[API/generate] Некорректная структура JSON от AI: элемент массива не является объектом или отсутствуют поля "russian"/"english".', item);
            return res.status(500).json({ success: false, message: 'Invalid JSON structure from AI. Each item in the array must be an object with "russian" and "english" fields.', parsedContent });
        }
    }

    // Логирование: Отправляемый ответ клиенту
    console.log('[API/generate] Отправка успешного ответа клиенту:', { success: true, pairs: parsedContent.length + ' items' });
    res.status(200).json({ success: true, pairs: parsedContent }); 

  } catch (error) {
    // Логирование: Общая ошибка при взаимодействии с Gemini API
    console.error('[API/generate] Общая ошибка при взаимодействии с Gemini API:', error);
    res.status(500).json({ success: false, message: 'Failed to generate content from AI.', error: error.message });
  }
}