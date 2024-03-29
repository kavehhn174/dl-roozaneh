module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quality', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
