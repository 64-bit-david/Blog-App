const createProxyMiddleware = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/account", "/create-checkout-session"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};