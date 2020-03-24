function Ajax(obj){
    // 处理参数
    if(obj.url === undefined){ // 判断必填
        throw new Error("地址是必填项"); // 抛出自定义错误
    }
    // 判断参数类型 - url一定是字符串
    if(Object.prototype.toString.call(obj.url) !== "[object String]"){
        throw new Error("地址类型不对");
    }
    if(obj.method===undefined){ // 没有传
        obj.method = "get";
    }else{ // 传进来了
        // 判断类型 
            if(obj.method!="get" && obj.method!="post"){
                throw new Error("请求方式值不对");
            }
        // }
    }
    // 处理传进来的数据
    if(obj.data!=undefined){
        if(Object.prototype.toString.call(obj.data) === "[object Object]"){
            var f = '';
            var str = '';
            for(var attr in obj.data){
                str += f + attr  + "=" + obj.data[attr];
                f = "&"
            }
            obj.data = str;
        }
    }
    if(obj.method=="get" && obj.data!=undefined){ // 如果请求方式是get，并且有传送的数据
        obj.url += "?"+obj.data; // 那就在地址栏后面拼接上数据
    }
    if(obj.async===undefined){ // 没有传就给默认值为true
        obj.async = true;
    }else{ // 如果传进来了
        // 判断类型是否正确
        if(Object.prototype.toString.call(obj.async) !== "[object Boolean]"){
            throw new Error("是否异步的类型不对");
        }
    }
    if(obj.dataType===undefined){ // 没有传希望的数据类型
        obj.dataType = "string";
    }else{
            if(obj.dataType!="xml" && obj.dataType!="json" && obj.dataType!="string"){
                throw new Error("希望得到的数据类型的值不对");
            }
    }
    // 函数参数处理
    if(obj.success===undefined){
        obj.success=function(){}
    }else{
        if(Object.prototype.toString.call(obj.success) !== "[object Function]"){
            throw new Error("成功函数类型不对")
        }
    }
    if(obj.error===undefined){
        obj.error=function(){}
    }else{
        if(Object.prototype.toString.call(obj.error) !== "[object Function]"){
            throw new Error("失败函数类型不对")
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open(obj.method,obj.url,obj.async);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status>=200 && xhr.status<300){ // 请求成功
                if(obj.dataType==="string"){
                    var res = xhr.responseText;
                }else if(obj.dataType==="json"){
                    var res = JSON.parse(xhr.responseText);
                }else if(obj.dataType==="xml"){
                    var res = xhr.responseXML;
                }
                obj.success(res); // 调用success函数
            }else{ // 请求失败
                obj.error();  // 调用error函数
            }
        }
    }
    if(obj.method==="post"){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        if(obj.data!="undefined"){
            xhr.send(obj.data);
        }else{
            xhr.send();
        }
        return;
    }
    xhr.send();
}



function PAjax(obj){
    return new Promise(function(resolve,reject){
        Ajax({
            url:obj.url,
            method:obj.method,
            data:obj.data,
            dataType:obj.dataType,
            async:obj.async,
            success:function(res){
                // 调用resolve
                resolve(res);
            },
            error:function(){
                reject();
            }
        })
    });
}

/***********************************调用模板****************************************/
// var p = PAjax({
//     url:"cityId.php",
//     data:{
//         name:"宁江区"
//     },
//     method:"post",
// });
// p.then(function(res){
//     console.log(res);
// });