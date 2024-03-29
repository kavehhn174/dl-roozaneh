module.exports = (sequelize, DataTypes) => {
    return sequelize.define('genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
