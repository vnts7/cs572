const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://admin:tdc123@cluster0-jx7zn.mongodb.net/test?retryWrites=true&w=majority');
(async function () {
    await client.connect()
    const dbc = client.db('homework_07').collection('restaurants');
    // console.log(await dbc.findOne({}, { projection: { 'address.zipcode': 1 } }))

    console.log(await
        dbc.find({name:{$regex:'^Mad'}}).project({name:1, 'long': '$address.coord.0', 'address.coord':'lat'})
            // .project({ name: 1, 'address.coord': 1, district: 1, cuisine: 1, 'grades.score': 1 })
            // .limit(10)
            .toArray()
    )

    //1.
    dbc.find()
    //2.
    dbc.find().project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //3.
    dbc.find().project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1, _id: 0 })
    //4.
    dbc.find().project({ restaurant_id: 1, name: 1, district: 1, 'address.zipcode': 1, _id: 0 })
    //5.
    dbc.find({ district: 'Bronx' });
    //6.
    dbc.find({ district: 'Bronx' }).limit(5);
    //7.
    dbc.find({ district: 'Bronx' }).skip(5).limit(5);
    //8.
    dbc.find({ 'address.coord': { $elemMatch: { $lt: -95.754168 } } })
    //9.
    dbc.find({
        cuisine: { $ne: 'American' },
        'grades.score': { $gt: 70 },
        'address.coord': { $lt: -65.754168 }
    })
    //10.
    dbc.find({ name: { $regex: '^Wil' } }).project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //11.
    dbc.find({ name: { $regex: 'ces$' } }).project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //12.
    dbc.find({ name: { $regex: 'Reg' } }).project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //13.
    dbc.find({ district: 'Bronx', cuisine: { $in: ['American', 'Chinese'] } })
    //14.
    dbc.find({ district: { $in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } }).project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //15.
    dbc.find({ district: { $not: { $in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } } }).project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //16.
    dbc.find({ 'grades.score': { $not: { $gt: 10 } } }).project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
    //17.
    dbc.find({ 'address.coord.1': { $gt: 42, $lte: 52 } }).project({ restaurant_id: 1, name: 1, address: 1 })
    //18.
    dbc.find().sort({ name: 1 })
    //19.
    dbc.find().sort({ name: -1 })
    //20.
    dbc.find().sort({ cuisine: 1, district: -1 })
    //21

    //22
    dbc.find({name:{$regex:'^Mad'}}).project({name:1, 'address.coord.0':'long', 'address.coord.1':'lat'})
    client.close();
})()