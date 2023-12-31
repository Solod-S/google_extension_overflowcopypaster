const { getGoogleSheet } = require("../../helpers/googleSHeetsOperations");
const { googleSheetTransformer } = require("../../helpers/transformers");

const get = async (req, res, next) => {
  const { id } = req.params;

  const { values } = await getGoogleSheet(id, 1);

  res.status(200).json({
    success: true,
    message: "Successfully get google sheet",
    data: googleSheetTransformer(values),
    id,
  });
};

module.exports = get;
