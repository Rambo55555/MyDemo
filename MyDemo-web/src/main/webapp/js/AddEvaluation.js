//var hadEva = false;
var evaluationId = null;
var evaluationDetai = store.get("evaluationDetail");
$(document).ready(
		function() {
			// document.getElementById("editEvaDiv").style.display = "none";
			setInfo(evaluationDetai);
			var param = {
				"outsourcerId" : evaluationDetai.outsourcerId,
				"detailId" : evaluationDetai.detailId
			}
			getEvaluation(param);

			$("#submit").click(
					function() {
						var type = $("#type").val();
						var evaluation = $("#evaluation").val();
						var comment = $("#comment").val();
						var workDays = $("#workDays").val();
						var evaluationTime = $("#evaluationTime").val();
						if (type == "请选择" || evaluation == "请选择"
								|| workDays == "" || evaluationTime == "") {
							alert("请填写必填项!");
							return;
						}

						var param = {
							"outsourcerId" : evaluationDetai.outsourcerId,
							"detailId" : evaluationDetai.detailId,
							"projectId" : evaluationDetai.projectId,
							"evaluationTime" : evaluationTime,
							"type" : type,
							"evaluation" : evaluation,
							"workDays" : workDays,
							"comment" : comment
						}
						commitFun(param);

					});
			$("#addEva").click(function() {
				emptyAll();
				document.getElementById("editEvaDiv").style.display = "";
			});

		});

function commitFun(param) {
	if (evaluationId == null) {
		$.ajax({
			type : "POST",
			url : "../evaluation/insert",
			data : param,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				console.log(data);
				if (data != null) {
					alert("考核提交成功");
				} else {
					alert("考核提交出错, 请稍后重试");
				}
				location.reload();
			}
		});
	} else {
		// var old = store.get("oldEvaObj");
		param.evaluationId = evaluationId;
		$.ajax({
			type : "POST",
			url : "../evaluation/update",
			data : param,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded",
			success : function(data) {
				console.log(data);
				if (data != null) {
					alert("考核提交成功");
				} else {
					alert("考核提交出错, 请稍后重试");
				}
				location.reload();
			}
		});
	}
}

function setInfo(data) {
	$("#department").attr("value", data.department);
	$("#company").attr("value", data.company);
	$("#projectName").attr("value", data.projectName);
	$("#projectHeader").attr("value", data.projectHeader);
	$("#position").attr("value", data.position);
	$("#level").attr("value", data.level);
	$("#name").attr("value", data.name);
}

function getEvaluation(param) {
	$.ajax({
		type : "GET",
		url : "../evaluation/getEvaluation",
		data : param,
		dataType : "json",
		contentType : "application/x-www-form-urlencoded",
		success : function(data) {
				createTable(data);
		}
	});
}

var tableArray;
function createTable(data) {
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
	tableStr = tableStr
			+ "<thead><tr><th>考核类型</th><th>考核情况</th><th>考核时间</th><th>工作天数</th><th>备注</th><th>操作</th></tr></thead>";
	var len = data.length;
	// store.set("len",len);
	if (len > 0) {
		tableArray = data;
		for (var i = len-1; i >=0 ; i--) {
			tableStr = tableStr
					+ "<tbody><tr><td>"
					+ data[i].type
					+ "</td><td>"
					+ data[i].evaluation
					+ "</td><td>"
					+ data[i].evaluationTime
					+ "</td><td>"
					+ data[i].workDays
					+ "</td><td>"
					+ data[i].comment
					+ "</td>"
					+ "<td><a class='btn btn-warning btn-xs' onclick=\"updateEva("
					+ i + ")\"role='button'>编辑</a></td>" + "</tr></tbody>";
		}
	} else {
		tableStr = "<table><tbody><tr><td>暂无考核</td>" + "</tr></tbody>";
	}
	tableStr = tableStr + "</table>";
	$("#table").html(tableStr);

}

function updateEva(i) {
	emptyAll();
	var data = tableArray[i];

	if (data != null) {

		// hadEva = true;
		evaluationId = data.evaluationId;
		console.log(data);
		// store.set("oldEvaObj", data);
		// alert(data.detailId);
		$("#evaluationTime").attr("value", data.evaluationTime);
		$("#workDays").attr("value", data.workDays);
		$("#comment").attr("value", data.comment);

		var se1 = document.getElementById("type");
		if (data.type == "试用期") {
			se1[1].selected = true;
		} else if (data.type == "正式期") {
			se1[2].selected = true;
		}
		var se2 = document.getElementById("evaluation");
		if (data.evaluation == "合格") {
			se2[1].selected = true;
		} else if (data.evaluation == "不合格") {
			se2[2].selected = true;
		}
	}
	document.getElementById("editEvaDiv").style.display = "";
}

function emptyAll() {
	$("#evaluationTime").attr("value", "");
	$("#workDays").attr("value", "");
	$("#comment").attr("value", "");
	var se1 = document.getElementById("type");
	se1[0].selected = true;
	var se2 = document.getElementById("evaluation");
	se2[0].selected = true;
}
