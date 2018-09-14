$(document).ready(function() {
    $("#createProject").click(function() {
        var param = new Object();
//        var projectId = $("#projectId").val();
        var projectName = $("#projectName").val();
        var department = $('#department option:selected').text();
        var projectHeader = $("#projectHeader").val(); 
        var projectHeaderId = $("#projectHeaderId").val(); //选中的文本
        var user = store.get("user");
        var editerEmployeeId = user.employeeId;
        
        if(projectName == "" || department == "请选择" || projectHeader == "" || projectHeaderId == ""){
        	alert("请将项目信息填写完整！");
        	return;
        }
        
//        param.projectId = projectId;
        param.projectName = projectName;
        param.department = department;
        param.projectHeader = projectHeader;
        param.projectHeaderId = projectHeaderId;
        /*param.createdTime = createdTime;
        param.updatedTime = updatedTime;*/
        param.editerEmployeeId = editerEmployeeId;
        
        $.ajax({
    		type : "POST",
    		url :  "../project/insert",
    		data : param,
     		dataType : "json",
    		contentType: "application/x-www-form-urlencoded",
    		success : function(data) {
    			 console.log(data);
    			 alert("项目录入成功，请在项目查询中录入明细。");
    			 $("#projectName").val("");
    			 $("#projectHeader").val("");
    			 $("#projectHeaderId").val("");
    			 var se1 = document.getElementById("department");
    			 se1[0].selected = true;
    		}
    	});
    });
    
    $("#createDetails").click(function() {
    	 var projectId = $("#projectId").val();
    	 var department = $("#department").val();
    	 var projectName = $("#projectName").val();
    	 var projectHeader = $("#projectHeader").val();
    	 var projectHeaderId = $("#projectHeaderId").val();
    	 
    	 console.log(projectId);
    	 if($("#projectId").val() !=""){
    		 store.set("projectId",projectId);
    		 store.set("department",department);
    		 store.set("projectName",projectName);
    		 store.set("projectHeader",projectHeader);
    		 store.set("projectHeaderId",projectHeaderId);
    		
    		 window.location = "details.html";
    	 }else{
    		 alert("未选中项目");
    		 window.location = ""; 
    }
    }); 
    
    $("#research").click(function(){
    	var dept = $("#departmentResearch option:selected").text();
    	if(dept == "请选择部门"){
    		alert("请选择部门！");
    		return;
    	}else{
//    		alert(dept);
    		$.ajax({
    			type : "GET",
    			url : "../project/getByDepartment",
    			data : {department: dept},
    			dataType : "json",
    			contentType : "application/x-www-form-urlencoded",
    			success : function(data) {
    					createTable(data);
    			}
    		});
    	}
    });
});

var tableArray;
function createTable(data) {
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	tableStr = tableStr
			+ "<thead><tr><th>项目名称</th><th>部门名称</th><th>项目负责人名称</th><th>项目状态</th><th>录入时间</th><th>操作</th></tr></thead>";
	var len = data.length;
	// store.set("len",len);
	if (len > 0) {
		tableArray = data;
		for (var i = len-1; i >= 0; i--) {
			tableStr = tableStr
					+ "<tbody><tr><td>"
					+ data[i].projectName
					+ "</td><td>"
					+ data[i].department
					+ "</td><td>"
					+ data[i].projectHeader
					+ "</td><td>"
					+ data[i].status
					+ "</td><td>"
					+ data[i].createdTime
					+ "</td>"
					+ "<td><a class='btn btn-warning btn-xs' onclick=\"enterDetail("
					+ i + ")\"role='button'>录入明细</a></td>" + "</tr></tbody>";
		}
	} else {
		tableStr = "<table><tbody><tr><td>暂无项目</td>" + "</tr></tbody>";
	}
	tableStr = tableStr + "</table>";
	$("#research_table").html(tableStr);

}

function enterDetail(i) {
//	 var projectId = $("#projectId").val();
//	 var department = $("#department").val();
//	 var projectName = $("#projectName").val();
//	 var projectHeader = $("#projectHeader").val();
//	 var projectHeaderId = $("#projectHeaderId").val();
//	 
	 console.log(tableArray[i].projectId);
	 if(tableArray[i].projectId !=""){
		 store.set("projectId",tableArray[i].projectId);
		 store.set("department",tableArray[i].department);
		 store.set("projectName",tableArray[i].projectName);
		 store.set("projectHeader",tableArray[i].projectHeader);
		 store.set("projectHeaderId",tableArray[i].projectHeaderId);
		
		 window.location = "details.html";
	 }else{
		 alert("未选中项目");
		 window.location = ""; 
	 }
}