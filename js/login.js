var rem_username=getCookie("rem_username");
if(rem_username){
// 如果有就放到value中
document.querySelector("#username").value = rem_username
}

document.querySelector("input[type='button']").onclick=function(){
var username = document.querySelector("#username").value.trim();
var password = document.querySelector("#password").value.trim();
let errname=document.querySelector(".err_name");
let errpwd=document.querySelector(".err_pwd");
if(username==''){
    errname.innerText=("用户名不能为空！");
    return;
}
var reg = /^[1-9a-zA-Z]\w{5,11}$/;   
if(!reg.test(username)){
    errname.innerText=("用户名必须是数字和字母组成的6~12位");
    return;
}
if(password==''){
    errpwd.innerText=("密码不能为空！");
    return;
}
var reg = /^[0-9a-zA-Z]{6,16}$/;
if(!reg.test(password)){
    errpwd.innerText=("密码必须是数字和字母组成的6~16位");
    return;
}
// var rem=document.querySelector('#remember1');


var p=PAjax({
    method:"post",
    url:"../server/login.php",
    data:{
        "username":username,
        "password":password
    },
    dataType:"json"
}).then(function(res){
    if(res.code===101){
        alert(res.msg);
        return;
    }else if(res.code===102){
        alert(res.msg);
        return;
    }else if(res.code===103){
       
        // 设置登陆成功的用户名存到cookie中
        setCookie("username",username,7200);
        alert(res.msg);
        location.href = "../home.html"
    }
    // console.log(res);
});
}
