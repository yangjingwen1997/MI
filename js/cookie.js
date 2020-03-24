function setCookie(key,value,second=0,path="/"){
    var date = new Date();
    date.setTime(date.getTime()-8*3600*1000+second*1000);
    document.cookie = key + "=" + value + ";expires="+date+";path="+path;
}
function getCookie(key){
    var cookies = document.cookie;
    var arr = cookies.split("; ");
    for(var i=0;i<arr.length;i++){
        var brr = arr[i].split("=");
        if(brr[0] == key){
            return brr[1];
        }
    }
}
function removeCookie(key){
    setCookie(key,null,-5);
}