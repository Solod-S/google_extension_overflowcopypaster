const googleSheetsRouter = require("express").Router();

const { googleSheets } = require("../controllers");

//  get
googleSheetsRouter.get("/get:id", googleSheets.get);

//  add
googleSheetsRouter.post("/add", googleSheets.add);

// delete
// googleSheetsRouter.post("/delete", googleSheets.delete);

module.exports = googleSheetsRouter;
