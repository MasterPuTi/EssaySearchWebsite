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
                    var expert_1=document.getElementById("expert_1");
                    var expert_2=document.getElementById("expert_2");
                    var expert_3=document.getElementById("expert_3");
                    subjectinfo_name.innerHTML=
                        data.subjectinfo.name;
                    expert_1.innerHTML=
                        '<div class="price-block agile">\n' +
                        '                    <div class="price-gd-top pric-clr1">\n' +
                        '                        <h4>领域专家</h4>\n' +
                        '                        <h3>'+data.subjectinfo.expertName[0]+'</h3>\n' +
                        '                        <h5>机构</h5>\n' +
                        '                    </div>\n' +
                    '                    <div class="price-gd-bottom">\n' +
                    '                        <div class="price-list" id="expert_1_introduction">\n' +
                    '                            <ul>\n' +
                    '                                <li>被引频次 896</li>\n' +
                    '                                <li>成果数 68</li>\n' +
                        '                                <li>H指数 18</li>\n' +
                        '                                <li>G指数 29</li>\n' +
                        '                            </ul>\n' +
                        '                        </div>\n' +
                        '                        <div class="price-selet pric-sclr1">\n' +
                        '                            <a href="registration.html">Find More</a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>'
                    expert_2.innerHTML=
                        '<div class="price-block agile">\n' +
                        '                    <div class="price-gd-top pric-clr1">\n' +
                        '                        <h4>领域专家</h4>\n' +
                        '                        <h3>'+data.subjectinfo.expertName[1]+'</h3>\n' +
                        '                        <h5>机构</h5>\n' +
                        '                    </div>\n' +
                        '                    <div class="price-gd-bottom">\n' +
                        '                        <div class="price-list" id="expert_1_introduction">\n' +
                        '                            <ul>\n' +
                        '                                <li>被引频次 896</li>\n' +
                        '                                <li>成果数 68</li>\n' +
                        '                                <li>H指数 18</li>\n' +
                        '                                <li>G指数 29</li>\n' +
                        '                            </ul>\n' +
                        '                        </div>\n' +
                        '                        <div class="price-selet pric-sclr1">\n' +
                        '                            <a href="registration.html">Find More</a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>'
                    expert_3.innerHTML=
                        '<div class="price-block agile">\n' +
                        '                    <div class="price-gd-top pric-clr1">\n' +
                        '                        <h4>领域专家</h4>\n' +
                        '                        <h3>'+data.subjectinfo.expertName[2]+'</h3>\n' +
                        '                        <h5>机构</h5>\n' +
                        '                    </div>\n' +
                        '                    <div class="price-gd-bottom">\n' +
                        '                        <div class="price-list" id="expert_1_introduction">\n' +
                        '                            <ul>\n' +
                        '                                <li>被引频次 896</li>\n' +
                        '                                <li>成果数 68</li>\n' +
                        '                                <li>H指数 18</li>\n' +
                        '                                <li>G指数 29</li>\n' +
                        '                            </ul>\n' +
                        '                        </div>\n' +
                        '                        <div class="price-selet pric-sclr1">\n' +
                        '                            <a href="registration.html">Find More</a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>'
                    expert_4.innerHTML=
                        '<div class="price-block agile">\n' +
                        '                    <div class="price-gd-top pric-clr1">\n' +
                        '                        <h4>领域专家</h4>\n' +
                        '                        <h3>'+data.subjectinfo.expertName[3]+'</h3>\n' +
                        '                        <h5>机构</h5>\n' +
                        '                    </div>\n' +
                        '                    <div class="price-gd-bottom">\n' +
                        '                        <div class="price-list" id="expert_1_introduction">\n' +
                        '                            <ul>\n' +
                        '                                <li>被引频次 896</li>\n' +
                        '                                <li>成果数 68</li>\n' +
                        '                                <li>H指数 18</li>\n' +
                        '                                <li>G指数 29</li>\n' +
                        '                            </ul>\n' +
                        '                        </div>\n' +
                        '                        <div class="price-selet pric-sclr1">\n' +
                        '                            <a href="registration.html">Find More</a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>'
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