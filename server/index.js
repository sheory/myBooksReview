const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
  port:process.env.DB_PORT,
  multipleStatements : true
})
db.connect((err) => {
  if(!err) {
    console.log('Connected!');
  } else {
    console.log('Failed' + err);
  }
})


app.post('/add', (req,res) => {
  console.log(req.body);
  const title = req.body.title; //getting information from the front
  const author = req.body.author;
  const release_year = req.body.release_year;
  const evaluation = req.body.evaluation;

  db.query('INSERT INTO book (title, author, release_year, evaluation) VALUES (?, ?, ?, ?)',
     [title, author, release_year, evaluation],
     (err, result) => {
      if(err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
     }
  );
})

app.get('/books', (req, res) => {
  db.query("SELECT * FROM book", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.put('/update', (req, res) => {
  const id = req.body.id;
  const evaluation = req.body.evaluation;
  db.query("UPDATE book SET evaluation = ? WHERE id = ?", [evaluation, id], (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM book WHERE id = ?", id, (err, result) => {
   if(err) {
     console.log(err);
   } else {
     res.send(result)
   }
  });
});

const port = process.env.PORT || 3000;

app.listen(3001 , () => {
  console.log(`Server running on ${port}`);
});

