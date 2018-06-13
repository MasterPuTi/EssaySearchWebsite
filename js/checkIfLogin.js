function logout(){
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/logout',
        type:'delete',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    location.reload();
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
function checkLogin() {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/authen/user',
        type:'get',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    var loginButton = document.getElementById("loginButton");
                    var registerButton = document.getElementById("registerButton");
                    loginButton.innerHTML=
                        '欢迎，' + data.nickname;
                    registerButton.innerHTML=
                        '<a href="user.html?nickname=' + data.nickname + '">'+ '个人空间' + '</a>';
                    document.getElementById("changePassword").style.display = "visible";
                    document.getElementById("logout").style.display = "visible";
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

window.onload=checkLogin;