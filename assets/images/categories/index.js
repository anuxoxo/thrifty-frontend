const images = require.context("./", false, /\.(png|jpe?g|svg)$/);
const catogoriesImages = images.keys().map((image) => images(image));

export default catogoriesImages;
