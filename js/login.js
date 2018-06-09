function checkLogin() {
    var form = document.getElementById('real-login-form');
    var elements = new Object();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++){
        elements[tagElements[j].name] = tagElements[j].value;
        alert(tagElements[j].name);
    }

    return true;
}