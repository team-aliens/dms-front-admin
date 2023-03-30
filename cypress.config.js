const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  projectId: '3rnwun',
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
});
