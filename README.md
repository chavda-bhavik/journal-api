<div align="center">
  <h2>5-Minute-Journal Clone</h2>

  ### GraphQL API built in NodeJS for 5-Minute-Journal App
  
  ![journal-clone](https://user-images.githubusercontent.com/50201755/158015063-97cd6059-7920-4b48-98f1-55368db55f47.gif)

  <a href="https://journal-clone.herokuapp.com" target="_blank">Live demo</a> | <a href="https://github.com/chavda-bhavik/journal" target="_blank">Frontend Code</a>
</div>


## Running locally

### Setup
* Create postgress database named **journal** and **journal-test**
* Update database credentials in **ormconfig.js**

### Steps
- `git clone https://github.com/chavda-bhavik/journal-api`
- `yarn` (after navigating inside the directory)
- `yarn watch && yarn dev`
- `yarn test` (To run tests)

----

## About 5-Minute-Journal Clone

### Features
- Built on Typescript
- Tests written using **jest**
- Abstracted Database functions to easy the Development
- Linting and formatting with **eslint** and **prettier**

## Problems Face and Solved
- Writing Unit tests with Jest provided good learning

## Technologies 🤖
<ul>
  <li><a href="https://www.npmjs.com/package/apollo-server-express" target="_blank">Apllo-Server-Express</a>, <a href="https://expressjs.com" target="_blank">ExpressJS</a> To Develop API</li>
  <li><a href="https://typeorm.io" target="_blank">Typeorm</a> ORM to interect with Database</li>
  <li><a href="https://www.npmjs.com/package/graphql-upload" target="_blank">graphql-upload</a> To provide file upload facility</li>
  <li><a href="https://typegraphql.com" target="_blank">TypeGraphql</a> To build Graphql Schema from Classes</li>
  <li><a href="https://jestjs.io" target="_blank">JestJS</a> To wite Unit Test Cases</li>
</ul>

------------
