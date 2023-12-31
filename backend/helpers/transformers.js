const googleSheetTransformer = data => {
  const keys = data[0];
  const result = [];
  console.log(data[0]);
  for (let i = 1; i < data.length; i++) {
    const obj = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = data[i][j];
    }
    result.push(obj);
  }

  return result;
};

module.exports = { googleSheetTransformer };
