$(document).ready(function() {
	 $("#search").click(function() {
		 ser();

    });
});


function createTable(data) {
    var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th>姓名</th><th>性别</th><th>学历</th><th>岗位</th><th>级别</th><th>公司</th><th>联系电话</th><th>邮箱</th><th>工作年限</th><th>状态</th><th>创建时间</th><th>最后更新时间</th></tr></thead>";
    var len = data.length;
    //store.set("len",len);
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td>" + data[i].name + "</td><td>" + data[i].sex  + "</td><td>" + data[i].education  + "</td><td>" + data[i].position + "</td><td>" + data[i].level + "</td><td>" + data[i].company  + "</td><td>"+ data[i].company  + "</td><td>"+ data[i].phoneNumber  + "</td><td>"+ data[i].email  + "</td><td>"+ data[i].workingYears + "</td><td>"+ data[i].status + "</td><td>" + data[i].createdTime + "</td><td>" + data[i].updatedTime + "</td>" 
        +"<td><a class='btn btn-warning btn-xs' onclick=\"details('" + data[i].outsourcerId + "')\" role='button'>详细信息</a></td><td><a class='btn btn-danger btn-xs' onclick=\"delet('" + data[i].outsourcerId + "')\" role='button'>删除</a></td></tr></tbody>";
    }
    tableStr = tableStr + "</table>";
    $("#table").html(tableStr);
}



function ser(){
	var position = $("#position").val();
	var level = $("#level").val();
	var status = $("#status option:selected").text();
	if(status == "全部"){
		status="";
	}
	
	var param = new Object();
	param.position=position;
	param.level=level;
	param.status=status;
	
	$.ajax({
		type : "GET",
		url :  "../Outuser/find",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
			 createTable(data);
		}
	});
}

function delet(o){
	var param = new Object();
	param.outsourcerId = o;
	$.ajax({
		type : "GET",
		url :  "../Outuser/deleteOutUser",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			 console.log(data);
             alert("删除成功");
             ser();
		}
	});

	
}