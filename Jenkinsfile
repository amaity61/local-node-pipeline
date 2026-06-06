pipeline {
    agent any

    environment {
        // Define local container and image names
        IMAGE_NAME = "local-node-app"
        CONTAINER_NAME = "node-app-container"
        PORT_MAPPING = "3000:3000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls local files (useful for fully local setups)
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Stop Existing Container') {
            steps {
                echo 'Cleaning up old containers...'
                script {
                    // Stop and remove the container if it already exists to prevent naming conflicts
                    try {
                        sh "docker stop ${CONTAINER_NAME}"
                        sh "docker rm ${CONTAINER_NAME}"
                    } catch (Exception e) {
                        echo "No active container found named ${CONTAINER_NAME}. Proceeding..."
                    }
                }
            }
        }

        stage('Deploy Local Container') {
            steps {
                echo 'Running new Docker container...'
                // Run the container detached (-d) mapping local port 3000
                sh "docker run -d -p ${PORT_MAPPING} --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
            }
        }
    }
    
    post {
        success {
            echo "Application successfully deployed locally! Visit http://localhost:3000"
        }
        failure {
            echo "Pipeline failed. Check Jenkins console logs for details."
        }
    }
}