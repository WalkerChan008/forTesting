// Map, Set, debounce, throttle, powerOfN, factorial, fibonacci, deepClone,
// inherit, bubbleSort, quickSort, new, call, apply, bind, linkedListReverse,
// singleParttern, depthFirstTraversal, widthFitstTraversal, MyPromise

class MyMap {
    constructor (arr = []) {
        this.len = 8
        this.bucket = []
        this.init(arr)
    }
    init (arr = []) {
        let i = 0
        for(; i < this.len; i ++) {
            this.bucket[i] = {
                next: null
            }
        }
        arr.forEach(item => this.set(item[0], item[1]))
    }
    makeHash (key) {
        let hash = 0

        if(typeof key === 'string') {
            let len = key.length >= 3 ? key.length : 3,
                i = len - 3

            for(; i < len; i ++) {
                hash += key[i] ? key[i].charCodeAt() : 0
            }
        } else if(key !== undefined) {
            hash = +key
        }

        return hash
    }
    set (key, val) {
        let hash = this.makeHash(key),
            curNode = this.bucket[hash % this.len],
            lastNode = null

        while(curNode) {
            if(curNode.key === key) {
                curNode.val = val
                return this
            } else {
                lastNode = curNode
                curNode = curNode.next
            }
        }

        lastNode.next = {
            key,
            val,
            next: null
        }

        return this
    }
    delete (key) {
        let hash = this.makeHash(key),
            curNode = this.bucket[hash % this.len],
            lastNode = null

        while(curNode) {
            if(curNode.key === key) {
                lastNode.next = curNode.next
                return true
            } else {
                lastNode = curNode
                curNode = curNode.next
            }
        }

        return false
    }
}

let util = {
    debounce (fn, wait, immediate) {
        let timer = null
        return (...args) => {
            if(immediate) {
                fn(...args)
                immediate = !immediate
            }

            if(timer) clearTimeout(timer)

            timer = setTimeout(() => {
                fn(...args)
            }, wait)
        }
    },
    throttle (fn, wait, immediate) {
        let timer = null
        return (...args) => {
            if(immediate) {
                fn(...args)
                immediate = !immediate
            }

            if(!timer) {
                timer = setTimeout(() => {
                    fn(...args)
                    clearTimeout(timer)
                    timer = null
                }, wait)
            }
        }
    },
    powerOfN (x, n) {  // x的n次幂
        let i = 0,
            sum = 1

        for(; i < n; i ++) {
            sum *= x
        }

        return sum
    },
    factorial (n) {
        let i = 1,
            sum = 1

        for(; i <= n; i ++) {
            sum *= i
        }

        return sum
    },
    fibonacci_1 (n) {
        if(n <= 2) {
            return 1
        }

        return util.fibonacci_1(n - 1) + util.fibonacci_1(n - 2)
    },
    fibonacci_2 (n, sum1 = 1, sum2 = 1) {
        if(n <= 2) {
            return sum2
        }
        
        return util.fibonacci_2(n - 1, sum2, sum1 + sum2)
    },
    fibonacci_3 (n) {
        let sum1 = 1,
            sum2 = 1,
            i = 2

        for(; i < n; i ++) {
            [sum1, sum2] = [sum2, sum1 + sum2]
        }

        return sum2
    },
    deepClone (origin = {}, target = {}) {
        for(key in origin) {
            if(origin.hasOwnProperty(key)) {
                if(origin[key] !== null && typeof origin[key] === 'object') {
                    target[key] = Array.isArray(this, origin[key]) ? [] : {}
                    util.deepClone(origin[key], target[key])
                } else {
                    target[key] = origin[key]
                }
            }
        }

        return target
    },
    inherit () {
        const F = function () {}
        return (Origin, Target) => {
            F.prototype = Origin.prototype
            Target.prototype = new F()
            Target.prototype.constructor = Target
            Target.prototype.uber = Origin.prototype
        }
    },
    bubbleSort (arr = []) {
        let i = 0,
            j = 0,
            len = arr.length

        for(; i < len; i ++) {
            for(j = 0; j < len - 1 - i; j ++) {
                if(arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                }
            }
        }

        return arr
    },
    quickSort (arr = []) {
        if(arr.length <= 1) {
            return arr
        }
        let midIndex = Math.floor(arr.lenth / 2),
            midValue = arr.splice(midIndex, 1),
            i = 0,
            left = [],
            right = [],
            len = arr.length

        for(; i < len; i ++) {
            if(arr[i] > midValue) {
                right.push(arr[i])
            } else {
                left.push(arr[i])
            }
        }

        return util.quickSort(left).concat(midValue, util.quickSort(right))
    },
    myNew (fn) {
        return (...args) => {
            let obj = {}
            fn.apply(obj, args)
            return obj
        }
    },
    linkedListReverse (obj) {
        let pNode = obj,
            pNext = null,
            pPre = null

        while(pNode) {
            pNext = pNode.next
            pNode.next = pPre
            pPre = pNode
            pNode = pNext
        }

        return pPre
    },
    singleParttern (fn) {
        let result
        return (...args) => {
            if(!result) {
                result = fn(...args)
            }
            return result
        }
    },
    depthFirstTraversal (arr = []) {
        let i = 0,
            len = arr.length,
            result = []

        for(; i < len; i ++) {
            result.push(arr[i])
            if(arr[i].children && arr[i].children.length) {
                result = result.concat(util.depthFirstTraversal(arr[i].children))
            }
        }

        return result
    },
    widthFirstTraversal (arr) {
        let stack = arr,
            result = []

        while(stack.length) {
            let tempObj = stack.shift()
            result.push(tempObj)

            if(tempObj.children && tempObj.children.length) {
                stack = stack.concat(tempObj.children)
            }
        }

        return result
    }
}

