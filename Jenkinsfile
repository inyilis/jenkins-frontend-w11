def dockerhub = 'inyilis/jfrontend'
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder 

pipeline {

    agent any

    parameters {
        string(name: 'DOCKERHUB', defaultValue: "${image_name}", description: 'by Inyilis Punya')
        booleanParam(name: 'DELIMAGE', defaultValue: 'false', description: 'Delete image')
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Testing image')
        choice(name: 'DEPLOY', choices: ['yes', 'no'], description: 'Build pakai param')
    }

    stages {
        stage("Install dependencies")  {
            steps {
                nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Remove docker image")  {
            when {
                expression {
                    params.DELIMAGE
                }
            }
            steps {
                script {
                    sh "sudo docker rmi -f ${image_name}"
                }
            }
        }
        stage("Build docker image")  {
            steps {
                script {
                    builder = docker.build("--no-cache ${image_name}") 
                }
            }
        }
        stage("Testing image")  {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builder.inside {
                        sh 'echo passed'
                    }
                }
            }
        }
        stage("Push image")  {
            steps {
                script {
                    builder.push()
                }
            }
        }
        stage("Deploy")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    if(BRANCH_NAME == 'master'){
                        sshPublisher (
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'DevAja',
                                    verbose: true,
                                    transfers: [
                                        sshTransfer(
                                            sourceFiles: 'test.txt',
                                            execCommand: "cd /home/devaja/app; docker-compose up -d",
                                            execTimeout: 1200000
                                        )
                                    ] 
                                )
                            ]
                        )
                    }
                    if(BRANCH_NAME == 'main'){
                        sshPublisher (
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'ProdAja',
                                    verbose: true,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: "cd /home/prodaja/app; docker-compose up -d",
                                            execTimeout: 1200000
                                        )
                                    ] 
                                )
                            ]
                        )
                    }
                }
            }
        }
    }
}