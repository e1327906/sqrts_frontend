module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' }, // for Jest to use the current Node version
      modules: 'auto' // this might be 'commonjs' if Jest runs in a CommonJS context
    }],
    '@babel/preset-typescript', // for TypeScript
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime' // helps with async/await and generators
  ]
};
