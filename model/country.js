module.exports = (sequelize, DataTypes) => {
    return sequelize.define('country', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
