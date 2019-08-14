// let promise1 = myPromise.resolve(12),
// 	promise2 = myPromise.reject(11)

// myPromise.race([promise1, promise2]).then(data => console.log(this.status, data), err => console.log(this.status, err))

function handlePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('circular reference'));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    handlePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }

    } else {
        resolve(x);
    }
}
class MyPromise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.successStore = [];
        this.failStore = [];
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'resolved';
                this.successStore.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.reason = reason;
                this.status = 'rejected';
                this.failStore.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        }
        let promise2; 
        if (this.status === 'resolved') {
            promise2 = new MyPromise((resolve, reject) => {
                setTimeout(() => { //异步处理
                    try {
                        let x = onFulfilled(this.value);
                        handlePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            })
        }
        if (this.status === 'rejected') {
            promise2 = new MyPromise((resolve, reject) => {
                setTimeout(() => { //异步处理
                    try {
                        let x = onRejected(this.reason);
                        handlePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            })
        }
        if (this.status === 'pending') {
            promise2 = new MyPromise((resolve, reject) => {
                this.successStore.push(() => {
                    setTimeout(() => { //异步处理
                        try {
                            let x = onFulfilled(this.value);
                            handlePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
                this.failStore.push(() => {
                    setTimeout(() => { //异步处理
                        try {
                            let x = onRejected(this.reason);
                            handlePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            })
        }
        return promise2;
    }
    catch (onRejected) {
        return this.then(null, onRejected);
    }
    static resolve(data) {
        return new myPromise(resolve => resolve(data))
    }
    static reject(err) {
        return new myPromise((resolve, reject) => reject(err))
    }
    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach(p => p.then(resolve, reject))
        })
    }
    static all(promiseArr) {
        return new MyPromise((resolve, reject) => {
            let arr = [];
            let i = 0;
    
            function processData(index, data) {
                arr[index] = data;
                i++;
                if (i === promiseArr.length) {
                    resolve(arr);
                }
            }
            for (let i = 0; i < promiseArr.length; i++) {
                promiseArr[i].then((data) => {
                    processData(i, data);
                }, reject)
            }
        })
    }
}
console.log('start')
let p1 = new MyPromise((res, rej) => { console.log('resolve console'); setTimeout(() => {res('p1')}) }),
    p2 = new MyPromise((res, rej) => { console.log('reject console'); rej('p2') })

MyPromise.race([p1, p2]).then(data => console.log('data', data), err => console.log('err', err)).catch(err => console.log('catch', err))
console.log('end')