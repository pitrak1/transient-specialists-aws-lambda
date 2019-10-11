#! /bin/bash
echo Zipping contents...
cd src
npm install
zip -r lambda.zip .

echo Deploying to getEquipment...
aws lambda update-function-code --function-name getEquipment --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to getOems...
aws lambda update-function-code --function-name getOems --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to getModels...
aws lambda update-function-code --function-name getModels --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to getTypes...
aws lambda update-function-code --function-name getTypes --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to postEquipment...
aws lambda update-function-code --function-name postEquipment --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to postOems...
aws lambda update-function-code --function-name postOems --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to postModels...
aws lambda update-function-code --function-name postModels --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to postTypes...
aws lambda update-function-code --function-name postTypes --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to postEvents...
aws lambda update-function-code --function-name postEvents --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to deleteEquipment...
aws lambda update-function-code --function-name deleteEquipment --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to deleteOems...
aws lambda update-function-code --function-name deleteOems --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to deleteModels...
aws lambda update-function-code --function-name deleteModels --region us-west-2 --zip-file fileb://lambda.zip

echo Deploying to deleteTypes...
aws lambda update-function-code --function-name deleteTypes --region us-west-2 --zip-file fileb://lambda.zip

echo Cleaning up...
rm lambda.zip
cd ..