const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const auth = require('./routes/auth');
const user = require('./routes/user');
const movie = require('./routes/movie');
const library = require('./routes/library');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:4200",
  methods: ['PUT', 'POST', 'GET', 'DELETE']
}));

dotenv.config();

app.use(express.json())

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/movie", movie);
app.use("/api/library", library);

//BAZA DANYCH
mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log("DB OK")
).catch((err) =>{
  console.log(err);
})

//SERWER
const port = process.env.PORT || 3000;
app.listen (port, ()=>{
  console.log(`Server works on ${port} port!`);
})