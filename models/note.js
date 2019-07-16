module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    text: DataTypes.STRING,
  });

  Note.associate = function(models){
    Note.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Note;
};
