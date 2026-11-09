const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'is-business-mail.js',
    libraryTarget: 'commonjs'
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.js','.d.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
