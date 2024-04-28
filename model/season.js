module.exports = (sequelize, DataTypes) => {
    return sequelize.define('season', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
