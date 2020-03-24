<?php
header("content-type:text/html;charset=utf8");
$username = $_POST["username"];
$password = $_POST["password"];
$con = mysqli_connect("localhost", "root", "root", "xiaomi");
mysqli_query($con, "set names utf8");
$res = mysqli_query($con, "select * from user where username='$username'");
$row = mysqli_fetch_assoc($res);
if ($row) {
    $res = mysqli_query($con, "select * from user where username='$username' and password='$password'");
    $row = mysqli_fetch_assoc($res);
    if ($row) {
        $arr = [
            "msg" => "登录成功！",
            "code" => 103
        ];
    } else {
        $arr = [
            "msg" => "用户名或密码错误！",
            "code" => 102
        ];
    }
}else{
    $arr=[
        "msg"=>"用户名不存在",
        "code"=>101
    ];
}
echo json_encode($arr);