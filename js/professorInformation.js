// showdiv
function showDiv1() {
    document.getElementById("proFuc1").style.display="block";
    document.getElementById("proFuc2").style.display="none";
    document.getElementById("proFuc3").style.display="none";
}
function showDiv2() {
    document.getElementById("proFuc1").style.display="none";
    document.getElementById("proFuc2").style.display="block";
    document.getElementById("proFuc3").style.display="none";
}
function showDiv3() {
    document.getElementById("proFuc1").style.display="none";
    document.getElementById("proFuc2").style.display="none";
    document.getElementById("proFuc3").style.display="block";
}
// !--showdiv

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

                    professorName.innerHTML=
                        data.expertInfo.realName;
                    // professorID.innerText=
                    //     'ID：'+data.expertInfo.id;

                    expertId = data.expertInfo.id;    //checkRole中用到
                    var newImage=document.getElementById("professor_relation_image"); //专家关系网络图
                    newImage.src = "images/expert_relationship/"+expertId+".png";

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
                            var div1=document.createElement("div");
                            div1.style.height="300px";
                            div1.style.cssText="border-bottom:2px solid #9d9d9d;margin-top: 20px";
                            var tmpPaperID=data.expertInfo.paperName[i].id;
                            var tmpPoint=data.expertInfo.paperName[i].point;


                            var tmpRateString=data.expertInfo.paperName[i].distributionInfo;
                            var rateString="";
                            if(tmpRateString!=null)
                            {
                                if(tmpRateString.length === 0){
                                    console.log("meiyou rate");
                                    rateString=tmpRateString;
                                }
                                else {
                                    rateString="<分配情况：";
                                    for(var q=0;q<tmpRateString.length;q++){
                                        rateString=rateString+tmpRateString[q].expert+"："+tmpRateString[q].rate+";";
                                    }
                                    rateString+=">";
                                }
                            }


                            var p1=document.createElement("p");
                            var p2=document.createElement("p");
                            var p3=document.createElement("p");
                            var p4=document.createElement("p");
                            p1.style.cssText="font-size: 2em;font-weight: 500;color: grey;";
                            p2.style.cssText="font-size: 1.8em;font-weight: 300;font-family:华文中宋;text-align: center;width: 100%;height: 60px;display: block;line-height: 60px;";
                            p3.style.cssText="height:60px";
                            p1.innerHTML="<img src=\"images/paperID1.png\" style='width: 90px;height: 30px'>&nbsp;&nbsp;"+tmpPaperID+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"<img src=\"images/point.png\">"+tmpPoint+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                            p2.innerHTML= '<a href="resultpage.html?id='+data.expertInfo.paperName[i].id+'" style="color: #000000">'+data.expertInfo.paperName[i].name+'</a>';
                            p3.innerHTML="<div></div>&nbsp;";
                            div1.appendChild(p1);
                            div1.appendChild(p2);
                            div1.appendChild(p3);


                            var divButton=document.createElement("div");
                            divButton.id="divButton"+i;
                            var input1=document.createElement("input");
                            input1.id="newPointInput"+i;
                            input1.type="text";
                            input1.style="ime-mode:Disabled;margin-left:65%;width: 160px;height:40px;";
                            input1.placeholder="请输入修改后的积分";
                            input1.maxLength="15";
                            divButton.appendChild(input1);

                            var button1=document.createElement("button");
                            button1.style.cssText="width: 160px; height: 40px;margin-left:30px;background-color:#000000;border:1px solid #000000;font-size: 1em;font-weight:500;color:#FFFFFF;";
                            button1.innerHTML="修改资源购买积分";
                            (function (i) {
                                button1.onclick=function () {
                                    console.log("tmp1 "+i);
                                    var tmpPoint1=document.getElementById("newPointInput"+i).value;
                                    professorPoint(data.expertInfo.paperName[i].id,1,tmpPoint1);//1 = paper
                                }
                            })(i);
                            divButton.appendChild(button1);
                            div1.appendChild(divButton);
                            var divNull=document.createElement("div");
                            divNull.style.height="30px";
                            div1.appendChild(divNull);

                            tmp.appendChild(div1);
                        }
                    }

                    tmp = document.getElementById("patentname_containner");
                    if(data.expertInfo.patentName.length === 0){
                        var noPatent = document.createElement("p");
                        noPatent.innerHTML="该专家尚未申请过专利。";
                        tmp.appendChild(noPatent);
                    }
                    else {
                        for(var i=0;i<data.expertInfo.patentName.length;i++){
                            var div2=document.createElement("div");
                            div2.style.height="150px";

                            var p2=document.createElement("p");
                            var tmpPatentID=data.expertInfo.patentName[i].id;
                            //var tmpPoint2=displayPoint(2,tmpPatentID);
                            var tmpPoint2=data.expertInfo.patentName[i].point;
                            p2.style.cssText="font-size: 1.5em;font-weight: 600";
                            p2.innerHTML=
                                "[ 专利ID:"+tmpPatentID+" ]"+
                                data.expertInfo.patentName[i].name+"（积分："+tmpPoint2+")";
                            div2.appendChild(p2);

                            var input2=document.createElement("input");
                            input2.id="newPointInput"+i;
                            input2.type="text";
                            input2.style="ime-mode:Disabled;margin-left:40%";
                            input2.placeholder="请输入修改后的积分";
                            input2.maxLength="15";
                            div2.appendChild(input2);


                            var button3=document.createElement("button");
                            button3.style.cssText="width: 160px; height: 40px;margin-left:30px;background-color:#000000;border:1px solid #000000;font-size: 1em;font-weight:500;color:#FFFFFF;";
                            button3.innerHTML="修改资源购买积分";
                            button3.onclick=function() {
                                var tmpPoint3=document.getElementById(input2.id).value;
                                professorPoint(data.expertInfo.paperName[i].id,2,tmpPoint3);//2 = paper
                            }
                            div2.appendChild(button3);


                            var button4=document.createElement("button");
                            button4.style.cssText="width: 200px; height: 40px;margin-left: 30px;border:1px solid #000;font-size: 1em;font-weight:500;color:#000000;";
                            button4.innerHTML="编辑资源积分分配情况";
                            div2.appendChild(button4);
                            tmp.appendChild(div2);
                        }
                    }

                }
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
        }
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
            if(data.status === "succeed"){
                if(data.data.expertId === expertId){
                }
                else {
                    document.getElementById("professorFuctionTop").style.display="none";
                }
            }
            else {
                document.getElementById("professorFuctionTop").style.display="none";
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
    // var tmpAppealID=document.getElementById("appealID");
    // var tmpAppealName=document.getElementById("applicant");
    // var tmpApplicationTime=document.getElementById("applicationTime");
    // var tmpApplicationContent=document.getElementById("applicationContent");
    // var tmpHandleStatus=document.getElementById("handleStatus");
    // var tmpResultContent=document.getElementById("resultContent");

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
                    // tmpAppealID.innerText="申诉ID："+data.application.id;
                    // tmpAppealName.innerText="申诉人："+data.application.applicant;
                    // tmpApplicationTime.innerText="申诉时间："+data.application.applicationTime;
                    // tmpApplicationContent.innerText="申诉正文"+data.application.applicationContent;
                    // tmpHandleStatus.innerText="申诉状态："+data.application.handleStatus;
                    // tmpResultContent.innerText="申诉结果："+data.application.resultContent;
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
function professorPoint(id,type,point) {    //专家功能之修改积分
    if(type === 1){
        console.log("point type=paper");
        console.log("point=="+point);
        console.log(typeof point);
        // var dataNewPoint1={
        //     "points": point
        // };
        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url:'http://192.144.179.57:8080/demo-v1/api/expert/resource/Paper/'+id+'/edit/points',
            type:'post',
            dataType: "json",
            //data:JSON.stringify(dataNewPoint1),
            data:JSON.stringify(point),
            success: function (data) {
                if(data){
                    console.log(data);
                    if(data.status==="succeed"){
                        alert('修改积分成功！');
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
    else if(type === 2){
        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url:'http://192.144.179.57:8080/demo-v1/api/expert/resource/Patent/'+id+'/edit/points',
            type:'post',
            dataType: "json",
            //data:JSON.stringify(dataNewPoint2),
            data:point,
            success: function (data) {
                if(data){
                    console.log(data);
                    if(data.status==="succeed"){
                        alert('修改积分成功！');
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
}
function getAppeal() {
    var divAppeal=document.getElementById("appealContainer");
        $.ajax({
            contentType: 'application/json;charset=UTF-8',
            url:'http://192.144.179.57:8080/demo-v1/api/expert/info/All/error/1/10',
            type:'get',
            dataType: "json",
            success: function (data) {
                if(data){
                    console.log(data);
                    if(data.status==="succeed"){
                        for(var k=0;k<data.data.length;k++)
                        {
                            var tmpDivAppeal=document.createElement("div");
                            var tmpAppealID=document.createElement("p");
                            var tmpAppealName=document.createElement("p");
                            var tmpApplicationTime=document.createElement("p");
                            var tmpApplicationContent=document.createElement("p");
                            var tmpHandleStatus=document.createElement("p");
                            var tmpResultContent=document.createElement("p");
                            tmpDivAppeal.style.cssText="border-bottom: 1px solid grey;text-align: left;font-size:1.5em;";
                            tmpAppealID.innerText="申诉ID："+data.data[k].id;
                            tmpAppealName.innerText="申诉人："+data.data[k].applicant;
                            tmpApplicationTime.innerText="申诉时间："+data.data[k].applicationTime;
                            tmpApplicationContent.innerText="申诉正文："+data.data[k].applicationContent;
                            tmpHandleStatus.innerText="申诉状态："+data.data[k].handleStatus;
                            tmpResultContent.innerText="申诉结果："+data.data[k].resultContent;
                            tmpDivAppeal.appendChild(tmpAppealID);
                            tmpDivAppeal.appendChild(tmpAppealName);
                            tmpDivAppeal.appendChild(tmpApplicationTime);
                            tmpDivAppeal.appendChild(tmpApplicationContent);
                            tmpDivAppeal.appendChild(tmpHandleStatus);
                            tmpDivAppeal.appendChild(tmpResultContent);
                            divAppeal.appendChild(tmpDivAppeal);
                        }
                    }
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
    var request=GetRequest();
    var name=getProfessorName(request["pid"]);
    //test(name);
    checkRole(request["pid"]);
    searchingInProf('author','paper',name,null,null,'publicationYear');

    //professorGetInfor();
    //getAppeal();
};

/**
 * 获取专家名字
 * @param id
 */
function getProfessorName(id) {
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:' http://192.144.179.57:8080/demo-v1/api/visitor/expert/'+id,
        type:'get',
        async: false,
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

                    professorName.innerHTML=data.expertInfo.realName;
                    professorID.innerHTML=data.expertInfo.introduction;
                    if(data.expertInfo.id)
                        introduction.innerHTML='专家';
                    else
                        introduction.innerHTML='普通用户';
                    institution.innerHTML=data.expertInfo.institution;
                    researchField.innerHTML=data.expertInfo.researchField;

                    searchingInProf('author','paper',data.expertInfo.realName,null,null,'publicationYear');


                    //专家关系网络图
                    var newImage=document.getElementById("professor_relation_image");
                    console.log(newImage);
                    newImage.src = "images/expert_relationship/"+id+".png";


                }
            }else{
                alert('net failure');
            }
        },
    });
}

/**
 * 搜索
 * @param sType 搜索类型
 * @param type 论文or专利
 * @param name 搜索内容
 * @param page 页码
 * @param year 搜索该时间的内容
 * @param order 相关性or引用次数or时间
 * @param orderType 正序or倒序
 */
function searchingInProf(sType, type, name, page, year, order, orderType, subjectID){
    "use strict";
    var page=page||1;
    var orderType=orderType||0;
    if (order==="referenceTimes"||order==="publicationYear") {
        orderType=1;
    }
    var final_url='http://192.144.179.57:8080/demo-v1/api/search/'+sType+'/'+page+'?type='+type+'&name='+name;
    if(year)
        final_url+='&year='+year;
    if(order)
        final_url+='&order='+order;
    if(orderType)
        final_url+='&orderType='+orderType;
    if (subjectID)
        final_url+='&subjectId='+subjectID;
    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:final_url,
        type:'post',
        dataType: "json",
        success: function(data){
            if (data) {
                console.log(data);
                //排序方式生成
                var div=document.getElementById("resultsContainer");
                $(div).empty();
                //生成搜索结果显示部分
                if (data.data.items) {
                    for(var i=0;i<data.data.items.length;i++){
                        var paperInfo=data.data.items[i];
                        $(div).append('                <div class="agile-blog-grid" id="agile-blog-grid_'+(i+1)+'">\n' +
                            '                    <div class="blog-left-grids">\n' +
                            '                        <div class="blog-left-right_results">\n' +
                            '                            <div class="blog-left-right-top">\n' +
                            '                                <h4><a href="resultpage.html?id='+paperInfo.id+'" class="title_results">'+paperInfo.name+'</a><img src="images/point.png"><span class="point_icon_font">'+paperInfo.pointRequired+'</span></h4>\n' +
                            '                                <p id="author_'+i+'">&nbsp;-&nbsp; '+paperInfo.publicationTime+' &nbsp;-&nbsp; '+paperInfo.journal+'&nbsp;-&nbsp; 被引量：'+paperInfo.referenceTimes+'</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="blog-left-right-bottom blog-left-right-bottom-results">\n' +
                            '                                <p class="abstract_results">'+paperInfo.abstractInfo+'</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="blog-left-right-bottom-2" id="subject_'+i+'">' +
                            '                            </div>' +
                            '                        </div>\n' +
                            '                        <div class="clearfix"> </div>\n' +
                            '                    </div>\n' +
                            '                </div>');
                        //显示作者
                        var p = document.getElementById("author_"+i);
                        for(var j=0;j<paperInfo.ownersName.length;j++) {
                            if (j)
                                p.innerHTML = '，'+p.innerHTML;
                            p.innerHTML = '<a href="professor.html?pid=' + paperInfo.ownersName[j].id + '" class="author_results">' + paperInfo.ownersName[j].name + '</a>'+p.innerHTML;
                        }
                        //显示学科
                        if(paperInfo.subject.length){
                            var subject_re=document.getElementById("subject_"+i);
                            $(subject_re).append('学科分类：');
                            for(var k=0;k<paperInfo.subject.length;k++){
                                $(subject_re).append('<a href="subject.html?sid='+ paperInfo.subject[k].id +'">' + paperInfo.subject[k].name + '</a>');
                            }
                        }
                    }
                    var last_ele=document.getElementById("agile-blog-grid_"+data.data.items.length);
                    last_ele.style.borderBottom='0px';
                    last_ele.style.marginBottom='0px';
                }


                //生成翻页符
                displayNav(div,data.data.totalPage,data.data.nowPage);
                if (data.data.totalPage!==1&&data.data.totalPage!==0){
                    var obj=document.getElementById("page_re").getElementsByTagName("a");
                    for(i=0;i<obj.length;i++){
                        if (obj[i].id==="previous_page"){
                            obj[i].onclick=function(){
                                //console.log((parseInt(data.data.nowPage)-1)+'is onclick');
                                searchingInProf(sType, type, name, parseInt(data.data.nowPage)-1, year, order, orderType, subjectID);
                            };
                            continue;
                        }
                        if (obj[i].id==="next_page"){
                            obj[i].onclick=function(){
                                //console.log((parseInt(data.data.nowPage)+1)+'is onclick');
                                searchingInProf(sType, type, name, parseInt(data.data.nowPage)+1, year, order, orderType, subjectID)
                            };
                            continue;
                        }
                        (function (i) {
                            obj[i].onclick=function(){
                                searchingInProf(sType, type, name, obj[i].innerHTML, year, order, orderType, subjectID);
                            };
                        })(i);
                    }
                }
            }else{
                alert('net failure');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
        }
    });
}