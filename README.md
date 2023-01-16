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




