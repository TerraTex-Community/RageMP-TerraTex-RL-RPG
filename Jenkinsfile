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
                bat 'del /f server-packages/ormconfig.json'
                bat 'copy server-packages/ormconfig.prod.json server-packages/ormconfig.json'
                bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\master\\server-files'
                bat 'cd server-packages && npm run sync_schema'
            } else if (env.BRANCH_NAME == 'develop') {
                bat 'del /f server-packages/ormconfig.json'
                bat 'copy server-packages/ormconfig.dev.json server-packages/ormconfig.json'
                bat 'cd Build-stuff && grunt deploy --path=D:\\TerraTex\\Spiele\\TerraTex-RageMP-V2\\develop\\server-files'
                bat 'cd server-packages && npm run sync_schema'
            }
        }

    }
}
