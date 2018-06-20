
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
                //收藏夹
                var collectionFolder=data.data.items;
                for (var j=0;j<collectionFolder.length;j++){
                    div.innerHTML+='<h3>'+collectionFolder[j].name+'</h3>';
                    //收藏夹下的所有收藏论文
                    for(var i=0;i<collectionFolder[j].items.length;i++){
                        //当前论文的信息
                        var paperInfo=collectionFolder[j].items[i];
                        div.innerHTML+=
                            '                    <div class="blog-left-grids" id="' +'paper_'+paperInfo.id+'">'+
                            '                        <div class="blog-left-right_results">\n' +
                            '                            <div class="blog-left-right-top">\n' +
                            '                                <h4><a href="../resultpage.html?id='+paperInfo.id+'">'+paperInfo.name+'</a><img src="../images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'&nbsp;&nbsp;</span>'+
                            '                                <a onclick="' + 'delFromCollection('+paperInfo.id+')"x>'+'<i class="fa fa-star"></i></a>'+'</h4>\n' +
                            '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;-&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="blog-left-right-bottom">\n' +
                            '                                <p>'+paperInfo.abstractInfo+'</p>\n' +
                            '                                <!--<a href="resultpage.html">More</a>-->\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="clearfix"> </div>\n' +
                            '                    </div>\n';
                        //显示作者
                        if (paperInfo.ownersName){
                            var p = document.getElementById("author_"+i);
                            for(var j=0;j<paperInfo.ownersName.length;j++) {
                                if (j)
                                    p.innerHTML = '，'+p.innerHTML;
                                p.innerHTML = '<a href="professor.html?pid=' + paperInfo.ownersName[j].id + '" class="author_results">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                            }
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

function addToCollection(paperId){
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/collect/paper/'+paperId+'/collection',
        type:'get',
        dataType: "json",
        success: function(res){
            if (res) {
                if (res.status==='succeed'){           //success
                    alert('收藏成功');
                    window.location.reload(true);
                }
                else {
                    alert('other error');
                }
            }else{
                alert('net failure');
                //没有登录就跳转到index.html
                window.location.href = '../index.html';
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
}

function delFromCollection(paperId){
    var confirmRes=confirm('确定取消收藏吗？');
    if (confirmRes){
        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url:'http://192.144.179.57:8080/demo-v1/api/collect/paper/'+paperId+'/undoCollection',
            type:'delete',
            dataType: "json",
            success: function(res){
                if (res) {
                    if (res.status==='succeed'){           //success
                        alert('取消收藏成功');
                        window.location.reload(true);
                    }
                    else {
                        alert('other error');
                    }
                }else{
                    alert('net failure');
                    //没有登录就跳转到index.html
                    window.location.href = '../index.html';
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    }
}

$(function(){
    checkLogin();
    getUserCollection();
});