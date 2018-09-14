$(document).ready(function() {
	
	var id = store.get("detailId");
	setDetail({detailId:id});
    $("#submit").click(function() {
    	var applyManDayNumber=$("#applyManDayNumber").val();
    	var personNumber=$("#personNumber").val();
    	var workPlace=$("#workPlace").val();
    	var remark=$("#remark").val();
    	var startingDate=$("#startingDate").val();
    	var manDayNumberRemain=$("#manDayNumberRemain").val();
    	if(applyManDayNumber=="" || personNumber=="" || workPlace=="" || startingDate=="" ){
    		alert("请填写所有必填项!");
    		return;
    	}else if(parseInt(applyManDayNumber) > parseInt(manDayNumberRemain)){
    		alert("不能超过剩余可申请人天数!");
    		return;
    	}else if(parseInt(manDayNumberRemain)==0){
    		alert("已申请相应的人天数!");
    		window.location = "";
    		return;
    	}
    	
    	var detailObj=store.get("detailObj");
    	var id = store.get("detailId");
    	
    	param=	{
    			"detailId": id,
    			"department": detailObj.department,
    			"projectHeaderId": detailObj.projectHeaderId,
    			"position": detailObj.position,
    			"level": detailObj.level,
    			"applyManDayNumber": applyManDayNumber,
    			"personNumber": personNumber,
    			"forEntryPersonNumber": personNumber,
    			"workPlace": workPlace,
    			"remark": remark,
    			"startingDate":startingDate,
    			"status": "待分配"
    		}
        commitFun(param);

    });
    ser();
    
});

function commitFun(param){
	$.ajax({
		type : "POST",
		url : "../ApplyRecord/CreateApplyRecord",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
			 if(data != null){
				 alert("用工申请成功");
				 
			 }else{
				 alert("用工申请出错, 请稍后重试");
			 }
			
			 location.reload();
		}
	});
}
	
function setDetail(param){
	$.ajax({
		type : "GET",
		url : "../project/getDetailByDetailId",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
			 store.set("detailObj", data);
//				 alert(data.detailId);
			 $("#department").attr("value",data.department);
			 $("#company").attr("value",data.company);
			 $("#projectName").attr("value",data.projectName);
			 $("#projectHeader").attr("value",data.projectHeader);
			 $("#position").attr("value",data.position);
			 $("#level").attr("value",data.level);
			 $("#manDayNumberTotal").attr("value",data.manDayNumberTotal);
			 $("#manDayNumberRemain").attr("value",data.manDayNumberTotal-data.manDayNumberApplied);
			}
		});
}
function setAppliedList(param){
	
}

function createTable(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>记录ID</th><th>明细ID</th><th>部门</th><th>负责人</th><th>岗位</th><th>级别</th><th>申请人天数</th><th>人数</th><th>待分配人数</th><th>工作地点</th><th>到岗日期</th><th>状态</th><th>创建日期</th><th>备注</th></tr></thead>";
    var len = data.length;
    //store.set("len",len);
    
    for (var i = 0; i < len; i++) {
        tableStr = tableStr + "<tbody><tr><td>" + data[i].recordId + "</td><td>" + data[i].detailId  + "</td><td>" + data[i].department  + "</td><td>" + data[i].projectHeaderId + "</td><td>" + data[i].position + "</td><td>" + data[i].level  + "</td><td>" + data[i].applyManDayNumber  + "</td><td>" + data[i].personNumber + "</td><td>" + data[i].forEntryPersonNumber + "</td><td>" + data[i].workPlace + "</td><td>" + data[i].startingDate + "</td><td>" + data[i].status + "</td><td>" + data[i].createdTime+ "</td><td>" + data[i].remark + "</td></td>" 
        +"</tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#table").html(tableStr);
}

function ser(){
	var id = store.get("detailId");
	var param = new Object();
	param.detailId = id;
	$.ajax({
		type : "GET",
		url :  "../ApplyRecord/findApplyRecord",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 createTable(data);
		}
	});
	
	
	
}
