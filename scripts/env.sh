#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ -z $CODEBUILD_CI ]
then
  export GIT_BRANCH=$(git status|head -n 1|cut -d ' ' -f3)
fi

export REACT_APP_CLOUDFRONT_URL=$(aws cloudformation describe-stacks --stack-name epsilon-development-092347820172-us-east-1-app --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionUrl`].OutputValue | [0]' --output text)
export ASPAN_AWS_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
export ASPAN_ENV_NAME=$PROJECT-$GIT_BRANCH-$ASPAN_AWS_ACCOUNT-$AWS_DEFAULT_REGION
export STACK_NAME=$ASPAN_ENV_NAME-webapp
