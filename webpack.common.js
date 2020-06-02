module.exports = {
  entry: {
    main: "./src/js/app.js",
    result: "./src/js/result.js"
  },
  module: {
     rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader-srcset',
        options: {
          minimize: true
        }
      }],
    }]
  }
}
