module.exports = {
  e2e: {
    baseUrl: 'http://localhost:4567'
  }
};
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter')

module.exports = {
  reporter: 'spec',          // qualquer reporter
  e2e: {
    baseUrl: 'http://localhost:4567',
    setupNodeEvents(on) {
      installLogsPrinter(on, {
        printLogsToFile: 'always',      // cria um .txt por execução
        outputRoot: 'cypress/logs',     // pasta onde o arquivo ficará
        outputTarget: {
          'cypress/logs/test-output.txt': 'txt',
        },
        includeSuccessfulHookLogs: false,
        collectTestLogs: (test) => true,
        printLogsToConsole: 'never'
      })
    }
  }
}
