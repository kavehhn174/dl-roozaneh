module.exports = (sequelize, DataTypes) => {
    return sequelize.define('season', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        work_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quality_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
