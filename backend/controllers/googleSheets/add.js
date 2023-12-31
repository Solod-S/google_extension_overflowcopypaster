const { addGoogleSheet } = require("../../helpers/googleSHeetsOperations");
const { googleSheetTransformer } = require("../../helpers/transformers");

const add = async (req, res, next) => {
  const { id, values } = req.body;

  const { data } = await addGoogleSheet(id, 1, values);
  res.status(200).json({
    success: true,
    message: "Successfully add google sheet",
    result: data,
  });
};

module.exports = add;
