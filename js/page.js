function Page(classname,obj={}){
    this.box = document.querySelector("."+classname);
    // 给div设置样式
    setStyle(this.box,{
        width:"600px",
        height:"50px",
        // border:"1px solid #000",
        display:"flex",
        justifyContent:"center",
        "align-items":"center",
        margin:"0 auto"
    });
    // 不管有没有传进来参数，我自己总是要定义一个的
    this.default={
        language:{
            first:"首页",
            prev:"上一页",
            list:"list", // 加一个键，用来制造放页码的div
            next:"下一页",
            last:"尾页",
        },
        pageData:{
            total:1000,
            pageSize:12
        },
        show:function(){}
    }
    // 处理如果传进来了应该替换
    this.obj = obj;
    if(this.obj.show){
        this.default.show=this.obj.show;
    }
    this.setDefault(); // 设置默认值
    // 计算总页数
    this.totalPage = Math.ceil(this.default.pageData.total/this.default.pageData.pageSize);
    // 定义当前页
    this.currentPage = 1;
    // 定义一个属性，用来存放页码的盒子 - div  list
    this.list = null;
    // 制造小标签
    this.createTag();
    // 制造页码
    this.createPage();
    // 点击动起来
    this.dong();
    // 设置禁用项
    this.setDisabled();
    // 设置文本框点击跳转
    this.createGo();
    this.default.show(this.currentPage);
}
// 设置文本框点击跳转
Page.prototype.createGo=function(){
    var input = document.createElement("input");
    input.type = "number";
    input.style.width = "50px"
    this.box.appendChild(input);
    var btn = document.createElement("button");
    btn.innerText = "go"
    this.box.appendChild(btn);
}
// 设置禁用项
Page.prototype.setDisabled=function(){
    if(this.currentPage==1){
        this.box.children[1].style.background = this.box.children[0].style.background = "#ccc"
        this.box.children[0].setAttribute("name","disabled");
        this.box.children[1].setAttribute("name","disabled");
    }else{
        this.box.children[1].style.background = this.box.children[0].style.background = "#fff"
        this.box.children[1].removeAttribute("name");
        this.box.children[0].removeAttribute("name");
    }
    if(this.currentPage==this.totalPage){
        this.box.children[4].style.background = this.box.children[3].style.background = "#ccc"
        this.box.children[3].setAttribute("name","disabled");
        this.box.children[4].setAttribute("name","disabled");
    }else{
        this.box.children[4].style.background = this.box.children[3].style.background = "#fff"
        this.box.children[3].removeAttribute("name");
        this.box.children[4].removeAttribute("name");
    }
}
// 点击动起来的方法
Page.prototype.dong=function(){
    var _this = this;
    this.box.onclick=function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "first" && target.getAttribute("name")!="disabled"){
            _this.currentPage = 1;
            _this.list.innerHTML = '';
            _this.createPage();
            _this.setDisabled();
            _this.default.show(_this.currentPage);
        }else if(target.className == "last" && target.getAttribute("name")!="disabled"){
            _this.currentPage = _this.totalPage;
            _this.list.innerHTML = '';
            _this.createPage();
            _this.setDisabled();
            _this.default.show(_this.currentPage);
        }else if(target.className == "prev" && target.getAttribute("name")!="disabled"){
            _this.currentPage--;
            _this.list.innerHTML = '';
            _this.createPage();
            _this.setDisabled();
            _this.default.show(_this.currentPage);
        }else if(target.className == "next" && target.getAttribute("name")!="disabled"){
            _this.currentPage++;
            _this.list.innerHTML = '';
            _this.createPage();
            _this.setDisabled();
            _this.default.show(_this.currentPage);
        }else if(target.nodeName == "P" && target.innerText-0!=_this.currentPage){
            _this.currentPage = target.innerText-0;
            _this.list.innerHTML = '';
            _this.createPage();
            _this.setDisabled();
            _this.default.show(_this.currentPage);
        }else if(target.nodeName == "BUTTON" && target.previousElementSibling.value!='' &&  target.previousElementSibling.value-0>=1 && target.previousElementSibling.value-0<=_this.totalPage){
            _this.currentPage = target.previousElementSibling.value-0;
            _this.list.innerHTML = '';
            _this.createPage();
            _this.setDisabled();
            _this.default.show(_this.currentPage);
        }
    }
}
// 制造页码的方法
Page.prototype.createPage=function(){
    // 计算有多少页
    if(this.totalPage<=5){
        for(var i=1;i<=this.totalPage;i++){
            var p = document.createElement("p");
            p.innerText = i;
            setStyle(p,{
                border:"1px solid #000",
                margin:"0 5px",
                padding:"0 5px"
            });
            if(this.currentPage == i){
                p.style.background = "red"
            }
            this.list.appendChild(p);
        }
    }else{
        // 分情况
        if(this.currentPage<=3){
            for(var i=1;i<=5;i++){
                var p = document.createElement("p");
                p.innerText = i;
                setStyle(p,{
                    border:"1px solid #000",
                    margin:"0 5px",
                    padding:"0 5px"
                });
                if(this.currentPage == i){
                    p.style.background = "red"
                }
                this.list.appendChild(p);
            }
        }else if(this.currentPage>=this.totalPage-2){
            for(var i=this.totalPage-4;i<=this.totalPage;i++){
                var p = document.createElement("p");
                p.innerText = i;
                setStyle(p,{
                    border:"1px solid #000",
                    margin:"0 5px",
                    padding:"0 5px"
                });
                if(this.currentPage == i){
                    p.style.background = "red"
                }
                this.list.appendChild(p);
            }
        }else{
            for(var i=this.currentPage-2;i<=this.currentPage+2;i++){
                var p = document.createElement("p");
                p.innerText = i;
                setStyle(p,{
                    border:"1px solid #000",
                    margin:"0 5px",
                    padding:"0 5px"
                });
                if(this.currentPage == i){
                    p.style.background = "red"
                }
                this.list.appendChild(p);
            }
        }
    }
    
}
// 制造小标签的方法
Page.prototype.createTag=function(){
    // 制造上一页、下一页等4个标签
    for(var attr in this.default.language){
        var div = document.createElement("div");
        div.className = attr;
        if(attr != "list"){
            div.innerText = this.default.language[attr];
            setStyle(div,{
                border:"1px solid #000",
                margin:"0 5px",
                padding:"0 5px"
            });
        }else{ // 如果attr是list
            setStyle(div,{
                display:"flex",
                "justify-content":"center",
                "align-items":"center"
            });
            this.list = div;
        }
        
        this.box.appendChild(div);
    }
}
// 设置默认值
Page.prototype.setDefault=function(){
    for(var attr in this.obj.language){
        this.default.language[attr] = this.obj.language[attr];
    }
    for(var attr in this.obj.pageData){
        this.default.pageData[attr] = this.obj.pageData[attr];
    }
}

/////////////////////////////////////调用模板//////////////////////////////////////////////

// var page = new Page("box",{
//     language:{
//         first:"first",
//         prev:"上一页",
//         next:"下一页",
//         last:"last"
//     },
//     pageData:{
//         total:arr.length,
//         pageSize:pageSize
//     },
//     show:function(currentPage){
//         // console.log(789);
//         // arr 1000
//         // console.log(currentPage);
//         var arr1 = arr.slice((currentPage-1)*pageSize,currentPage*pageSize);
//         // console.log(arr1);
//         ul.innerHTML = '';
//         for(var i=0;i<arr1.length;i++){
//             ul.appendChild(arr1[i]);
//         }
//     }
// });

// 添加样式的函数
function setStyle(ele,styleObj){
    for(var attr in styleObj){
        ele.style[attr] = styleObj[attr];
    }
}