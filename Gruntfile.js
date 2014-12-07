module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options:{
        loadPath: [
          'libs/csskit/scss'
        ],
        lineNumbers: false
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/app.min.css': 'src/scss/app.scss'
        }
      },
      dev:{
        options: {
          style: 'expanded'
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
          // 'src/js/raf.js',
          'src/js/wow.js',
          'src/js/smoothscroll.js',
          'src/js/responsive-img.js',
          // 'src/js/validate.js',

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
        files: ['src/scss/**/*.scss', 'libs/csskit/scss/**/*.scss'],
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
        compress: true,
        report: 'gzip'
      },
      target: {
        files: {
          'assets/js/app.min.js':['assets/js/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
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