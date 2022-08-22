const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  //reactStrictMode: true,
  env: {
    wordpressApiUrl: "https://babacric.in/graphql",
    headerMenuName: "BabaCrick Main Menu",
    siteUrl: "https://newsctrls.com",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "hindi.crictracker.com",
      "newsctrls.com",
      "babacric.in",
      "i0.wp.com",
      "secure.gravatar.com",
      "babacricnews.s3.ap-south-1.amazonaws.com",
      "www.betwaypartners.com",
    ],
  },
  pwa: {
    dest: "public",
    swSrc: "/public/service-worker.js",
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    themeConfig: {
      logo: {
        url: "https://newsctrls.com/wp-content/uploads/2021/09/Untitled-design-3-1-2.png",
        height: "54",
        width: "200",
      },
      postCard: {
        showPostExcerpt: true,
      },
    },
  },
};

module.exports = withPlugins([[withPWA]], nextConfig);
