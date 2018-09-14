$(document).ready(function() {
	createTable1();
	start();
	$("#goback").click(function(){
		//store.remove("recordDetail");
		window.location = "ApplyRecord.html";
	});
});

function createTable1(){
	var recordDetail = store.get("recordDetail");
	var ts = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	ts = ts + "<thead><tr><th>部门</th><th>项目</th><th>岗位</th><th>级别</th><th>申请人数</th><th>已分配人数</th></tr></thead>";
	ts = ts + "<tbody><tr><td>" + recordDetail.department + "</td><td>" + recordDetail.projectName
		+ "</td><td>" + recordDetail.position + "</td><td>" + recordDetail.level +  "</td><td>" 
		+ recordDetail.personNumber+ "</td><td>" + recordDetail.personNumberAllocated + "</td></tr></tbody></table>";
	$("#mat_table1").html(ts);
}

function createTable(data){
	var len = data.length;
	if (len > 0){
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>姓名</th><th>性别</th><th>学历</th><th>岗位</th>"
    			+"<th>级别</th><th>工作年限</th><th>手机号</th><th>身份证号</th><th>分配日期</th></tr></thead>";
  
    //console.log(len);
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td>" + data[i].name + "</td><td>" + data[i].sex + "</td><td>" 
        + data[i].education + "</td><td>" + data[i].position + "</td><td>" + data[i].level + "</td><td>" 
        + data[i].workingYears + "</td><td>" + data[i].phoneNumber + "</td><td>" + data[i].idcardCode 
        + "</td><td>" + data[i].allocateDate+ "</td></tr></tbody>";

    }
    tableStr = tableStr + "</table>";
    $("#mat_table").html(tableStr);
	}
	else
    	$("#mat_table").html("<table class=table table-bordered table-hover empty-margin-top tableList>"
    			+"<thead><tr><th>暂未分配人员</th></tr></thead></table>");
}

function start(){
	var recordDetail= store.get("recordDetail");
	var param = new Object();
	param.id = recordDetail.recordId;

	$.ajax({
		type : "GET",
		url : "../arrange/getAllocateRecords",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable(data);
		}
	});
}