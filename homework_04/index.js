const http = require('http');
const url = require('url');
const { fork } = require('child_process');
const { Subject } = require('rxjs');
const subject = new Subject();
subject.subscribe(v => {
    const { req, res } = v;
    const qs = url.parse(req.url, true).query;
    if (!qs.filename) {
        res.end();
        return;
    }
    fork('readfile.js')
        .on('message', msg => {
            if (msg.type === 'data') {
                console.log(msg.data);
                res.write(Buffer.from(msg.data));
            }
            else {
                res.end();
            }
        })
        .send(qs.filename);
})
http.createServer((req, res) => {
    subject.next({ req, res })
}).listen(4000, () => { console.log('Now listen on 4000'); })