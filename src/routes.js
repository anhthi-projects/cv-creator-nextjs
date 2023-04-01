const routes = require("next-routes-extended");

module.exports = routes()
  .add({
    pattern: "/home",
    name: "home",
    page: "home",
  })
  .add({
    pattern: "/",
    name: "design",
    page: "design",
  });
