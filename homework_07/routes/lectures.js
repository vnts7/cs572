const express = require('express');
const { ObjectId, MongoClient } = require('mongodb');
// const client = new MongoClient('');
// client.db('').collection('').fin

const c = 'lectures';
const r = express.Router();
r.get('/', async function (req, res, next) {
    const data = await req.DB.collection(c).find({}).toArray();
    res.json({ ok: true, data });
});
r.post('/', express.json(), async function (req, res, next) {
    const data = await req.DB.collection('lectures').insertOne(req.body);
    res.json({ ok: true, data });
});
r.put('/', express.json(), async function (req, res, next) {
    const o = req.body;
    const data = await req.DB.collection('lectures').updateOne(
        { _id: ObjectId(o._id) },
        { $set: { course: o.course, lecture: o.lecture } });
    res.json({ ok: true, data });
});
r.delete('/:id', async function (req, res, next) {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return next('Invalid id');
    }
    const data = await req.DB.collection(c).deleteOne({ _id: ObjectId(id) });
    res.json({ ok: true, data });
});

r.get('/search/:q', async function (req, res, next) {
    const data = await req.DB.collection(c).find(
        { lecture: { $regex: String(req.params.q), $options: "i" } }
    ).toArray();
    res.json({ ok: true, data });
});

module.exports = r;