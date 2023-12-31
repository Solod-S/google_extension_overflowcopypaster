const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const get = require("./get");
const add = require("./add");

module.exports = {
  get: ctrlWrapper(get),
  add: ctrlWrapper(add),
};
