$(document).ready(function() {
	var user = new Object();
	user = store.get("user");
    console.log(user.department);
	 $("#research").click(function() {
		 var prorde = $("#prorde option:selected").text();
		 var where = $("#where option:selected").text();
		 var companyId = $("#companyId").val();
		 if(prorde=="项目" && where=="部门" ){    //createTablefromProject
			 showProjectByDepartmentorProjectHeaderId(user);	 
		 }else if(prorde=="明细" && where=="部门" && companyId ==""){
			 showDetailsByDepartment(user);
		 }else if(prorde=="明细" && where=="外包公司" && companyId !=""){ //createTablefromDetails
			 showDetailsByCompanyId(companyId);
		 }else{
			 alert("无该项目或明细");
		 }

    });
});

function showProjectByDepartmentorProjectHeaderId(user){
	if(user.position == "部门经理" ||user.position == "行政助理"){
		var param = new Object();
		param.department = user.department;
		$.ajax({
			type : "GET",
			url :  "../project/getByDepartment",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				 console.log(data);
				 createTablefromProject(data);
			}
		});
	}else if(user.position == "项目经理" ){
		var param = new Object();
		param.projectHeaderId = user.employeeId;
		$.ajax({
			type : "GET",
			url :  "../project/getByProjectHeaderId",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				 console.log(data);
				 createTablefromProject(data);
			}
		});
	}else if(user.position == "人力资源" ){
		var param = new Object();
		//param.projectHeaderId = null;
		$.ajax({
			type : "GET",
			url :  "../project/getAllProject",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				 console.log(data);
				 createTablefromProject(data);
			}
		});
	}else if (user.hasOwnProperty("company")){
		alert("您无此权限");
	}
}

function createTablefromDetails(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>明细ID</th><th>项目ID</th><th>岗位</th><th>级别</th><th>人员天数上限</th><th>已申请人天数</th><th>外包公司ID</th></tr></thead>";
    var len = data.length;
    store.set("len",len);
    
    for (var i = 0; i < len; i++) {
        tableStr = tableStr + "<tbody><tr><td>" + data[i].detailId + "</td><td>" + data[i].projectId  + "</td><td>" + data[i].position  + "</td><td>" + data[i].level + "</td><td>" + data[i].manDayNumberTotal + "</td><td>" + data[i].manDayNumberApplied  + "</td><td>" + data[i].company  + "</td></td>" 
        +"<td><a class='btn btn-warning btn-xs' onclick=\"moredetails('" + data[i].detailId + "')\" role='button'>详细信息</a></td><td><a class='btn btn-warning btn-xs' onclick=\"apply('"+ data[i].detailId + "')\" role='button'>提交用工申请</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#research_table").html(tableStr);
}

function createTablefromProject(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>部门</th><th>项目ID</th><th>项目名称</th><th>项目负责人</th><th>负责人员工号</th><th>录入人员</th><th>创建时间</th><th>最后更新时间</th></tr></thead>";
    var len = data.length;
    store.set("len",len);
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td>" + data[i].department + "</td><td>" + data[i].projectId  + "</td><td>" + data[i].projectName  + "</td><td>" + data[i].projectHeader + "</td><td>" + data[i].projectHeaderId + "</td><td>" + data[i].editerEmployeeId  + "</td><td>" + data[i].createdTime + "</td><td>" + data[i].updatedTime + "</td>" 
        +"<td><a class='btn btn-warning btn-xs' onclick=\"details('" + data[i].projectId+"')\" role='button'>查看明细</a></td><td><a class='btn btn-warning btn-xs' onclick=\"outer('" + data[i].projectId +"','"+data[i].department +"','"+data[i].projectName+"','"+data[i].projectHeader+"')\" role='button'>外包人员详情</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#research_table").html(tableStr);
}

	function showDetailsByDepartment(user){//
		if(user.position == "部门经理" ||user.position == "行政助理"){
			var param = new Object();
			param.department = user.department;
			$.ajax({
				type : "GET",
				url :  "../project/getDetailByDepartment",
				data : param,
				dataType : "json",
				contentType: "application/x-www-form-urlencoded",
				success : function(data) {
					 console.log(data);
					 createTablefromDetails(data);
				}
			});
		}else if(user.position == "项目经理" ){
			var param = new Object();
			param.projectHeaderId = user.employeeId;
			$.ajax({
				type : "GET",
				url :  "../project/getDetailByProjectHeaderId",
				data : param,
				dataType : "json",
				contentType: "application/x-www-form-urlencoded",
				success : function(data) {
					 console.log(data);
					 createTablefromDetails(data);
				}
			});
		}else if(user.position == "人力资源" ){//getAllDetail
			var param = new Object();
			//param.projectHeaderId = null;
			$.ajax({
				type : "GET",
				url :  "../project/getAllDetail",
				data : param,
				dataType : "json",
				contentType: "application/x-www-form-urlencoded",
				success : function(data) {
					 console.log(data);
					 createTablefromDetails(data);
				}
			});
		}else if (user.hasOwnProperty("company")){
			alert("您无此权限");
		}
	}

	function showDetailsByCompanyId(companyId){
		var param = new Object();
		param.companyId = companyId;
		$.ajax({
			type : "GET",
			url :  "../project/getDetailByCompanyId",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				 console.log(data);
				 createTablefromDetails(data);
			}
		});
	}
	
	function update(data){
		store.set("data",data);
		console.log(data);
		window.location = "updateProject.html";
	
	}
	function details(projectId){//只删除
		store.set("projectId",projectId);
		window.location = "showDetails.html";
	
	}
	
	function outer(projectId,department,projectName,projectHeader){//外包人员显示
	    var forouter = new Object();
	    forouter.projectId = projectId;
	    forouter.department = department;
	    forouter.projectName = projectName;
	    forouter.projectHeader = projectHeader;
		store.set("forouter",forouter);
		window.location = "showOuter.html";
	
	}
	
	function moredetails(detailId){
		store.set("detailId",detailId);
		window.location = "moredetails.html";
	}

	function apply(detailId){
		store.set("detailId",detailId);
		window.location = "AddApplyRecord.html";
		
	}