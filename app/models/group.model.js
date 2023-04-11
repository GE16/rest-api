module.exports = (sequelize, Sequelize) => {
  const group = sequelize.define("ms_group", {
    group_name: {
      type: Sequelize.STRING
    },
    group_description: {
      type: Sequelize.STRING
    }
  });

  return group;
};