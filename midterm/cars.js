var express = require('express');
const { MongoClient } = require('mongodb');
const r = express.Router();

let dbc = null;


const client = new MongoClient('mongodb+srv://admin:tdc123@cluster0-jx7zn.mongodb.net/test?retryWrites=true&w=majority');
(async function () {
    await client.connect()
    dbc = client.db('homework_07').collection('cars');
})();
r.get('/', async (req, res) => {
    const data = await dbc.find({ status: 1 })
        .project({ brand: 1, type: 1, year: 1, status: 1, rate_per_day: 1 })
        .toArray();
    res.json({ data });
});
r.post('/:id/reserve', async (req, res) => {
    const o = req.body;
    o.reservation_id = ObjectId();
    const car = await dbc.findOne({ _id: ObjectId(req.params.id) });
    o.start_mileage = car.rental_details.pop().end_mileage;

    await dbc.updateOne({ _id: ObjectId(req.params.id) }, { $push: { rental_details: o } })
    res.json({ success: 1, reservation_id: o.reservation_id })

});
r.patch('/:id/reserve/:reservation_id', (req, res) => {
    const car = await dbc.findOne({ _id: ObjectId(req.params.id) });
    const o = req.body;
    o.total_rent = o.number_of_days * car.rate_per_day;
    await dbc.updateOne(
        { _id: ObjectId(req.params.id), 'rental_details.reservation_id': ObjectId(req.params.reservation_id) },
        {
            $set: {
                'rental_details.$.number_of_days': o.number_of_days,
                'rental_details.$.end_mileage': o.end_mileage,
                'rental_details.$.total_rent': o.total_rent,
            }
        }
    );
    res.json({ success: 1, total_rent: o.total_rent });
});
r.delete('/cars/:id/reserve/:reservation_id', (req, res) => {
    await dbc.updateOne(
        { _id: ObjectId(req.params.id) },
        { $pull: { rental_details: { reservation_id: ObjectId(req.params.reservation_id) } } }
    )
    res.json({ success: 1 });
});