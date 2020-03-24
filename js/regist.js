

document.querySelector("input[type='button']").onclick=function(){
    var username = document.querySelector("#user").value.trim();
    var password = document.querySelector("#pwd").value.trim();
    var errname=document.querySelector(".err_name");
    var errpwd=document.querySelector(".err_pwd");
    // 进行验证数据
    if(username==""){
        errname.innerText=("用户名不能为空!");
        return;
    }
    var reg=/^[1-9a-zA-Z]\w{5,11}$/;
    if(!reg.test(username)){
        errname.innerText=("用户名由6~12位字母、数字组成！");
        return;
    } 
    if(password==""){
        errpwd.innerText=("密码不能为空！");
        return;
    }
    var reg=/^[0-9a-zA-Z]{6,16}$/;
    if(!reg.test(password)){
        errpwd.innerText=("密码由6~16位字母、数字组成！");
        return;
    }
    var p=PAjax({
        method:"post",
        url:"../server/regist.php",
        data:{
            "username":username,
            "password":password
        },
        dataType:"json"
    }).then(function(res){
        if(res.status===101){
            alert(res.msg)
            return;
        }else if(res.status===102){
            alert(res.msg);
            location.href="../pages/login.html";
        }else if(res.status==103){
            alert(res.msg);
            return;
        }
    })
}

// $(function(){
//     $("#user").blur(function(){
//         $.post("../server/regist.php",
//         {"username":$("#user").val()},
//         function(data){
//             if(data=="0"){

//             }
//         }
        
        
//         )
//     })
// })