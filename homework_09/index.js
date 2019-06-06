const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://admin:tdc123@cluster0-jx7zn.mongodb.net/test?retryWrites=true&w=majority');
(async function () {
    await client.connect()
    const dbc = client.db('homework_07').collection('zips');
    // console.log(await dbc.findOne({}, { projection: { 'address.zipcode': 1 } }))

    console.log(await
        dbc.aggregate([
            {
                $group: {
                    _id: { state: '$state', city: '$city' },
                    pop: { $sum: '$pop' }
                }
            },
            { $sort: { pop: -1 } },
            {
                $group:
                {
                    _id: '$_id.state',
                    city: { $first: '$_id.city' },
                    pop: { $first: '$pop' },
                }
            }
        ])
            // .project({ name: 1, 'address.coord': 1, district: 1, cuisine: 1, 'grades.score': 1 })
            // .limit(10)
            .toArray()
    )

    //1.
    dbc.aggregate([
        { $match: { state: 'WA' } },
        { $group: { _id: '$state', zipcodes: { $push: '$_id' } } }
    ])
    //2.
    dbc.aggregate([
        { $match: { pop: { $lt: 5000 } } }
    ])
    //3.
    dbc.aggregate([
        {
            $group: {
                _id: { state: '$state', city: '$city' },
                num_zip: { $sum: 1 }
            }
        },
        { $match: { num_zip: { $gt: 1 } } },
        { $project: { state: '$_id.state', city: '$_id.city' } },
        { $sort: { state: 1, city: 1 } }
    ])
    //4.
    dbc.aggregate([
        {
            $group: {
                _id: { state: '$state', city: '$city' },
                pop: { $sum: '$pop' }
            }
        },
        { $sort: { pop: 1 } },
        {
            $group:
            {
                _id: '$_id.state',
                city: { $first: '$_id.city' },
                pop: { $first: '$pop' },
            }
        }
    ])

    client.close();
})()