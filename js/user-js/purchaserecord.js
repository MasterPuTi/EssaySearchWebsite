
function getPurchaseRecord(pageNumber){
    //默认第一页
    var page=pageNumber||1;
    var url='http://192.144.179.57:8080/demo-v1/api/user/listBuyRecord/'+page;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:url,
        type:'get',
        dataType: "json",
        success: function(data){
            if (data) {
                var div=document.getElementById("purchase-container");
                div.innerHTML='';
                //无收藏项目
                if (data.data.items===null){
                    div.innerHTML='<div class="alert alert-warning" role="alert">\n' +
                        '            <strong>提示：</strong>暂无购买记录' +
                        '        </div>';
                    return
                }
                //生成结果显示部分
                for(var i=0;i<data.data.items.length;i++){
                    //当前论文的信息
                    var paperInfo=data.data.items[i].achievementItem;
                    div.innerHTML+=
                        '                <div class="agile-blog-grid" id="paper_'+paperInfo.id+'">\n' +
                        '                    <div class="blog-left-grids">\n' +
                        '                        <div class="blog-left-right_results">\n' +
                        '                            <div class="blog-left-right-top">\n' +
                        '                                <h4><a href="../resultpage.html?id='+paperInfo.id+'" class="title_results">'+paperInfo.name+'</a><img src="../images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'&nbsp;&nbsp;</span></h4>' +
                        '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="blog-left-right-bottom blog-left-right-bottom-results">\n' +
                        '                                <p class="abstract_results">'+paperInfo.abstractInfo+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="blog-left-right-bottom-2" id="subject_'+i+'">' +
                        '                            </div>' +
                        '                            <div class="blog-left-right-bottom-2" id="recordtime_'+i+'">' +
                        '                            </div>' +
                        '                        </div>\n' +
                        '                        <div class="clearfix"> </div>\n' +
                        '                    </div>\n' +
                        '                </div>';

                    //显示作者
                    if (paperInfo.ownersName){
                        var p = document.getElementById("author_"+i);
                        for(var j=0;j<paperInfo.ownersName.length;j++) {
                            if (j)
                                p.innerHTML = '，'+p.innerHTML;
                            p.innerHTML = '<a href="../professor.html?pid=' + paperInfo.ownersName[j].id + '" class="author_results">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                        }
                    }
                    //显示学科
                    if(paperInfo.subjectName){
                        var subject_re=document.getElementById("subject_"+i);
                        $(subject_re).append('学科分类：');
                        for(var k=0;k<paperInfo.subjectName.length;k++){
                            $(subject_re).append('<a href="../subject.html?name='+ paperInfo.subjectName[k] +'">' + paperInfo.subjectName[k] + '</a>');
                        }
                    }
                    //显示购买时间
                    if (data.data.items[i].recordTime){
                        var recordtime=document.getElementById("recordtime_"+i);
                        $(recordtime).append('购买时间：'+data.data.items[i].recordTime);
                    }
                }

                //只有一页不需分页
                if (data.data.totalPage===1){
                    return;
                }
                //生成翻页符
                displayNav(div,data.data.totalPage,data.data.nowPage);
                var obj=document.getElementById("page_re").getElementsByTagName("a");
                for(var i=0;i<obj.length;i++){
                    if (obj[i].id==="previous_page"){
                        obj[i].onclick=function(){
                            getPurchaseRecord(parseInt(data.data.nowPage)-1)
                        };
                        continue;
                    }
                    if (obj[i].id==="next_page"){
                        obj[i].onclick=function(){
                            getPurchaseRecord(parseInt(data.data.nowPage)+1)
                        };
                        continue;
                    }
                    (function (i) {
                        obj[i].onclick=function(){
                            getPurchaseRecord(parseInt(obj[i].innerHTML));
                        };
                    })(i);
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

$(function(){
    getPurchaseRecord();
});