const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
  entry: {
    // "ag-table": "./src/components/AgTable/index.js",
    "team-member-listing": "./src/components/TeamMemberListing/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        use: "raw-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
