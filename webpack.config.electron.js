const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/main/main.ts"),
  mode: 'development',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
  },
  resolve: {
      extensions: ['.js', '.ts', '.json']
  },
  module: {
      rules: [
          {
            test: /\.tsx?$/,
            use: 'awesome-typescript-loader'
          }
      ]
  },
  plugins: [
  ],
  devtool:"source-map",
  target: 'electron-main'
};
