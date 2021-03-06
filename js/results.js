
//GET信息获取，从URL中获取信息
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest={};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;//返回字典类型
}

/**
 * 搜索
 * @param sType 搜索类型
 * @param type 论文or专利
 * @param name 搜索内容
 * @param page 页码
 * @param year 搜索该时间的内容
 * @param order 相关性or引用次数or时间
 * @param orderType 正序or倒序
 */
function searching(sType, type, name, page, year, order, orderType, subjectID){
    "use strict";
    var page=page||1;
    var orderType=orderType||0;
    if (order==="referenceTimes"||order==="publicationYear") {
        orderType=1;
    }
    var final_url='http://192.144.179.57:8080/demo-v1/api/search/'+sType+'/'+page+'?type='+type+'&name='+name;
    if(year)
        final_url+='&year='+year;
    if(order)
        final_url+='&order='+order;
    if(orderType)
        final_url+='&orderType='+orderType;
    if (subjectID)
        final_url+='&subjectId='+subjectID;

    //保留搜索信息
    var searchInfo=document.getElementsByName("searchInfo");
    var searchType=document.getElementsByName("searchingType");
    searchInfo[0].value=name;
    var sTypeCHINESE;
    if (sType==="keyword") {
        searchType[0].options[0].selected=true;
        sTypeCHINESE=searchType[0].options[0].innerHTML;
    }
    else if (sType==="title"){
        searchType[0].options[1].selected=true;
        sTypeCHINESE=searchType[0].options[1].innerHTML;
    }
    else if (sType==="author"){
        searchType[0].options[2].selected=true;
        sTypeCHINESE=searchType[0].options[2].innerHTML;
    }
    else if (sType==="subject"){
        searchType[0].options[3].selected=true;
        sTypeCHINESE=searchType[0].options[3].innerHTML;
    }

    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:final_url,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                //排序方式生成
                var div=document.getElementById("resultsContainer");
                $(div).empty();
                $(div).append('                <div class="classification results_quantity">\n' +
                    '                    按照&nbsp;<em>“'+sTypeCHINESE+'&nbsp;”</em>&nbsp;搜索&nbsp;<em>“'+name+'&nbsp;”</em>，共'+data.data.totalElement+'个结果\n' +
                    '                </div>\n' +
                    '                <div class="classification">\n' +
                    '                    排序：\n' +
                    '                    <select class="sort_select" id="classifyMethod">\n' +
                    '                        <option value ="name">按相关性</option>\n' +
                    '                        <option value ="referenceTimes">按被引量</option>\n' +
                    '                        <option value="publicationYear">按时间降序</option>\n' +
                    '                    </select>\n' +
                    '                </div>');
                var sort=document.getElementById("classifyMethod");
                sort.onchange=function () {
                    //console.log(this.options[this.options.selectedIndex].value);
                    searching(sType, type, name, 1, null, this.options[this.options.selectedIndex].value);
                };
                if(order==="publicationYear") {
                    sort.options[2].selected=true;
                }else if(order==="referenceTimes") {
                    sort.options[1].selected=true;
                }else {
                    sort.options[0].selected=true;
                }

                //生成搜索结果显示部分
                if (data.data.items) {
                    for(var i=0;i<data.data.items.length;i++){
                        var paperInfo=data.data.items[i];
                        $(div).append('                <div class="agile-blog-grid" id="agile-blog-grid_'+(i+1)+'">\n' +
                            '                    <div class="blog-left-grids">\n' +
                            '                        <div class="blog-left-right_results">\n' +
                            '                            <div class="blog-left-right-top">\n' +
                            '                                <h4><a href="resultpage.html?id='+paperInfo.id+'" class="title_results">'+paperInfo.name+'</a><img src="images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'</span></h4>\n' +
                            '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;-&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="blog-left-right-bottom blog-left-right-bottom-results">\n' +
                            '                                <p class="abstract_results">'+paperInfo.abstractInfo+'</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="blog-left-right-bottom-2" id="subject_'+i+'">' +
                            '                            </div>' +
                            '                        </div>\n' +
                            '                        <div class="clearfix"> </div>\n' +
                            '                    </div>\n' +
                            '                </div>');
                        //显示作者
                        var p = document.getElementById("author_"+i);
                        for(var j=0;j<paperInfo.ownersName.length;j++) {
                            if (j)
                                p.innerHTML = '，'+p.innerHTML;
                            p.innerHTML = '<a href="professor.html?pid=' + paperInfo.ownersName[j].id + '" class="author_results">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                        }
                        //显示学科
                        if(paperInfo.subject.length){
                            var subject_re=document.getElementById("subject_"+i);
                            $(subject_re).append('学科分类：');
                            for(var k=0;k<paperInfo.subject.length;k++){
                                $(subject_re).append('<a href="subject.html?sid='+ paperInfo.subject[k].id +'">' + paperInfo.subject[k].name + '</a>');
                            }
                        }
                    }
                    var last_ele=document.getElementById("agile-blog-grid_"+data.data.items.length);
                    last_ele.style.borderBottom='0px';
                    last_ele.style.marginBottom='0px';
                }                             

                //红色字体
                showRedFont(name, sType);

                //生成翻页符
                displayNav(div,data.data.totalPage,data.data.nowPage);
                if (data.data.totalPage!==1&&data.data.totalPage!==0){
                    var obj=document.getElementById("page_re").getElementsByTagName("a");
                    for(i=0;i<obj.length;i++){
                        if (obj[i].id==="previous_page"){
                            obj[i].onclick=function(){
                                //console.log((parseInt(data.data.nowPage)-1)+'is onclick');
                                searching(sType, type, name, parseInt(data.data.nowPage)-1, year, order, orderType, subjectID);
                            };
                            continue;
                        }
                        if (obj[i].id==="next_page"){
                            obj[i].onclick=function(){
                                //console.log((parseInt(data.data.nowPage)+1)+'is onclick');
                                searching(sType, type, name, parseInt(data.data.nowPage)+1, year, order, orderType, subjectID)
                            };
                            continue;
                        }
                        (function (i) {
                            obj[i].onclick=function(){
                                searching(sType, type, name, obj[i].innerHTML, year, order, orderType, subjectID);
                            };
                        })(i);
                    }
                }
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
        }
    });
}

