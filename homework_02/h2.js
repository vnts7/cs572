(function () {
  Array.prototype.pluck = function (isLargest) {
    return new Promise(resolve => {
      setTimeout(() => {
        let m = this[0];
        this.forEach(i => {
          if (isLargest) {
            if (i > m) m = i;
          }
          else {
            if (i < m) m = i;
          }
        });
        console.log(m);
        resolve(m);
      }, 0)
    })
  }
  console.log('start');
  [1,2,3,4,5,6,7,8].pluck(true);
  [1,2,3,4,5,6,7,8].pluck(false);
  console.log('end');
})();