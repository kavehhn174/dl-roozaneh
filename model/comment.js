module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        work_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
