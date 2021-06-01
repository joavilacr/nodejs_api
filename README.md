# nodejs_api
Nodejs Api built with express.
This includes 3 APIs endpoints:
1. `/api/encrypt` -> To encrypt text within a JSON file.
2. `/api/decrypt` -> To decrypt text already encrypted in the JSON file.
3. `/api/health` -> To obtain containe's health.

## System requirements:
 - Git
 - Docker
 - Kubenetes (Helm installed)

## How to Deploy and Run in Docker container:
 1. `mkdir /dir/to/clone/this/repo`
 2. `cd /dir/to/clone/this/repo`
 3. `git clone https://github.com/joavilacr/nodejs_api.git`
 4. `cd nodejs_api`
 5. Open a console in the current dir (Make sure you have docker running)
 6. `docker build -t joseavila/nodejs_app .`
 7. `docker run --name encry-decry -p 8089:8080 -d joseavila/nodejs_app`
 8. `docker ps`
 9. `docker logs encry-decry`

## How to use the API running from Docker:
Once the Deploy in Docker has been completed, you can access the API from your web browser by going to:
1. `Home`: <http://localhost:8089/>
2. `Encrypt API`: <http://localhost:8089/api/encrypt>
3. `Decrypt API`: <http://localhost:8089/api/decrypt>
4. `Health API`: <http://localhost:8089/api/health>

**Note**: If you are running *Docker Toolbox for Windows*, remember the IP will be <http://192.168.99.100:8089> instead of <http://localhost:8089>.
This because Docker will run in a Linux VM VirtualBox.
