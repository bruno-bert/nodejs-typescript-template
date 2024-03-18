# Use the official MongoDB image from Docker Hub
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Optionally, you can specify a volume to persist MongoDB data outside the container
# VOLUME ["/data/db"]

# Optionally, you can provide a custom configuration file
# COPY mongod.conf /etc/mongod.conf

# Optionally, you can set environment variables for MongoDB configuration
# ENV MONGO_INITDB_ROOT_USERNAME=admin
# ENV MONGO_INITDB_ROOT_PASSWORD=password

# CMD instruction is not needed here as the default CMD of the mongo image
# already starts mongod in the background
