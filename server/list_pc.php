<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect("localhost","root","root","xiaomi");
mysqli_query($con,"set names utf8");
$res = mysqli_query($con,"select * from pc");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode($arr);