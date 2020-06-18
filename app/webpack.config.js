const path = require('path');

const sharedConfig = {
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

const externalConfig = {
  entry: {
    index: './content/components/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'cjs'),
    libraryTarget: 'commonjs2',
  },
  externals: { react: 'react', 'react-dom': 'reactDOM' },
};

const demoConfig = {
  entry: {
    demo: './content/components/demo/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'content/static/scripts'),
  },
};

module.exports = [
  {
    ...externalConfig,
    ...sharedConfig,
  },
  {
    ...demoConfig,
    ...sharedConfig,
  },
];
