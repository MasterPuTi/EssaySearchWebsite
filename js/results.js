//GET信息获取，从URL中获取信息
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest=new Object();
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;//返回字典类型
}

//按篇名搜索
function searchByTitle(){
    var request=GetRequest();
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/search/list?type=paper&name='+request["searchInfo"],
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(request["searchingType"]==="title"){
                    var html=document.getElementById("resultsContainer").innerHTML;
                    html='';
                    html+='                <div class="classification">\n' +
                        '                    排序：\n' +
                        '                    <select class="sort_select">\n' +
                        '                        <option value ="correlation" selected="selected">按相关性</option>\n' +
                        '                        <option value ="cite_num">按被引量</option>\n' +
                        '                        <option value="publish_time">按时间降序</option>\n' +
                        '                    </select>\n' +
                        '                </div>';
                    for(var i=0;i<data.data.totalElement;i++){
                        var paperInfo=data.data.items[i];
                        html+='                <div class="agile-blog-grid">\n' +
                            '                    <div class="blog-left-grids">\n' +
                            '                        <div class="blog-left-right_results">\n' +
                            '                            <div class="blog-left-right-top">\n' +
                            '                                <h4><a href="resultpage.html?id='+paperInfo.id+'">'+paperInfo.name+'</a><img src="images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'</span></h4>\n' +
                            '                                <p>';

                        for(var j=0;j<paperInfo.ownersName.length;j++){
                            html+='<a href="professor.html?pid=1">Author</a>';
                        }

                        html+='&nbsp;-&nbsp; 2016 &nbsp;-&nbsp; 《自动化学报》&nbsp;-&nbsp; 被引量：130</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="blog-left-right-bottom">\n' +
                            '                                <p>Vivamus fermentum vel lacus ac ornare. Vestibulum pulvinar massa pharetra risus pharetra, eu blandit risus viverra. Aenean in ultrices enim, ut tincidunt libero. Phasellus libero enim, semper ac felis eget, efficitur ultrices orci. Aenean tincidunt lacus lorem, non varius enim luctus sed. Quisque eu aliquet quam, et sollicitudin nibh. Duis finibus at felis eu laoreet. Nulla non lacus sem.</p>\n' +
                            '                                <!--<a href="resultpage.html">More</a>-->\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="clearfix"> </div>\n' +
                            '                    </div>\n' +
                            '                </div>';
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

window.onload=searchByTitle;