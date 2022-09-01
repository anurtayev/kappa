#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ -z $CODEBUILD_CI ]
then
  export GIT_BRANCH=$(git status|head -n 1|cut -d ' ' -f3)
  export REACT_APP_CLOUDFRONT_URL=$LOCAL_REACT_APP_CLOUDFRONT_URL
  export REACT_APP_COGNITO_POOL_ID=$LOCAL_REACT_APP_COGNITO_POOL_ID
  export REACT_APP_COGNITO_CLIENT_ID=$LOCAL_REACT_APP_COGNITO_CLIENT_ID
fi

export ASPAN_AWS_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
export ASPAN_ENV_NAME=$PROJECT-$GIT_BRANCH-$ASPAN_AWS_ACCOUNT-$AWS_DEFAULT_REGION
export STACK_NAME=$ASPAN_ENV_NAME-webapp
