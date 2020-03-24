// 判断是否登录

var count = 0;
var countArr=[];
 var username = getCookie("username");
 
//手机类商品接口
var p=PAjax({
    url:"../server/list_pho.php",
    dataType:"json",
}).then(function(res){
    console.log(res)
    var str="";
    for(var i=0;i<res.length;i++){
         str+=`
                <li class="cont">
                <a href="detail.html?id=${res[i].id}&biao=phone">
                <img src="${res[i].imgpath}"></a>
                <p>${res[i].name}</p>
                </li>
         
    `
    }
 document.querySelector(".c_phone").innerHTML=str;

});
//电视类
var p=PAjax({
    url:"../server/list_tv.php",
    dataType:"json",
}).then(function(res){
    // console.log(res)
    var str="";
    for(var i=0;i<res.length;i++){
         str+=`
         <li class="cont">
        <a href="detail2.html?id=${res[i].id}&biao=tv">
        <img src="${res[i].imgpath}"></a>
        <p>${res[i].name}</p>
			</li>
         
    `
    }
 document.querySelector(".c_tv").innerHTML=str;

});
//电脑类
var p=PAjax({
    url:"../server/list_pc.php",
    dataType:"json",
}).then(function(res){
    console.log(res)
    var str="";
    for(var i=0;i<res.length;i++){
         str+=`
         <li class="cont">
        <a href="detail2.html?id=${res[i].id}&biao=pc">
        <img src="${res[i].imgpath}"></a>
        <p>${res[i].name}</p>
			</li>
         
    `
    }
 document.querySelector(".c_pc").innerHTML=str;

});
//家电接口
var p=PAjax({
    url:"../server/list_jia.php",
    dataType:"json",
}).then(function(res){
    // console.log(res)
    var str="";
    for(var i=0;i<res.length;i++){
         str+=`
                <li class="cont">
                <a href="detail2.html?id=${res[i].id}&biao=jiadian">
                <img src="${res[i].imgpath}"></a>
                <p>${res[i].name}</p>
                </li>
         
    `
    }
 document.querySelector(".c_jia").innerHTML=str;
});

if (username) {
    $("span.total").html(count);
    document.querySelector(".top_right").innerHTML = `
    <ul class="top_right">
        <li>
            <a href="javascript:;">欢迎${username}</a>|</li>
        <li>
            <a class='logout' href="javascript:;">退出</a>|</li>
        <li>
            <a href="#">我的订单</a>
        </li>
    </ul>`
    var btn = document.querySelector(".logout");
    // console.log(btn);
    btn.onclick = function () {
        removeCookie("username");
        // document.querySelector("span.total").innerText=count
        $("span.total").html(0)
        $(".cart_hid").html("该购物车没有商品")

        document.querySelector(".top_right").innerHTML = `
        <ul class="top_right">
        <li>
            <a href="./pages/login.html">登录</a>|</li>
        <li>
            <a href="./pages/regist.html">注册</a>|</li>
        <li>
            <a href="#">消息通知</a>
        </li>
    </ul>`
    }
} else {
    $("span.total").html(0)
    $(".cart_hid").html("该购物车没有商品")
}

$(function(){
    //鼠标滑过展示下拉菜单 鼠标表移出隐藏下拉框
    var $li=$(".nav>ul>li")
    $li.mouseenter(function(){
        //滑入都显示 都向下卷出
        $(this).children("ul.nav_xiaomi").stop().slideDown();
    })
    //鼠标移出向上收回
    $li.mouseleave(function(){
        $(this).children("ul.nav_xiaomi").stop().slideUp();
    })
})
// 展开分类
var flag=true;
$(".down").click(function(){
    if(flag){
        $(this).next().slideDown().show();
        flag=false;
    }else if(!flag){
        $(this).next().slideUp().hide();
        flag=true;
    }
})


//购物车数量
function getCartCount() {
    let goods = localStorage.getItem("goods");
    goods = JSON.parse(goods);
    // console.log(countArr);
    var html = '';
    for (var i = 0; i < goods.length; i++) {
        count = count + goods[i].number;
        html = html + '<b>' + goods[i].name + '</b>' + '<br>'
    }
    var temp={};
    for (var i in goods){
        var key = goods[i].username;
        if (temp[key]){
            temp[key].username = temp[key].username ;
            temp[key].number = temp[key].number+ goods[i].number;
        }else{
            temp[key] = {};
            temp[key].username = goods[i].username;
            temp[key].number = goods[i].number;
        }
    }
    for (var k in temp){
        countArr.push(temp[k])
    }
    countArr.forEach(function (item,value) {
        if (username===item.username){
            count=item.number
        }
    });
    $(".cart_hid").html(html);
    $("span.total").html(count)
}
getCartCount();