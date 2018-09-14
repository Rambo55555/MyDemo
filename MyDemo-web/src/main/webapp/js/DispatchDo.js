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
		+ recordDetail.personNumber+ "</td><td>" + recordDetail.personNumberAllocated +"</td></tr></tbody></table>";
	$("#mat_table1").html(ts);
}

function createTable(data){
	var len = data.length;
	if (len > 0) {
		var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	    tableStr = tableStr + "<thead><tr><th>姓名</th><th>性别</th><th>学历</th><th>岗位</th>"
	    			+"<th>级别</th><th>身份证号</th><th>手机号</th><th>邮箱</th><th>操作</th></tr></thead>";
	    //console.log(len);
	    for (var i = 0; i < len; i++) {
	    	
	        tableStr = tableStr + "<tbody><tr><td>" + data[i].name + "</td><td>" + data[i].sex + "</td><td>" 
	        + data[i].education + "</td><td>" + data[i].position + "</td><td>" + data[i].level + "</td><td>" 
	        + data[i].idcardCode + "</td><td>" + data[i].phoneNumber + "</td><td>" + data[i].email 
	        + "</td><td><a class='btn btn-warning btn-xs' onclick=\"arrange('" + data[i].name+"',"
	        +data[i].outsourcerId +','+i+ ")\" id='id"+i+"' role='button'>分配</a> </td></tr></tbody>";
	
	    }
	    tableStr = tableStr + "</table>";
	    $("#mat_table").html(tableStr);
	}
	else
		$("#mat_table").html("<table class=table table-bordered table-hover empty-margin-top tableList>"
			+"<thead><tr><th>暂无可分配人员，请先录入外包人员</th></tr></thead></table>");
}

function createTable2(data){
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
	    $("#mat_table2").html(tableStr);
    }
    else
    	$("#mat_table2").html("<table class=table table-bordered table-hover empty-margin-top tableList>"
    			+"<thead><tr><th>暂未分配人员</th></tr></thead></table>");
}

function arrange(name,id,i) {
	if (!($("#id"+i).attr("disabled"))){
		var recordDetail = store.get("recordDetail");
		var param = new Object();
		param.outsourcerId=id;
		param.name=name;
		param.department = recordDetail.department;
		param.projectId = recordDetail.projectId;
		param.projectHeader = recordDetail.projectHeader;
		param.detailId = recordDetail.detailId;
		param.recordId = recordDetail.recordId;
	    
		$.ajax({
			type : "POST",
			url : "../arrange/insert",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				console.info("插入计数:" + data);
			}
		});
		$("#id"+i).attr("disabled", true); 
		//document.getElementById("id"+i).disabled=true;
		document.getElementById("id"+i).innerHTML="已分配";
		var newRecordDetail = store.get("recordDetail");
		newRecordDetail.personNumberAllocated = newRecordDetail.personNumberAllocated + 1;
		store.set("recordDetail",newRecordDetail);
		window.location.reload();
	}
}

function start(){
	var Admin = store.get("user");
    var recordDetail = store.get("recordDetail");
	var param = new Object();
	param.id = Admin.outsourcerAdminId;
	param.position = recordDetail.position;
	param.level = recordDetail.level;

	$.ajax({
		type : "GET",
		url : "../arrange/getFreeOutsourcers",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable(data);
		}
	});
	
	var param2 = new Object();
	param2.id = recordDetail.recordId;

	$.ajax({
		type : "GET",
		url : "../arrange/getAllocateRecords",
		data : param2,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable2(data);
		}
	});
}