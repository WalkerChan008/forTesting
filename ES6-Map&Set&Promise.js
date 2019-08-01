function myMap(arr) {
    this.init();
    arr = arr || [];
    arr.forEach(item => this.set(item[0], item[1]));
    return this;
}

myMap.prototype.len = 8;
myMap.prototype.bucket = [];
myMap.prototype.init = function () {
    for(let i = 0; i < this.len; i ++) {
        this.bucket[i] = {
            next: null
        };
    }
};
myMap.prototype.makeHash = function (key) {
    let hash = 0;
    if(typeof key === 'string') {
        let len = (key.length > 3) ? key.length : 3;
        for(let i = len - 3; i < len; i ++) {
            hash += (key[i] !== undefined) ? key[i].charCodeAt() : 0;
        }
    } else if(typeof key !== 'undefined') {
        hash = +key;
    }
    return hash;
};

myMap.prototype.set = function (key, value) {
    let hash = this.makeHash(key),
        curNode = this.bucket[hash % this.len],
        lastNode = null;

    while(curNode) {
        if(curNode.key === key) {
            curNode.value = value;
            return this;
        } else {
            lastNode = curNode;
            curNode = curNode.next;
        }
    }

    lastNode.next = {
        key,
        value,
        next: null
    };

    return this;
};

myMap.prototype.get = function (key) {
    let hash = this.makeHash(key),
        curNode = this.bucket[hash % this.len];

    while(curNode) {
        if(curNode.key === key) {
            return curNode.value;
        } else {
            curNode = curNode.next;
        }
    }
    return;
};

myMap.prototype.has = function (key) {
    let hash = this.makeHash(key),
        curNode = this.bucket[hash % this.len];

    while(curNode) {
        if(curNode.key === key) {
            return true;
        } else {
            curNode = curNode.next;
        }
    }

    return false;
};

myMap.prototype.delete = function (key) {
    let hash = this.makeHash(key),
        curNode = this.bucket[hash % this.len],
        lastNode = curNode;
        
    while(curNode) {
        if(curNode.key === key) {
            lastNode.next = curNode.next;
            return true;
        } else {
            lastNode = curNode;
            curNode = curNode.next;
        }
    }

    return false;
}

myMap.prototype.clear = function () {
    this.init();
}

// var mymap = new myMap([[0, 0], [3, 3], [8, 8], [16, 16]]);


class mySet {
    constructor(arr = []) {
        this.len = 8;
        this.bucket = [];
        this.init(arr);
    }
    init(arr) {
        for(let i = 0; i < this.len; i ++) {
            this.bucket[i] = {
                next: null
            };
        }

        arr.forEach(item => this.add(item));
    }
    makeHash(val) {
        let hash = 0;
        if(typeof val === 'string') {
            let len = val.length > 3 ? val.length : 3;
            for(let i = len - 3; i < len; i ++) {
                hash += val[i] ? val[i].charCodeAt() : 0;
            }
        } else if(typeof val !== 'undefined') {
            hash = +val;
        }
        return hash;
    }
    add(value) {
        let hash = this.makeHash(value),
            curNode = this.bucket[hash % this.len],
            lastNode = null;

        while(curNode) {
            if(curNode.value === value) {
                return this;
            } else {
                lastNode = curNode;
                curNode = curNode.next;
            }
        }

        lastNode.next = {
            value,
            next: null
        };
    }
}

// var myset = new mySet([1,1,1,2,2,3,4,5,6,5,6]);

