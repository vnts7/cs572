//mongodb+srv://admin:tdc123@cluster0-jx7zn.mongodb.net/test?retryWrites=true&w=majority
var express = require('express');
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://admin:tdc123@cluster0-jx7zn.mongodb.net/test?retryWrites=true&w=majority');
const app = express();
let DB = null;



app.use(async (req, res, next) => {
  try {
    if (DB) {
      req.DB = DB;
    } else {
      await client.connect();

      DB = client.db('homework_07').collection('places');
      DB.createIndex({ location: '2d' });
      DB.createIndex({ category: 1 });
      req.DB = DB;
    }
    next()
  } catch (error) {
    console.log(error)
  }

})

app.post('/places', express.json(), async (req, res) => {
  const data = await req.DB.insertOne(req.body);
  res.json(data);
});
app.get('/places/search', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const long = parseFloat(req.query.long);
  const cat = req.query.cat;
  const name = req.query.name;
  console.log(lat,long,cat)
  const filter = {
    location: { $near: [long, lat] },
    category: cat,
  }
  
  if (name) filter.name = name;
  const data = await req.DB
    .find(filter)
    .limit(3)
    .toArray();
  res.json({data});
});

app.get('/places', async (req, res) => {
  const data = await req.DB
    .find()
    .toArray();
  res.json(data);
});

//-----------6.error handling--------
app.use((err, req, res, next) => {
  res.status(500).json({ err })
})

//----7.boot----
app.listen(3000, () => console.log('Now listen on 3000...'));