require ('dotenv').config();

const express = require("express");  
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));


app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// imports file into one line:
require("./server/config/config.UserDatabase")
require("./server/config/config.database");
require("./server/routes/user.routes")(app)
require("./server/routes/routes.items")(app)