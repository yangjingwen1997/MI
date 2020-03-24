// 判断是否登录
var username = getCookie("username");
if(username){
    document.querySelector(".r_cart").innerHTML = `
    <div class="r_cart">
        <a href="javascript:;" style="color:#ff6700;">欢迎${username} </a> |
        <a class='logout' href="javascript:;"> 退出</a>
    </div>
   `
    var btn = document.querySelector(".logout");
    // console.log(btn);
    btn.onclick=function(){
        removeCookie("username");
        document.querySelector(".r_cart").innerHTML = `
        <div class="r_cart">
            <a href="../pages/login.html">登录 </a>| 
            <a  href="../pages/regist.html"> 注册</a>
        </div>`
    }
   $(".now").remove();
}




 

var p=PAjax({
    url:"../server/cart.php",
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
           <div class="addc" id="addcarts" onclick="fn()">加入购物车</div>
      
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
let goods = localStorage.getItem("goods");
// 判断本地存储中是否有数据 - 购物车是否有商品
if(goods == "[]"){
    $("div.cart_main").html(`
    <div class="cart_empty"> 
        <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>登录后将显示您之前加入的商品</p>
        <a class="now" href="../pages/login.html" >立即登录</a>
        <a href="../pages/list.html"> 马上去购物</a>
        </div>
    </div>
<!-- 精品推荐 recommend -->
    <div class="recommend">
        <h2>为您推荐</h2>
        <ul class="groom w" id="groom">
        <!-- js -->
    
        </ul>
    </div>
    `
    );
}
goods = JSON.parse(goods);
// console.log(goods)
var r = goods.some(function(v){
    return v.username == username;
});
// console.log(r)
if(!r){
    $("div.cart_main>.in").html(`
    
    <div class="cart_empty"> 
        <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>登录后将显示您之前加入的商品</p>
        <a class="now" href="../pages/login.html" >立即登录</a>
        <a href="../pages/list.html"> 马上去购物</a>
        </div>
    </div>
    `);
    $(".page_main li").remove();
}else{
    $(".in").remove()
}
let ids = [];
for(var i=0;i<goods.length;i++){
    ids.push(goods[i].id);
}

ids = ids.join(",");
PAjax({
    url:"../server/addcart.php",
    method:"post",
    data:{ids:ids},
    dataType:"json"
}).then(function(res){
    // console.log(res);
});

var str = '';
    for(let i=0;i<goods.length;i++){
        if(goods[i].username == username){
            // console.log(goods[i].username)
            var number = null;
            for(let j=0;j<goods.length;j++){
                if(goods[j].id == goods[i].id){
                    number = goods[j].number;
                }
            }
            str += `
            <div class="page_img aa">
            <div class="p_all"><input type="checkbox" class="one"></div> 
            <div class="p_img">&nbsp;<img src="${goods[i].imgpath}" width="80" height="80"></div>
            <div class="p_name name">${goods[i].name}</div>
            <div class="p_price price"><b>${goods[i].price}</b>元</div>
            <div class="p_num"><button class="jian">-</button>
            <input type="number" class="number" value="${number}">
            <button class="jia">+</button>
            </div>
            <div class="p_total sum"><i>${goods[i].price * number}</i>元</div>
            <div class="p_del">
            <a href="javascript:;" class="btn" data-id="${goods[i].id}" }">删除</a>
            </div>
           
            </div>   
            `
        }
    }
  
        

       

    $(".aa").html(str);
    oneCheck();
    allCheck();
    removeGood();
    jia();
    xiaoji();
    zong();
    // 全选功能
    
function allCheck(){
    $(".all").click(function(){
        // console.log($(this).prop("checked"));
        $(".one").prop("checked",$(this).prop("checked"))
        $(".all").prop("checked",$(this).prop("checked"))
        zong();
    });
}

// 写在这里，代码会比数据加载先执行，所以新加载的数据的 .one没有绑定过事件，所以点击没有效果
// $("ul").on("click",".one",function(){
//     if(!$(this).prop("checked")){
//         $(".all").prop("checked",false)
//     }
// });
function oneCheck(){
    $(".one").click(function(){
        var ones = document.querySelectorAll(".one")
        ones = Array.prototype.slice.call(ones);
        var res = ones.every(function(v){
            return $(v).prop("checked")
        });
        // console.log(res);
        if(res){
            $(".all").prop("checked",true);
        }else{
            $(".all").prop("checked",false)
        }
        zong();
    });
}

// 删除商品的事件
function removeGood(){
    $(".p_del>a").click(function(){
        if(confirm("你确定要删除吗？")){
            // 将本地存储数据拿出来
            var arr = JSON.parse(localStorage.getItem("goods"));
            // 判断其中的对象的id和当前删除按钮所属的商品的id是否相等
            for(var i=0;i<arr.length;i++){
                if(arr[i].id == $(this).attr("data-id")){
                    arr.splice(i,1)
                }
            }

            // 如果相等，就将这个对象删除，删除后的数组重新存入本地存储
            localStorage.setItem("goods",JSON.stringify(arr));
            // 将当前删除按钮所在的li隐藏不显示
            $(this).parent().parent().remove();
        }
        var goods = localStorage.getItem("goods");
        if(goods=="[]"){
            $("div.cart_main>.in").html(`
            <div class="cart_empty"> 
                <div class="empty">
                <h2>您的购物车还是空的！</h2>
                <p>登录后将显示您之前加入的商品</p>
                <a class="now "href="../pages/login.html" >立即登录</a>
                <a href="../pages/list.html"> 马上去购物</a>
                </div>
            </div>
        
            `)
        }
        zong();
    });
}

// 加号的点击
function jia(){
    $(".p_num>.jia").click(function(){
        $(this).prev().val($(this).prev().val()-0+1);
        if( $(this).prev().val()-0  >=  $(this).parent().next().next().children("a").attr("data-stock")-0   ){
            $(this).prev().val($(this).parent().next().next().children("a").attr("data-stock"))
        }
        // console.log($(this).parent().next().next().children("a").attr("data-stock"));
        var goods = JSON.parse(localStorage.getItem("goods"));
        for(var i=0;i<goods.length;i++){
            if(goods[i].id == $(this).parent().next().next().children("a").attr("data-id")){
                goods[i].number = goods[i].number-0+1 // 如果id相等让数量++
                if(goods[i].number >= $(this).parent().next().next().children("a").attr("data-stock")){
                    goods[i].number = $(this).parent().next().next().children("a").attr("data-stock")
                }
                localStorage.clear();
                localStorage.setItem("goods",JSON.stringify(goods));
                // console.log(goods);
            }
        }
        xiaoji()
        zong();
    });
    $(".jian").click(function(){
        $(this).next().val($(this).next().val()-0-1);
        if($(this).next().val()<=1){
            $(this).next().val(1);
        }
        var goods = JSON.parse(localStorage.getItem("goods"));
        for(var i=0;i<goods.length;i++){
            if(goods[i].id == $(this).parent().next().next().children("a").attr("data-id")){
                goods[i].number = goods[i].number-0-1 // 如果id相等让数量++
                if(goods[i].number<=1){
                    goods[i].number=1
                }
                localStorage.clear();
                localStorage.setItem("goods",JSON.stringify(goods));
                // console.log(goods);
            }
        }
        xiaoji();
        zong();
    });
    $("input.number").blur(function(){
        if($(this).val()<=1){
            $(this).val(1);
        }
        if(  $(this).val()-0  >=  $(this).parent().next().next().children("a").attr("data-stock")-0   ){
            $(this).val($(this).parent().next().next().children("a").attr("data-stock"))
        }
        var goods = JSON.parse(localStorage.getItem("goods"));
        for(var i=0;i<goods.length;i++){
            if(goods[i].id == $(this).parent().next().next().children("a").attr("data-id")){
                goods[i].number = $(this).val()-0 // 如果id相等让数量--
                localStorage.clear();
                localStorage.setItem("goods",JSON.stringify(goods));
                // console.log(goods);
            }
        }
        xiaoji();
        zong();
    });
}

// 计算小计
function xiaoji(){
    $(".p_del>a").each(function(i,v){
        // console.log(v)  //删除的<a></a>
        var price = $(v).parent().prev().prev().prev().children("b").text();
        var number = $(v).parent().prev().prev().children("input.number").val();
        var xj = price * number;
        // console.log(price,number,xj);
        $(v).parent().prev().children("i").text(xj);
    });
}

// 计算总数和总价
function zong(){
    var num = 0;
    var price = 0;
    $(".one:checked").each(function(i,v){
        // console.log($(v));
        num += $(v).parent().next().next().next().next().children("input.number").val()-0;
        price += $(v).parent().next().next().next().next().next().children("i").text()-0;
        console.log(price)
    
    });
    $("li>.total").text(num);
    $(".r .totalPrice").text(price);
}