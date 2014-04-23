'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Project info
     */
    project: {
      css_src: [
        '_src/css'
      ],
      css_res: [
        'assets/css'
      ],
      img_src: [
        '_src/img'
      ],
      img_res: [
        'assets/img'
      ],
      js_src: [
        '_src/js/*.js'
      ],
      js_res: [
        'assets/js/*.js'
      ]
    },

    /**
     * Project banner
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * Name: <%= pkg.name %>\n' +
              ' * Project: <%= pkg.description %>\n' +
              ' * Author: <%= pkg.author %>\n' +
              ' * Version: <%= pkg.version %>\n' +
              ' */\n'
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        pushTo: 'origin'
      }
    },

    /**
     * https://npmjs.org/package/grunt-contrib-sass
     */
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= project.css_src %>/style.unprefixed.css': '<%= project.css_src %>/style.scss'
        }
      },
      dist: {
        options: {
          style: 'expanded',
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.css_src %>/style.unprefixed.css': '<%= project.css_src %>/style.scss'
        }
      }
    },

    /**
     * https://npmjs.org/package/grunt-autoprefixer
     */
    autoprefixer: {
      dev: {
        options: {},
        src: '<%= project.css_src %>/style.unprefixed.css',
        dest: '<%= project.css_res %>/style.css'
      },
      dist: {
        options: {},
        src: '<%= project.css_src %>/style.unprefixed.css',
        dest: '<%= project.css_src %>/style.prefixed.css'
      },
    },

    /**
     * Clean files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     * Remove generated files for clean deploy
     */
    clean: {
      dev: [
        '_src/css/style.prefixed.css',
        '_src/css/style.unprefixed.css'
      ],
      build: [
        '_site/Gemfile',
        '_site/Gemfile.lock',
        '_site/Gruntfile.js',
        '_site/package.json',
        '_site/node_modules',
        '_src/css/style.prefixed.css',
        '_src/css/style.unprefixed.css'
      ]
    },

  svgstore: {
    options: {},
    default : {
      files: {
        'assets/img/svg/svg-lib.svg': ['_src/img/svg-lib/*.svg'],
      },
    },
  },

    svgmin: {                        
        options: {                   
            plugins: [{
                removeViewBox: false
            }]
        },
        // dist: {                      
        //     files: {                 
        //         '_src/img/star2.svg': '_src/img/star.svg'        // 'destination': 'source'
        //     }
        // }
        dist: {                        // Target
            files: [{                // Dictionary of files
                expand: true,        // Enable dynamic expansion.
                cwd: 'assets/img',        // Src matches are relative to this path.
                src: ['svg-lib.svg'],    // Actual pattern(s) to match.  src: ['**/*.svg'],
                dest: 'assets/img',        // Destination path prefix.
                ext: '.svg'        // Dest filepaths will have this extension.
                // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
            }]
        }
    },  
    imagemin: {
      dynamic: {   
        files: [{
          expand: true,
          cwd: '_src/img',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'assets/img'             
        }]
      }
    }, 

    /**
     * https://npmjs.org/package/grunt-contrib-watch
     * Now with livereload
     */
    watch: {
      css: {
        files: '<%= project.css_src %>{,*/}*.{scss,sass}',
        tasks: ['sass:dev', 'autoprefixer', 'clean:dev'],
        options: {
          livereload: 35740,
        },
      },
      js: {
        files: '<%= project.js_res %>{,*/}*.{js}',
        tasks: ['jshint'],
        options: {
          livereload: 35740,
        },
      },
    },

    connect: {
      server: {
        options: {
          // base: './',
          port: 9001,
          open: {
            target: 'http://localhost:9001', // target url to open
          // appName: 'Chrome'
          }
        }
      }
    },

    open : {
      dev : {
        path: 'http://localhost:9001/',

        // app: 'Firefox'
      }
    }
  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  // grunt.registerTask('default', ['bump']);

  grunt.registerTask('default', [
    'connect:server:livereload:open',
    'watch'
    ]);

  grunt.registerTask('dev', [
    'connect:server:livereload:open',
    'watch'
    ]);

  grunt.registerTask('svg', [
    'svgstore',
    'svgmin'
    ]);

  grunt.registerTask('build', [
    'sass:dist',
    'autoprefixer:dist',
    'clean:build'
    ]);


};
