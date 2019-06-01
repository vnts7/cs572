function jsonvalidate() {
    return function (req, res, next) {
        // console.log(req._());
        let data = '';
        req
            .on('data', d => { data += d.toString(); })
            .on('end', () => {
                console.log(data);
                try {
                    req.body = JSON.parse(data);
                    next();
                } catch (error) {
                    next('Json body is not valid')
                }
            });
        // next();
    }
}
module.exports = jsonvalidate;