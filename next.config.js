const path = require('path');
const fs = require('fs');

module.exports = {
  async headers() {
    return [
      {
        source: '/ads.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ads.txt',
        destination: '/ads.txt',
      },
    ];
  },
  async afterExport() {
    const adsFilePath = path.join(__dirname, 'ads.txt'); // Change the path if necessary
    const staticAdsPath = path.join(__dirname, '.next', 'static', 'ads.txt'); // Change the path if necessary

    fs.copyFileSync(adsFilePath, staticAdsPath);
  },
};
