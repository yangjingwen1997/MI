var count = 0;
var countArr=[];
var username = getCookie("username");
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

        console.log(count)
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



//成功加入购物车接口
var p=PAjax({
    url:"../server/success.php",
    dataType:"json",
}).then(function(res){
    // console.log(res)
    var str="";
    for(var i=0;i<res.length;i++){
    str+=`
    <li class="cont">
    <a href="detail.html?id=${res[i].id}">
       <img src="${res[i].imgpath}"></a>
           <p>${res[i].name}</p>
           <p>${res[i].price}元</p>
           <div class="addc" id="addcart" onclick="fn()">加入购物车</div>
       </li>
    
`
    }
 document.querySelector(".groom").innerHTML=str;

});

function fn(){
    if(!username){
       alert("请先登录！！！");
       location.href = "../pages/login.html";
       return false;
   }else{
       alert("请点击查看详情")
   }

}
