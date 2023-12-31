const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5555;

const { googleSheetsRouter } = require("./routes");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/google-sheets", googleSheetsRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ success: false, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
