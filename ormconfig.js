const path = require('path');
module.exports = [
    {
      name: "development",
      type: "postgres",
        database: "journal",
        username: "power",
      password: "power",
      synchronize: true,
      logging: true,
      entities: ["dist/entities/*.js"],
      migrations: ["src/migration/*.ts"],
      subscribers: ["src/subscriber/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
      }
    },
    {
      name: "test",
      type: "postgres",
      database: "journal-test",
      username: "power",
      password: "power",
      synchronize: true,
      dropSchema: true,
      entities: [path.join(__dirname, "./src/entities/*.ts")]
    },
    {
      name: "production",
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
      logging: false,
      ssl:true,
      entities: ["dist/entities/*.js"],
      migrations: ["src/migration/*.ts"],
      subscribers: ["src/subscriber/*.ts"],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      cli: {
        entitiesDir: "dist/entity",
        migrationsDir: "dist/migration",
        subscribersDir: "dist/subscriber"
      }
    }
];