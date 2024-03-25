# NodeJs Typescript Template API

Repository: https://github.com/bruno-bert/nodejs-typescript-template.git

## What this repository has:

## Immediate NEXT STEPS

- [ ] automatically generate OpenApi Spec
- [ ] automatically generate OpenApi Documentation


### Project Setup
- Husky for Formatted Commit messages 
- Vitest for Unit Tests and Coverage - with In-Memory MongoDB
- Dockerfile to a MongoDB Server 
- [ ] Plop templates and actions to create other features

### Code
- Clean Architecture for a basid crud
- Unit tests for the basic crud
- Folders Structure based on Feature
- [ ] validations with zod
- [ ] Paging and Sorting endpoints
- [ ] NodeJS Prometheus Client Middleware for Monitoring
- [ ] OpenAPI specification automatically generated in /docs
- [ ] Middlewares for Security - SQL Injection Prevent
- [ ] Middlewares for Security - Json Thread
- [ ] Middlewares for Security - Prevent Ddos Attack
- [ ] Auth based on API Key
- [ ] Auth based on JWT Token
- [ ] Export to Excel endpoint
- [ ] Upload File to S3 endpoint
- [ ] Import from Excel endpoint
- [ ] Import from CSV endpoint
 

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

