import path from 'path'
import express from 'express';
import 'dotenv/config';
import Connection from './db/db.js';
import User from './model/user.js';

import { fileURLToPath } from 'url';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app=express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'./build')));

app.get(/^(?!\/api).+/,(req,res)=>{
  res.sendFile(path.join(__dirname, './build/index.html'));
})

Connection();



app.post('/',(req,res)=>{
    console.log(req.body);
})

app.post('/api/register',async(req,res)=>{
    const {name,rollNo}=req.body;

    try{
        const user=new User({name,rollNo});
        await user.save();
        res.status(201).json({msg:'user registered successfully'});
        console.log(res.json);
    }catch(error){
        console.log(error);
    }
})


app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      res.send(users);
    });
  });

  app.get('/api/items/count', async (req, res) => {
    const count = await User.countDocuments();
    res.send({ count });
  });


app.delete('/api/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err) => {
      res.send({ success: true });
    });
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('server is running on port'+PORT);
})


