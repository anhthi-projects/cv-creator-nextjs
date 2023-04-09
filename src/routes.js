const routes = require("next-routes-extended");

module.exports = routes()
  .add({
    pattern: "/design",
    name: "design",
    page: "design",
  })
  .add({
    pattern: "/download",
    name: "download",
    page: "download",
  })
  .add({
    pattern: "/",
    name: "home",
    page: "home",
  });
