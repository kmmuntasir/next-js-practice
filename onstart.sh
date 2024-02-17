#!/bin/bash

npm install --verbose && npx json-server db.json --port 9000 --watch && sleep infinity