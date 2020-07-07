pipeline {
  agent none
  
  stages {
    stage ('Build and test the project') {
      agent {
          docker {
            image 'node:10-alpine'
          }
      }

      stages {
        stage('Restore') {
          steps {
            sh 'npm install'
          }
        }

        stage('Build') {
          steps {
            sh 'npm run-script build --prod'
          }
        }

        /*stage('Test') {
          steps {
            sh 'npm run-script test'
          }
        }*/
      }
    }

    stage('Deploy') {
      agent { label 'master' }

      steps {
        sshagent (credentials: ['github-ssh-key-pipeline']) {
          sh 'ssh -o StrictHostKeyChecking=no -l jenkins paulrozhkin.ru uname -a'

          // Copy jar file
          sh 'scp -r ./dist/the-contract-system-web-client/* jenkins@paulrozhkin.ru:/var/www/the-contract-system/client'
        }
      }
    }

  }
}
