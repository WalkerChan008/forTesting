class myPromise {
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw TypeError(`myPromise resolver ${fn} is not a function`)
        }
        this.status = 'pending'
        this.data = undefined
        this.resolveCBArr = []
        this.rejectCBArr = []
        let resolve = (data) => {
            if (this.status == 'pending') {
                    this.status = 'resolved'
                    this.data = data
                    this.resolveCBArr.forEach(fn => fn())
            }
        }
        let reject = (data) => {
            if (this.status == 'pending') {
                    this.status = 'rejected'
                    this.data = data
                    this.rejectCBArr.forEach(fn => fn())
            }
        }
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(resolvedFn, rejectedFn) {
        resolvedFn = typeof resolvedFn === 'function' ? resolvedFn : data => data
        rejectedFn = typeof rejectedFn === 'function' ? rejectedFn : err => { throw err }
        if (this.status === 'resolved') {
            return new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let res = resolvedFn(this.data)
                        if(res instanceof myPromise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res)
                        }
                    } catch(e) {
                        reject(e)
                    }
                }, 0)
            })
        }
        if (this.status == 'rejected') {
            return new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let res = rejectedFn(this.data)
                        if(res instanceof myPromise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res)
                        }
                    } catch(e) {
                        reject(e)
                    }
                }, 0)
            })
        }
        if (this.status == 'pending') {
            return new myPromise((resolve, reject) => {
                this.resolveCBArr.push(((resolvedFn) => {
                    return () => {
                        setTimeout(() => {
                            try {
                                var res = resolvedFn(this.data)
                                if (res instanceof myPromise) {
                                    res.then(resolve, reject)
                                } else {
                                    resolve(res)
                                }
                            } catch(e) {
                                reject(e)
                            }
                        }, 0)
                    }
                })(resolvedFn))
                this.rejectCBArr.push(((rejectedFn) => {
                    return () => {
                        setTimeout(() => {
                            try {
                                let res = rejectedFn(this.data)
                                if (res instanceof myPromise) {
                                    res.then(resolve, reject)
                                } else {
                                    resolve(res)
                                }
                            } catch(e) {
                                reject(e)
                            }
                        }, 0)
                    }
                })(rejectedFn))
            })
        }
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    static resolve(data) {
        return new myPromise(resolve => resolve(data))
    }
    static reject(data) {
        return new myPromise((resolve, reject) => reject(data))
    }
    static race (promiseArr) {
        return new myPromise((resolve, reject) => {
            promiseArr.forEach(p => p.then(resolve, reject))
        })
    }
    static all(promiseArr) {
        return new myPromise((resolve, reject) => {
            let arr = [],
                len = promiseArr.length
            
            promiseArr.forEach((p, i) => {
                p.then(data => {
                    arr[i] = data
                    if(i === len - 1) {
                        resolve(arr)
                    }
                }, reject)
            })
        })
    }
}
console.log('start')
let p1 = new myPromise((res, rej) => { console.log('resolve console'); setTimeout(() => { res('p1') }) }),
    p2 = new myPromise((res, rej) => { console.log('reject console'); rej('p2') })
myPromise.race([p1, p2]).then().then(data => console.log('data', data)).catch(err => console.log('catch', err))
console.log('end')