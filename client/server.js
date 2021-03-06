const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const SERVER_PORT = 1337;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(SERVER_PORT, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://localhost:${SERVER_PORT}/`);
});
