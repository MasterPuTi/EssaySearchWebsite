window.onload = function(){
    checkLogin();
    var request=GetRequest();//从url中获取搜索信息以及类型
    searching(request["searchingType"], "paper", request["searchInfo"]);
    subjectCategory(request["searchInfo"], request["searchingType"]);
    timeCategory(request["searchInfo"], request["searchingType"]);
};