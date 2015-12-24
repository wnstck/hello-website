module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //--------------------
        // clean :: remove directories/files
        //--------------------

        clean: {
            main: 'dist'
        },

        //--------------------
        // copy :: copies stuff
        //--------------------

        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: [
                    '*'
                ],
                dest: 'dist',
                filter: 'isFile',
                dot: true
            }
        },

        //--------------------
        // sass :: compile scss
        //--------------------

        sass: {
            dev: {
                options: { 
                    outputStyle: 'expanded',
                    sourceMap: true
                },
                files: {
                    'src/.tmp/main.css': 'src/styles/main.scss'
                }
            },
            dist: {
                options: { 
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: {
                    'dist/styles/main-<%= pkg.version %>.css': 'src/styles/main.scss'
                }
            }
        },

        //--------------------
        // imagemin :: optimize images
        //--------------------

        imagemin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: [
                        '**/*.*{png,jpg,gif}'
                    ],
                    dest: 'dist/images'
                }]
            }
        },

        //--------------------
        // html-build :: dynamically build into html
        //--------------------

        htmlbuild: {
            main: {
                src: 'dist/index.html',
                dest: 'dist',
                options: {
                    prefix: '/',
                    styles: {
                        main: {
                            cwd: 'dist',
                            files: 'styles/*.css'
                        }
                    }
                }
            }
        },

        //--------------------
        // watch :: run tasks in response to file changes
        //--------------------
        
        watch: {
            options: {
                interrupt: true
            },
            dev: { 
                files: ['src/styles/**/*.scss'],
                tasks: ['sass:dev']
            },
            dist: { 
                files: ['src/styles/**/*.scss'],
                tasks: ['sass:dist']
            }
        },

        //--------------------
        // connect :: start simple webserver
        //--------------------

        connect: {
            dev: {
                options: {
                    base: 'src',
                    port: 9000
                }
            },
            dist: {
                options: {
                    base: 'dist',
                    port: 9000
                }
            }
        }
    });

    //-- load packages

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //-- tasks

    grunt.registerTask('default', [
        'sass:dev',
        'connect:dev',
        'watch:dev'
    ]);

    grunt.registerTask('dist', [
        'clean',
        'copy',
        'sass:dist',
        'imagemin',
        'htmlbuild',
        'connect:dist',
        'watch:dist'
    ]);

};








