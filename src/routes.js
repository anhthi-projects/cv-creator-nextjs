const routes = require("next-routes-extended");

module.exports = routes()
  .add({
    pattern: "/",
    name: "home",
    page: "home",
  })
  .add({
    pattern: "/design",
    name: "design",
    page: "design",
  });
