// app/layout.js (для App Router)
import localFont from 'next/font/local';
import './globals.css';

// Определяем локальный шрифт Source Sans 3
const sourceSans3Local = localFont({
  src: [
    {
      path: '../public/fonts/SourceSans3-Bold.woff2', // Путь относительно файла, где вызывается localFont
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/SourceSans3-Black.woff2',
      weight: '900',
      style: 'normal',
    },
	{
      path: '../public/fonts/SourceSans3-BoldItalic.woff2', // Путь относительно файла, где вызывается localFont
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/SourceSans3-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    // Добавьте другие веса/стили по мере необходимости
  ],
  variable: '--font-source-sans-3', // Определяем CSS-переменную
  display: 'swap', // Рекомендуется для предотвращения CLS
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru, en" className={`${sourceSans3Local.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}