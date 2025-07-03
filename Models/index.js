const User = require('./User');
const Role = require('./Role');

// One Role → Many Users
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });
