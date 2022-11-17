# DevOPS Docker Nodejs

Build an image with a name:
`docker build -t node-app-image .`

Build a container from an image:
`docker run -p 8888:8888 -d --name node-app node-app-image`
-p traffic_from_outside_word:container_port

Delete a container:
`docker rm node-app -f`

Connect to our container
`docker exec -it node-app bash`
`docker exec -it 3d3b2e //bin//sh`
