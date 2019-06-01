//----1.Depend
const express = require('express');
var fs = require('fs');
var morgan = require('morgan');
const cors = require('cors');

//----2.Init
const app = express();

//----3.setup----
//-----------4.middleware------------
app.use(morgan('combined', { stream: fs.createWriteStream('access.log', { flags: 'a' }) }));
app.use(cors());

//-----------5.routing---------------
app.use('/grades', require('./routes/grades'));

//-----------6.error handling--------
app.use((err, req, res, next) => {
    res.status(500).json({ err })
})

//----7.boot----
app.listen(3000,()=>console.log('Now listen on 3000...'));