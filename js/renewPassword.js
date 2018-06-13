function renewPassword() {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/user',
        type:'get',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    updatePassword(data.nickname);
                }
                else{
                    alert('未检查到登录状态，请登录！');
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
function updatePassword(username) {
    var form = document.getElementById('real-changepasswd-form');
    var elements = new Object();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements[tagElements[j].name] = tagElements[j].value;
    }
    if(elements["newPassword"].toString()!==elements["newPasswordConfirm"].toString()){
        alert('两次密码不一致！');
        return false;
    }
    var dataRenewPasswd={
        "newPassword": elements["newPasswordConfirm"],
        "nickname": username,
        "originalPassword": elements["oldPassword"]
    }
    console.log(dataRenewPasswd);
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/changePassword/' + elements["username"],
        type:'post',
        dataType: "json",
        data: JSON.stringify(dataRenewPasswd),
        success: function(data){
            console.log(data);
            if (data) {
                if(data.status === "succeed"){
                    alert('修改密码成功!');
                    window.location.href = 'http://192.144.179.57:8080/EssaySearchWebsite/index.html';
                }
                else
                    alert(data.info);
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
    return false;
}