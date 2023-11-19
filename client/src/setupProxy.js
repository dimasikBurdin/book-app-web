const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3004',
            changeOrigin: true,
            onProxyReq: ({ method, path, req }) => console.log(method, path),
        }),

    );
};