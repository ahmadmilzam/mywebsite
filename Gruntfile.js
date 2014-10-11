module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/app.min.css': 'src/scss/app.scss'
        }
      },
      dev:{
        options: {
          outputStyle: 'nested'
        },
        files: {
          'assets/css/app.css': 'src/scss/app.scss'
        }
      }
    },

    concat: {
      options: {
        banner: '\n'
      },
      vendor: {
        src: [
          // required library script
          'src/js/libs/jquery.min.js',
          'src/js/libs/velocity.js',
          'bower_components/foundation/js/foundation/foundation.js',
          'bower_components/foundation/js/foundation/foundation.abide.js',
          'bower_components/foundation/js/foundation/foundation.interchange.js',
          'bower_components/fastclick/lib/fastclick.js',
          // 'bower_components/foundation/js/foundation/foundation.slider.js',

          'src/js/libs/wow.js',
          'src/js/libs/carousel.js',
          'src/js/libs/clearform.js',

          // my script
          'src/js/app.js'
        ],
        dest: 'assets/js/app.js'
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['development-task']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['development-task']
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      target: {
        files: {
          'assets/js/app.min.js':['assets/js/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask(
    'development-task',
    [
      'sass:dev',
      'concat:vendor'
    ]
  );

  grunt.registerTask(
    'production-task',
    [
      'sass:dist',
      'concat:vendor',
      'uglify'
    ]
  );

  grunt.registerTask('build', ['production-task']);
  grunt.registerTask('default', ['development-task','watch']);

}