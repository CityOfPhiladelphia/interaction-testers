#!/bin/bash

set -e

echo 'Installing AWS CLI'
cd
wget https://s3.amazonaws.com/aws-cli/awscli-bundle.zip
unzip awscli-bundle.zip
./awscli-bundle/install -b ~/bin/aws
export PATH=~/bin:$PATH
cd -

echo 'Install Joia'
curl https://raw.githubusercontent.com/CityOfPhiladelphia/joia/8bee482a5414a8a7c3013dd27600f80558e34411/joia > ~/bin/joia
chmod 755 ~/bin/joia

echo 'Configuring AWS CLI'
mkdir -p ~/.aws
cat > ~/.aws/config <<EOF
[default]
aws_access_key_id = $AWS_ID
aws_secret_access_key = $AWS_SECRET
output = text
region = us-east-1
EOF

echo 'Setting up SSH access'
openssl aes-256-cbc -K $encrypted_2a29826175cc_key -iv $encrypted_2a29826175cc_iv -in .travis/philagov2.pem.enc -out ~/.ssh/philagov2.pem -d
chmod 400 ~/.ssh/philagov2.pem

joia host
joia push > /dev/null
joia deploy
