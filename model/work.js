module.exports = (sequelize, DataTypes) => {
    const Work = sequelize.define('work', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        workType: {
            type: DataTypes.ENUM,
            values: ['Movie', 'Series']
        },
        visits: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        actors: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hasDub: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hasSub: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hasSoftSub: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        seasonsCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        episodes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Work;
};
