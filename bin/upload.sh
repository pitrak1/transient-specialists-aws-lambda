#! /bin/bash
if [ "$#" -ne 1 ]; then
  echo "Usage: ./bin/upload.sh <Function Name>"
  exit 1
fi

echo Zipping contents...
zip -r lambda.zip .

echo Deploying to function $1 ...
aws lambda update-function-code --function-name $1 --region us-west-2 --zip-file fileb://lambda.zip

echo Cleaning up...
rm lambda.zip