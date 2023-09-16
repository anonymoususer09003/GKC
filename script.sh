#!/bin/bash
#cd /var/www/html/gkcabc-webapp-4ddbbc061b2a
#sudo systemd-run --scope -p MemoryLimit=750M -p CPUQuota=80% npm install
#sudo systemd-run --scope -p MemoryLimit=750M -p CPUQuota=80% npm run build
sudo pm2 start all