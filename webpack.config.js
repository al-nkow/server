const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const config = {
  entry: {
    main: './frontend/index.js',
    landing: './frontend/js/landing.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname + '/static/', 'frontend'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      // filename: '[name].css',
      // chunkFilename: '[id].css',
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // config.devtool = 'source-map';
    config.watch = true;
  }

  return config;
};
