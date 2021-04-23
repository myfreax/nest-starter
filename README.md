# nest-starter

Quickly start nest.js project for you

<p>
  <a href="https://circleci.com/gh/huangyanxiong01/nest-starter"><img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg"></a>
  <a href="https://github.com/huangyanxiong01/nest-starter/actions/workflows/test.yml"><img src="https://github.com/huangyanxiong01/nest-starter/actions/workflows/test.yml/badge.svg"></a>
  <a href="https://github.com/huangyanxiong01/nest-starter/actions/workflows/e2e.yml"><img src="https://github.com/huangyanxiong01/nest-starter/actions/workflows/e2e.yml/badge.svg"></a>
  <a href="https://app.codecov.io/gh/huangyanxiong01/nest-starter"><img class="notice-badge" src="https://codecov.io/gh/huangyanxiong01/nest-starter/branch/main/graphs/badge.svg?branch=main" alt="Badge"></a>
</p>

## Feature

- Auto validate with class-validator
- Adheres OpenAPI specification by swagger
- Authentication(JWT,Local)
- Authorization(Attribute-Based Access Control)
- Databases support(SQLite,MySQL,PostgreSQL power by Prisma)

## Status

In development

## Roadmap

Check out we [Roadmap](https://github.com/huangyanxiong01/nest-starter/projects/1)

## Installation

```bash
$ docker run -itd -p 5432:5432 -e POSTGRES_PASSWORD=randompassword --name postgres  postgres
$ yarn install
$ yarn db:migrate
$ yarn db:seed
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ npm start:dev

```

## License

nest-starter is [Apache-2.0 License](LICENSE).
