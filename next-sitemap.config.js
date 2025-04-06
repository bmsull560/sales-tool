/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://demogeniusai.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://demogeniusai.com/server-sitemap.xml',
    ],
  },
};
