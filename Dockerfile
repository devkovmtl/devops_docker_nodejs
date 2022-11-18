# Base image
FROM node:16-alpine
# set working directory of our container 
# to be /app in container
# every time we run a command it run from that dir
WORKDIR /app
# Copy package into img 
COPY package.json .
# Build time
# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV"="development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
# copy evrything from our dir to /app container
COPY . .
# 
ENV PORT 8888
# just for reference 
EXPOSE $PORT
# Run cmd at run time
CMD ["node", "index.js"]
# CMD ["npm", "run", "dev"]