$(document).ready(function() {
	var projectId = store.get("projectId");
	ser(projectId);
	
});

function createTablefromDetails(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>明细ID</th><th>项目ID</th><th>岗位</th><th>级别</th><th>人员天数上限</th><th>已申请人天数</th><th>外包公司</th></tr></thead>";
    var len = data.length;
    //store.set("len",len);
    
    for (var i = 0; i < len; i++) {
        tableStr = tableStr + "<tbody><tr><td>" + data[i].detailId + "</td><td>" + data[i].projectId  + "</td><td>" + data[i].position  + "</td><td>" + data[i].level + "</td><td>" + data[i].manDayNumberTotal + "</td><td>" + data[i].manDayNumberApplied  + "</td><td>" + data[i].company  + "</td></td>" 
        +"<td><a class='btn btn-warning btn-xs' onclick=\"moredetails('" + data[i].detailId + "')\" role='button'>详细信息</a></td></td><td><a class='btn btn-warning btn-xs' onclick=\"apply('"+ data[i].detailId + "')\" role='button'>提交用工申请</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#showDetails_table").html(tableStr);
}

function ser(projectId){
	var param =new Object();
	param.projectId =projectId;
	$.ajax({
		type : "GET",
		url :  "../project/getDetailByProjectId",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
			 createTablefromDetails(data);
		}
	});
	
}

function apply(detailId){
	store.set("detailId",detailId);
	window.location = "AddApplyRecord.html";
	
}