properties([gitLabConnection('terratex')])
def JSONVERSION

gitlabCommitStatus {
    node('windows'){
        deleteDir()

        script {
            final scmVars = checkout(scm)
            // echo "scmVars: ${scmVars}"

            JSONVERSION = "{\"versionTimestamp\":\"${env.BUILD_TIMESTAMP}\", \
            \"versionBuildId\":\"${env.BUILD_ID}\", \
            \"gitBranch\": \"${scmVars.GIT_BRANCH}\", \
            \"gitCommit\": \"${scmVars.GIT_COMMIT}\"}"

            // echo JSONVERSION

            bat "cd server-packages && echo ${JSONVERSION} > version.json"
        }

        stage('Sonar-Scanner') {
            bat 'npm i typescript'
            bat 'tslint -o sonar-tslint.json -p . -t json -e **/dist/**/* || exit 0'

            withSonarQubeEnv('TerraTex SonarQube') {
                bat "sonar-scanner -Dsonar.projectKey=terratex:rl-rpg -Dsonar.sources=. -Dsonar.branch.name=${BRANCH_NAME}"
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

		stage('Build-Server') {
		    if (env.BRANCH_NAME == 'master') {
                bat 'cd server-packages && del /f ormconfig.json'
                bat 'cd server-packages && copy ormconfig.prod.json ormconfig.json'
            } else if (env.BRANCH_NAME == 'develop') {
                bat 'cd server-packages && del /f ormconfig.json'
                bat 'cd server-packages && copy ormconfig.dev.json ormconfig.json'
            }
			bat 'cd Build-stuff && npm i'
			bat 'cd Build-stuff && grunt'
		}

        stage('Deploy') {
            if (env.BRANCH_NAME == 'master') {
                bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\master\\server-files'
                bat 'cd server-packages && npm run sync_schema'
            } else if (env.BRANCH_NAME == 'develop') {
                bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\develop\\server-files'
                bat 'cd server-packages && npm run sync_schema'
            }
        }

        stage('Artifacts Client') {
            archiveArtifacts artifacts: 'Build-stuff/dist/client_packages/**/*', fingerprint: true
        }
    }
}
