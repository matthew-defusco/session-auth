# node-auth

## curl

### Register

#### Good Register Request

```sh
curl -v -X POST localhost:3000/register -H 'Content-Type: application/json' \
  -d '{"email": "matthew.defusco@gmail.com", "name": "Matthew", "password": "Secret12", "passwordConfirmation": "Secret12"}'
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
