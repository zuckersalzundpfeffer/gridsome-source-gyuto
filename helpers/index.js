const GYUTO_URL = "https://gyuto.uber.space";

const getGyutoMediaPath = (relativePath, type, srv = null) => {
  const server = srv ? srv : GYUTO_URL;
  return relativePath.replace(`original_${type}`, `${server}/media/${type}`);
};
const test = getGyutoMediaPath("original_images/foo/bar.jpg", "images");
test;

const getGyutoImage = ({ file }, options, host) => {
  let fileName = file;
  const widthOption = options.width ? `width-${options.width}` : null;
  const formatOption = options.format ? `format-${options.format}` : null;
  const type = "images";
  const filePropString = "." + [widthOption, formatOption].join(".");
  filePropString;
  const params = { type, filePropString };
  params;
  if (options) {
    const array = file.split(".");
    array;
    let mimeType = array[array.length - 1];
    mimeType;
    if (options.format) {
      mimeType = options.format;
    }
    fileName = array[0] + filePropString + "." + mimeType;
  }

  const serverFile = getGyutoMediaPath(fileName, "images", host);
  serverFile;
  return serverFile;
};

const test_img = getGyutoImage(
  { file: "original_images/blub.jpg" },
  { width: 900, format: "webp" },
  "https://test01.gyuto.uber.space"
);
test_img;

module.exports = {
  getGyutoImage,
};

// const GYUTO_HOST = "https://gyuto.uber.space";

// export const getGyutoImage = ({ file }, args = {}) => {
//     const mediaHost = `${GYUTO_HOST}/media`;
//     const array = file.split(".");
//     const mimeType = array[array.length - 1];
//     const image = []

//     let filePath = file
//       .replace("original_images/", `${mediaHost}/original_images/`)
//       .replace(`.${mimeType}`, "");

//     image[0] = filePath

//     if(Object.keys(args).length > 0){
//         filePath = file
//       .replace("original_images/", `${mediaHost}/images/`)
//       .replace(`.${mimeType}`, "");
//     const filterString = Object.entries(args).reduce(
//       (acc, curr, idx, arr) => {
//         let pstr = acc;
//         if (Array.isArray(acc)) {
//           const [pk, pv] = acc;
//           pstr = `.${pk}-${pv}`;
//         }

//         const [k, v] = curr;
//         const str = `.${k}-${v}`;

//         return pstr + str;
//       }
//     );
//     image[1] = filterString
//     }

//     const fileType = `.${args.format ? args.format : mimeType}`;
//     image.push(fileType)
//     return image.join("");
//   }
