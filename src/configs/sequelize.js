import dotenv from "dotenv";
dotenv.config();

export default {
    development: {
      "username": process.env.USERNAME_MYSQL,
      "password": process.env.PASSWORD_MYSQL,
      "database": process.env.DBNAME,
      "host": process.env.HOST,
      "port": process.env.PORT_DB,
      "dialect": "mysql",
      "timezone": "+07:00"
    },
    test: {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    production: {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  