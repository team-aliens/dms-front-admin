#!/usr/bin/env node

const { existsSync } = require('fs');
const { createRequire } = require('nodule');
const { resolve } = require('path');

const relPnpApiPath = '../../../../.pnp.cjs';

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
const absRequire = createRequire(absPnpApiPath);

if (existsSync(absPnpApiPath)) {
  if (!process.versions.pnp) {
    require(absPnpApiPath).setup();
  }
}

module.exports = absRequire('eslint/bin/eslint.js');