class myMap1 {
    constructor(arr = []) {
        this.len = 8;
        this.bucket = [];
        this.init(arr);
    }
    init(arr) {
        for(let i = 0; i < this.len; i ++) {
            this.bucket[i] = {
                next: null
            };
        }
        arr.forEach(item => this.set(item[0], item[1]));
    }
    makeLen(arr) {
        let len = Math.ceil(Math.sqrt(arr.length)),
            bucketLen = len > 8 ? len : 8;
        return bucketLen;
    }
    makeHash(key) {
        let hash = 0;
        if(typeof key === 'string') {
            let len = key.length > 3 ? key.length : 3;
            for(let i = len - 3; i < key.length; i ++) {
                hash += key[i] ? key[i].charCodeAt() : 0;
            }
        } else if(key !== undefined) {
            hash = +key;
        }
        return hash;
    }
    set(key, val) {
        let hash = this.makeHash(key),
            curNode = this.bucket[hash % this.len],
            lastNode = null;

        while(curNode) {
            if(curNode.key === key) {
                curNode.val = val;
                return this;
            } else {
                lastNode = curNode;
                curNode = curNode.next;
            }
        }

        lastNode.next = {
            key,
            val,
            next: null
        };

        return this;
    }
    get(key) {
        let hash = this.makeHash(key),
            curNode = this.bucket[hash % this.len];

        while(curNode) {
            if(curNode.key === key) {
                return curNode.val;
            } else {
                curNode = curNode.next;
            }
        }

        return;
    }
    has(key) {
        let hash = this.makeHash(key),
            curNode = this.bucket[hash % this.len];

        while(curNode) {
            if(curNode.key === key) {
                return true;
            } else {
                curNode = curNode.next;
            }
        }

        return false;
    }
    delete(key) {
        let hash = this.makeHash(key),
            curNode = this.bucket[hash % this.len],
            lastNode = curNode;

        while(curNode) {
            if(curNode.key === key) {
                lastNode.next = curNode.next;
                return true;
            } else {
                lastNode = curNode;
                curNode = curNode.next;
            }
        }

        return false;
    }
    clear() {
        this.init();
    }
}
// var mymap = new myMap1([[0, 0], [3, 3], [8, 8], [16, 16]]);

function debounce(fn, wait, immediate) {
    let timer = null;

    return function () {
        let args = arguments;

        if(immediate && !timer) {
            fn.apply(this, args);
        }

        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
}

function throttle(fn, wait, immediate) {
    let timer = null,
        callNow = immediate;

    return function () {
        let args = arguments;

        if(callNow) {
            fn.apply(this, args);
            callNow = false;
        }

        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(this,args);
                timer = null;
            }, wait);
        }
    }
}

// $.extend({a: function () {}});
// $.extend(obj1, obj2, obj3, ...);
// $.extend(true, obj1, obj2, ...);
// shell界面
// 主进程
// 内核
//     js引擎
//     渲染引擎
// url  NDS解析  ip  tcp三次握手
// 发送请求  分析url  设置请求报文  
// 服务器返回请求文件(html)
// 浏览器渲染  html => DOM Tree
//            css => CSS Tree
//            DOM Tree + CSS Tree = Render Tree
//            reflow   repaint
//      reflow must be trigger repaint, but repaint may not reflow
// 最佳实践
//     避免使用table布局
//     将动画应用到position absolute fixed元素上
//     避免频繁操作样式   汇总后统一  一次修改
//     尽量使用class进行样式修改
//     减少dom的增删次数  使用字符串拼接 或documentFragment一次性插入
//     极限优化时，修改样式可display: none后修改
// 常见状态码
//     200 成功 返回数据
//     301 永久移动，重定向
//     302 临时移动，可继续使用原有url
//     304 资源为修改，可使用缓存
//     305 需代理访问
//     400 请求语法错误
//     401 要求身份认证
//     403 拒绝请求
//     404 资源不存在
//     500 服务器错误
// TCP三次握手  TCP四次挥手
// 跨域  jsonp  只支持get  src属性都不受跨域的限制
// Access-Control-Allow-Origin: *
// 
// 前端性能优化
//  1.加载优化
//      合并css javascript
//      尽量使用雪碧图
//      缓存一切可缓存的资源
//      使用外联式引用css javascript
//      压缩 html css javascript
//      启用GZip
//  2.css优化
//      图片尽量使用DataURL
//      尽量避免在html中写style属性
//      移除空的css规则
//      值为0时不需要任何单位
//  3.图片优化
//      使用svg iconfront代替图片
//  4.脚本优化
//      减少重排和重绘
//      缓存Dom的选择与计算
//      缓存arr.length
//      尽量使用事件委托
//      尽量使用id选择器
//  5.渲染优化
//      减少Dom节点
//      尽量使用css3动画

function powerOfN(n1, n2) {
    let num = 1,
        i = 0;
    for(; i < n2; i ++) {
        num *= n1;
    }
    return num;
}

function factorial(n) {
    let num = 1,
        i = 1;
    for(; i <= n; i ++) {
        num *= i;
    }
    return num;
}

