var count = 0;
var countArr=[];
 var username = getCookie("username");

 var p = PAjax({
     url: "server/home.php",
     dataType: "json",
 }).then(function (res) {
     var str = "";
     for (var i = 0; i < res.length; i++) {
         str += `
         <div class="item">
            <img src="${res[i].imgpath}" />
            <p class="o">${res[i].name}</p>
            <p class="t">${res[i].introduce}</p>
            <p class="th">${res[i].price}元 起</p>
        </div>
`
     }
     document.querySelector(".jia_right").innerHTML = str;

 });
 var p = PAjax({
     url: "server/home_zhi.php",
     dataType: "json",
 }).then(function (res) {
     var str = "";
     for (var i = 0; i < res.length; i++) {
         str += `
         <div class="item">
            <img src="${res[i].imgpath}" />
            <p class="o">${res[i].name}</p>
            <p class="t">${res[i].introduce}</p>
            <p class="th">${res[i].price}元 起</p>
        </div>
`
     }
     document.querySelector("#jia_right").innerHTML = str;

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
$(function () {
    //鼠标滑过展示下拉菜单 鼠标表移出隐藏下拉框
    var $li = $(".nav>ul>li");
    $li.mouseenter(function () {
        //滑入都显示 都向下卷出
        $(this).children("ul.nav_xiaomi").stop().slideDown();
    })
    //鼠标移出向上收回
    $li.mouseleave(function () {
        $(this).children("ul.nav_xiaomi").stop().slideUp();
    })
});

var index = 0;
$("a.right").click(function () {
    index++;
    if (index == $(".banner_img li").length) {
        index = 0;
    }
    move()
});
$("a.left").click(function () {
    index--;
    if (index < 0) {
        index = $(".banner_img li").length - 1;
    }
    move()
})

function move() {
    $(".banner_img li").eq(index).addClass("current")
        .siblings()
        .removeClass("current")
        .parent() //ul
        .next() //ol
        .children() //li
        .eq(index)
        .addClass("current")
        .siblings()
        .removeClass("current")
}
//滑过小点
$("ol li").mouseenter(function () {
    index = $(this).index()
})

//自动轮播
timer = setInterval(function () {
        clearInterval(timer)
    },
    function () {
        timer = setInterval(function () {
            index++;
            if (index == $(".banner_img li").length) {
                index = 0;
            }
            move()
        }, 2000)
    })
//鼠标大banner事件
$(".banner").hover(function () {
        clearInterval(timer)
    },
    function () {
        timer = setInterval(function () {
            index++;
            if (index == $(".banner_img li").length) {
                index = 0;
            }
            move()
        }, 2000)
    })

 function getCartCount() {
     let goods = localStorage.getItem("goods");
     if (goods){
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
     } else{
        //  console.log("添加数据");
     }

 }
 getCartCount();



