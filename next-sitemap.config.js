/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nextjs-tailwind-starter-ts.vercel.app', // FIXME: Change to the production URL
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
