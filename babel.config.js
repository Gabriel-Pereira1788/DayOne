module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        alias: {
          '@/*': './src/*',
        },
      },
    ],
  ],
};
