const fs = require("fs");

const onConvertFileName = (linkImage) => {
  return `${linkImage.split("/")[linkImage.split("/").length - 1]}`;
};

const onUrlFile = (host, path) => `http://${host}/${path}`;

const onImagePath = (fileName) => `uploads/${Date.now()}_${fileName}`;

const onSaveFile = (path, base64) => {
  fs.writeFileSync(path, Buffer.from(base64.split(",")[1], "base64"));
};

const onDeleteFile = (linkFile) => {
  return fs.unlinkSync(`uploads/${onConvertFileName(linkFile)}`);
};

module.exports = {
  onConvertFileName,
  onUrlFile,
  onImagePath,
  onSaveFile,
  onDeleteFile,
};
