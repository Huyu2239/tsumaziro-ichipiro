#!/bin/bash

## if status is not 0, exit immediately
set -eu

# setup
PROJECT_DIR=$(dirname $(cd $(dirname $0); pwd))/e2e
cd "$PROJECT_DIR"

# check if puppeteer can be started
npm test -- check_puppeteer.ts
