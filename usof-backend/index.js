const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router/router.js');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

// app.use('/avatars', Express.static(`${path.resolve()}/avatars`));
// app.use('/picture-post', Express.static(`${path.resolve()}/picture-post`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

