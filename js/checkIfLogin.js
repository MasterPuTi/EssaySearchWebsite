jQuery(document).ready(function( $ ) {



});

function checkALL() {
    $.ajax({
        url:'http://192.144.179.57:8080/demo-v1/api/authen/user',
        type:'post',
        data: data,
        success: function(data){
            if (data) {
                if(data.status === "succeed"){
                    var loginButton = document.getElementById("loginButton");
                    var registerButton = document.getElementById("registerButton");
                    loginButton.innerHTML=
                        '欢迎，' + data.nickname;
                    registerButton.innerHTML=
                        '<a href="user.html?nickname=' + data.nickname + '">'+ '个人空间' + '</a>';
                }
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
}

window.onload=checkALL;