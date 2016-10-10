// Karma configuration
// Generated on Sun Oct 09 2016 20:43:49 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        // bower
        './public/libs/angular/angular.js', 
        './public/libs/angular-ui-router/release/angular-ui-router.min.js',
        './public/libs/angular-sanitize/angular-sanitize.min.js',
        './public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './public/libs/angular-cookies/angular-cookies.min.js',
        './public/libs/angular-messages/angular-messages.min.js',
        './public/libs/jquery/dist/jquery.min.js',
        './public/libs/bootstrap/dist/js/bootstrap.min.js',
        // endbower
        
        './public/libs/angular-mocks/angular-mocks.js', 

        './public/js/*.js',
        './public/js/**/*.js',
        './test_karma/**/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}