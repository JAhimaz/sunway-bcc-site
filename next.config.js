// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compress: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      {
        // https://via.placeholder.com/150
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        // https://baserow-media.ams3.digitaloceanspaces.com/user_files/oHlxZ2dDLYkxMSv5Nm7FY1Orqx2xzFKH_7174d1c95e8161a634207444ef238bdec3699fb2dd423cb23a000022a92c0cc6.png
        protocol: 'https',
        hostname: 'baserow-media.ams3.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
  // sentry: {
  //   // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
  //   // for client-side builds. (This will be the default starting in
  //   // `@sentry/nextjs` version 8.0.0.) See
  //   // https://webpack.js.org/configuration/devtool/ and
  //   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
  //   // for more information.
  //   hideSourceMaps: true,
  // },
}



// const sentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore
//
//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts'
);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
module.exports = withNextIntl(nextConfig);