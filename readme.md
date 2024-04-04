# NodeJs Typescript Template API

Repository: https://github.com/bruno-bert/nodejs-typescript-template.git

## What this repository has:

### Project Setup
- Husky for Formatted Commit messages 
- EsLint and Prettier
- Vitest for Unit Tests and Coverage - with In-Memory MongoDB
- Dockerfile to a MongoDB Server 
- Docker Compose for Prometheus and Grafana
- Plop templates and actions to create other domain structures in clean code standards

### Code
- Clean Architecture for a Basid crud
- Pagination, Sorting and Complex Filter Endpoints
- Unit tests for services, controllers and infrastructure
- Export to Excel endpoint
- Export to CSV endpoint
- NodeJS Prometheus Client Middleware for Monitoring
- Prisma ORM in infrastructure layer 
- OpenAPI specification automatically generated in /docs


#### Code - Roadmap
- [ ] Validations with Zod
- [ ] Auth based on OAuth EntraId
- [ ] Auth based on OAuth PingId
- [ ] Auth based on API Key
- [ ] Auth based on JWT Token
- [ ] Upload File to S3 endpoint
- [ ] Import from Excel endpoint
- [ ] Import from CSV endpoint
- [ ] Middlewares for Security - SQL Injection Prevent
- [ ] Middlewares for Security - Json Thread
- [ ] Middlewares for Security - Prevent Ddos Attack

 

## Run MongoDB Database

```bash
cd mongo && docker-compose up
```

## Run Prometheus and Grafana

```bash
## in the project root folder
docker-compose up
```


 ## Troubleshotting
 
 ### Error on permissions in Docker commands: 
 
 https://phoenixnap.com/kb/docker-permission-denied

 ```bash
sudo groupadd -f docker
sudo usermod -aG docker $USER
newgrp docker
groups
sudo service docker restart
service docker status
 ```

 ```bash
sudo chown root:docker /var/run/docker.sock
sudo chown -R "$USER":"$USER" $HOME/.docker
sudo chmod -R g+rw "$HOME/.docker"
sudo service docker restart
service docker status
 ```

```bash
sudo nano /usr/lib/systemd/system/docker.service

## Append to the bottom of the [Service] section
SupplementaryGroups=docker    
ExecStartPost=/bin/chmod 666 /var/run/docker.sock
```



 ### Prometheus and Grafana

Use this repository as base
 https://github.com/docker/awesome-compose/tree/master/prometheus-grafana

