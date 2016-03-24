module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },

      build: {
        src:  'build/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }

    },

    concat: {
      options:{
        seperator: ";"
      },
      dist: {
        src: 'src/**/*.js',
        dest: "build/<%= pkg.name %>.js"
      }
    },

    copy: {
      main: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      },
      views: {
        flatten: true,
        expand: true,
        cwd: 'src/views/',
        src: '*.html',
        dest: 'dist/views/'
      },
      vendor: {
        flatten: true,
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.min.js','angular.min.js.map'],
        dest: 'dist/js/vendor/'
      },
      images: {
        flatten: true,
        expand: true,
        noProcess: true,
        cwd: 'src/img/',
        src: '**/*.{png,jpg,gif,ico}',
        dest: 'dist/img/'
      },
      options: {
        process: function(content, path) {
          return grunt.template.process(content);
        },
        processContentExclude: ['**/*.{png,gif,jpg,ico}']
      }
    },

    less: {
      build: {
        files: {
          'dist/style.css': 'src/style/style.less'
        }
      }
    }

  });

  //Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //Tasks
  grunt.registerTask('default', ['concat','uglify','copy','less']);

};