module.exports = (sequelize, Sequelize) => {
  const task = sequelize.define("ms_task", {
    task_name: {
      type: Sequelize.STRING
    },
    deadline: {
      type: Sequelize.STRING
    }
  });

  return task;
};