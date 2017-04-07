'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: ['build/'],

    copy: {
      html: {
        files: [
          { expand: true,
            cwd: 'src/',
            src: 'index.html',
            dest: 'build/'
          },
          { expand: true,
            cwd: 'src/views/',
            src: '*.template.html',
            dest: 'build/views/'
          }
        ]
      },
      image: {
        files: [
          { expand: true,
            cwd: 'src/',
            src: 'images/*.*',
            dest: 'build/'
          }
        ]
      },
      node_modules: {
        files: [
          { expand: true,
            cwd: 'node_modules/angular/',
            src: 'angular.js',
            dest: 'build/js/'
          },
          { expand: true,
            cwd: 'node_modules/angular-ui-router/release/',
            src: 'angular-ui-router.js',
            dest: 'build/js/'
          }
        ]
      }
    },

    sass: {
      all: {
        files: {
          'build/style.css': 'src/sass/main.scss'
        }
      }
    },

    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    karma: {
      all: {
        options: {
          frameworks: ['mocha', 'chai'],
          browsers: ['Chrome'],
          singleRun: true,
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'src/js/hotelier.module.js',
            'src/**/*.js',
            'test/**/*.spec.js'
          ]
        }
      }
    },

    concat: {
      alljs: {
        options: {
          sourceMap: true
        },
        src: [
          'src/js/hotelier.module.js',
          'src/js/**/*.js'
        ],
        dest: 'build/js/app.js'
      }
    },

    babel: {
      all: {
        options: {
          presets: ['es2015'],
          sourceMap: true
        },
        files: {
          'build/js/app.js': 'build/js/app.js'
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'babel', 'copy', 'sass']);

};
