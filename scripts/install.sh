#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo -E apt-get install -y git nginx nodejs

npm install

sudo npm install pm2 -g
sudo pm2 startup
cat ecosystem.json | envsubst | sudo tee /etc/pm2.json > /dev/null
sudo pm2 start /etc/pm2.json

sudo cp nginx.conf /etc/nginx/nginx.conf
sudo service nginx reload

sudo crontab - <<EOF
# Restart processes each night
20 3 * * * /usr/bin/pm2 reload all
EOF
