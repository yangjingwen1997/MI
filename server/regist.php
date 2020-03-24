<?php
header("content-type:text/html;charset=utf8");
$username = $_POST["username"];
$password = $_POST["password"];
$con = mysqli_connect("localhost","root","root","xiaomi");
mysqli_query($con,"set names utf8"); // 避免乱码
$sql = "select * from user where username='$username'";
$res = mysqli_query($con,$sql); // 查询返回的是表的信息 - 不管有没有查到数据，都有信息 - 没有办法判断
// 需要提取数据来判断
$row = mysqli_fetch_assoc($res);
// 如果查到了，有数据，查不到返回null
if($row){
    $arr = [
        "msg"=>"用户名被占用了",
        "status"=>101
    ];
}else{
    // 没有查到，表示可以注册 - 把用户名和密码添加到数据库
    $sql = "insert user(username,password) values('$username','$password')";
    $res = mysqli_query($con,$sql); // 添加、修改、删除的返回值是一个布尔值 - 直接就能拿来判断
    if($res){
        $arr = [
            "msg"=>"注册成功",
            "status"=>102
        ];
    }else{
        $arr = [
            "msg"=>"注册失败，请刷新重试",
            "status"=>103
        ];
    }
}
echo json_encode($arr);