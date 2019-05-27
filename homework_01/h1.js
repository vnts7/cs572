(async function () {
    Array.prototype.removeNum = function (num) {
        return new Promise((resolve) => setTimeout(() => {
            const r = this.filter(i => i !== num);
            console.log(r);
            resolve(r);
        }));
    }
    console.log('Start');
    console.log([1, 3, 4, 2, 1, 5].removeNum(1));
    console.log('Finish');
})();
