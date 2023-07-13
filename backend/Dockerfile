FROM node:alpine
WORKDIR /appS
COPY . . 
RUN npm install
RUN npx tsc
CMD [ "node", "./build/app.js" ]