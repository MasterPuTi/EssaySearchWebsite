function getUserInfo() {
    $.ajax(

    );
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

$(function(){
    getUserInfo();
});
