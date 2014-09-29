function gruntConfig(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-jasmine-node');

  var settings = {
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          },
          ignore: ['node_modules/**'],
          ext: 'js,html,css,json,handlebars',
          delay: 1000,
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      app: {
        src: ['public/**.js', 'routes/**.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
    },
    'node-inspector': {
      dev: {}
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: true,
        extensions: 'spec.js',
        jUnit: {
          report: true,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ['test/server/']
    }
  };

  // Project configuration.
  grunt.initConfig(settings);

  // Default task.
  grunt.registerTask('dev', ['nodemon:dev','node-inspector:dev']);
  grunt.registerTask('test', ['jasmine_node']);

}

module.exports = gruntConfig;