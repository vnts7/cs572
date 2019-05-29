(async function () {
    const { resolve4 } = require('dns');
    const { promisify } = require('util');
    resolve4('www.mum.edu', function(e,r){
        console.log(e, r);
    })
    const resP = promisify(resolve4);
    try {
        const r = await resP('www.mum.edu');
        console.log(r);
    } catch (error) {
    
    }
})();
