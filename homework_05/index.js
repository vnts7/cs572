const express = require('express');
const url = require('url');
const axios = require('axios');
const { from } = require('rxjs');
const { shareReplay } = require('rxjs/operators');

//-----------Init---------------
const app = express();
//-----------Setup--------------
app.set('x-powered-by', false);
app.set('strict routing', true);
app.set('case sensitive routing', true);
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'private');
    res.setHeader('Last-Modified', new Date());
    next();
});


function getData(page) {
    let observable = from(axios.get('https://randomuser.me/api/?results=10&inc=name&seed=tai&page=' + page))
        .pipe(
            shareReplay(1)
        );
    return observable;
}
/**
 * Routing
 */
app.get('/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const path = url.parse(req.url).pathname;
    var fullUrl = req.protocol + '://' + req.get('host') + path;
    const pages = [
        { page: 1, rel: 'first' },
        { page: page - 1 || 1, rel: 'prev' },
        { page: page + 1, rel: 'next' },
        { page: 1000, rel: 'last' }
    ];
    let link = '';
    pages.forEach(p => {
        link += `<${fullUrl}?page=${p.page}>; rel="${p.rel}",`;
    });
    res.setHeader('Link', link);
    getData(page)
        .subscribe(r => {
            res.json(r.data);
        });
});

app.listen(3000, () => console.log('Now listen on 3000...'));