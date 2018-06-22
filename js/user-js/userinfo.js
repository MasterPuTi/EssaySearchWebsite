function getUserInfo() {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/user/userInfo',
        type:'get',
        dataType: "json",
        success: function(userinfo){
            if (userinfo) {
                if (userinfo.status==='succeed'){           //success
                    $('#username').text(userinfo.data.nickName);
                    $('#user-point').text(userinfo.data.point);
                    if (userinfo.data.expert){
                        $('#user-credit').text('专家');
                        $('#manage-expert-btn').show();
                        document.getElementById('manage-expert-btn').onclick=manageExpertPage(userinfo.data.expertId);
                        $('#input-expertname').hide();
                        $('#authentication').hide();
                    }
                    else {
                        $('#user-credit').text('普通用户');
                        $('#input-expertname').show();
                        $('#authentication').show();
                        $('#manage-expert-btn').hide();
                    }
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


function showChangeForm() {
    $('#userinfo-change').show();
    $('#input-name').val($('#username').text());
    $('#userinfo-content').hide();
}

function cancelChange(){
    $('#userinfo-change').hide();
    $('#userinfo-content').show();
}

function submitChangeInfo(){
    var changeInfo={
        "nickname":$('#input-name').val()
    }
    $.ajax({
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/user/userInfo/change',
        type:'post',
        dataType: "json",
        data: changeInfo,
        success: function(userinfo){
            if (userinfo) {
                if (userinfo.status==='succeed'){           //success
                    $('#username').text(userinfo.data.nickName);
                    $('#user-point').text(userinfo.data.point);
                    if (userinfo.data.expert){
                        $('#user-credit').text('专家');
                    }
                    else {
                        $('#user-credit').text('普通用户');
                    }
                    window.location.href = 'userinfo.html';
                }
                else {
                    alert(userinfo.info);
                }
            }else{
                alert('net failure');
                //没有登录就跳转到index.html
                window.location.href = '../index.html';
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}


function authentication() {
    if ($('#input-expertname input').val().length === 0) {
        alert('输入的专家名字不能为空');
    }
    else {
        searching('author','paper',$('#input-expertname input').val(),null,null,null,null);
    }

}

function manageExpertPage(expertId){
    window.location.href='../professor.html?pid='+expertId;
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

    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:final_url,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                if (data.status === 'succeed') {
                    if (data.data.totalElement===0){
                        alert('该专家不存在')
                    }
                    else {
                        for (var i=0;i<data.data.items[0].ownersName.length;++i){
                            if (data.data.items[0].ownersName[i].name===name){
                                window.location.href='../professor.html?pid='+data.data.items[0].ownersName[i].id;
                                return;
                            }
                        }
                    }
                }
            } else {
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

$(function(){
    checkLogin();
    // $('#manage-expert-btn').hide();
    // $('#input-expertname').hide();
    // $('#authentication').hide();
    getUserInfo();
});
