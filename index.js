const express = require("express");
const dotenv = require("dotenv");
const app = express();
//Import endpoints (Routes - Router)
const routes = require('./endpoints/routes.js');
//Middlewares
//Const bodyParser = require('body-parser');

dotenv.config(); //searchs .env file

//Middlewares (BodyParser)
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Endpoints
app.use("/api", routes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});