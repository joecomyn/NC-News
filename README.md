# Northcoders News API

Link to hosted version: https://nc-final-project.onrender.com

Project summary:
A Backend built in the MVC style(mostly M and C) for a reddit-like forum website. Uses Node, Express and PostgreSQL for the main parts of the code, middleware/ http request handling and datbase management respectively. Usage and setup are detailed below but feel free to break it apart and play with it as you see fit C:

Installation and setup:
1- Clone this git repo down to an appropriate space on your machine using git clone <github-url>, replacing the <> and everything inbetween with the url of the github repo

2-Next set-up all the packages listed below, only use the packages under "dependancies" if you want to run it and play with the working app, for development and testing also install the "DevDependancies" packages.

Packages used:

-DevDependancies:

- jest: Simple Javascript testing framework
  Install: npm install --save-dev jest

- jest-extended: Adds additional matchers to jest to better test API requests
  Install: npm install --save-dev jest-extended

- supertest: Used for testing HTTP request assertions and API as a whole. Used in conjunction with Jest
  Install: npm install supertest --save-dev

-Dependancies:

- node-postgres: Non-blocking PostgreSQL client for Node.js. Used to store data for this project in relational data model paradigm
  Install: npm install pg

- node-pg-format: Implementation of PostgreSQL format() for Node.js. Used for escaping SQL literals and identifiers which in turn prevents SQL injection attacks.
  Install: npm install pg-format

- node-dotenv: Allows loading environment vaariables from .env files, used for setting PGDATABASE variable to correct database depending on testing/ development
  Install: npm install dotenv --save

- express: Web framework for node allowing handling of HTTP method requests
  Install: npm install express

.ENV Setup:
Depending on intended use of this project different .env files will need to be created in your root directory be-nc-news. If only used locally without testing in mind .env.development is needed. If Testing aswell you will need .env.test aswell. If wanting to host the backend, a final .env.production is required aswell, refer to the below as a quick reference and below that is setup for each .env file.

Trying out app no testing: .env.development
development and testing: .env.development and .env.test
production/ hosting: .env.production and .env.development
production/ hosting with local testing: .env.production, .env.test and .env.development

.env.development:
PGDATABASE=nc_news
.env.test:
PGDATABASE=nc_news_test
.env.production:
DATABASE_URL=<url of hosted sql database>

Seeding local database:
-Seeding development data: In your package.json you should have under the "scripts": {} section a "setup-dbs" and "seed" script. These are the scripts we will use to setup our development database.

1-type and run "npm run setup-dbs" in your terminal to create the postgres databases

2-type and run "npm run seed" without quotations in your terminal to seed data into your development database from premade data in the ./db/data/development-data folder

3-Check everything is correctly seeded by running psql in your terminal using \c nc_news then \dt to check all tables have been made: you can further check all data has been correctly inputted running "SELECT \* FROM table_name"; swapping out table_name with all the names listed from the \dt
