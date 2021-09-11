const { resolve } = require('path');

module.exports = {
  mode: "production",
  entry: resolve(__dirname, 'src/index.ts'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    clean: true,
    filename: "index.js",
    path: resolve(__dirname, './dist'),
    library: {
      name: "YoutubeTool",
      type: 'umd',
    }
  }
};
