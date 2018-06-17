
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
//按关键字搜索
function searchByKeyword(type, name, year, order, orderType){
    var url='http://192.144.179.57:8080/demo-v1/api/search/list?type='+type+'&name='+name;
    if(year)
        url+='&year='+year;
    if(order)
        url+='&order='+order;
    if(orderType)
        url+='&orderType='+orderType;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:url,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                var div=document.getElementById("resultsContainer");
                div.innerHTML='';
                //生成排序选项
                div.innerHTML+='                <div class="classification">\n' +
                    '                    排序：\n' +
                    '                    <select class="sort_select" id="classifyMethod">\n' +
                    '                        <option value ="correlation">按相关性</option>\n' +
                    '                        <option value ="cite_num">按被引量</option>\n' +
                    '                        <option value="publish_time">按时间降序</option>\n' +
                    '                    </select>\n' +
                    '                </div>';
                if(order==="publicationTime") {
                    document.getElementById("classifyMethod").options[1].selected=true;
                }else if(order==="referenceTimes") {
                    document.getElementById("classifyMethod").options[2].selected=true;
                }else {
                    document.getElementById("classifyMethod").options[0].selected=true;
                }

                //生成搜索结果显示部分
                for(var i=0;i<data.data.totalElement;i++){
                    var paperInfo=data.data.items[i];
                    div.innerHTML+='                <div class="agile-blog-grid">\n' +
                        '                    <div class="blog-left-grids">\n' +
                        '                        <div class="blog-left-right_results">\n' +
                        '                            <div class="blog-left-right-top">\n' +
                        '                                <h4><a href="resultpage.html?id='+paperInfo.id+'">'+paperInfo.name+'</a><img src="images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'</span></h4>\n' +
                        '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;-&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="blog-left-right-bottom">\n' +
                        '                                <p>'+paperInfo.abstractInfo+'</p>\n' +
                        '                                <!--<a href="resultpage.html">More</a>-->\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="clearfix"> </div>\n' +
                        '                    </div>\n' +
                        '                </div>';
                    var p = document.getElementById("author_"+i);
                    for(var j=0;j<paperInfo.ownersName.length;j++) {
                        if (j)
                            p.innerHTML = '，'+p.innerHTML;
                        p.innerHTML = '<a href="professor.html?pid=' + paperInfo.ownersName[j].id + '">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                    }
                }

                //生成翻页符

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

//按篇名搜索
function searchByTitle(type, name, page, year, order, orderType){
    var page=page||1;
    var url='http://192.144.179.57:8080/demo-v1/api/search/list/'+page+'?type='+type+'&name='+name;
    if(year)
        url+='&year='+year;
    if(order)
        url+='&order='+order;
    if(orderType)
        url+='&orderType='+orderType;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:url,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                var div=document.getElementById("resultsContainer");
                div.innerHTML='';
                //生成排序选项
                div.innerHTML+='                <div class="classification">\n' +
                    '                    排序：\n' +
                    '                    <select class="sort_select" id="classifyMethod">\n' +
                    '                        <option value ="correlation">按相关性</option>\n' +
                    '                        <option value ="cite_num">按被引量</option>\n' +
                    '                        <option value="publish_time">按时间降序</option>\n' +
                    '                    </select>\n' +
                    '                </div>';
                if(order==="publicationTime") {
                    document.getElementById("classifyMethod").options[1].selected=true;
                }else if(order==="referenceTimes") {
                    document.getElementById("classifyMethod").options[2].selected=true;
                }else {
                    document.getElementById("classifyMethod").options[0].selected=true;
                }

                //生成搜索结果显示部分
                for(var i=0;i<data.data.items.length;i++){
                    var paperInfo=data.data.items[i];
                    div.innerHTML+='                <div class="agile-blog-grid">\n' +
                        '                    <div class="blog-left-grids">\n' +
                        '                        <div class="blog-left-right_results">\n' +
                        '                            <div class="blog-left-right-top">\n' +
                        '                                <h4><a href="resultpage.html?id='+paperInfo.id+'">'+paperInfo.name+'</a><img src="images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'</span></h4>\n' +
                        '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;-&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="blog-left-right-bottom">\n' +
                        '                                <p>'+paperInfo.abstractInfo+'</p>\n' +
                        '                                <!--<a href="resultpage.html">More</a>-->\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="clearfix"> </div>\n' +
                        '                    </div>\n' +
                        '                </div>';
                    var p = document.getElementById("author_"+i);
                    for(var j=0;j<paperInfo.ownersName.length;j++) {
                        if (j)
                            p.innerHTML = '，'+p.innerHTML;
                        p.innerHTML = '<a href="professor.html?pid=' + paperInfo.ownersName[j].id + '">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                    }
                }

                //生成翻页符
                displayNav(div,data.data.totalPage,data.data.nowPage);
                var obj=document.getElementById("page_re").getElementsByTagName("a");
                for(var i=0;i<obj.length;i++){
                    if (obj[i].id==="previous_page"){
                        obj[i].onclick=function(){
                            //console.log((parseInt(data.data.nowPage)-1)+'is onclick');
                            searchByTitle(type, name, parseInt(data.data.nowPage)-1, year, order, orderType);
                        };
                        continue;
                    }
                    if (obj[i].id==="next_page"){
                        obj[i].onclick=function(){
                            //console.log((parseInt(data.data.nowPage)+1)+'is onclick');
                            searchByTitle(type, name, parseInt(data.data.nowPage)+1, year, order, orderType)
                        };
                        continue;
                    }
                    (function (i) {
                        obj[i].onclick=function(){
                            searchByTitle(type, name, obj[i].innerHTML, year, order, orderType);
                        };
                    })(i);
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

//按作者搜索
function searchByAuthor(type, name, year, order, orderType){
    var url='http://192.144.179.57:8080/demo-v1/api/search/list?type='+type+'&name='+name;
    if(year)
        url+='&year='+year;
    if(order)
        url+='&order='+order;
    if(orderType)
        url+='&orderType='+orderType;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:url,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                var div=document.getElementById("resultsContainer");
                div.innerHTML='';
                //生成排序选项
                div.innerHTML+='                <div class="classification">\n' +
                    '                    排序：\n' +
                    '                    <select class="sort_select" id="classifyMethod">\n' +
                    '                        <option value ="correlation">按相关性</option>\n' +
                    '                        <option value ="cite_num">按被引量</option>\n' +
                    '                        <option value="publish_time">按时间降序</option>\n' +
                    '                    </select>\n' +
                    '                </div>';
                if(order==="publicationTime") {
                    document.getElementById("classifyMethod").options[1].selected=true;
                }else if(order==="referenceTimes") {
                    document.getElementById("classifyMethod").options[2].selected=true;
                }else {
                    document.getElementById("classifyMethod").options[0].selected=true;
                }

                //生成搜索结果显示部分
                for(var i=0;i<data.data.totalElement;i++){
                    var paperInfo=data.data.items[i];
                    div.innerHTML+='                <div class="agile-blog-grid">\n' +
                        '                    <div class="blog-left-grids">\n' +
                        '                        <div class="blog-left-right_results">\n' +
                        '                            <div class="blog-left-right-top">\n' +
                        '                                <h4><a href="resultpage.html?id='+paperInfo.id+'">'+paperInfo.name+'</a><img src="images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'</span></h4>\n' +
                        '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;-&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="blog-left-right-bottom">\n' +
                        '                                <p>'+paperInfo.abstractInfo+'</p>\n' +
                        '                                <!--<a href="resultpage.html">More</a>-->\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="clearfix"> </div>\n' +
                        '                    </div>\n' +
                        '                </div>';
                    var p = document.getElementById("author_"+i);
                    for(var j=0;j<paperInfo.ownersName.length;j++) {
                        if (j)
                            p.innerHTML = '，'+p.innerHTML;
                        p.innerHTML = '<a href="professor.html?pid=' + paperInfo.ownersName[j].id + '">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                    }
                }

                //生成翻页符
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
 *显示分页部分
 * @param divObj
 * @param total
 * @param curPage
 */
function displayNav(divObj,total,curPage) {
    if (total===1){
        return;
    }
    divObj.innerHTML+='                <nav>\n' +
        '                    <ul class="pagination" id="page_re">\n' +
        '                    </ul>\n' +
        '                </nav>';
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
        page_re.innerHTML+='                        <li>\n' +
            '                            <a href="#" aria-label="Previous" id="previous_page">\n' +
            '                                <span aria-hidden="true">«</span>\n' +
            '                            </a>\n' +
            '                        </li>';
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
        page_re.innerHTML+='                        <li>\n' +
            '                            <a href="#" aria-label="Next" id="next_page">\n' +
            '                                <span aria-hidden="true">»</span>\n' +
            '                            </a>\n' +
            '                        </li>'
    }
}

window.onload = function(){
    var request=GetRequest();
    if (request["searchingType"]==="title") {
        searchByTitle("paper", request["searchInfo"]);
    }
    else if (request["searchingType"]==="keyword"){

    }
    else if (request["searchingType"]==="author"){

    }
    else if (request["searchingType"]==="subject"){

    }
};
