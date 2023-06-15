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
        destination: '/static/ads.txt', // Change the path if necessary
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/ads',
        destination: '/ads.txt',
        permanent: true,
      },
    ];
  },
  async afterExport() {
    const adsFilePath = path.join(__dirname, 'public', 'ads.txt'); // Change the path if necessary
    const staticAdsPath = path.join(__dirname, '.next', 'static', 'ads.txt'); // Change the path if necessary

    fs.copyFileSync(adsFilePath, staticAdsPath);
  },
};
