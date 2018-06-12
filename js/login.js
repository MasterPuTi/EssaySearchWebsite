function checkLogin() {
    var form = document.getElementById('real-login-form');
    var elements = new Object();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements[tagElements[j].name] = tagElements[j].value;
    }
    var data={
        "nickname": elements["username"],
        "password": elements["password"]
    }
    window.open('http://192.144.179.57:8080/EssaySearchWebsite/index.html'+'?nickname=' + elements["username"]);
    console.log(data);
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/login',
        type:'post',
        dataType: "json",
        data: JSON.stringify(data),
        success: function(data){
            if (data) {
                alert('login success!');
                window.open('http://192.144.179.57:8080/EssaySearchWebsite/index.html'+'?nickname=' + elements["username"]);
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