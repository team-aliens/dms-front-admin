const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  projectId: 'dms-front-admin',
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
});
