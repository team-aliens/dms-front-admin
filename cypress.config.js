const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
});
