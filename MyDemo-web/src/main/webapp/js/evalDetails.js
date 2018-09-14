$(document).ready(function() {
	var detail = new Object();
	detail = store.get("detail");
	var param = new Object();
	param.id = detail.detailId;
	$.ajax({
		type : "GET",
		url :  "../evaluation/getArrangements",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
			 createTable(data,detail.projectName,detail.position,detail.level,detail.company);
		}
	});
});


function createTable(data,projectName,position,level,company) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>项目名称</th><th>部门</th><th>项目负责人</th><th>姓名</th><th>岗位</th><th>级别</th><th>状态</th><th>考核</th><th>退场</th></tr></thead>";
    var len = data.length;
    //store.set("len",len);
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td>" + projectName + "</td><td>" + data[i].department  + "</td><td>" 
        + data[i].projectHeader  + "</td><td>" + data[i].name + "</td><td>" + position + "</td><td>" + level  + "</td><td>" + data[i].status;
        
        if (data[i].status == "退场")
        	tableStr = tableStr + "</td><td>考核信息已录入</td><td>外包人员已退场</td></tr></tbody>";
        else
        	tableStr = tableStr + "</td><td><a class='btn btn-warning btn-xs' onclick=\"eval(" + data[i].outsourcerId +',' + data[i].detailId +",'"
            + data[i].name +"','"+ data[i].department +"','"+ data[i].projectHeader +"','"+ position +"','" + level +"',"+data[i].projectId+",'"
            +projectName+"','"+company+"')\" role='button'>录入考核信息</a></td><td><a class='btn btn-warning btn-xs' onclick=\"dropout(" 
        	+ data[i].outsourcerId + ")\"role='button'>外包人员退场</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#table").html(tableStr);
}



function eval(outsourcerId,detailId,name,department,projectHeader,position,level,projectId,projectName,company){
	var newdetail = new Object();
	newdetail.outsourcerId=outsourcerId;
	newdetail.name = name;
	newdetail.department=department;
	newdetail.projectHeader=projectHeader;
	newdetail.detailId = detailId;
	newdetail.projectName = projectName;
	newdetail.projectId = projectId;
	newdetail.position = position;
	newdetail.level = level;
	newdetail.company=company;
	store.set("evaluationDetail",newdetail);
	window.location = 'AddEvaluation.html';
}

function dropout(outsourcerId){
	var reason = prompt("退场前请确认该外包人员所有相关事项都已处理完毕。\n\n请输入退场原因：");
	if (reason != null){
		var param = new Object();
		param.id = outsourcerId;
		param.reason = reason;
		$.ajax({
			type : "POST",
			url :  "../arrange/update",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				 console.log(data);
			}
		});
		window.location.reload();
	}
}