Function.prototype.mycall = function (obj, ...args) {
    obj._fn_ = this
    let result = obj._fn_(...args)
    delete obj._fn_

    return result
}
Function.prototype.myapply = function (obj, args) {
    obj._fn_ = this
    let result = obj._fn_(...args)
    delete obj_fn_

    return result
}
Function.prototype.mybind = function (obj) {
    var i = 1,
        len = arguments.length,
        tempArgs = [],
        finalArgs = [],
        self = this
    for(; i < len; i ++) {
        tempArgs.push(arguments[i])
        finalArgs.push('tempArgs[' + (i - 1) + ']')
    }
    return function () {
        var result
        i = 0
        len = arguments.length
        for(; i < len; i ++) {
            finalArgs.push('arguments[' + i + ']')
        }

        obj._fn_ = self
        result = eval('obj._fn_(' + finalArgs + ')')
        delete obj._fn_

        return result
    }
}

// eg
let eg = {
    debounce: util.debounce((data) => { console.log(data) }, 500, true),
    throttle: util.throttle((data) => { console.log(data) }, 2000, true),
    powerOfN () {
        return (() => {
            '2的3次幂: ' + util.powerOfN(2, 3)
            '2的10次幂: ' + util.powerOfN(2, 10)
        })()
    },
    arr: [23, 1, 56, 87, 5, 13],
    obj: { name: 1, next: {name: 2, next: {name: 3}}},
    binaryTree: [{name: 1, children: [{name: 2, children: [{name: 4}, {name: 5}]}, {name: 3, children: [{name: 6}, {name: 7}]}]}]
}

class MyPromise {
    constructor (fn) {
        if(typeof fn !== 'function') {
            throw TypeError(`MyPromise resolver ${fn} is not a function`)
        }

        this.status = 'pending'
        this.data = null
        this.resolveCBArr = []
        this.rejectCBArr = []

        let resolve = data => {
            if(this.status === 'pending') {
                this.data = data
                this.status = 'resolved'
                this.resolveCBArr.forEach(fn => fn())
            }
        }
        let reject = data => {
            if(this.status === 'pending') {
                this.data = data
                this.status = 'rejected'
                this.rejectCBArr.forEach(fn => fn())
            }
        }

        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        if(this.status === 'resolved') {
            return new MyPromise((resolve, reject) => {
                handleMyPromise(onFulfilled, this.data, resolve, reject)
            })
        }
        if(this.status === 'rejected') {
            return new MyPromise((resolve, reject) => {
                handleMyPromise(onRejected, this.data, resolve, reject)
            })
        }
        if(this.status === 'pending') {
            return new MyPromise((resolve, reject) => {
                this.resolveCBArr.push(((onFulfilled) => {
                    return () => {
                        handleMyPromise(onFulfilled, this.data, resolve, reject)
                    }
                })(onFulfilled))
                this.rejectCBArr.push(((onRejected) => {
                    return () => {
                        handleMyPromise(onRejected, this.data, resolve, reject)
                    }
                })(onRejected))
            })
        }
    }
    catch (onRejected) {
        return this.then(null, onRejected)
    }
    static resolve (data) {
        return new MyPromise(resolve => resolve(data))
    }
    static reject (data) {
        return new MyPromise((resolve, reject) => reject(data))
    }
    static race (promiseArr = []) {
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach(p => p.then(resolve, reject))
        })
    }
    static all (promiseArr = []) {
        let arr = [],
            len = promiseArr.length
        return new MyPromise((resolve, reject) => {
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
function handleMyPromise (fn, data, resolve, reject) {
    setTimeout((fn, resolve, reject) => {
        try {
            let res = fn(data)
            if(res instanceof MyPromise) {
                res.then(resolve, reject)
            } else {
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    }, 0, fn, resolve, reject)
}

console.log('start')
let p1 = new MyPromise((res, rej) => { console.log('resolve console'); setTimeout(() => res('p1')) }),
    p2 = new MyPromise((res, rej) => { console.log('reject console'); res('p2') })

MyPromise.all([p1, p2]).then().then(data => console.log('data', data), err => console.log('err', err)).catch(err => console.log('catch', err))
console.log('end')