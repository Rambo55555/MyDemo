$(document).ready(function() {
	var outAdmin = new Object();
	outAdmin=store.get("user");
	start(outAdmin.outsourcerAdminId);
});

function createTable(data){
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>部门</th><th>项目负责人</th><th>项目名称</th><th>申请时间</th>"
    			+"<th>岗位</th><th>级别</th><th>人数</th><th>已分配人数</th><th>状态</th><th>操作</th><th>详情</th></tr></thead>";
    var len = data.length;
    store.set("len",len);
    //console.log(len);
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td>" + data[i].department + "</td><td>" + data[i].projectHeader + "</td><td>" 
        + data[i].projectName + "</td><td>" + data[i].applyTime + "</td><td>" + data[i].position + "</td><td>" 
        + data[i].level + "</td><td>" + data[i].personNumber + "</td><td>" + data[i].personNumberAllocated + "</td><td>" + data[i].status;
        if (data[i].status == "已完成")
        	tableStr = tableStr + "</td><td>已分配</td>";
        else
        	tableStr = tableStr + "</td><td><a class='btn btn-warning btn-xs' onclick=\"arrange('" + data[i].department+"',"
            + data[i].projectId +",'"+ data[i].projectHeader +"',"+ data[i].detailId +',' + data[i].recordId +",'"
            + data[i].projectName +"','"+data[i].position+"','"+data[i].level+"',"+ data[i].personNumber + "," 
            + data[i].personNumberAllocated +")\" id='id"+i+"' role='button'>去分配</a> </td>";
        
        tableStr = tableStr + "<td><a class='btn btn-warning btn-xs' onclick=\"detail('" + data[i].department+"',"
        + data[i].recordId  +",'"+ data[i].projectName +"','"+data[i].position+"','"+ data[i].level+"'," 
        + data[i].personNumber + "," + data[i].personNumberAllocated +")\" id='id2"+i+"' role='button'>分配详情</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#mat_table").html(tableStr);
}



function arrange(department,projectId,projectHeader,detailId,recordId,
		projectName,position,level,personNumber,personNumberAllocated) {
	store.remove("recordDetail")
	var record = new Object();
	record.department=department;
	record.projectId=projectId;
	record.projectHeader=projectHeader;
	record.detailId = detailId;
	record.recordId = recordId;
	record.projectName = projectName;
	record.position = position;
	record.level = level;
	record.personNumber = personNumber;
	record.personNumberAllocated= personNumberAllocated;
	store.set("recordDetail",record);
	
	window.location = "DispatchDo.html";
}

function detail(department,recordId,projectName,position,level,personNumber,personNumberAllocated) {
	//store.remove("recordDetail")
	var record = new Object();
	record.department=department;
	record.recordId = recordId;
	record.projectName = projectName;
	record.position = position;
	record.level = level;
	record.personNumber = personNumber;
	record.personNumberAllocated= personNumberAllocated;
	store.set("recordDetail",record);
	
	window.location = "AllocateRecord.html";
}

function start(newid){
	var param = new Object();
	param.id = newid;

	$.ajax({
		type : "GET",
		url : "../arrange/getRecords",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.info("数据："+data);
			createTable(data);
		}
	});
}/**
 * 
 */