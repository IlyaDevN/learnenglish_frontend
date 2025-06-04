import * as deepl from 'deepl-node';

export default async function handler(req, res) {
  // 1. Проверка метода запроса
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Only POST requests are allowed.' });
  }

  // 2. Получение DeepL Auth Key из переменных окружения
  const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;
  if (!DEEPL_AUTH_KEY) {
    console.error('Ошибка: Переменная окружения DEEPL_AUTH_KEY не установлена.');
    return res.status(500).json({ message: 'Server configuration error: DeepL API Key not set.' });
  }

  // 3. Инициализация DeepL Translator
  const translator = new deepl.Translator(DEEPL_AUTH_KEY);

  try {
    // 4. Получение данных из тела запроса
    const { text, targetLang = 'en-US' } = req.body; // 'text' - это русское предложение для перевода

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text to translate is required.' });
    }

    console.log(`Отправка запроса в DeepL для перевода: "<span class="math-inline">\{text\}" на "</span>{targetLang}"`);

    // 5. Вызов DeepL API для перевода
    // sourceLang: null позволяет DeepL автоматически определить исходный язык
    const result = await translator.translateText(text, null, targetLang);

    console.log('Переведенный текст от DeepL:', result.text);

    // 6. Отправка успешного ответа клиенту
    res.status(200).json({ success: true, translatedText: result.text });

  } catch (error) {
    // 7. Обработка ошибок
    console.error('Ошибка при переводе с помощью DeepL:', error);
    res.status(500).json({ success: false, message: 'Failed to translate text.', error: error.message });
  }
}