function fbnc11(n, num1 = 1, num2 = 1) {
    if(n === 1 || n === 2) {
        return num2;
    }
    return fbnc11(n - 1, num2, num1 + num2);
}

function fbnc22(n) {
    let num1 = 1,
        num2 = 1,
        i = 2;

    if(n <= i) {
        return num2;
    }

    for(; i < n; i ++) {
        [num1, num2] = [num2, num1 + num2];
    }
    return num2;
}

/**
 * t5
 */
function deepClone(origin, target = {}) {
    let toStr = Object.prototype.toString,
        arrayStr = '[object Array]',
        key
    for(key in origin) {
        if(origin.hasOwnProperty(key)) {
            if(origin[key] !== null && typeof origin[key] === 'object') {
                target[key] = toStr.call(origin[key]) === arrayStr ? [] : {}
                deepClone(origin[key], target[key])
            } else {
                target[key] = origin[key]
            }
        }
    }
    return target
}

let inherit = (function () {
    let F = function () {}
    return function (Origin, Target) {
        F.prototype = Origin.prototype
        Target.prototype = new F()
        Target.prototype.constructor = Target
        Target.prototype.uber = Origin.prototype
    }
})()

function bubbleSort(arr = [], desc = false) {
    let i = 0,
        j = 0,
        len = arr.length;

    for(; i < len; i ++) {
        for(j = 0; j < len - 1 - i; j ++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    if(desc) {
        arr.reverse();
    }

    return arr;
}

function quickSort(arr = []) {
    if(arr.length <= 1) return arr;

    let pivotIdx = Math.floor(arr.length / 2),
        pivot = arr.splice(pivotIdx, 1)[0],
        leftArr = [],
        rightArr = [],
        i = 0;

    for(; i < arr.length; i ++) {
        if(arr[i] < pivot) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    return quickSort(leftArr).concat([pivot], quickSort(rightArr));
}

// 200：
// 301：
// 302：
// 304：
// 305：
// 400：
// 401：
// 403：
// 404：
// 405：
// 500：
// 503：
// 504：

class myPromise {
    constructor(fn) {
        if(typeof fn !== 'function') {
            throw TypeError(`myPromise resolver ${fn} is not a function`)
        }
        this.status = 'pending'
        this.data = undefined
        this.resolveCBArr = []
        this.rejectCBArr = []
        let resolve = (data) => {
             if(this.status == 'pending') {
                setTimeout(() => {
                    this.status = 'resolved'
                    this.data = data
                    this.resolveCBArr.forEach(fn => fn())
                }, 0)
             }
        }
        let rejected = (data) => {
            if(this.status == 'pending') {
                 setTimeout(() => {
                    this.status = 'rejected'
                    this.data = data
                    this.rejectCB && this.rejectCB()
                 }, 0)
             }
        }
        fn(resolve, rejected)
    }
    then(resolveFn, rejectedFN) {
        if(this.status === 'resolved') {
            let res = resolveFn(this.data)
            if(res instanceof myPromise) {
                return res
            } else {
                return myPromise.resolve(res)
            }
        }
        if(this.status == 'rejected') {
            let res = rejectedFN(this.data)
            
            if(res instanceof myPromise) {
                return res
            } else {
                return myPromise.resolve(res)
            }
        }
        if(this.status == 'pending') {
            return new myPromise((resolve, reject) => {
                this.resolveCBArr.push(((resolveFn) => {
                    return () => {
                        var res = resolveFn(this.data)
                        if(res instanceof myPromise) {
                                res.then(resolve, reject)
                        } else {
                                resolve(res)
                        }
                    }
                })(resolveFn))
                this.rejectCBArr.push(((rejectedFN) => {
                                   return () => {
                                       let res = rejectedFN(this.data)
                                       if(res instanceof myPromise) {
                                           res.then(resolve, reject)
                                       } else {
                                           resolve(res)
                                       }
                                   }
                           })(rejectedFN))
            })
        }        
    }
    static resolve(data) {
        return new myPromise(resolve => resolve(data))
    }
    static reject(data) {
        return new myPromise((resolve, reject) => reject(data))
    }
}

// 构造函数之内方法 
// 原型链上的方法 prototype, 跟constructor平级
// 静态方法 Object.is() static 

Map, Set, debounce, throttle, powerOfN, factorial, fibonacci, deepClone,
inherit, bubbleSort, quickSort, new, call, apply, bind, linkedListReverse,
singleParttern, depthFirstTraversal, widthFitstTraversal


let util = {
    debounce (fn, wait, immediate) {
        let timer = null
        return function () {
            let args = arguments
            if(immediate) {
                fn.apply(this, args)
                immediate = false
            }

            if(timer) clearTimeout(timer)

            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    },
    throttle (fn, wait, immediate) {
        let timer = null
        return function () {
            let args = arguments
            if(immediate) {
                fn.apply(this, args)
            }
            if(!timer) {
                timer = setTimeout(() => {
                    fn.apply(this, args)
                    clearTimeout(timer)
                    timer = null
                }, wait)
            }
        }
    },
    powerOfN (n1 = 2, n2 = 0) {
        let sum = 1,
            i = 0

        for(; i < n2; i ++) {
            sum *= n1
        }

        return sum
    },
    factorial (n) {
        let sum = 1,
            i = 1

        for(; i <= n; i ++) {
            sum *= i
        }

        return sum
    },
    fibonacci_1 (n) {
        let num1 = 1,
            num2 = 1
        if(n <= 2) {
            return num2
        }

        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    },
    fibonacci_2 (n, num1 = 1, num2 = 1) {
        if(n <= 2) {
            return num2
        }

        return this.fibonacci_2(n - 1, num2, num1 + num2)
    },
    fibonacci_3 (n) {
        let num1 = 1,
            num2 = 1

        if(n <= 2) {
            return num2
        }

        for(let i = 2; i < n; i ++) {
            [num1, num2] = [num2, num1 + num2]
        }

        return num2
    },
    deepClone (origin = {}, target = {}) {
        let toStr = Object.prototype.toString,
            arrStr = '[object Array]';

        for(let key in origin) {
            if(origin.hasOwnProperty(key)) {
                if(origin[key] !== null && typeof origin[key] === 'object') {
                    target[key] = toStr.call(origin[key]) === arrStr ? [] : {};
                    util.deepClone(origin[key], target[key]);
                } else {
                    target[key] = origin[key];
                }
            }
        }

        return target;
    },
    inherit_1 () {
        let F = function () {}

        return function (Origin, Target) {
            F.prototype = Origin.prototype
            Target.prototype = new F()
            Target.prototype.constructor = Target
            Target.prototype.uber = Origin.prototype
        }
    },
    inherit_2 (Origin, Target) {
        Target.prototype = Object.create(new Origin())
        return Target
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

        let i = 0,
            idx = Math.floor(arr.length / 2),
            val = arr.splice(idx, 1),
            len = arr.length,
            left = [],
            right = []

        for(; i < len; i ++) {
            if(arr[i] < val) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }

        return quickSort(left).concat(val, quickSort(right))
    },
    myNew (fn) {
        return function () {
            var obj = {}
            fn.apply(obj, arguments)
            return obj
        }
    },
    myCall (obj, ...args) {
        let result

        obj._fn_ = this
        result = obj._fn_(...args)
        delete obj._fn_

        return result
    },
    myApply (obj, arr) {
        let result

        obj._fn_ = this
        result = obj._fn_(...arr)
        delete obj._fn_

        return result
    },
    myBind (obj, ...args) {
        let self = this,
            result

        return function (...otherArgs) {
            obj._fn_ = self
            result = obj._fn_(...(args.concat(otherArgs)))
            delete obj._fn_

            return result
        }
    },
    linkedListReverse (obj = {}) {
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

        return function () {
            if(!result) {
                result = fn.apply(this, arguments)
            }
            return result
        }
    },
    depthFirstTraversal (arr = []) {
        let i = 0,
            len = arr.length,
            nodes = []

        for(; i < len; i ++) {
            let item = arr[i],
                children = item.children

            nodes.push(item)
            nodes = nodes.concat(this.depthFirstTraversal(children))
        }

        return nodes
    },
    widthFitstTraversal (arr = []) {
        let stack = arr,
            nodes = []

        while(stack.length) {
            let item = stack.shift(),
                children = item.children || []

            nodes.push(item)
            stack = stack.concat(children)
        }

        return nodes
    }
}
Function.prototype.myCall = util.myCall

arr = [{name: 1, children: [{name: 2, children: [{name: 4}, {name: 5}]}, {name: 3, children: [{name: 6}, {name: 7}]}]}]