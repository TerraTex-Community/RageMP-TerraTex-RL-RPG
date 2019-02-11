module.exports = function(grunt) {
    var deployPath = grunt.option('path') || 'dev';

    grunt.initConfig({
        'npm-command': {
            clientpackages_install: {
                options: {
                    cmd: 'install',
                    cwd: '../client-packages'
                }
            },

            serverpackages_install: {
                options: {
                    cmd: 'install',
                    cwd: '../server-packages'
                }
            },

            ui_install: {
                options: {
                    cmd: 'install',
                    cwd: '../Client-UI'
                }
            },
            clientpackages_build: {
                options: {
                    cmd: 'run',
                    args: ['build'],
                    cwd: '../client-packages'
                }
            },
            ui_build: {
                options: {
                    cmd: 'run',
                    args: ['build'],
                    cwd: '../Client-UI'
                }
            },
            extras_console: {
                options: {
                    cmd: 'install',
                    cwd: '../Extras/packages/_rage-console'
                }
            }
        },
        'mkdir': {
            all: {
                options: {
                    create: ['dist', 'dist/client_packages', 'dist/client_packages/ui', 'dist/packages']
                }
            }
        },
        'copy': {
            ui: {
                expand: true,
                src: '**/*',
                cwd: '../Client-UI/src/',
                dest: './dist/client_packages/ui'
            },
            client: {
                expand: true,
                src: '**/*',
                dest: './dist/client_packages',
                cwd: '../client-packages/dist'
            },
            dlc: {
                expand: true,
                src: '**/*',
                dest: './dist/client_packages/dlcpacks',
                cwd: '../client-packages/dlcpacks'
            },
            server: {
                expand: true,
                src: '**/*',
                dest: './dist/packages/TerraTex',
                cwd: '../server-packages'
            },
            deploy: {
                expand: true,
                src: '**/*',
                dest: deployPath,
                cwd: './dist'
            },
            extras: {
                expand: true,
                src: '**/*',
                dest: './dist',
                cwd: '../Extras'
            }
        },
        'clean': {

            'pre': ['./dist'],
            'deploy': {
                options: {
                    force: true,
                },
                src: [deployPath + '/packages', deployPath + '/client_packages']
            },
            'scss': ['./dist/**/*.scss']
        }
    });

    grunt.loadNpmTasks('grunt-npm-command');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('pre', ['clean:pre']);
    grunt.registerTask('install', ['npm-command:ui_install','npm-command:serverpackages_install','npm-command:clientpackages_install', "npm-command:extras_console"]);
    grunt.registerTask('build', ['npm-command:ui_build', 'npm-command:clientpackages_build']);
    grunt.registerTask('publish', ['mkdir', 'copy:ui', 'copy:client','copy:dlc', 'copy:server', 'copy:extras', 'clean:scss']);

    grunt.registerTask('default', ['pre', 'install', 'build', 'publish']);
    grunt.registerTask('deploy', ['clean:deploy', 'copy:deploy']);

};
