#!/usr/bin/env groovy



node {
	try {
		def mvnHome = tool 'M3'
		
	    stage ('Checkout') {
			checkout scm
			notifyBuild('STARTED')
	    }
	    stage ('Pre Build') {
	    	sh "${mvnHome}/bin/mvn install:install-file -Dfile=jars/ojdbc7.jar -DgroupId=com.oracle -DartifactId=ojdbc7 -Dversion=7 -Dpackaging=jar"
	    }
	    stage ('Build') {
		    	
	  		sh "${mvnHome}/bin/mvn clean package"
	  	}
	  	
		if (env.BRANCH_NAME == 'master') {
	  	
		  	stage ('Deploy to Production') {
				echo 'Deploying master to production'
				withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'prod', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'], [$class: 'StringBinding', credentialsId: 'prod-url', variable: 'URL' ]]) { 
	
				    sh "${mvnHome}/bin/mvn clean package -Dmaven.tomcat.url=${URL} -Dtomcat.username=${USERNAME} -Dtomcat.password=${PASSWORD} tomcat7:redeploy"
				}
				
		
		  	}
		}
	} catch(Exception e) {
		currentBuild.result = "FAILED"
		throw e
	} finally {
		notifyBuild(currentBuild.result)
	}
	
} 


def notifyBuild(String buildStatus) {
	//build status of null means successful
	buildStatus = buildStatus ?: 'SUCCESSFUL'
	
	
	// default values
	def commitAuthor = sh script: "git show -s --pretty=%an", returnStdout: true
	def message = "$buildStatus\n*Job:* ${env.JOB_NAME} [${env.BUILD_NUMBER}]\n*Job Link:* ${env.BUILD_URL}\n*Author:* $commitAuthor"
	def colorCode = '#FF0000'
	
    // Override default values based on build status
    if (buildStatus == 'STARTED') {
      colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESSFUL') {
      colorCode = '#00FF00'
    } else {
      colorCode = '#FF0000'
    }

	slackSend (color: colorCode, message: message)
		
}

