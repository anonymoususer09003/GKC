#!/bin/bash
sudo rm -rf /var/www/html/gkcabc-webapp-4ddbbc061b2a/node_modules/next
cd /var/www/html/gkcabc-webapp-4ddbbc061b2a && sudo npm install next@13.3.4 && sleep 10
#sudo systemd-run --scope -p MemoryLimit=750M -p CPUQuota=80% npm install
#sudo systemd-run --scope -p MemoryLimit=750M -p CPUQuota=80% npm run build
sudo pm2 start all