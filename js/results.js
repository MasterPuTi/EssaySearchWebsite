
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
function searching(sType, type, name, page, year, order, orderType){
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
                    '                    根据"'+name+'"搜索，共'+data.data.totalElement+'个结果\n' +
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
                        if(paperInfo.subjectName){
                            var subject_re=document.getElementById("subject_"+i);
                            $(subject_re).append('学科分类：');
                            for(var k=0;k<paperInfo.subjectName.length;k++){
                                $(subject_re).append('<a href="subject.html?name='+ paperInfo.subjectName[k] +'">' + paperInfo.subjectName[k] + '</a>');
                            }
                        }
                    }
                    var last_ele=document.getElementById("agile-blog-grid_"+data.data.items.length);
                    last_ele.style.borderBottom='0px';
                    last_ele.style.marginBottom='0px';
                }

                //保留搜索信息
                var searchInfo=document.getElementsByName("searchInfo");
                var searchType=document.getElementsByName("searchingType");
                searchInfo[0].value=name;
                if (sType==="keyword") {
                    searchType[0].options[0].selected=true;
                }
                else if (sType==="title"){
                    searchType[0].options[1].selected=true;
                }
                else if (sType==="author"){
                    searchType[0].options[2].selected=true;
                }
                else if (sType==="subject"){
                    searchType[0].options[3].selected=true;
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
                                searching(sType, type, name, parseInt(data.data.nowPage)-1, year, order, orderType);
                            };
                            continue;
                        }
                        if (obj[i].id==="next_page"){
                            obj[i].onclick=function(){
                                //console.log((parseInt(data.data.nowPage)+1)+'is onclick');
                                searching(sType, type, name, parseInt(data.data.nowPage)+1, year, order, orderType)
                            };
                            continue;
                        }
                        (function (i) {
                            obj[i].onclick=function(){
                                searching(sType, type, name, obj[i].innerHTML, year, order, orderType);
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
            if (author[j].innerHTML){
                author[j].innerHTML=author[j].innerHTML.replace(reg,repStr);
            }
            if (abstract[j].innerHTML){
                abstract[j].innerHTML=abstract[j].innerHTML.replace(reg,repStr_ab);
            }
        }
    }
    else if (type==="title"){
        for (j=0;j<div.length;j++){
            if (title[j].innerHTML){
                title[j].innerHTML=title[j].innerHTML.replace(reg,repStr);
            }
        }
    }
    else if (type==="author"){
        for (j=0;j<div.length;j++){
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

window.onload = function(){
    var request=GetRequest();//从url中获取搜索信息以及类型
    searching(request["searchingType"], "paper", request["searchInfo"]);
    test("hah");
};

function test(a) {
    console.log(a);
}
