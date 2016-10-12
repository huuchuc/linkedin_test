module.exports = function(grunt) {
	

    // Config task
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // check all js files for errors
        jshint: {
          all: ['public/dev/js/**/*.js'] 
        },

        // concat js file
        concat: {
            production: {
                files: {
                    './public/dist/js/notes.js': [
                            './public/dev/js/*.js',
                            './public/dev/js/controller/*.js',
                            './public/dev/js/service/*.js'
                            ],
                    './public/dist/js/library.js': [
                            './public/libs/jquery/dist/jquery.min.js', 
                            './public/libs/bootstrap/dist/js/bootstrap.min.js'
                            ],
                    './public/dist/js/dependencies.js': [
                            './public/libs/angular/angular.min.js', 
                            './public/libs/angular-ui-router/release/angular-ui-router.min.js',
                            './public/libs/angular-sanitize/angular-sanitize.min.js',
                            './public/libs/angular-cookies/angular-cookies.min.js',
                            './public/libs/angular-messages/angular-messages.min.js',
                            './public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
                            './public/libs/angular-flash-alert/dist/angular-flash.min.js'
                            ]
                }
            }
        },

        // compress js file
        uglify: {
            options: {
                mangle: true
            },
            production: {
                files: {
                    './public/dist/js/min/notes.min.js': './public/dist/js/notes.js',
                    './public/dist/js/min/library.min.js': './public/dist/js/library.js',
                    './public/dist/js/min/dependencies.min.js': './public/dist/js/dependencies.js'
                }
            }
        },

        // compress css file
        cssmin: {
            production: {
                files: {
                    './public/dist/css/style.min.css': ['./public/dev/css/style.css'],
                    './public/dist/css/library.min.css': [
                        './public/libs/bootstrap/dist/css/bootstrap.min.css', 
                        './public/libs/font-awesome/css/font-awesome.min.css'
                    ]
                }
            }
        },

        // test script
        karma: {
          unit: {
            configFile: 'karma-unit.config.js',
            autoWatch: true
          }
        },

        // watch for changes to files
        watch: {
            // for stylesheets, watch css
            stylesheets: {
                files: ['./public/dev/css/*.css'],
                tasks: ['cssmin']
            },

            // for scripts, run uglify
            scripts: {
                files: './public/dev/js/**/*.js',
                tasks: ['jshint', 'concat', 'uglify']
            } 
        },

        // watch our node server for changes
        nodemon: {
          production: {
            script: 'server.js'
          }
        },

        // run watch and nodemon at the same time
        concurrent: {
          options: {
            logConcurrentOutput: true
          },
          tasks: ['nodemon:production', 'watch']
        } 

    });

    //Load task library
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Create task
    grunt.registerTask('default', ['jshint', 'concat', 'uglify','cssmin', 'concurrent']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'cssmin', 'watch']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('server', ['nodemon:production']); 
    

    
};