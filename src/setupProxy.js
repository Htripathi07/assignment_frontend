const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pink-mysterious-scorpion.cyclic.app',
      changeOrigin: true,
    })
  );
};
