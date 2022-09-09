const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router/router.js');
app.use("/api", router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
