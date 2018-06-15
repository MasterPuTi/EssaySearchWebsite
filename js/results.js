//GET信息获取，从URL中获取信息
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;//返回字典类型
}

//按篇名搜索
function searchByTitle(searchInfo){
    var para={
        "type": "paper",
        "name": searchInfo
    }
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/search/list',
        type:'post',
        dataType: "json",
        data:JSON.stringify(para),
        success: function(data){
            if (data) {
                console.log(data);
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

var request=GetRequest();//获取请求信息
console.log(request);
if(request["searchType"]=="title"){
    window.onload = searchByTitle;
}
