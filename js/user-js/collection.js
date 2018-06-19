
function getUserCollection(pageNumber){
    //默认第一页
    var page=pageNumber||1;
    var url='http://192.144.179.57:8080/demo-v1/api/collect/collectionList/'+page;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:url,
        type:'get',
        dataType: "json",
        success: function(data){
            if (data) {
                var div=document.getElementById("collection-container");
                div.innerHTML='';
                //无收藏项目
                if (data.data.items===null){
                    div.innerHTML+='<h3>暂无收藏</h3>';
                    return
                }
                //生成搜索结果显示部分
                for(var i=0;i<data.data.items.length;i++){
                    var paperInfo=data.data.items[i];
                    div.innerHTML+=
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
                        '                    </div>\n';
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
                            getUserCollection(parseInt(data.data.nowPage)-1)
                        };
                        continue;
                    }
                    if (obj[i].id==="next_page"){
                        obj[i].onclick=function(){
                            getUserCollection(parseInt(data.data.nowPage)+1)
                        };
                        continue;
                    }
                    (function (i) {
                        obj[i].onclick=function(){
                            getUserCollection(parseInt(obj[i].innerHTML));
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


$(function(){
    checkLogin();
    getUserCollection();
});