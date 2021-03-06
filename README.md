# flux-filter

[![Build Status](https://travis-ci.org/Florianblt/flux-filter-back.svg?branch=master)](https://travis-ci.org/Florianblt/flux-filter-back)

## Description

Back-end for Flux-filter app in Node.js

## Installation

```bash
$ docker-compose up -d
$ yarn install
```

Before starting the server, it will be necessary to create a **.env** file using the example file **example.env**.

## Running the app

```bash
# development

$ yarn run start



# watch mode

$ yarn run start:dev
```

## Using the app
A swagger is installed at the following url: http://localhost:3000/v2/api/docs

## Create the first admin user

After creating an user with http://localhost:3000/v2/api/users/register, you can use the Adminer at http://localhost:8080/ to access and modify databases datas.
Just pass the user's role to 'Admin'.

## Test

```bash
# unit tests

$ yarn run test


# test coverage

$ yarn run test:cov
```
