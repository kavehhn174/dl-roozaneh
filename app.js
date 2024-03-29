require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sequelize } = require("./postgres/postgres");

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:3000',
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
app.use(express.static('public'));
const port = process.env.PORT || 3000;

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



