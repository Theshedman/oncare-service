FROM node:14

RUN npm install -g -f yarn

RUN yarn global add knex

# Create App Directory
WORKDIR /home/oncare-service

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn tsc

EXPOSE 9082

CMD ["node", "dist/src/app/index.js"]
