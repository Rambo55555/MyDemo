var addNew = false;
var detailIdUp;

var projectId;
var department;
var projectName;
var projectHeader;
var projectHeaderId;

$(document).ready(function() {
	projectId = store.get("projectId");
	department = store.get("department");
	projectName = store.get("projectName");
	projectHeader = store.get("projectHeader");
	projectHeaderId = store.get("projectHeaderId");

	$("#projectId").val(projectId);
	$("#department").val(department);
	$("#projectName").val(projectName);
	$("#projectHeader").val(projectHeader);
	$("#projectHeaderId").val(projectHeaderId);

	$.ajax({
		type : "GET",
		url : "../project/getDetailByProjectId",
		data : {
			"projectId" : projectId
		},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success : function(data) {
			console.log(data);
			createTable(data);
		}
	});

	$("#addDetails").click(function() {
		submit();
	});

	$("#showAdd").click(function() {
		addNew = true;
		emptyAll();
		detailIdUp=null;
		document.getElementById("editDetDiv").style.display = "";
	});
});

function submit() {
	var param = new Object();
	var position = $("#position option:selected").text();
	var level = $('#level option:selected').text();
	var manDayNumberTotal = $("#manDayNumberTotal").val();
	var company = $("#company").val();
	var bidWinnerUnitPrice = $("#bidWinnerUnitPrice").val();
	var bidWinnerTotalPrice = $("#bidWinnerTotalPrice").val();
	var section = $("#section").val(); // 选中的文本
	var purchaseCode = $("#purchaseCode").val();
	var contractCode = $("#contractCode").val();
	var contractName = $("#contractName").val();
	
//	var projectId = store.get("projectId");
//	var department = store.get("department");
//	var projectName = store.get("projectName");
//	var projectHeader = store.get("projectHeader");
//	var projectHeaderId = store.get("projectHeaderId");
	
	if (position == "请选择" || level == "请选择" || manDayNumberTotal == ""
			|| company == "" || bidWinnerUnitPrice == ""
			|| bidWinnerTotalPrice == "" || section == "" || purchaseCode == ""
			|| contractCode == "") {
		alert("请将明细信息填写完整！");
		return;
	}

	param.projectId = projectId;
	param.projectName = projectName;
	param.department = department;
	param.projectHeader = projectHeader;
	param.projectHeaderId = projectHeaderId;
	
	param.position = position;
	param.level = level;
	param.manDayNumberTotal = manDayNumberTotal;
	param.company = company;
	param.bidWinnerUnitPrice = bidWinnerUnitPrice;
	param.bidWinnerTotalPrice = bidWinnerTotalPrice;
	param.section = section;
	param.purchaseCode = purchaseCode;
	param.contractCode = contractCode;
	param.contractName = contractName;
	
	if(addNew){
		$.ajax({
			type : "POST",
			url : "../project/insertDetail",
			data : param,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				console.log(data);
				if(data > 0){
					alert("明细录入成功");	
				}
				
				location.reload();
			}
		});
	}else{
		param.detailId=detailIdUp;
		$.ajax({
			type : "POST",
			url : "../project/updateDetail",
			data : param,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {				
				console.log(data);
				
				if(data > 0){
					alert("明细更新成功");
				}
				location.reload();
			}
		});
	}
	
}

var tableArray;
function createTable(data) {
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	tableStr = tableStr
			+ "<thead><tr><th>明细ID</th><th>岗位</th><th>级别</th><th>人天数上限</th><th>中标公司</th><th>操作</th></tr></thead>";
	var len = data.length;
	// store.set("len",len);
	if (len > 0) {
		tableArray = data;
		for (var i = len - 1; i >= 0; i--) {
			tableStr = tableStr
					+ "<tbody><tr><td>"
					+ data[i].detailId
					+ "</td><td>"
					+ data[i].position
					+ "</td><td>"
					+ data[i].level
					+ "</td><td>"
					+ data[i].manDayNumberTotal
					+ "</td><td>"
					+ data[i].company
					+ "</td>"
					+ "<td><a class='btn btn-warning btn-xs' onclick=\"editDetail("
					+ i + ")\"role='button'>编辑</a></td>" + "</tr></tbody>";
		}
	} else {
		tableStr = "<table><tbody><tr><td>暂无明细</td>" + "</tr></tbody>";
	}
	tableStr = tableStr + "</table>";
	$("#research_table").html(tableStr);

}

function editDetail(i) {
	emptyAll();
	document.getElementById("editDetDiv").style.display = "";
	addNew = false;
	var data = tableArray[i];
	detailIdUp = data.detailId;
	if (data != null) {

//		$("#position").attr("value", data.position);
		selectPosition(data.position);
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

function selectPosition(posi){
	if(posi == "JAVA程序编码"){
		select("position",1);
	}else if(posi == "Android/IOS/Html5程序编码"){
		select("position",2);
	}else if(posi == "C++程序编码"){
		select("position",3);
	}else if(posi == "UED UI设计师"){
		select("position",4);
	}else if(posi == ".NET程序编码"){
		select("position",5);
	}else if(posi == "架构设计"){
		select("position",6);
	}else if(posi == "功能测试"){
		select("position",7);
	}else if(posi == "性能测试"){
		select("position",8);
	}else if(posi == "需求分析"){
		select("position",9);
	}else if(posi == "其他"){
		select("position",10);
	}
}

function select(id,num){
	var se1 = document.getElementById(id);
	se1[num].selected = true;
}

function emptyAll(){
	$("#position").attr("value", "");
	$("#manDayNumberTotal").attr("value", "");
	$("#company").attr("value", "");
	$("#bidWinnerTotalPrice").attr("value", "");
	$("#bidWinnerUnitPrice").attr("value", "");
	$("#section").attr("value", "");
	$("#contractName").attr("value", "");
	$("#purchaseCode").attr("value", "");
	$("#contractCode").attr("value", "");
	var se1 = document.getElementById("level");
	se1[0].selected = true;
	
}