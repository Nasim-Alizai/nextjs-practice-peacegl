## Setup the project






## Example app using Knex

[Knex](https://knexjs.org/) is a SQL query builder that works with a variety of SQL databases including Postgres and MySQL. This example shows you how to use Knex with Next.js to connect and query a Postgres database. The same code can also connect to all other databases supported by Knex.


## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-knex with-knex-app
# or
yarn create next-app --example with-knex with-knex-app
# or
pnpm create next-app --example with-knex with-knex-app
```

## Configuration

### Install dependencies

```bash
npm install
# or
yarn
```

### Set up a Postgres database

Set up a Postgres database locally or use a DBaaS provider such as AWS or Digital Ocean

### Configure environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (this will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set the `PG_URI` variable in `.env.local` to the connection uri of your postgres database.

### Apply migrations

You can create, apply and rollback migrations using the scripts in `package.json`. For now we will run the example migrations in the `knex/migrations` folder, which will add some Todos to the database.

```bash
npm run migrate:latest
# or
yarn migrate:latest
```

### Start Next.js in development mode

```bash
npm run dev
# or
yarn dev
```

Your app should now be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You should now see a list of Todos that were fetched from the database via the API Route defined in `/pages/api/todos.js`.



