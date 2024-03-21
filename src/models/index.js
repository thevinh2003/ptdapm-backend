import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import { pathToFileURL } from "url";
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename).substring(1);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import { sequelizeConfig } from "../configs/index.js";

const config = sequelizeConfig[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

(async () => {
  try {
    const files = fs.readdirSync(__dirname).filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    });

    for (const file of files) {
      const url = pathToFileURL(path.join(__dirname, file)).href;
      const model = (await import(url)).default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  } catch (error) {
    console.error("Error reading or importing files:", error);
    // Handle the error as needed
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
