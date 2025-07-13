pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = 'docker-hub-credentials'
        DOCKERHUB_USERNAME = 'vignesh342'
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/learnerreportcs-frontend:latest"
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/learnerreportcs-backend:latest"
    }

    stages {
        stage('Clone Repositories') {
            steps {
                echo "Cloning frontend and backend repositories..."
                sh 'rm -rf learnerReportCS_frontend learnerReportCS_backend'
                sh 'git clone https://github.com/Sadanki/learnerReportCS_frontend.git'
                sh 'git clone https://github.com/Sadanki/learnerReportCS_backend.git'

            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('learnerReportCS_frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('learnerReportCS_backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Docker Login and Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                        docker.image(FRONTEND_IMAGE).push()
                        docker.image(BACKEND_IMAGE).push()
                    }
                }
            }
        }

        stage('Helm Deploy to Kubernetes') {
            steps {
                dir('helm') {
                    sh '''
                    helm upgrade --install mern ./mern \
                      --set frontend.image=$FRONTEND_IMAGE \
                      --set backend.image=$BACKEND_IMAGE
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace"
            cleanWs()
        }
    }
}
