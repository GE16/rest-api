module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("ms_user", {
    user_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
  });

  return user;
};