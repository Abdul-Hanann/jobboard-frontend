const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre",
      },
    ],
  },
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      url: require.resolve("url"),
      util: require.resolve("util"),
      assert: require.resolve("assert"),
      vm: require.resolve("vm-browserify"),
    },
  },
}
