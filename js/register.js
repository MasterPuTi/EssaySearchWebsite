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
    var dataRegister={
        "nickname": elements["username"],
        "password": elements["passwordConfirm"]
    }
    console.log(dataRegister);
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/register',
        type:'post',
        dataType: "json",
        data: JSON.stringify(dataRegister),
        success: function(data){
            console.log(data);
            if (data) {
                if(data.status === "succeed"){
                    alert('register success!');
                    window.location.href = 'login.html';
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