const path = require('path');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, './src/index')
  },
  output: {
    filename: './bundle.js',
    library: true,
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    loaders: [
      // note that babel-loader is configured to run after ts-loader
      {test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader'},
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src', 'node_modules']
  }
};