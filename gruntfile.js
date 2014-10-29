
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    
    uglify: {
        build: {
            files: {
                'build/<%= pkg.filenameBase %>-<%= pkg.version %>.min.js': ['build/<%= pkg.filenameBase %>-<%= pkg.version %>.js'],
                'build/<%= pkg.filenameBase %>-<%= pkg.version %>.cocoon.min.js': ['build/<%= pkg.filenameBase %>-<%= pkg.version %>.cocoon.js']
            }
        }
    },
 
    concat: {
          build: {
            src:['src/managers/*.js', 'src/states/*.js', '<%= pkg.main %>/game.js'],
            dest: 'build/<%= pkg.filenameBase %>-<%= pkg.version %>.js'
          },
          cocoon: {
            src:['src/managers/*.js', 'src/states/*.js', '<%= pkg.main %>/cocoon-game.js'],
            dest: 'build/<%= pkg.filenameBase %>-<%= pkg.version %>.cocoon.js'
          }
    },
    
    connect: {
      server: {
        options: {
          port: 9000,
          base: './'
        }
      }
    },

    zip: {
      'SuperChugWars.zip': ['build/<%= pkg.filenameBase %>-<%= pkg.version %>.cocoon.js', 'assets/**', 'lib/**', 'index.html']
    }


 });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-zip');
  
  grunt.registerTask("default", [
    "concat:build",
    "concat:cocoon",
    "uglify:build",
    "zip"
    ]);

  grunt.registerTask('serve', [
    'connect:server:keepalive'
    ]);

  
  

};