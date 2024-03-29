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
db.seasons = require('../model/season')(sequelize, DataTypes);
db.seasons = require('../model/season')(sequelize, DataTypes);

db.tag.belongsToMany(db.work,{through: 'workTag'})
db.work.belongsToMany(db.tag,{through:  'workTag'})


db.sequelize.sync({ force: false }).then(() => {
    console.log('re-sync done!');
});

module.exports = db;
