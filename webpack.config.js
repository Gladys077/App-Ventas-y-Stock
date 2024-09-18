const path = require('path');

module.exports = {
  entry: './componentes/pages_react/app.js',
  output: {
    path: path.resolve(__dirname, 'componentes'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'componentes'),
    compress: true,
    port: 9000
  }
};
