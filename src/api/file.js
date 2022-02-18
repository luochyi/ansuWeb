export const cdnPath = (imagePath) => { return imagePath === '' ? '' : process.env.VUE_APP_CDN + imagePath }
