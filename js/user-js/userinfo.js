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
                    }
                    else {
                        $('#user-credit').text('普通用户');
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

$(function(){
    checkLogin();
    getUserInfo();
});
