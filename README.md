# Storefront Backend Project

## Table of Contents

* [Description](#Description)
* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)
## Description

This is a boilerplate Project for Typescript.
It features the use of **Typescript**, **Sequelize**, **PostgreSQL**, **Jasmine**, **Winston & Morgan**, **Joi**, and **Eslint**.

## Prerequisites
Your machine must have the following installed on it:
- [Node/NPM](https://nodejs.org/en/download/) (v16 or higher)

## Instructions

### 1. Install Dependencies
After Cloning the project, head inside the project folder and run
```
npm install
```

### 2. Initiate environment variables with sample varible *you may change it later*
you can rename provided file to .env
```sh
cp .env.example .env
```

Or initial data will be as follows
```
DB_HOST=localhost
DB_NAME=store_front
DB_TEST_NAME=store_front_test
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_KEY=Very_strong_Key
BCRYPT_PASSWORD=zoomi 
SALT_ROUNDS=10

```

### 3. Create and run docker container 
```sh
docker compose create
docker compose start
```
Now, replace .env with your credentials and then run
## 4 Database and migration

```sh
npm run migrate:up
```

database port 5432

### 7. Starting the project
```sh
npm start
```

### 8. Running the tests
```sh
npm test
```

Any by now you should be able to go to `localhost:3000` to test that everything is working as expected.
 