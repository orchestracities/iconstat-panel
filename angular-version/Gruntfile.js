module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    clean: ["dist"],

    copy: {
      srcToDist: {
        cwd: 'src',
        expand: true,
        src: ['plugin.json', 'styles/*', 'img/*', '**/*.html', '!**/*.js'],
        dest: 'dist'
      },

      pluginDef: {
        expand: true,
        src: [ 'README.md' ],
        dest: 'dist'
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {spawn: false}
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ['env']
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      }
    }

  });

  grunt.registerTask('default', ['clean', 'copy:srcToDist', 'copy:pluginDef', 'babel']);
};
