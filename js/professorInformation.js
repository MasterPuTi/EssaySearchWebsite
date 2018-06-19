function showDiv1() {
    document.getElementById("proFuc1").style.display="block";
    document.getElementById("proFuc2").style.display="none";
    document.getElementById("proFuc3").style.display="none";
    document.getElementById("proFuc4").style.display="none";
}
function showDiv2() {
    document.getElementById("proFuc1").style.display="none";
    document.getElementById("proFuc2").style.display="block";
    document.getElementById("proFuc3").style.display="none";
    document.getElementById("proFuc4").style.display="none";
}
function showDiv3() {
    document.getElementById("proFuc1").style.display="none";
    document.getElementById("proFuc2").style.display="none";
    document.getElementById("proFuc3").style.display="block";
    document.getElementById("proFuc4").style.display="none";
}
function showDiv4() {
    document.getElementById("proFuc1").style.display="none";
    document.getElementById("proFuc2").style.display="none";
    document.getElementById("proFuc3").style.display="none";
    document.getElementById("proFuc4").style.display="block";
}

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

function professorGetInfor() {               //获得专家信息  并展示
    var request=GetRequest();
    var expertId;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:' http://192.144.179.57:8080/demo-v1/api/visitor/expert/'+request["pid"],
        type:'get',
        async:false,
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    var professorName = document.getElementById("professorName");
                    var professorID = document.getElementById("professorID");
                    var introduction = document.getElementById("introduction");
                    var institution = document.getElementById("institution");
                    var researchField = document.getElementById("researchField");
                    var patentName = new Array();
                    patentName = document.getElementsByClassName("patentName");

                    professorName.innerHTML=
                        data.expertInfo.realName;
                    professorID.innerText=
                        'ID：'+data.expertInfo.id;

                    expertId = data.expertInfo.id;    //checkRole中用到
                    var newImage=document.getElementById("professor_relation_image"); //专家关系网络图
                    newImage.src = "images/expert_relationship/"+expertId+".png";

                    console.log(expertId);
                    introduction.innerHTML=
                        data.expertInfo.introduction;
                    institution.innerHTML=
                        data.expertInfo.institution;
                    researchField.innerHTML=
                        data.expertInfo.researchField;

                    var tmp = document.getElementById("papername_containner");
                    if(data.expertInfo.paperName.length === 0){
                        var noPaper= document.createElement("p");
                        noPaper.innerHTML="该专家尚未发表过论文。";
                        tmp.appendChild(noPaper);
                    }
                    else {
                        for(var i=0;i<data.expertInfo.paperName.length;i++){
                            console.log(data.expertInfo.paperName[i]);
                            var x = document.createElement("p");
                            x.innerHTML=
                                data.expertInfo.paperName[i];
                            tmp.appendChild(x);
                        }
                    }
                    // else {
                    //     for(var i=0;i<data.expertInfo.paperName.length;i++){
                    //         var div1=document.createElement("div");
                    //
                    //         var p1=document.createElement("p");
                    //         p.innerHTML=
                    //             data.expertInfo.paperName[i];
                    //         div1.appendChild(p);
                    //
                    //         var button1=document.createElement("button");
                    //         button1.
                    //
                    //     }
                    // }

                    tmp = document.getElementById("patentname_containner");
                    if(data.expertInfo.patentName.length === 0){
                        var noPatent = document.createElement("p");
                        noPatent.innerHTML="该专家尚未申请过专利。";
                        tmp.appendChild(noPatent);
                    }
                    else {
                        for(var i=0;i<data.expertInfo.patentName.length;i++){
                            console.log(data.expertInfo.patentName[i]);
                            var x = document.createElement("p");
                            x.innerHTML=
                                data.expertInfo.patentName[i];
                            tmp.appendChild(x);
                        }
                    }
                }
            }else{
                alert('net failure');
            }
        },
    });
    return expertId;
}

function checkRole(expertId) {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/user/userInfo',
        type:'get',
        dataType: "json",
        success: function (data) {
            console.log("1");
            if(data.status === "succeed"){
                //var test = professorGetInfor();
                if(data.data.expertId === expertId){
                    console.log("3");
                }
                else {
                    document.getElementById("professorFuctionTop").style.display="none";
                    console.log("4");
                }
            }
        }
    })
}


function professorEdit(){                     //专家功能之修改专家信息
    var newIntroduction=document.getElementById("proInforEdit").value;
    console.log(JSON.stringify(newIntroduction));
    var dataIntro={
        "introduction": newIntroduction
    }
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/expert/info/edit',
        type:'post',
        dataType: "json",
        data:JSON.stringify(dataIntro),
        success: function (data) {
            if(data){
                console.log(data);
                if(data.status==="succeed"){
                    alert('修改成功！');
                    window.location.href = window.location.href;
                }
                else
                    alert(data.info);
            }
            else {
                alert('网络出现问题，请重试');
            }
        }
    })
}

function professorAppeal(){              //专家功能之门户信息申诉
    var AppealContent=document.getElementById("proInforAppeal").value;
    console.log(JSON.stringify(AppealContent));
    var dataAppeal={
        "content": AppealContent
    }
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:'http://192.144.179.57:8080/demo-v1/api/expert/info/error',
        type:'post',
        dataType: "json",
        data:JSON.stringify(dataAppeal),
        success: function (data) {
            if(data){
                console.log(data);
                if(data.status==="succeed"){
                    alert('申诉成功！');
                    //window.location.href = window.location.href;
                }
                else
                    alert(data.info);
            }
            else {
                alert('网络出现问题，请重试');
            }
        }
    })
}

function checkLogin() {          //左上角的checklogin
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
                        '<a href="user/userinfo.html?nickname=' + data.nickname + '">'+ '个人空间' + '</a>';
                    var tmp = document.getElementById("changePassword");
                    if(tmp!=null)
                    {
                        tmp.style.display = "inline";
                    }
                    tmp = document.getElementById("logout");
                    if(tmp!=null)
                    {
                        tmp.style.display = "inline";
                    }
                }
            }else{
                alert('net failure');
                //没有登录就跳转到index.html
                window.location.href = 'index.html';
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
}


window.onload=function(){
    checkLogin();
    //professorGetInfor();
    checkRole(professorGetInfor());
};

