pipeline {
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

    stage('Deploy') {
      steps {
        sh 'echo "deploy"'
      }
    }

  }
}
