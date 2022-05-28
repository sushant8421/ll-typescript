# generate a docker file file for node:16 alpine image

FROM node:16-alpine3.15 
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm i -g typescript
COPY . .
RUN tsc
CMD ["node", "./build/server.js"]
