$(document).ready(function() {
	var user = new Object();
	user = store.get("user");
	var employeeId = user.employeeId;
	start(employeeId);
});

function createTable(data){
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>项目</th><th>部门</th><th>项目负责人</th><th>岗位数</th>"
    			+"<th>已消耗人天数</th><th>外包人员总数</th><th>在岗人数</th><th>退场人数</th><th>统计详情</th></tr></thead>";
    var len = data.length;
    store.set("len",len);
    //console.log(len);
    var numberOfDetail = 0;
    var numberOfUsedPersonDay = 0;
    var numberOfPersonTotal = 0;
    var numberOfPersonOnDuty = 0;
    var numberOfPersonExited = 0;
    for (var i = 0; i < len; i++) {
    	
    	numberOfDetail = numberOfDetail + data[i].numberOfDetail;
    	numberOfUsedPersonDay = numberOfUsedPersonDay + data[i].numberOfUsedPersonDay;
    	numberOfPersonTotal = numberOfPersonTotal + data[i].numberOfPersonTotal;
    	numberOfPersonOnDuty = numberOfPersonOnDuty + data[i].numberOfPersonOnDuty;
    	numberOfPersonExited = numberOfPersonExited + data[i].numberOfPersonExited;
    	
    	
        tableStr = tableStr + "<tbody><tr><td>" + data[i].projectName + "</td><td>" + data[i].department + "</td><td>" 
        + data[i].projectHeader + "</td><td>" + data[i].numberOfDetail + "</td><td>" + data[i].numberOfUsedPersonDay + "</td><td>" 
        + data[i].numberOfPersonTotal + "</td><td>" + data[i].numberOfPersonOnDuty+"</td><td>" + data[i].numberOfPersonExited
        + "</td><td><a class='btn btn-warning btn-xs' onclick=\"statisticsDetail(" + data[i].projectId+",'"
        +data[i].projectName +"','"+ data[i].department  +"','"+ data[i].projectHeader
        +"')\" id='id"+i+"' role='button'>统计详情</a> </td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#mat_table").html(tableStr);
    
    var tableStr2 = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr2 = tableStr2 + "<thead><tr><th>项目数</th><th>岗位数</th><th>已消耗人天数</th><th>外包人员数</th>"
    			+"<th>在岗人数</th><th>退场人数</th></tr></thead>"
    			+ "<tbody><tr><td>" + len + "</td><td>" + numberOfDetail + "</td><td>" 
    			+ numberOfUsedPersonDay + "</td><td>" + numberOfPersonTotal + "</td><td>" + numberOfPersonOnDuty
    			+"</td><td>" + numberOfPersonExited+ "</td></tr></tbody>";
    tableStr2 = tableStr2 + "</table>";
    $("#mat_table2").html(tableStr2);
}


function statisticsDetail(projectId,projectName,department,projectHeader) {
	store.remove("detail")
	var detail = new Object();
	detail.department=department;
	detail.projectHeader=projectHeader;
	detail.projectId = projectId;
	detail.projectName = projectName;
	store.set("detail",detail);
	store.set("forouter",detail);
	
	window.location = "showOuter.html";
}

function start(employeeId){
	var param = new Object();
	param.employeeId = employeeId;

	$.ajax({
		type : "GET",
		url : "../statistics/statisticsByEmployeeId",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.log("数据："+data);
			createTable(data);
		}
	});
}/**
 * 
 */