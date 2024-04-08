module.exports = (sequelize, DataTypes) => {
    return sequelize.define('link', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        episode_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        season_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
