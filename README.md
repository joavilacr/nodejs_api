# nodejs_api
Nodejs Api for encrypt and decrypt 

## Requirements:
 - Docker
 - Git

## How to Deploy it
 1. `mkdir /dir/to/clone/this/repo`
 2. `cd /dir/to/clone/this/repo`
 3. `git clone https://github.com/joavilacr/nodejs_api.git`
 4. Open a console (Make sure you have docker running)
 5. `docker build -t joseavila/nodejs_app .`
 6. `docker run --name encry-decry -p 8089:8080 -d joseavila/nodejs_app`
 7. `docker ps`
 8. `docker logs encry-decry`


