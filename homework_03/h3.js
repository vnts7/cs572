const fs = require('fs');
const path = require('path');
const http = require('http');
const size = 500 * 1024 * 3 * 3;
// const size = 400;
const bigFile = path.join(__dirname, 'bigfile.data');
function createBigFile() {
    const a = Buffer.from("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let largeBuffer =  Buffer.from("");
    const w = fs.createWriteStream(bigFile);
    for (let i = 0; i <= size; i++) {
        // largeBuffer = Buffer.concat([largeBuffer, a]);
        w.write(a);
    }
    w.end();
}
function server1() {
    const port = 4001;
    http.createServer(function (req, res) {
        const data = fs.readFileSync(bigFile);
        res.write(data);

        // res.write(port);
        res.end();
    }).listen(port, () => { console.log('Now listen on ' + port) })
}
function server2() {
    const port = 4002;
    http.createServer(function (req, res) {
        fs.readFile(bigFile, (err, data) => {
            res.write(data);
            res.end();
        });
        
    }).listen(port, () => { console.log('Now listen on ' + port) })
}
function server3() {
    const port = 4003;
    http.createServer(function (req, res) {

        const data = fs.createReadStream(bigFile);
        data.pipe(res);

        // res.write(port);
        // res.end();
    }).listen(port, () => { console.log('Now listen on ' + port) })
}
// server1();
server2();
// server3();
// createBigFile();