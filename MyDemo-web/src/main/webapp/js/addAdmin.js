$(document).ready(function() {
	var company = store.get("company");
	var companyId=company.companyId;
	$("#companyId").val(company.companyId);
	$("#company").val(company.company);
	setInfoTable(companyId);
	
	$("#showAdd").click(function(){
		//emptyAll();
		document.getElementById("editEvaDiv").style.display = "";
	});
	 $("#add").click(function() {
			var password= $("#password").val();
			var name= $("#name").val();
			var sex= $("#sex option:selected").text();
			var companyId= $("#companyId").val();
			var company= $("#company").val();
			var phoneNumber= $("#phoneNumber").val();
			var email= $("#email").val();
			var position= $("#position").val();
			if(password==""||name==""||phoneNumber==""||company==""){
				alert("请填写完整信息！"); 
			 }else{
				 var param =  new Object();
				 param.password = password;
				 param.name = name;
				 param.sex = sex;
				 param.phoneNumber = phoneNumber;
				 param.email = email;
				 param.position = position;
				 param.company = company;
				 param.companyId = companyId;
				 $.ajax({
						type : "POST",
						url : "../OutAdmin/addAdmin",
						data :param,
						dataType : "json",
						contentType : "application/x-www-form-urlencoded",
						success : function(data) {
							console.log(data);
							alert("管理员添加成功");
							window.location = "";
							//$("#id").val(data.outsourcerAdminId);
							//document.getElementById("editDetDiv").style.display = "";
						}
					});
				 
			 }
	});
	 
});

function createTable(data) {
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	tableStr = tableStr
			+ "<thead><tr><th>员工号</th><th>姓名</th><th>职位</th><th>性别</th><th>手机号</th><th>邮箱</th><th>所属公司</th>" +
//					"<th>操作</th>" +
					"</tr></thead>";
	var len = data.length;
	// store.set("len",len);
	if (len > 0) {
		for (var i = len - 1; i >= 0; i--) {
			tableStr = tableStr
					+ "<tbody><tr><td>"
					+ data[i].outsourcerAdminId
					+ "</td><td>"
					+ data[i].name
					+ "</td><td>"
					+ data[i].position
					+ "</td><td>"
					+ data[i].sex
					+ "</td><td>"
					+ data[i].phoneNumber
					+ "</td><td>"
					+ data[i].email
					+ "</td><td>"
					+ data[i].company
					+ "</td>"
//					+ "<td><a class='btn btn-warning btn-xs' onclick=\"editInfo("
//					+ i + ")\"role='button'>编辑</a></td>"
					+ "</tr></tbody>";
		}
	} else {
		tableStr = "<table><tbody><tr><td>暂无人员</td>" + "</tr></tbody>";
	}
	tableStr = tableStr + "</table>";
	$("#research_table").html(tableStr);

}

function setInfoTable(companyId){
	var param = new Object();
	param.companyId = companyId;
	$.ajax({
		type : "GET",
		url : "../OutAdmin/findByCompanyId",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
			 createTable(data);
		}
	});
}