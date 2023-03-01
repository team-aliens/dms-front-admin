#!/usr/bin/env node

<<<<<<< HEAD
const { existsSync } = require(`fs`);
const { createRequire } = require(`module`);
const { resolve } = require(`path`);

const relPnpApiPath = '../../../../.pnp.cjs';
=======
const {existsSync} = require(`fs`);
const {createRequire} = require(`module`);
const {resolve} = require(`path`);

const relPnpApiPath = "../../../../.pnp.cjs";
>>>>>>> 1383a648b06e4ba7917421246e8463ba06d7bb87

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
const absRequire = createRequire(absPnpApiPath);

if (existsSync(absPnpApiPath)) {
  if (!process.versions.pnp) {
    // Setup the environment to be able to require eslint/bin/eslint.js
    require(absPnpApiPath).setup();
  }
}

// Defer to the real eslint/bin/eslint.js your application uses
module.exports = absRequire(`eslint/bin/eslint.js`);
