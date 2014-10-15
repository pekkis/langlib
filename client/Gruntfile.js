module.exports = function(grunt) {

    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        revision: "r" + process.cwd().split('/').pop(),

        less: {

            common: {
                files: {
                    "web/app.css": [
                        "app.less"
                    ]
                }
            }
        },

        watch: {

            less: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },

            jsx: {
                files: ['components/**/*.js', 'app.js'],
                tasks: ['shell:browserify'],
                options: {
                    spawn: false
                }
            }
        },

        shell: {
            browserify: {
                options: {
                    stderr: false
                },
                command: ['browserify -t reactify -o web/app.js app.js'].join(' && ')
            }
        }
    });

    grunt.registerTask('css', ['less']);
    grunt.registerTask('default', ['css', 'shell']);
};
