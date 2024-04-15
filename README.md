# Northcoders News API

Packages used:

- node-postgres: Non-blocking PostgreSQL client for Node.js. Used to store data for this project in relational data model paradigm
  Install: npm install pg

- node-pg-format: Implementation of PostgreSQL format() for Node.js. Used for escaping SQL literals and identifiers which in turn prevents SQL injection attacks.
  Install: npm install pg-format

- node-dotenv: Allows loading environment vaariables from .env files, used for setting PGDATABASE variable to correct database depending on testing/ development
  Install: npm install dotenv --save

.ENV Setup:

- This project requires 2 .env files to be created: .env.test and .env.development.
- Add "
- The .env.test should set the PGDATABASE to your test database and the .env.development should be set to your development database.
