$(document).ready(function() {
	start();
	$("#search").click(function(){
		var param = new Object();
		param.keyWord = $("#keyWord").val();
		
		$.ajax({
			type : "GET",
			url : "../company/findBykeyWord",
			data : param,
			dataType : "json",
			contentType: "application/x-www-form-urlencoded",
			success : function(data) {
				console.log("数据："+data);
				createTable(data);
			}
		});
	});
});

function createTable(data){
	var len = data.length;
	if (len > 0){
	var tableStr = "<table class=table table-bordered table-hover empty-margin-top tableList>";
    tableStr = tableStr + "<thead><tr><th></th><th></th><th></th><th></th>" +
    		"<th>外包公司名称</th><th>创建时间</th><th>公司管理员人数</th><th>录入公司管理员</th><th>" +
    		"</th><th></th><th></th><th></th></tr></thead>";
    
    for (var i = 0; i < len; i++) {
    	
        tableStr = tableStr + "<tbody><tr><td></td><td></td><td></td><td></td><td>" 
        			+ data[i].company + "</td><td>" + data[i].createdTime + "</td><td>" + data[i].numberOfAdmin
        			+ "</td><td><a class='btn btn-warning btn-xs' onclick=\"addAdmin("+i+","+ data[i].companyId +",'" + data[i].company +"')\" role='button'>"
        			+ "新增管理员</a></td><td><a class='btn btn-warning btn-xs' id='add"+i+"'  onclick=\"addOutUser("+data[i].companyId +",'" + data[i].company +"')\" role='button'>新增外包人员</a></td><td></td><td></td><td></td></tr></tbody>";

    }
    tableStr = tableStr + "</table>";
    $("#mat_table").html(tableStr);
	}
	else
    	$("#mat_table").html("<table class=table table-bordered table-hover empty-margin-top tableList>"
    			+"<thead><tr><th>暂未查询到相关公司，换个关键词试试？</th></tr></thead></table>");
}

function addAdmin(i,companyId,company){
	var user = new Object();
    user = store.get("user");
    if (user.hasOwnProperty("company")){
 	  $('#add'+i).attr("disabled",true);
 	  alert("您无此权限");
 	  window.location ="";
    }else{
    	var cmpny = new Object();
    	cmpny.companyId = companyId;
    	cmpny.company = company;
    	store.set("company",cmpny);
    	window.location = 'addAdmin.html';
    }
}


function addOutUser(companyId,company){
	var cmpny = new Object();
	cmpny.companyId = companyId;
	cmpny.company = company;
	store.set("company",cmpny);
	window.location = 'AddOutUser.html';
}


function start(){
	var param = new Object();
	param.keyWord = null;
	$.ajax({
		type : "GET",
		url : "../company/findBykeyWord",
		data : param,
		dataType : "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(data) {
			console.log("数据："+data);
			createTable(data);
		}
	});
}