/**
 * 学科排序算法，按number降序排列
 * @param a
 * @param b
 */
function subjectSortMethod(a, b) {
    return b.number-a.number;
}

/**
 * 生成右侧学科分类
 * @param name 搜索内容
 * @param type 检索方式（关键字、篇名……）
 */
function subjectCategory(name, type) {
    test("学科分类统计中。。");
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/search/subject?name='+name+'&type='+type,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                //console.log(data);
                //排序方式生成
                var list=document.getElementById("sub_list");
                if(data.data.length){
                    list.innerHTML='';
                    var sortData=data.data.sort(subjectSortMethod);
                    for (var i=0;i<sortData.length&&i<=20;i++){
                        $(list).append('<li><a href="#" onclick="searching(\''+type+'\',\'paper\',\''+name+'\',null,null,null,null,'+sortData[i].id+')">'+sortData[i].subject+'('+sortData[i].number+')'+'</a></li>');
                    }
                }else {
                    list.innerHTML="<li><a href='#'>空</a></li>";
                }
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
        }
    });
}

/**
 * 年份排序方法，降序
 * @param a
 * @param b
 * @returns {number}
 */
function yearSortMethod(a, b) {
    return b.year-a.year;
}

/**
 * 生成右侧时间分类
 * @param name 搜索内容
 * @param type 检索方式（关键字、篇名……）
 */
function timeCategory(name, type) {
    test("时间分类统计中。。");
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/search/year?name='+name+'&type='+type,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                //console.log(data);
                //排序方式生成
                var list=document.getElementById("time_list");
                if(data.data.length){
                    list.innerHTML='';
                    var sortData=data.data.sort(yearSortMethod);
                    for (var i=0;i<sortData.length;i++){
                        if (sortData[i].year)
                            $(list).append('<li><a href="#" onclick="searching(\''+type+'\',\'paper\',\''+name+'\',null,'+sortData[i].year+')">'+sortData[i].year+'('+sortData[i].number+')'+'</a></li>');
                        else
                            $(list).append('<li><a href="#" onclick="searching(\''+type+'\',\'paper\',\''+name+'\',null,'+sortData[i].year+')">其他('+sortData[i].number+')'+'</a></li>');
                    }
                }else {
                    list.innerHTML="<li><a href='#'>空</a></li>";
                }
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
        }
    });
}

