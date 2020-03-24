<?php
header("content-type:text/html;charset=utf8");
$id=$_POST["id"];
$biao=$_POST["biao"];
$con = mysqli_connect("localhost","root","root","xiaomi");
mysqli_query($con,"set names utf8");
$res = mysqli_query($con,"select * from $biao where id=$id");
$row = mysqli_fetch_assoc($res);
echo json_encode($row);