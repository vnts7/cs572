const path = require('path');
const fs = require('fs');
process.on('message', filename => {
    if (!fs.existsSync(filename)) {
        process.send('File not found!');
    }
    else {
        fs.createReadStream(filename, { highWaterMark: 10 })
            .on('data', chunk => {
                console.log(chunk.toString());
                process.send({ type: 'data', data: chunk });
            })
            .on('end', () => {
                process.send({ type: 'end' });
                process.exit(1);
            });
    }

})