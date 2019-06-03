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
            DB = client.db('homework_07');
            req.DB = DB;
            console.log(DB);
        }
        next()
    } catch (error) {
        console.log(error)
    }

})

app.use('/lectures', require('./routes/lectures'));

//-----------6.error handling--------
app.use((err, req, res, next) => {
    res.status(500).json({ err })
})

//----7.boot----
app.listen(3000, () => console.log('Now listen on 3000...'));