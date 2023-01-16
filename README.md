## Setup the project
First of all you should create a database on Postgresql DBMS
<br>
Then you must create a file in the root level of the project by the name of `.env` and add this configurations.

```bash
PG_URI=postgres://username:password@localhost:5432/dbname
APP_URL="http://localhost:3000"
NEXT_API_URL = 'http://127.0.0.1:3000/api'
NEXTAUTH_SECRET=9M6UrixMaGqpu+BFLTPoqL1uiOJgJen5
JWT_MAX_AGE=2592000
```

<br>
You should run this command to install dependencies.

```bash
npm install
or
yarn
```
<br>
Then to have data in database we must migrate the tables and seed fake data run this commands.

```bash
npm run migrate:up
npm run migrate:latest
npm run seed:run
or
yarn migrate:up 
yarn migrate:latest 
yarn seed:run 
```






## Example app using Knex

[Knex](https://knexjs.org/) is a SQL query builder that works with a variety of SQL databases including Postgres and MySQL. This example shows you how to use Knex with Next.js to connect and query a Postgres database. The same code can also connect to all other databases supported by Knex.


## Example app using Objection Js
Objection.js is an ORM (opens new window)for Node.js (opens new window)that aims to stay out of your way and make it as easy as possible to use the full power of SQL and the underlying database engine while still making the common stuff easy and enjoyable.

Even though ORM is the best commonly known acronym to describe objection, a more accurate description is to call it a relational query builder. You get all the benefits of an SQL query builder but also a powerful set of tools for working with relations.

Objection.js is built on an SQL query builder called knex (opens new window). All databases supported by knex are supported by objection.js. SQLite3, Postgres and MySQL are thoroughly tested (opens new window).

What objection.js gives you:

An easy declarative way of defining models and relationships between them
Simple and fun way to fetch, insert, update and delete objects using the full power of SQL
Powerful mechanisms for eager loading, inserting and upserting object graphs
Easy to use transactions
Official TypeScript (opens new window)support
Optional JSON schema validation
A way to store complex documents as single rows
What objection.js doesn't give you:

A custom query DSL. SQL is used as a query language. This doesn't mean you have to write SQL strings though. A query builder based on knex (opens new window)is used to build the SQL. However, if the query builder fails you for some reason, raw SQL strings can be easily written using the raw helper function.
Automatic database schema creation and migration from model definitions. For simple things it is useful that the database schema is automatically generated from the model definitions, but usually just gets in your way when doing anything non-trivial. Objection.js leaves the schema related things to you. knex has a great migration tool (opens new window)that we recommend for this job. Check out the example project (opens new window).
The best way to get started is to clone our example project (opens new window)and start playing with it. There's also a typescript version (opens new window)available.

Check out this issue (opens new window)to see who is using objection and what they think about it.




