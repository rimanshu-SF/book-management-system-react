// Babel config using ES Module syntax (correct for your setup)
export default {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
  };
  