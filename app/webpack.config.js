const path = require('path');

module.exports = {
  entry: {
    index: './content/components/index.js',
    demo: './content/components/demo/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'content/static/scripts'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'content/components'),
    },
  },
};
