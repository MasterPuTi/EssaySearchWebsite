
function getUserPointRecord(pageNumber){
    //默认第一页
    var page=pageNumber||1;
    var url='http://192.144.179.57:8080/demo-v1/api/record/pointChangeRecordList/'+page;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:url,
        type:'get',
        dataType: "json",
        success: function(data){
            if (data.status==='succeed') {
                var div=document.getElementById("pointrecord-container");
                //无记录
                if (data.data.items===null){
                    div.innerHTML='';
                    div.innerHTML+='<h3>暂无积分变动记录</h3>';
                    return;
                }
                //生成显示部分
                $('tbody').append('<tr>\n' +
                    '<td>'+data.data.items[0].id+'</td>\n' +
                    '<td>'+data.data.items[0].recordTime+'</td>\n' +
                    '<td>'+data.data.items[0].pointsToChange+'</td>\n' +
                    '<td>'+data.data.items[0].content+'</td>\n' +
                    '</tr>');
                for(var i=1;i<data.data.items.length;i++){
                    $('tbody>tr:last').after('<tr>\n' +
                        '<td>'+data.data.items[i].id+'</td>\n' +
                        '<td>'+data.data.items[i].recordTime+'</td>\n' +
                        '<td>'+data.data.items[i].pointsToChange+'</td>\n' +
                        '<td>'+data.data.items[i].content+'</td>\n' +
                        '</tr>');
                }
                //只有一页不翻页
                if (data.data.totalPage===1){
                    return;
                }
                //生成翻页符
                displayNav(div,data.data.totalPage,data.data.nowPage);
                var obj=document.getElementById("page_re").getElementsByTagName("a");
                for(var i=0;i<obj.length;i++){
                    if (obj[i].id==="previous_page"){
                        obj[i].onclick=function(){
                            getUserPointRecord(parseInt(data.data.nowPage)-1)
                        };
                        continue;
                    }
                    if (obj[i].id==="next_page"){
                        obj[i].onclick=function(){
                            getUserPointRecord(parseInt(data.data.nowPage)+1)
                        };
                        continue;
                    }
                    (function (i) {
                        obj[i].onclick=function(){
                            getUserPointRecord(parseInt(obj[i].innerHTML));
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
    getUserPointRecord();
});