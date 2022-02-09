# About

Oncare Service

Postman API documentation: 

## Installation

To clone the project:

```bash
https://github.com/Theshedman/oncare-service.git
```

`cd` into the `oncare-service` directory

```bash
cd oncare-service
```

create a `.env` file with actual values similar to the `.env.sample` file.

# Using Docker
Make sure that Docker is installed in your system.

Build the docker image by running this command:
```bash
docker build -t oncare-service .
```
After building the docker, you can run it by executing this command:
```bash
docker run \
  -e DB_USER="theshedman" \
  -e NODE_ENV="development" \
  -e PORT=9082 \
  -e DB_HOST="localhost" \
  -e DB_PORT=5432 \
  -e DB_NAME="postgres" \
  -e DB_PASSWORD= \
  -e REDIS_PORT=25061 \
  -e REDIS_HOST="lafia-redis-do-user-3558509-0.b.db.ondigitalocean.com" \
  -e REDIS_PASSWORD="7XhTaoZCkk9dw0LX" \
  -e REDIS_USERNAME="default" \
  -e JWT_SECRET="hasliehgaieshg" \
  -p 9082:9082 \
  oncare-service
````

install project dependencies
```
yarn install
```

compile Typescript files to Javascript (by continuously watching)
```bash
yarn tsc -w
```

open another terminal, and run the project
```bash
yarn start:dev
```

To run test
```bash
yarn test
```

## Knex.js Configuration

To make migrations
```bash
knex migrate:make <migration-name>
```

To run all migrations
```bash
knex migrate:latest
```

To create seeds

```bash
knex seed:make <seed-name>
```

To run seeds on database
```bash
knex seed:run
`````





