module.exports = function(grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('load-grunt-tasks')(grunt);
  /**
   * CSSKit Grunt config
   */
  grunt.initConfig({

    /**
     * Read package.json file
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      bower: 'libs',
      src: 'src',
      assets: 'assets'
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
              ' */\n'
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    sass: {
      options: {
        includePaths: ['<%= project.bower %>/csskit/src/scss'],
        outputStyle: 'nested',
        sourceMap: true
      },
      compile: {
        files: {
          '<%= project.assets %>/css/app.css' : '<%= project.src %>/scss/app.scss'
        }
      }
    },

    /**
     * Parse CSS and add vendor-prefixed CSS properties
     * using the Can I Use database.
     * Based on Autoprefixer.
     * https://github.com/nDmitry/grunt-autoprefixer
     */
    autoprefixer: {
      dist: {
        options: {
          browsers: [
            'last 2 versions',
            '> 1%',
            'ie 9'
          ],
          map: false
        },
        files: {
          '<%= project.assets %>/css/app.css' : ['<%= project.assets %>/css/app.css']
        }
      }
    },

    /**
     * Runs tasks minify the script after prefixed with autoprefixer
     * https://github.com/nDmitry/grunt-autoprefixer
     */
    cssmin: {
      combine: {
        files: {
          '<%= project.assets %>/css/app.min.css' : ['<%= project.assets %>/css/app.css']
        },
      },
    },


    /**
     * Concatenate files.
     * https://github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        banner: '<%= tag.banner %>'
      },
      target: {
        src: [
          // required library script
          //'<%= project.src%>/js/wow.js',
          //'<%= project.src%>/js/loadCSS.js',
          '<%= project.src%>/js/smoothscroll.js',
          '<%= project.src%>/js/responsive-img.js',

          // my script
          '<%= project.src%>/js/app.js'
        ],
        dest: '<%= project.assets %>/js/app.js'
      }
    },

    /**
     * Minify files with UglifyJS.
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      options: {
        mangle: true,
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        },
        report: 'gzip'
      },
      target: {
        files: {
          '<%= project.assets %>/js/app.min.js':['<%= project.assets %>/js/app.js']
        }
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     */
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass:compile', 'concat:target']
      },
      sass: {
        files: [
          '<%= project.src %>/scss/**/*.{scss, sass}'
        ],
        tasks: ['sass:compile']
      },
      js: {
        files: [
          '<%= project.src %>/js/*.js'
        ],
        task: ['concat:target']
      }
    }

  });


  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('base', [
    'sass:compile',
    'concat:target'
  ]);

  grunt.registerTask('default', ['base', 'watch']);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'base',
    'autoprefixer:dist',
    'cssmin:combine',
    'uglify:target'
  ]);

}