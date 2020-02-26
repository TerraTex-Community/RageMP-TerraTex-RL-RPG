def JSONVERSION

gitlabCommitStatus {
    try {
        node('windows') {

            deleteDir()

            script {
                def list = []
                if (env.BRANCH_NAME == 'develop') {
                    telegramSend """Ein neuer Build zum Dev-Server wurde gestartet."""
                }

                if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop') {

                }
                else {
                    list.add(booleanParam(name: 'DEPLOY_NON_DEV', defaultValue: false, description: 'If this is a non dev build toggle this if you want deploy'))
                }

                //finally
                properties([parameters(list), gitLabConnection('terratex')])

                final scmVars = checkout(scm)
                // echo "scmVars: ${DEPLOY_NON_DEV}"

                JSONVERSION = "{\"versionTimestamp\":\"${env.BUILD_TIMESTAMP}\", \
                \"versionBuildId\":\"${env.BUILD_ID}\", \
                \"gitBranch\": \"${scmVars.GIT_BRANCH}\", \
                \"gitCommit\": \"${scmVars.GIT_COMMIT}\"}"

                // echo JSONVERSION

                bat "cd server-packages && echo ${JSONVERSION} > version.json"
            }

            stage('Sonar-Scanner') {
                bat 'npm i typescript'
                bat 'tslint -o sonar-tslint.json --project  . -t json -e **/dist/**/* || exit 0'

                if (env.BRANCH_NAME.startsWith("MR")) {
                        echo sh(returnStdout: true, script: 'env')




                } else {

                    withSonarQubeEnv('TerraTex SonarQube') {
                        bat "sonar-scanner -Dsonar.projectVersion=${BRANCH_NAME}_${BUILD_ID} -Dsonar.projectKey=terratex:rl-rpg -Dsonar.sources=. -Dsonar.branch.name=${BRANCH_NAME}"
                    }

                    if (env.BRANCH_NAME != 'master') {
                        timeout(time: 1, unit: 'HOURS') {
                            def qg = waitForQualityGate()
                            if (qg.status != 'OK') {
                                error "Pipeline aborted due to quality gate failure: ${qg.status}"
                            }
                        }
                    }
                }
            }

            stage('Build-Server') {
                if (env.BRANCH_NAME.startsWith("MR")) {}
                else {
                    if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop' || params.DEPLOY_NON_DEV) {
                        if (env.BRANCH_NAME == 'develop') {
                            bat 'cd server-packages && del /f ormconfig.json'
                            bat 'cd server-packages && copy ormconfig.dev.json ormconfig.json'
                        } else if (env.BRANCH_NAME == 'master') {
                            bat 'cd server-packages && del /f ormconfig.json'
                            bat 'cd server-packages && copy ormconfig.prod.json ormconfig.json'
                        } else if (params.DEPLOY_NON_DEV) {
                            bat 'cd server-packages && del /f ormconfig.json'
                            bat 'cd server-packages && copy ormconfig.dev.json ormconfig.json'
                        }
                            bat 'cd Build-stuff && npm i'
                            bat 'cd Build-stuff && grunt'
                    }
                }
            }

            stage('Deploy') {
                if (env.BRANCH_NAME == 'master') {
                    bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\master\\server-files'
                } else if (env.BRANCH_NAME == 'develop') {
                    bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\develop\\server-files'
                } else if (params.DEPLOY_NON_DEV) {
                    bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\develop\\server-files'
                 }
            }

            stage('Artifacts Client') {
                if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop' || params.DEPLOY_NON_DEV) {
                    archiveArtifacts artifacts: 'Build-stuff/dist/client_packages/**/*', fingerprint: true
                }
            }
        }
    } catch(e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        node ('windows') {
            if (env.BRANCH_NAME == 'develop') {
                def currResult = currentBuild.result
                if (currResult == 'FAILURE') {
                    telegramSend 'Build fehlgeschlagen. Dev offline.'
                } else {
                    def telegram = "Build erfolgreich. Der Dev-Server mit folgenden Änderungen gestartet: "
                    def publisher = LastChanges.getLastChangesPublisher "LAST_SUCCESSFUL_BUILD", "SIDE", "LINE", true, true, "", "", "", "", ""
                    publisher.publishLastChanges()
                    def changes = publisher.getLastChanges()
                    for (commit in changes.getCommits()) {
                        def commitInfo = commit.getCommitInfo()
                        telegram = """${telegram}
- ${commitInfo.getCommitMessage()}"""
                    }

                    telegramSend telegram
                }
            }
        }
    }
}