/**
 * 关键字标红
 * @param keyword 关键字
 * @param type 搜索类型
 */
function showRedFont(keyword, type) {
    var reg=new RegExp(keyword,"gi");//正则表达式，g代表全搜索
    var repStr="<span style='color: red;'>" + keyword + "</span>";//替换字符串
    var repStr_ab="<em style='color: red; font-style: normal;'>" + keyword + "</em>";//摘要部分的替换字符串
    var title=document.getElementsByClassName("title_results");
    var author=document.getElementsByClassName("author_results");
    var abstract=document.getElementsByClassName("abstract_results");
    var div=document.getElementsByClassName("agile-blog-grid");
    var j=0;//循环计数器
    if (type==="keyword") {
        for (j=0;j<div.length;j++){
            if (title[j].innerHTML){
                title[j].innerHTML=title[j].innerHTML.replace(reg,repStr);
            }
            if (abstract[j].innerHTML){
                abstract[j].innerHTML=abstract[j].innerHTML.replace(reg,repStr_ab);
            }
        }
    }
    else if (type==="title"){
        for (j=0;j<title.length;j++){
            if (title[j].innerHTML){
                title[j].innerHTML=title[j].innerHTML.replace(reg,repStr);
            }
        }
    }
    else if (type==="author"){
        for (j=0;j<author.length;j++){
            if (author[j].innerHTML){
                author[j].innerHTML=author[j].innerHTML.replace(reg,repStr);
            }
        }
    }
    else if (type==="subject"){
    }
}

/**
 *显示分页部分
 * @param divObj
 * @param total
 * @param curPage
 */
function displayNav(divObj,total,curPage) {
    if (total===1||total===0){
        return;
    }
    $(divObj).append('                <nav>\n' +
        '                    <ul class="pagination" id="page_re">\n' +
        '                    </ul>\n' +
        '                </nav>');
    var start, end;
    if(curPage>=4){
        start=curPage-3;
        if (curPage<=total-3) {
            end=curPage+3;
        }
        else {
            end=total;
            start=(total>7)?total-6:1;
        }
    }
    else {
        start=1;
        end=(total<=7)?total:7;
    }

    var page_re=document.getElementById("page_re");
    //生成“上一页”
    if(curPage!==1){
        $(page_re).append('                        <li>\n' +
            '                            <a href="#" aria-label="Previous" id="previous_page">\n' +
            '                                <span aria-hidden="true">«</span>\n' +
            '                            </a>\n' +
            '                        </li>');
    }
    //生成中间数字部分
    for (var i=start;i<=end;i++){
        var ele_li=document.createElement("li");
        if(i===curPage)
            ele_li.innerHTML='<span id="current_page">'+i+'</span>';
        else
            ele_li.innerHTML='<a href="#">'+i+'</a>';
        page_re.appendChild(ele_li);
    }
    //生成“下一页”
    if(curPage!==total){
        $(page_re).append('                        <li>\n' +
            '                            <a href="#" aria-label="Next" id="next_page">\n' +
            '                                <span aria-hidden="true">»</span>\n' +
            '                            </a>\n' +
            '                        </li>');
    }
}

/**
 * 用于导航栏跳转的函数
 * @param type 检索类型
 */
function indexJump(type){
    var select=document.getElementsByName("searchingType");
    for(var i=0;i<select[0].length;i++){
        if(select[0].options[i].value===type){
            select[0].options[i].selected=true;
            return;
        }
    }
}

function test(a) {
    console.log(a);
}

//checklogin部分代码
function logout(){
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/logout',
        type:'delete',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    location.reload();
                }
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
}
function checkLogin() {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/user',
        type:'get',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    var loginButton = document.getElementById("loginButton");
                    var registerButton = document.getElementById("registerButton");
                    loginButton.innerHTML=
                        '欢迎，' + data.nickname;
                    registerButton.innerHTML=
                        '<a id="user-space" href="user/userinfo.html' + '">'+ '个人空间' + '</a>';
                    document.getElementById("changePassword").style.display = "inline";
                    document.getElementById("logout").style.display = "inline";
                }
            }else{
                alert('net failure');
                //没有登录就跳转到index.html
                window.location.href = 'index.html';
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
}
//checklogin结束