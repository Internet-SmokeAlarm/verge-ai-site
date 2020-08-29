#!/usr/bin/env bash

# update_dependencies.sh
#
# Update NPM dependencies.
#
# Usage:
# ./update_dependencies.sh

echo "[*] Checking for outdated packages ..."
npm outdated

echo "[*] Installing safe upgrades ..."
npm update
echo "[*] Finished installing safe upgrades"

echo "[*] NOTE: In order to upgrade major versions, run: \"npx npm-check-updates -u && npm install\""
