# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

| **Request** | **Endpoint**                   | **Descritption**           | **CURL**  |
|:-----------:|:------------------------------:|:--------------------------:|:---------:|
| get         | 127.0.0.1:3000/products/       | Index to list All products |           |
| get         | 127.0.0.1:3000/products/:id    | Get product by Id          |           |
| post        | 127.0.0.1:3000/products/add    | Add new product            | CURL No.2 |
| get         | 127.0.0.1:3000/users/          | Index to list All users    |           |
| post        | 127.0.0.1:3000/users/create    | Get user by Id             |           |
| get         | 127.0.0.1:3000/users/:id       | Add new user               | CURL No.1 |
| get         | 127.0.0.1:3000/orders/         | Index to list All orders   |           |
| post        | 127.0.0.1:3000/orders/create   | Get order by Id            | CURL No.3 |
| get         | 127.0.0.1:3000/orders/user/:id | Add new order              |           |

- Note: 
  -  All post curls are provided at the end of this document for easier test make sure to replace Bearer token

# Database Scheme

### Users Table 

| **coulmn ** | **type**     | **properties**              |
|:-----------:|:------------:|:---------------------------:|
| id          | bigint       | auto generated ,primary key |
| firstname   | varchar(255) | not null                    |
| lastname    | varchar(255) | not null                    |
| email       | varchar(255) | not null                    |
| created_at  | timestamp    | default timestamp           |

### Products Table 

| **coulmn ** | **type**     | **properties**              |
|:-----------:|:------------:|:---------------------------:|
| id          | bigint       | auto generated ,primary key |
| name        | varchar(255) | not null                    |
| price       | varchar(255) | not null                    |
| created_at  | timestamp    | default timestamp           |

### Orders Table 

| **coulmn ** | **type**  | **properties **                              |
|:-----------:|:---------:|:--------------------------------------------:|
| id          | bigint    | auto generated ,primary key                  |
| user_id     | bigint    | not null Forigen key refrences Users Table   |
| created_at  | timestamp | default timestamp                            |

#### Orders Products Table *Many to many Relationship*

| **coulmn ** | **type**  | **properties **                                 |
|:-----------:|:---------:|:-----------------------------------------------:|
| id          | bigint    | auto generated ,primary key                     |
| product_id  | bigint    | not null Forigen key refrences Products Table   |
| qty         | int       | not null                                        |
| order_id    | bigint    | not null Forigen key refrences Orders Table     |
| created_at  | timestamp | default timestamp                               |




## Products
- Index *Done* 127.0.0.1:3000/products/
- Show *Done* 127.0.0.1:3000/products/:id
- Create [token required] *Done* 127.0.0.1:3000/products/add
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

## Users
- Index [token required] *Done* 127.0.0.1:3000/users/
- Show [token required] *Done* 127.0.0.1:3000/users/:id
- Create N[token required]*Done* 127.0.0.1:3000/users/add

## Orders
- Current Order by user (args: user id)[token required] *Done* 127.0.0.1:3000/orders/create
- [OPTIONAL] Completed Orders by user (args: user id)[token required] *Done* 127.0.0.1:3000/orders/user/:id

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

CREATE TABLE IF NOT EXISTS  products(
"id" SERIAL , 
"name" VARCHAR(150) NOT NULL,  
"price" INT NOT NULL DEFAULT(0) , 
"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY("id")
);
#### User
- id
- firstName
- lastName
- password

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL,
  "firstname" VARCHAR(255) NOT NULL,
  "lastname" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);





#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TABLE IF NOT EXISTS  orders(
"id" SERIAL ,
"user_id" BIGINT REFERENCES users(id) ON DELETE CASCADE,  
"status" boolean DEFAULT FALSE,
"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY("id")
);


CREATE TABLE IF NOT EXISTS  orders_products(
"id" SERIAL , 
"product_id" BIGINT REFERENCES products(id) ON DELETE CASCADE,  
"qty" INT NOT NULL DEFAULT(1) , 
"order_id" BIGINT REFERENCES orders(id) ON DELETE CASCADE,  
"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY("id")
);



## Curls 


### Curl No.1 

```
curl --location --request POST 'http://127.0.0.1:3000/users/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUB0ZXN0LmNvbSIsImlhdCI6MTY2ODI2NDgxN30.zRouMqVD26qh28NyI6XS_aX3rZJuOiJ4IZdP6pNwtUg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstname": "Man",
    "lastname":"The mens",
    "email":"user@user.com",
    "password": "12345678"
}'

```


### Curl No.2 

```
curl --location --request POST 'http://127.0.0.1:3000/products/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNzc3NldDFAdGVzdC5jb20iLCJpYXQiOjE2Njg1MzIxODR9.Nz3A6lDwLv8jbub248YACzSxBBv0ZK_11M3i-1S5e9g' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "watch",
    "price":85
}'

```

### Curl No.3 

```
curl --location --request POST 'http://127.0.0.1:3000/orders/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNzc3NldDFAdGVzdC5jb20iLCJpYXQiOjE2Njg1MzIxODR9.Nz3A6lDwLv8jbub248YACzSxBBv0ZK_11M3i-1S5e9g' \
--header 'Content-Type: application/json' \
--data-raw '{
    "product_id": 1,
    "qty":5,
    "user_id":1
}'

```
