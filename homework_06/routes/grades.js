const express = require('express');
var bodyParser = require('body-parser');
const middleware = require('../middleware');

const r = express.Router();
const data = [
    { id: 1, name: 'Asaad', course: 'CS572', grade: 95 },
    { id: 2, name: 'Tai', course: 'CS572', grade: 95 },
    { id: 3, name: 'Tuy', course: 'CS572', grade: 95 },
    { id: 4, name: 'Handsome', course: 'CS572', grade: 95 },
];
r.get('/', function (req, res, next) {
    res.json({ data });
});
r.post('/', middleware.jsonvalidate(), function (req, res, next) {

    data.push(req.body);
    res.json({ ok: true, data: req.body });
});
r.delete('/:id', function (req, res, next) {
    const idx = data.findIndex(i => i.id === parseInt(req.params.id));
    console.log(idx);
    if (idx >= 0) {
        const i = data.splice(idx, 1);
        return res.json({ ok: true, data: i });
    }
    next('id not found')
});

module.exports = r;