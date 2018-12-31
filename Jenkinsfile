properties([gitLabConnection('terratex')])

gitlabCommitStatus {
    node('windows'){
        deleteDir()
        checkout scm

        /*stage('Sonar-Scanner') {
            if (env.BRANCH_NAME != 'master') {
                withSonarQubeEnv('TerraTex SonarQube') {
                }

                timeout(time: 1, unit: 'HOURS') {
                    def qg = waitForQualityGate()
                    if (qg.status != 'OK') {
                        error "Pipeline aborted due to quality gate failure: ${qg.status}"
                    }
                }
            }
        }*/

		stage('Build-Server') {
			bat 'cd Build-stuff && npm i'
			bat 'cd Build-stuff && grunt'
		}

        stage('Deploy') {
            if (env.BRANCH_NAME == 'master') {
                bat 'cd Build-stuff && grunt deploy --path=D:\TerraTex\Spiele\TerraTex-RageMP-V2\develop\server-files'
            // } else if (env.BRANCH_NAME == 'develop') {
            }
        }

    }
}
