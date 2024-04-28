require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sequelize } = require("./postgres/postgres");
const qualityRoutes = require('./router/qualityRouter')
const workRoutes = require('./router/workRouter')
const linkRoutes = require('./router/linkRouter')
const tagRoutes = require('./router/tagRouter')
const adminRoutes = require('./router/adminRouter')

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://dlrozaneh.liara.run'
        ],
        credentials: true,
    })
);


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('views/public'));
const port = process.env.PORT || 3000;

app.use('/api/link', linkRoutes)
app.use('/api/work', workRoutes)
app.use('/api/tag', tagRoutes)
app.use('/api/quality', qualityRoutes)
app.use('/admin', adminRoutes)

app.use(function (req, res) {
    res.status(404).send('<h1>404 Not Found</h1>');
});


try {
    sequelize.authenticate().then(function () {
        app.listen(port, function () {
            console.log('Server Started On Port ' + port + ' & Connected To DB');
        });
    });

} catch (error) {
    console.error("Unable to connect to the database:", error);
}



