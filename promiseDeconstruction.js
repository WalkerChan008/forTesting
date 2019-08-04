function MyPromise (fn) {
    if(typeof fn !== 'function') {
        throw new Error('Promise resolver ' + fn + ' is not a function');
    }

    var self = this;
    self.status = 'Pending';
    self.data = undefined;

    function resolve (data) {
        if(self.status === 'Pending') {
            self.status = 'Fulfilled';
            self.data = data;
        }
    }

    function reject (err) {
        if(self.status === 'Pending') {
            self.status = 'Rejected';
            self.data = err;
        }
    }

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    var self = this

    if(self.status === 'Fulfilled') {
        onFulfilled(self.data);
    }

    if(self.status === 'Rejected') {
        onRejected(self.data);
    }
}
