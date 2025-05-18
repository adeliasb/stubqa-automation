// cypress.config.js  – única versão válida
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter')

/** @type {import('cypress').Cypress.config} */
module.exports = {
  reporter: 'spec',                 // ou mochawesome, etc., se quiser
  e2e: {
    baseUrl: 'http://localhost:4567',
    setupNodeEvents (on, config) {
      // instala o cypress‑terminal‑report
      installLogsPrinter(on, {
        outputRoot: 'cypress/logs',          // pasta a ser gerada AUTOMATICAMENTE
        outputTarget: { 'run-log.txt': 'txt' },
        printLogsToConsole: 'always',
      })

      return config                      // sempre retorne o config
    },
  },
}