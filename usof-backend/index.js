const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router/router.js');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.use('/avatars', express.static(`${path.resolve()}/avatars`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

