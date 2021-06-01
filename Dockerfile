FROM node:14
# Using node 14 (latest stable released version), it already includes express so no need to install

# Using user node instead of letting it use root
USER node

# Creating home dir for the user node and where the app will be placed
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Changes to dir and makes it as the working dir
WORKDIR /home/node/app

# A * is used to ensure both package.json AND package-lock.json are copied, to then install all dependencies
COPY --chown=node:node package*.json ./

# EXTRA -- bandaid for development only, it allows npm to install if you have installed zcaler proxy and it is affecting you (it is happening to me)
RUN npm config set registry http://registry.npmjs.org/  

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Exposing port 8080 by once the docker is up and running
EXPOSE 8080

# # Command to start the application
CMD [ "npm", "start" ]