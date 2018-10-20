// 1.封装[a,b]的随机整数
// 如果要拿到5-100的整数，随机数取值应该5-101。（5-101）===>(0,96)+5
// Math.random()*96+5    =====>parseInt(Math.random()*(max-min+1) +min)
function getRandomNum(min,max){
    var ranNum = parseInt(Math.random()*(max-min+1) +min);
    return ranNum;
}
// 2.封装随机颜色 rgb(0-255,0-255,0-255)
function getRandomColor(){
    var r = getRandomNum(0,255);
    var g = getRandomNum(0,255);
    var b = getRandomNum(0,255);
    return "rgb("+r+","+g+","+b+")";
}
//3.
//实现封装，只获取元素节点
//节点数组过滤成只有元素节点的数组 if(节点.nodeType == 1){说明为元素节点}
//父元素节点、子元素节点、兄弟节点
var Element = {
    getElementNodes : function(nodeArr){
        var arr = [];
        for(var i=0;i<nodeArr.length;i++){
            if(nodeArr[i].nodeType == 1){
                arr.push(nodeArr[i]);
            }
        }
        return arr;
    },
    getChildElements : function(node){
        var child = node.childNodes;
        Element.getElementNodes(child);
    },
    getPreviousElement : function(node){
        var previous = node.previousSibling;
        // 若该节点上一个节点是文本，再获取到该文本节点的上一个节点。
        if(previous.nodeType != 1){
            previous = previous.previousSibling;
        }
        return previous;

    }
}


// 封装获取样式
function getStyle(ele,attr){
     // 1.window.getComputedStyle(ele节点) 返回值为包含所有css样式的对象（标准浏览器）
    //    * window.getComputedStyle(ele节点).css属性  返回值为css属性值
    // 2.ele节点.currentStyle.css属性  返回值为css属性值
    //    * 注意事项：ie浏览器都不能直接获取css总属性的值 
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[attr]; 
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return ele.style[attr];
    }

}


function bind(ele,type,fn,isCapture){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,isCapture);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,fn);
    }else{
        ele["on"+type] = fn;
    }
}




var Cookie = {
    setCookie : function(name,value,date,path){
        // document.cookie = name+"="+value+"; expires="+date+"; path="+path;
        var res = name+"="+value;
        if(date){
            res += "; expires="+date;
        }
        if(path){
            res += "; path="+path;
        }
        document.cookie = res;

    },
    getCookie : function(name){
        var cookies = document.cookie;
        var cookiesArr = cookies.split("; ");
        // top
        // ["left=200","top=200"]
        for(var i=0;i<cookiesArr.length;i++){
            var arr = cookiesArr[i].split("=");
            if(arr[0] == name){
                return arr[1];
            }
        }

        return "";
    },
    removeCookie : function(name,value,path){
        //利用过期时间设置cookie
        var d = new Date();
        d.setDate(d.getDate()-1);
        Cookie.setCookie(name,value,d.toUTCString(),path);
    }
}



// 1.开启定时器
//      (0) 定时获取当前值
//      (1) 动态获取速度,一般都会变成整数再运算。
//          * 若速度值为负值，Math.floor();若速度值为正值，Math.ceil()
//      (2) 把当前值加上速度进行改变
//      (3) 将改变后的值赋值给元素的样式
//  2.判断改变后的当前值等于目标值。判断肯定要放在赋值样式前。
//  备注: 事件开启定时器之前，一定要记得先清除已存在的定时器。
//  3.透明度
//  (1)给speed设置死值
//  (2)对当前值与目标值都乘以100,记住目标值在定时器外面乘以100。赋值样式前除以100
// function animate(ele,attr,target){
//     clearInterval(ele.timer);
//     target = attr == "opacity"? target*100 : target;
//     // box.timer
//     ele.timer = setInterval(function(){
//         var current = getComputedStyle(ele)[attr];
//         //将当前值的单位提取出来
//         var reg = /[a-z]+$/;
//         var unit = current.match(reg);
//         unit = unit? unit[0] : '';
//         //提取当前值
//         current = parseFloat(current);
//         current  = attr == "opacity"? current *100 :current;
    
//         var speed = (target - current)/10;
//         speed = speed>0? Math.ceil(speed):Math.floor(speed);
//         current += speed;
//         console.log(speed,current,target);
//         if(current == target){
//             clearInterval(ele.timer);
//         }
//         current = attr == "opacity"? current/100 : current;
//         ele.style[attr] = current + unit;
//     }, 30)
// }


// 问题1：根据传进来的attr设置timer.记住键如果为变量，应该用中括号
// 问题2：通过动画同时改变多个属性值，传进来对象,遍历对象，拿到每个attr及对应的target，执行动画。
// 注意：for循环是一个快速的过程，此时attr已经遍历到最后一个键。解决办法：
// （1）利用let解决，块级作用域。
// （2）利用函数传参，利用函数的局部作用域
// 问题3：在动画结束后，执行回调函数（不管别人的功能，函数封装只负责执行）
// (1)判断传进来的fn是否为函数，函数才执行
// (2)利用count变量，存放总共要执行多少次动画。当每次清除定时器再对count--，当count为0，说明动画结束，就可以执行回调函数了。

// function animate(ele,obj,time){
//     for(let attr in obj){
//         let target = obj[attr];
//         target = attr == "opacity"? target*100 : target;
//         let timer = attr + "Timer";
//         clearInterval(ele[timer]);
//         ele[timer] = setInterval(function(){
//             var current = getComputedStyle(ele)[attr];
//             //将当前值的单位提取出来
//             var reg = /[a-z]+$/;
//             var unit = current.match(reg);
//             unit = unit? unit[0] : '';
//             //提取当前值
//             current = parseFloat(current);
//             current  = attr == "opacity"? current *100 :current;
        
//             var speed = (target - current)/10;
//             speed = speed>0? Math.ceil(speed):Math.floor(speed);
//             current += speed;
//             console.log(speed,current,target);
//             if(current == target){
//                 clearInterval(ele[timer]);
//             }
//             current = attr == "opacity"? current/100 : current;
//             ele.style[attr] = current + unit;
//         }, time)
//     }
//     // attr、target
// }

function animate(ele,obj,time,fn){
    var count = 0 ;
    for(var attr in obj){
        count ++;
        playAnimate(attr);
    }

    function playAnimate(attr){
        // var attr = "width";
        var target = obj[attr];
        target = attr == "opacity"? target*100 : target;
        var timer = attr + "Timer";
        clearInterval(ele[timer]);
        ele[timer] = setInterval(function(){
            var current = getComputedStyle(ele)[attr];
            //将当前值的单位提取出来
            var reg = /[a-z]+$/;
            var unit = current.match(reg);
            unit = unit? unit[0] : '';
            //提取当前值
            current = parseFloat(current);
            current  = attr == "opacity"? current *100 : current;
        
            var speed = (target - current)/10;
            speed = speed>0? Math.ceil(speed):Math.floor(speed);
            current += speed;
            if(current == target){
                clearInterval(ele[timer]);
                count --;
                if(count == 0 && fn && typeof fn == "function"){
                    fn();
                }
                
            }
            current = attr == "opacity"? current/100 : current;
            ele.style[attr] = current + unit;
        }, time)
    }
    // attr、target
}



//数组判空
function removeEmptyArrayEle(arr){
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == undefined) {
            arr.splice(i,1);
            i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
            // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
    }
    return arr;
}
