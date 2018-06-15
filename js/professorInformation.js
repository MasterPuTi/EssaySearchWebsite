function professorGetInfor() {
    var proInfor={
        "id" : 1
    };

    $.ajax({
        contentType: 'application/json;charset=UTF-8',
        url:' http://192.144.179.57:8080/demo-v1/api/expert/{id}',
        type:'get',
        dataType: "json",
        data:JSON.stringify(proInfor),
        success: function(data){
            if (data) {
                console.log(data);
                if(data.status === "succeed"){
                    var professorName = document.getElementById("professorName");
                    var professorID = document.getElementById("processorID");
                    var introduction = document.getElementById("introduction");
                    var institution = document.getElementById("institution");
                    var researchField = document.getElementById("researchField");
                    var paperName = new Array();
                    paperName = document.getElementsByClassName("paperName");
                    var patentName = new Array();
                    patentName = document.getElementsByClassName("patentName");


                    professorName.innerHTML=
                        data.expertInfo.realName;
                    professorID.innerHTML=
                        'ID：'+data.expertInfo.id;
                    introduction.innerHTML=
                        data.expertInfo.introduction;
                    institution.innerHTML=
                        data.expertInfo.institution;
                    researchField.innerHTML=
                        data.expertInfo.researchField;
                    for(var i=0;i<data.expertInfo.paperName.length;i++){
                        paperName[i].innerHTML=
                            data.expertInfo.paperName[i];
                    }
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