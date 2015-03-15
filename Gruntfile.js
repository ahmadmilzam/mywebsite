module.exports = function(grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
      src: 'src',
      assets: 'assets',
      css: {
        main: [
          '<%= project.src %>/scss/app.scss'
        ]
      }
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
      compile:{
        options: {
          loadPath: 'libs/csskit/src/scss/',
          banner: '<%= tag.banner %>',
          style: 'expanded'
        },
        files: {
          '<%= project.assets %>/css/app.css' : '<%= project.css.main %>'
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
          '<%= project.assets %>/css/app.prefixed.css' : ['<%= project.assets %>/css/app.css']
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
          '<%= project.assets %>/css/app.min.css' : ['<%= project.assets %>/css/app.prefixed.css']
        },
      },
    },

    /**
     * Optimize Images.
     * https://github.com/gruntjs/grunt-contrib-imagemin
     */
    imagemin: {                          // Task
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 3,
          progressive: false,
          cache: false
        },
        files: [{
          expand: true,                       // Enable dynamic expansion
          cwd: '<%= project.assets %>/img/',  // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],        // Actual patterns to match
          dest: '<%= project.assets %>/img/'  // Destination path prefix
        }]
      }
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
          //'src/js/wow.js',
          'src/js/smoothscroll.js',
          'src/js/responsive-img.js',

          // my script
          'src/js/app.js'
        ],
        dest: 'assets/js/app.js'
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
          'assets/js/app.min.js':['assets/js/app.js']
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
        tasks: ['sass:compile']
      },
      sass: {
        files: [
          '<%= project.src %>/scss/**/*.{scss, sass}'
        ],
        tasks: ['sass:compile']
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
    'uglify:target',
    'imagemin:dynamic'
  ]);

}