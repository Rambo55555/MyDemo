$(document).ready(
		function() {
			var company = store.get("company");
			var companyId = company.companyId;

			/*
			 * $("#companyId").val(company.companyId);
			 * $("#company").val(company.company);
			 */
			setInfoTable(companyId);

			$("#showAdd").click(function() {
				emptyAll();
				document.getElementById("editEvaDiv").style.display = "";
			});

			$("#submit").click(
					function() {
						var param = new Object();
						var employeeId = $("#employeeId").val();
						var companyId = $("#companyId").val();
						var company = $("#company").val();
						var name = $("#name").val();
						var sex = $('#sex option:selected').text();
						var email = $("#email").val();
						var phoneNumber = $("#phone").val(); // 选中的文本
						var education = $('#education option:selected').text();
						var position = $("#position option:selected").text();
						var level = $('#level option:selected').text();
						var idcardCode = $("#idcard_code").val();
						var qualificationCode = $("#qualification_code").val();
						var workingYears = $("#working_years").val();
						var status = $('#status option:selected').text();

						if (company == "" || name == "" || phoneNumber == ""
								|| education == "" || position == ""
								|| idcardCode == "" || workingYears == "") {
							alert("请填写所有必填项");
							return;
						}

						param.companyId = companyId;
						param.company = company;
						param.name = name;
						param.sex = sex;
						param.email = email;
						param.phoneNumber = phoneNumber
						param.education = education;
						param.position = position;
						param.level = level;
						param.idcardCode = idcardCode;
						param.qualificationCode = qualificationCode;
						;
						param.workingYears = workingYears;
						param.status = status;

						fun(param);

					});

		});

function setInfoTable(companyId) {
	var param = new Object();
	param.companyId = companyId;
	$.ajax({
		type : "GET",
		url : "../Outuser/findByCompanyId",
		data : param,
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success : function(data) {
			console.log(data);
			createTable(data);
		}
	});
}

function fun(param) {
	$.ajax({
		type : "POST",
		url : "../Outuser/addOutUser",
		data : param,
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success : function(data) {
			console.log(data);
			alert("员工录入成功");
			location.reload();
		}
	});
}

var tableArray;
function createTable(data) {
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	tableStr = tableStr
			+ "<thead><tr><th>姓名</th><th>身份证号</th><th>性别</th><th>手机号</th><th>邮箱</th><th>所属公司</th>"
			+ "<th>岗位</th><th>级别</th><th>学历</th><th>工作年限</th><th>状态</th><th>资格证书号</th>"
			+
			// "<th>操作</th>" +
			"</tr></thead>";
	var len = data.length;
	// store.set("len",len);
	if (len > 0) {
		tableArray = data;
		for (var i = len - 1; i >= 0; i--) {
			tableStr = tableStr + "<tbody><tr><td>" + data[i].name
					+ "</td><td>" + data[i].idcardCode + "</td><td>"
					+ data[i].sex + "</td><td>" + data[i].phoneNumber
					+ "</td><td>" + data[i].email
					+ "</td><td>" + data[i].company + "</td><td>"
					+ data[i].position + "</td><td>" + data[i].level
					+ "</td><td>" + data[i].education + "</td><td>"
					+ data[i].workingYears + "</td><td>" + data[i].status
					+ "</td><td>" + data[i].qualificationCode + "</td>"
					// + "<td><a class='btn btn-warning btn-xs'
					// onclick=\"editInfo("
					// + i + ")\"role='button'>编辑</a></td>"
					+ "</tr></tbody>";
		}
	} else {
		tableStr = "<table><tbody><tr><td>暂无明细</td>" + "</tr></tbody>";
	}
	tableStr = tableStr + "</table>";
	$("#research_table").html(tableStr);

}

function editInfo(i) {
	var data = tableArray[i];
	outsourcerId = data.outsourcerId;
	if (data != null) {

		$("#position").attr("value", data.position);
		$("#manDayNumberTotal").attr("value", data.manDayNumberTotal);
		$("#company").attr("value", data.company);
		$("#bidWinnerTotalPrice").attr("value", data.bidWinnerTotalPrice);
		$("#bidWinnerUnitPrice").attr("value", data.bidWinnerUnitPrice);
		$("#section").attr("value", data.section);
		$("#contractName").attr("value", data.contractName);
		$("#purchaseCode").attr("value", data.purchaseCode);
		$("#contractCode").attr("value", data.contractCode);
		var se1 = document.getElementById("level");
		if (data.level == "初级") {
			se1[1].selected = true;
		} else if (data.level == "中级") {
			se1[2].selected = true;
		} else if (data.level == "高级") {
			se1[3].selected = true;
		}
	}
}

function emptyAll() {
	// var employeeId = $("#employeeId").val();
	// $("#company").attr("value", "");
	var company = store.get("company");
	$("#company").val(company.company);
	$("#companyId").val(company.companyId);
	$("#name").attr("value", "");
	$("#email").attr("value", "");
	$("#phone").attr("value", "");
	$("#position").attr("value", "");
	$("#idcard_code").attr("value", "");
	$("#qualification_code").attr("value", "");
	$("#working_years").attr("value", "");

	// $('#status option:selected').text();
	// $('#sex option:selected').text();
	// $('#education option:selected').text();
	// $('#level option:selected').text();
	setChoose("status", 0);
	setChoose("sex", 0);
	setChoose("education", 0);
	setChoose("level", 0);

}

function setChoose(id, num) {
	var se1 = document.getElementById(id);
	se1[num].selected = true;

}