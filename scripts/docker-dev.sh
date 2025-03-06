#!/bin/bash

# Build the Docker image
docker build -t chainsync:dev .

# Run the container
docker run -p 3000:3000 chainsync:dev 