module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {                       // Target options
                    style: 'expanded',
                    sourcemap: 'inline'
                },
                files: {
                    'src/styles/custom.css': 'src/styles/custom.scss',
                    'src/styles/bootstrap/bootstrap.css': 'src/styles/bootstrap/bootstrap.scss',
                    'src/styles/font-awesome/font-awesome.css': 'src/styles/font-awesome/scss/font-awesome.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);

};
