function checkRegister() {
    var form = document.getElementById('real-register-form');
    var elements = new Object();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements[tagElements[j].name] = tagElements[j].value;
    }
    alert(elements["password"]);
    alert(elements["passwordConfirm"]);
    if(elements["password"].toString()!=elements["passwordConfirm"].toString()){
        alert('两次密码不一致！');
        return false;
    }
    return true;
}