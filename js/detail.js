// 判断是否登录
var count = 0;
var countArr=[];
var username = getCookie("username");
//提取炸开？后面的函数
 function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");//提取name或者&开头的
    var r = window.location.search.substr(1).match(reg);//取？后面的
    if (r != null) 
    return decodeURIComponent(r[2]) ;//编码
    return null;
}
//调用id biao
var id=getQueryString("id");  //id=2
// console.log(id)
var biao=getQueryString("biao");//id=2&biao=tv
// console.log(biao)
if(!id){
    location.href="../pages/list.html";
}else{
    var p=PAjax({
        method:"post",
        data:{
            "id":id,
             "biao":biao
        },
        dataType:"json",
        url:"../server/detail.php"
    }).then(function(res){
        // console.log(res)
        document.querySelector(".enlarge").innerHTML=
        `
        <div class="swiper">
            <img src="${res.bigpic}" class="swiper_img" width="520">
        </div>
        <div class="swiper-tab">
            <div class="tab-left">
                <span class="arrow arrow-left"></span>
            </div>
            <div class="tab-right">
                <span class="arrow arrow-right"></span>
            </div>
        </div>
        ` 
        //把请求到的数据innerHTML到页面上
        document.querySelector(".name").innerText = res.name
        document.querySelector(".price").innerText = res.price+"元"
        document.querySelector(".sum_cart>.name").innerText = res.name
        document.querySelector(".sum_cart>.price").innerText = res.price+"元"
 
 


$("#addcart").click(function(){
    // 加入购物城之前应该先判断是否登录，没有登录的用户是不能加入购物车的
    if(!username){
        alert("请先登录！！！");
        location.href = "../pages/login.html";
        return false;
    }
        // 还应该存储用户 存用户名 存价格和图
    var obj = {
        id:res.id,
        number:1,
        username:username,
        price:res.price,
        name:res.name,
        imgpath:res.imgpath
    }

    // 先从本地存储得到数据 ，拼接上新的数据，再将拼接好后的数据放到本地存储中
    var goods = localStorage.getItem("goods"); // json字符串 '[{},{}]'
    if(!goods){
        goods = '[]';
    }
    
    // 使用brr数组存储多个对象
    var brr = JSON.parse(goods); // [{},{number:5}]
    // var onOff = true;
    for(var i=0;i<brr.length;i++){
        if(brr[i].id === res.id){ // 购物车数据中的id和当前的商品的id相等了
            // brr[i].number++;
            // onOff = false;
            obj.number = ++brr[i].number; // 将数字递增后赋值给定义好的这个对象
          
            brr.splice(i,1); // 将这个对象从数组中删除 [{}] 下标为i 删除1个
        }
    }
    
    // if(onOff){
    brr.push(obj); // [{},{},{}]
    // }
    var str = JSON.stringify(brr);
    // console.log(str);

    localStorage.setItem("goods",str);
    alert("添加购物车成功");
    location.href="../pages/success.html";
    // 把对象转成字符串再存
    // var str = JSON.stringify(obj);
    // localStorage.setItem("goods",str); // 需要商品的id,还需要存储数量，值是多个数据 - 
    //不能单独存储一个变量，而应该是数组或者对象，数组中放两个数字很难分清哪个是id，哪个是数量，所以建议使用对象存储
});

//图片定时替换
var imgs=[];
imgs.push(res.pic1,res.pic2,res.pic3,res.pic4) 
// console.log(imgs.length)

var index = 0;
function qiehuan(){
    //缓慢消失效果
    $(".swiper_img").attr('src',imgs[index])
    index++
    if(index>imgs.length){
        index = 0 ;
    }
    $(".swiper_img").attr('src',imgs[index])
}
var setInt ="";
function startInt(){
    setInt = setInterval(function(){
        qiehuan()
    },2000);
}
startInt();
$(".arrow-right").on('click',function(){
    clearInterval(setInt);
    index++;
    qiehuan();
    startInt();
})
$(".arrow-left").on('click',function(){
    clearInterval(setInt);
        if(index==0){
           index=imgs.length-2
        }
        index = index-2;
        console.log(index);
        qiehuan();
        startInt();
})
})


}


//判断登录|注册 
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
//卷帘效果
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


//滚动条
 $(window).scroll(function() {  
            var scrolltop=window.pageYOffset; //滚动条距顶端的距离  
            var boxtop = $(".box").offset().top; //主要内容距离浏览器地段距离
            var mainheight = $('.detail').height(); //主要内容的高度
            var height = $(window).height(); 
            var bottomHeight = mainheight - height + boxtop;//移动到底部
            if(boxtop<scrolltop && scrolltop<bottomHeight){
                // console.log(1)
                $(".enlarge").addClass('fix')  //fix固定在中间
            }else{
                $(".enlarge").removeClass('fix')
                if(boxtop<scrolltop){
                    // console.log(2)
                    $(".enlarge").css({
                        "margin-top":bottomHeight + 'px'
                    })
                }	else{
                    $(".enlarge").css({
                        "margin-top":0
                    })
                }
            }
    })  
     


//购物车数量 用户名对应购物车
function getCartCount() {
    let goods = localStorage.getItem("goods");
    goods = JSON.parse(goods);
    console.log(countArr);
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