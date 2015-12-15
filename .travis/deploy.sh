#!/bin/bash

echo 'Installing AWS CLI'
cd
wget https://s3.amazonaws.com/aws-cli/awscli-bundle.zip
unzip awscli-bundle.zip
./awscli-bundle/install -b ~/bin/aws
export PATH=~/bin:$PATH
cd -

echo 'Install Joia'
curl https://github.com/gsf/joia/blob/80eefed6d8bf94b84dccdb6f5262bff742df5f74/joia > ~/bin/joia
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

joia host
joia push
joia deploy
