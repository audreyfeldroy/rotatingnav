module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("rotatingnav.jquery.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
        " */\n"
    },

    // Concat definitions
    concat: {
      dist: {
        src: ["src/jquery.rotatingnav.js"],
        dest: "dist/jquery.rotatingnav.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // Lint definitions
    jshint: {
      files: ["src/jquery.rotatingnav.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    
    // Copy main js file to dist
    copy: {
      dist: {
        src: "src/jquery.rotatingnav.js",
        dest: "dist/jquery.rotatingnav.js"
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: "dist/jquery.rotatingnav.js",
        dest: "dist/jquery.rotatingnav.min.js"
      },
      options: {
        banner: "<%= meta.banner %>",
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        }
      }
    },

    // Less compilation
    less: {
      compile: {
        files: {
          "dist/jquery.rotatingnav.css": "src/rotatingnav.less"
        }
      }
    },
    
    // CSS minification
    cssmin: {
      add_banner: {
        options: {
          banner: '/* rotatingnav by audreyr ~ https://github.com/audreyr/rotatingnav */'
        },
        files: {
          'dist/jquery.rotatingnav.min.css': ['dist/jquery.rotatingnav.css']
        }
      }
    },

    // Release to NPM
    release: {
      
    }
    
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask("default", ["jshint", "concat", "copy", "uglify", "less", "cssmin"]);
  grunt.registerTask("travis", ["jshint"]);

};
