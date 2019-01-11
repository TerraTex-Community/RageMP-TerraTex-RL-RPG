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

    }
}
