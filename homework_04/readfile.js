const path = require('path');
const fs = require('fs');
process.on('message', filename => {
    if (!fs.existsSync(filename)) {
        process.send('File not found!');
    }
    else {
        const data = fs.readFileSync(filename).toString();
        console.log(data);
        process.send(data);
    }
    process.exit(1);
})