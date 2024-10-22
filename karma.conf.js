// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-reporter'),
      require('karma-verbose-reporter')
    ],
    reporters: ['verbose'],
    client: {
      jasmine: {
        random: false,
        failFast: true,
        stopOnFailure: true
      },
      clearContext: true // leave Jasmine Spec Runner output visible in browser

    },
    sonarqubeReporter: {
      basePath: 'src/app',        // test files folder
      filePattern: '*/spec.ts', // test files glob pattern
      encoding: 'utf-8',          // test files encoding
      outputFolder: 'reports',    // report destination
      legacyMode: false,          // report for Sonarqube < 6.2 (disabled)
      reportName: 'ut_report.xml'
    },
    coverageReporter: {
      includeAllSources: true,
      dir: 'coverage',
      subdir: '.',
      reporters: [
        {
          type : 'html',
          dir : 'coverage'
        },
        {
          type : 'cobertura',
          dir:   'coverage'
        },
        {
          type: 'lcov',
          dir:   'coverage'
        }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      Headless: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],

      }
    },
    singleRun: true,
    restartOnFileChange: true
  });
};
