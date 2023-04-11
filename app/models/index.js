const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.group = require("./group.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);

db.group.belongsToMany(db.user, {
  through: "user_group",
  as: "users",
  foreignKey: "group_id",
});
db.user.belongsToMany(db.group, {
  through: "user_group",
  as: "group",
  foreignKey: "tutorial_id",
});

db.user.hasMany(db.task, { as: "task" });
db.task.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;