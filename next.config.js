/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },

  webpack(config, { isServer, dev }) {
    // Правило для аудиофайлов (остается без изменений)
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });

    const shouldDropConsole = !dev && process.env.NEXT_PUBLIC_DROP_CONSOLE === 'true';

    if (shouldDropConsole) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }

    return config;
  },
};

module.exports = nextConfig;