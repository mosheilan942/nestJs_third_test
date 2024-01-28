#!/bin/bash
# Start Redis
sudo service redis-server start

# Stop Redis
sudo service redis-server stop


# Start MongoDB
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod


# Start PostgreSQL
sudo service postgresql start

# Stop PostgreSQL
sudo systemctl stop postgresql

echo "All services started!"

