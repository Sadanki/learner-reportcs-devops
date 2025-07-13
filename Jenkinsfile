pipeline {
    agent any

    environment {
        // Docker Hub credentials ID saved in Jenkins Credentials (username/password)
        DOCKER_CREDENTIALS = 'docker-hub-credentials'  
        DOCKERHUB_USERNAME = 'vignesh342'
        
        // Docker image names with tags
        FRONTEND_IMAGE = "vignesh342/learnerreportcs_frontend:latest"
        BACKEND_IMAGE = "vignesh342/learnerreportcs_backend:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Cloning frontend and backend repos"
                // Clone both repos
                sh 'git clone https://github.com/UnpredictablePrashant/learnerReportCS_frontend.git'
                sh 'git clone https://github.com/UnpredictablePrashant/learnerReportCS_backend.git'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('learnerReportCS_frontend') {
                    echo "Building frontend Docker image"
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('learnerReportCS_backend') {
                    echo "Building backend Docker image"
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Docker Login & Push Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "$DOCKER_CREDENTIALS") {
                        echo "Pushing frontend image"
                        docker.image("$FRONTEND_IMAGE").push()
                        echo "Pushing backend image"
                        docker.image("$BACKEND_IMAGE").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes with Helm') {
            steps {
                echo "Deploying with Helm charts"
                // Assuming you have helm charts prepared in a folder named 'charts'
                sh 'helm upgrade --install learnerapp ./charts --set frontend.image=$FRONTEND_IMAGE --set backend.image=$BACKEND_IMAGE'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Check logs!'
        }
    }
}
