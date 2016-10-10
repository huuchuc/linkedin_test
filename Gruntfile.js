module.exports = function(grunt) {
	//Load task library
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-sequelize');


    // Config task
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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

        // Create DB 
        // sequelize: {
        //     options: {
        //       migrationsPath: 'db/migrations',
        //       config: 'config/database.js'
        //     }
        // }

        // watchdog timer
        watch: {
            // for stylesheets, watch css
            stylesheets: {
                files: ['./public/dev/css/*.css'],
                tasks: ['cssmin']
            },

            // for scripts, run uglify
            scripts: {
                files: './public/dev/js/**/*.js',
                tasks: ['concat', 'uglify']
            }
        },

    });

    // Create task
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);
    
};