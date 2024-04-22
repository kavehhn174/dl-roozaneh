const { Sequelize, DataTypes } = require('sequelize');
const db = {};

let sequelize;

sequelize = new Sequelize('postgresql://root:kdoJN4hmkwpUl1xPTOinPOcc@kamet.liara.cloud:33448/postgres', {
    logging: false,});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tag = require('../model/tag')(sequelize, DataTypes);
db.work = require('../model/work')(sequelize, DataTypes);
db.season = require('../model/season')(sequelize, DataTypes);
db.quality = require('../model/quality')(sequelize, DataTypes);
db.link = require('../model/link')(sequelize, DataTypes);
db.genre = require('../model/genre')(sequelize, DataTypes);
db.country = require('../model/country')(sequelize, DataTypes);
db.comment = require('../model/comment')(sequelize, DataTypes);

// Many to Many ( Work - Tag )
db.tag.belongsToMany(db.work,{through: 'workTag'})
db.work.belongsToMany(db.tag,{through:  'workTag'})

// Many to Many ( Work - Genre )
db.work.belongsToMany(db.genre, {through: 'workGenre'})
db.genre.belongsToMany(db.work, {through: 'workGenre'})

// Many to Many ( Work - Country )
db.work.belongsToMany(db.country, {through: 'workCountry'})
db.country.belongsToMany(db.work, {through: 'workCountry'})

// One to Many ( Work - Comment )
db.work.hasMany(db.comment, { foreignKey: 'work_id'})
db.comment.belongsTo(db.work)

// One to Many ( Work - Season )
db.work.hasMany(db.season, {foreignKey: 'work_id'})
db.season.belongsTo(db.work)

// One to Many ( Season - Link )
db.season.hasMany(db.link, {foreignKey: 'season_id'})
db.link.belongsTo(db.season)

// One to One ( Season - Quality )
db.quality.hasMany(db.season, {foreignKey: 'quality_id'})
db.season.belongsTo(db.quality)

db.sequelize.sync({ force: false }).then(() => {
    console.log('re-sync done!');
});

module.exports = db;
