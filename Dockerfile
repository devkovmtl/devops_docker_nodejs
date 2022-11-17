# Base image
FROM node:16-alpine
# set working directory of our container 
# to be /app in container
# every time we run a command it run from that dir
WORKDIR /app
# Copy package into img 
COPY package.json .
# Build time
RUN npm install
# copy evrything from our dir to /app container
COPY . .
# What port we need
EXPOSE 8888
# Run cmd at run time
CMD ["node", "index.js"]