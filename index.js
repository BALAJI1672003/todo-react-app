const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('db is connected'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
app.use('/api/routes',require('./routes/todo-routes'));
app.listen(port,()=>
{
    console.log('The server is running');
})