import getUser from './User';
import getTaskStatus from './TaskStatus';
import getTag from './Tag';
import getTask from './Task';
import getTaskTag from './TaskTag';

export default (connect) => {
  const models = {
    User: getUser(connect),
    Task: getTask(connect),
    Tag: getTag(connect),
    TaskTag: getTaskTag(connect),
    TaskStatus: getTaskStatus(connect),
  };

  models.User.hasMany(models.Task, { foreignKey: 'creatorId', as: 'creator' });
  models.Task.belongsTo(models.User, { as: 'creator' });

  models.User.hasMany(models.Task, { foreignKey: 'assignedToId', as: 'assignedTo' });
  models.Task.belongsTo(models.User, { as: 'assignedTo' });

  models.TaskStatus.hasMany(models.Task, { foreignKey: 'statusId', as: 'status' });
  models.Task.belongsTo(models.TaskStatus, { as: 'status' });

  models.Tag.belongsToMany(models.Task, { through: models.TaskTag });
  models.Task.belongsToMany(models.Tag, { through: models.TaskTag });

  return models;
};
