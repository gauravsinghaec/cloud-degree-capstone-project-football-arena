## Build
FROM node:12-alpine AS development
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci
# Bundle app source
COPY . .
RUN npm run build
## Run 
FROM nginx:alpine
#COPY clients /usr/share/nginx/html
COPY --from=ionic  /app/clients /usr/share/nginx/html
