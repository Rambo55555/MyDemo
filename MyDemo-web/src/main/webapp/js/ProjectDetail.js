$(document).ready(function() {
	var user = new Object();
	user = store.get("user");
	var position = user.position;
	if(position == "项目经理"){
		var projectHeaderId = user.employeeId;
		startforprojectHeaderId(projectHeaderId);
	}else if(position == "部门经理"||position=="行政助理"){
		var department = user.department;
		startfordepartment(department);
	}else if(position=="人力资源"){
		startforAll();
	}else {
		alert("您无此权限！");
	}
	
	
});

function createTable(data){
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>项目</th><th>部门</th><th>项目负责人</th><th>岗位</th>"
    			+"<th>级别</th><th>中标公司</th><th>操作</th></tr></thead>";
    var len = data.length;
    store.set("len",len);
    //console.log(len);
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td>" + data[i].projectName + "</td><td>" + data[i].department + "</td><td>" 
        + data[i].projectHeader + "</td><td>" + data[i].position + "</td><td>" + data[i].level + "</td><td>" 
        + data[i].company + "</td><td><a class='btn btn-warning btn-xs' onclick=\"arrangeDetail(" + data[i].detailId+",'"
        +data[i].projectName +"','"+ data[i].department  +"','"+ data[i].projectHeader +"','"+ data[i].position +"','" + data[i].level +"','"+ data[i].company
        +"')\" id='id"+i+"' role='button'>考核/退场</a> </td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#mat_table").html(tableStr);
}
function arrangeDetail(detailId,projectName,department,projectHeader,position,level,company) {
	store.remove("detail")
	var detail = new Object();
	detail.department=department;
	detail.projectHeader=projectHeader;
	detail.detailId = detailId;
	detail.projectName = projectName;
	detail.position = position;
	detail.level = level;
	detail.company = company;
	store.set("detail",detail);
	
	window.location = "evalDetails.html";
}
/* 根据项目经理显示名下的项目明细*/
function startforprojectHeaderId(projectHeaderId){
	var param = new Object();
	param.id = projectHeaderId;

	$.ajax({
		type : "GET",
		url : "../evaluation/getDetails",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable(data);
		}
	});
}

/* 根据部门显示名下的项目明细*/
function startfordepartment(department){
	var param = new Object();
	param.department = department;
	$.ajax({
		type : "GET",
		url : "../evaluation/getEvalBydepartment",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable(data);
		}
	});
}


/* 根据项目经理显示名下的项目明细*/
function startforAll(){
	var param = new Object();
	$.ajax({
		type : "GET",
		url : "../evaluation/getAllDetailEval",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable(data);
		}
	});
}