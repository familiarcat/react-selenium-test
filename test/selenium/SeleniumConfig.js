const installConfig = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  version: '2.53.1',
  drivers: {
    chrome: {
      version: '2.25',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    ie: {
      version: '2.53.1',
      arch: process.arch,
      baseURL: 'https://selenium-release.storage.googleapis.com'
    },
    firefox: {
      version: '0.11.1',
      arch: process.arch,
      baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
    }
  },
  logger: function (message) {
    console.log(message);
  },
  progressCb: function (totalLength, progressLength, chunkLength) {
    console.log("Installing:" + (progressLength / totalLength) *10) + '% Complete';
  }
};

const startupConfig = {
  spawnCb: (callback) => {
    //console.log('!!!!!!!!!!!!!!!spawn callback', callback);
  }
}
export {
  installConfig,
  startupConfig,
};
