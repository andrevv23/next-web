pipeline {
    agent any
    environment {
        PATH = "C:/Program Files/nodejs/;${env.PATH}"
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('install') {
            steps {
                bat 'npm install'
            }
        }
        stage('build') {
            steps {
                bat 'npm run build'
            }
        }
        // stage('test') {
        //     steps {
        //         bat 'npm run test'
        //     }
        // }
        stage('build image') {
            steps {
                bat 'docker build -t next-web:1.0 .'
            }
        }
        stage('docker push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    bat """
                        docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%
                        docker tag next-web:1.0 %DOCKERHUB_USERNAME%/next-web:1.0
                        docker push %DOCKERHUB_USERNAME%/next-web:1.0
                        docker logout
                    """
                }
            }
        }
    }
}