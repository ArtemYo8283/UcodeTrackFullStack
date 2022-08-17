const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/api/users", (req,res) => {
  const products = [
  {
    id: 1,
    name: "hammer"
  },
  {
    id: 2,
    name: "screwdriver"
  },
  {
    id: 3,
    name: "wrench"
  }
 ];

 res.json(products);
});

app.get("/api/posts", (req,res) => {

});

app.get("/api/categories", (req,res) => {

});

app.get("/api/comments", (req,res) => {

});

app.get("/api/comments", (req,res) => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
