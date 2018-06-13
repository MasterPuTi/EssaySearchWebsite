function checkLogin() {
    var form = document.getElementById('real-login-form');
    var elements = new Object();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements[tagElements[j].name] = tagElements[j].value;
    }
    var dataLogin={
        "nickname": elements["username"],
        "password": elements["password"]
    }
    console.log(dataLogin);
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/login',
        type:'post',
        dataType: "json",
        data: JSON.stringify(dataLogin),
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    alert('login success!');
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