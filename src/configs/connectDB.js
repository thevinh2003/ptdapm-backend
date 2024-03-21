import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.USERNAME_MYSQL,
  process.env.PASSWORD_MYSQL,
  {
    host: process.env.HOST,
    dialect: "mysql",
    port: +process.env.PORT_DB,
    logging: false,
    timezone: "+07:00",
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
