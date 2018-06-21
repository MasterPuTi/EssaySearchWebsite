function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest=new Object();
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    console.log("test "+theRequest);
    return theRequest;//返回字典类型
}

function subjectInfo() {
    var request=GetRequest();
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/visitor/subjectinfo/'+request["sid"],
        type:'get',
        async:false,
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    /*var result_name=document.getElementById("result_name");
                    var result_ownersName=document.getElementById("result_ownersName");
                    var result_publicationTime=document.getElementById("result_publicationTime");
                    var result_abstractInfo=document.getElementById("result_abstractInfo");
                    result_name.innerHTML=
                        data.data.name;
                    for(var j=0;j<data.data.ownersName.length;j++) {
                        result_ownersName.innerHTML+=data.data.ownersName[j].name;
                    }
                    //result_ownersName.innerHTML=
                    //data.data.ownersName.id;
                    result_publicationTime.innerHTML=
                        data.data.publicationTime;
                    result_abstractInfo.innerHTML=
                        data.data.abstractInfo;*/
                    var subjectinfo_name=document.getElementById("subjectinfo_name");
                    subjectinfo_name.innerHTML=
                        data.subjectinfo.name;
                }
                else
                    alert(data.status);
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

window.onload=function(){
    //checkLogin();
    //professorGetInfor();
    //checkRole(professorGetInfor());
    subjectInfo();
};