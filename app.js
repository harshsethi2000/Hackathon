const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
var cors = require('cors')

const envFile = require('dotenv');
envFile.config();

const config = require('./config/config');
const routes = require('./routes/router');
const db = require('./config/db');
const errorHandler = require('./controllers/ErrorController');



var app = express();
app.use(cors())


/*  -------------------------------- swagger config start------------------------------------  */

const swaggerDefinition = {
    info: {
        title: 'Test Development',
        version: '1.0.0',
        description: 'Backend APIs based on Node/Express',
    },
    host: process.env.SWAGGER_HOSTNAME,
    basePath: '/',
};

const options = {
    swaggerDefinition: swaggerDefinition,
    explorer: true,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/*  -------------------------------- swagger config end------------------------------------  */



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    res.send("{message:'Welcome to my site'}");
});

app.use('/api/v1/', routes);

app.use(errorHandler)

db.on('connected', () => console.log("Succesfully connected to database!!"));
app.listen(config.server.port, () => { console.log("Server started and listening on port:", config.server.port) });

