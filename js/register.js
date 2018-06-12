function checkRegister() {
    var form = document.getElementById('real-register-form');
    var elements = new Object();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements[tagElements[j].name] = tagElements[j].value;
    }
    if(elements["password"].toString()!==elements["passwordConfirm"].toString()){
        alert('两次密码不一致！');
        return false;
    }

    var data={
        "nickname": elements["username"],
        "password": elements["passwordConfirm"]
    }
    console.log(data);
    $.ajax({
        url:'http://192.144.179.57:8080/demo-v1/api/authen/register',
        type:'post',
        data: data,
        success: function(data){
            if (data) {
                alert('success');
                window.open('http://192.144.179.57:8080/EssaySearchWebsite/login.html');
            }else{
                alert('failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
    return true;
}