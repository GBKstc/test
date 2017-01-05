/**
 * Created by ouer on 2023/7/29.
 */
/*
let aa = ['a','b','c','d','e','f'];
for(let x of aa.entries()){
    console.log(x);
}*/
/*
function log(x,y='world') {
    console.log(x,y);
}
log('Hellow','world');
log('Hellow','');
log('Hellow');
log('Hellow',undefined);
log('Hellow',null);*/
/*
function Point(x=0,y=0) {
    this.x=x;
    this.y=y;
}
let p =new Point(4,5);
console.log(p.x);*/
/*
function push(arr,...num) {
    num.forEach(function (n) {
        arr.push(n);
    });
    console.log(arr);
}
push([1,2,3],1,2,3,4,5,6,7);*/
/*console.log([...document.querySelectorAll('button')]);*/
/*let map = new Map([
    [1,'one'],
    [2,'two'],
    [3,'three'],
]);
let arr = [...map.keys()];
console.log(arr);*/
/*function* go() {
    yield 1;
    yield 2;
    yield 3;
}
console.log([...go()]);*/
/*let go = (id,name)=>({id:id,name:name});
console.log(go(11,'GBK'));*/

/*function u(n) {
    if(n===1) return 1;
    return n*u(n-1);
}
console.log(a(5));

function a(n,num) {
    if(n===1) return num;
    return a(n-1,n*num);
}
console.log(a(5,1));*/
/*function F(n) {
    if(n<=1){return 1};
    /!*console.log(n);*!/
    return F(n-1)+F(n-2);
}*/
/*console.log(F(10));*/

/*function FF(n,x,y) {
    if(n<=1){return 1+x+y};
    return FF(n-1,x+n,y+n);
}
console.log(FF(10,0,0));*/

/*function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    }
    else {
        return x
    }
});*/
/*function a(x,y) {
    return {x,y}
}
console.log(a(1,2));*/
/*let a={
    x(){
        return "X"
    },
    y(){
        return 'Y'
    }
}
console.log(a.x());*/
/*function a(x) {
    return x ? x : "未赋值";
}
console.log(a());*/
/*let obj={
    *y(){
        yield '1';
        yield '2';
        yield '3';
        },

}
console.log(obj.y().next().value);
console.log(obj.y().next().value);
console.log(obj.y().next().value);*/
/*console.log(Object.is(-0,+0));
let a={x:1};
let b={y:1};
let c={
    z:1,
    v:1,
    f:1,
}
let d = Object.assign(a,b,c);
console.log(a);*/
/*class Point {
    constructor(x,y){
        Object.assign(this,{x,y});
    }
}
let obj={
    'foo':123;
}
console.log(Object.getOwnPropertyDescriptor(obj,'foo'));*/
/*Obj = {
    span1:{
        type:1,
        div1:{

        },
        div2:{

        }
    },
    span2:{
        type:1,
        div1:{

        },
        div2:{

        }
    }
}*/
/*let mySymbol = Symbol();
let a={
    [mySymbol]:'Hello',
}
console.log(a[mySymbol]);*/
/*let obj={};
let a=Symbol();
let b=Symbol();
obj[a]='Hello';
obj[b]='World';
console.log(obj);
let c=Object.getOwnPropertySymbols(obj);
console.log(c[0]);
console.log(obj[c[0]]);*/
/*let obj = {
    [Symbol()]:1,
    num:2,
    a:3
};
console.log(Reflect.ownKeys(obj));
let s1 = Symbol.for();
let s2 = Symbol();
let s3 = Symbol.for();
console.log(s2===s3);*/
/*let aa = {
    b:1,
};
let a = new Proxy(aa,{
    get:function () {
        return 'GBK';
    },
    set:function () {
        console.log('设置成功');
        return 'gbk';
    }
})

console.log(a.b);
console.log(a.b='aa');
console.log(a.b);*/
/*let person = {
    name:'张三',
    num:23,
};
let proxy = new Proxy(person,{
    get:function (target,property) {
        if(property in target){
            return target[property];
        }else{
            throw new ReferenceError("Property\""+property+"\"dose not exist.");
        }
        /!*console.log(target);
        console.log(property);*!/
    }
})*/
/*function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
console.log(arr[-1]);
arr[-1] // c*/
let a = {
    aa: 1,
    bb: 2,
    cc: 3,
    dd: 4
};
let proxy = new Proxy(a, {
    get: function (target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError('错了错了');
        }
    }
});
console.log(proxy.aa);

//# sourceMappingURL=es6-compiled.js.map