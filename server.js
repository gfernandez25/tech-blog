const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

//middleware
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(bodyParser.json())

// app.use(require('connect').bodyParser());

const helpers = require('./utils/helpers'); //follow up to see if this is needed for project

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`API server now on port ${PORT}!`);
    });
});