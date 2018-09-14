$(document).ready(function() {
	
	 $("#search").click(function() {
		
			var forouter = store.get("forouter");
			var status = $("#status option:selected").text();
			if(status == "全部"){
				status='';
			}
			var projectId = parseInt(forouter.projectId);
			ser(projectId,status);
			serforCount(projectId);
			
	 });	
});

function createTable(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>项目名称</th><th>部门</th><th>项目负责人</th><th>姓名</th><th>岗位</th><th>级别</th><th>工作天数</th><th>状态</th><th>操作</th></tr></thead>";
    var len = data.length;
    //store.set("len",len);
    var totalWorkDays = 0;
    for (var i = 0; i < len; i++) {
    	totalWorkDays = totalWorkDays+data[i].workDays;
        tableStr = tableStr + "<tbody><tr><td>" +  data[i].projectName + "</td><td>" + data[i].department  + "</td><td>" + data[i].projectHeader + "</td><td>" + data[i].name + "</td><td>" + data[i].position + "</td><td>" + data[i].level  + "</td><td>" + data[i].workDays + "</td><td>" + data[i].status + "</td>" 
        +"<td><a class='btn btn-warning btn-xs' onclick=\"eval("  + data[i].outsourcerId +',' + data[i].detailId +",'"+ data[i].name +"','"+ data[i].department +"','"+ data[i].projectHeader +"','"+data[i].position +"','"
        + data[i].level +"','"+ data[i].projectName+"','"+data[i].company+"')\" role='button'>录入考核信息</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#outer_table").html(tableStr);
    
    
}

function createTableforCount(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>项目名称</th><th>部门</th><th>项目负责人</th><th>岗位数</th><th>总人天数</th><th>已消耗人天数</th>" +
    		"<th>剩余人天数</th><th>剩余可申请人天数</th><th>使用外包人员总数</th><th>在岗人数</th><th>退场人数</th></tr></thead>";
    var len = data.length;

    tableStr = tableStr + "<tbody><tr><td>" +  data.projectName + "</td><td>" + data.department  + "</td><td>" 
    + data.projectHeader + "</td><td>" + data.numberOfDetail + "</td><td>" + data.numberOfTotalPersonDay + "</td><td>" + data.numberOfUsedPersonDay + "</td><td>"
    + data.numberOfRestPersonDay + "</td><td>"+ data.numberOfRestPDCanApply + "</td><td>" + data.numberOfPersonTotal
    + "</td><td>" + data.numberOfPersonOnDuty + "</td><td>" + data.numberOfPersonExited  + "</td></tr></tbody>";
    
    tableStr = tableStr + "</table>";
    $("#table").html(tableStr);
   
}

function serforCount(projectId){
	var param  =  new Object();
	param.id = projectId;
	$.ajax({
		type : "GET",
		url :  "../statistics/getStatistics",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			createTableforCount(data);
		}
	});
}

function ser(projectId,status){
	
	var param  =  new Object();
	param.id = projectId;
	param.status = status;
	$.ajax({
		type : "GET",
		url :  "../statistics/getOuters",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			createTable(data);
		}
	});
}



function eval(outsourcerId,detailId,name,department,projectHeader,position,level,projectName,company){
	var newdetail = new Object();
	newdetail.outsourcerId=outsourcerId;
	newdetail.name = name;
	newdetail.department=department;
	newdetail.projectHeader=projectHeader;
	newdetail.detailId = detailId;
	newdetail.projectName = projectName;
	newdetail.position = position;
	newdetail.level = level;
	newdetail.company=company;
	store.set("evaluationDetail",newdetail);
	window.location = 'AddEvaluation.html';
}


