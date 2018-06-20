
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
                $('nav').html('');
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
    checkLogin();
    getUserPointRecord();
});