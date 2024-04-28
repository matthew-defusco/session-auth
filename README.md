# node-auth

This project was created to figure out how session authentication works in a Node app using express-session.

Server side request body validation is done using Joi.

This project uses a Redis store to house the sessions and includes routes to:

- Register
- Log In
- Log Out

Additionally, the application is set up to destroy a session automatically after 6 hours regardless of user activity.

While this was written in TypeScript, there are likely ways to optimize type safety. The environment variable definition file was only used to get rid of errors.

## curl commands to test out functionality

### Register

#### Good Register Request

```sh
curl -v -X POST localhost:3000/register -H 'Content-Type: application/json' \
  -d '{"email": "new.user@gmail.com", "name": "Matthew", "password": "Secret12", "passwordConfirmation": "Secret12"}'
```

#### Bad Register Request

```sh
curl -X POST localhost:3000/register -H 'Content-Type: application/json' \
  -d '{"email": "matthew.defusco@gmail.com", "name": "Matthew", "password": "secret12"}'
```

#### Not Found Request

```sh
curl -X POST localhost:3000/unknown
```

### Login

#### Good Login Request

```sh
curl -v -X POST localhost:3000/login -H 'Content-Type: application/json' \
  -d '{"email": "matthew.defusco@gmail.com", "password": "Secret12"}'
```
