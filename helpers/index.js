const GYUTO_URL = "https://gyuto.uber.space";

const getGyutoMediaPath = (relativePath, type, srv = null) => {
  const server = srv ? srv : GYUTO_URL;
  return relativePath.replace(`orginal_${type}`, `${server}/media`);
};
const test = getGyutoMediaPath("orginal_images/foo/bar.jpg", "images");
test;

const getGyutoImage = ({ file }, host) => {
  return getGyutoMediaPath(file, "images", host);
};

const test_img = getGyutoImage({ file: "orginal_images/blub.jpg" }, "https://test01.gyuto.uber.space");
test_img;

module.exports = {
  getGyutoImage,
};
