$(document).ready(function() {
	getdata();
	edit();
    $("#update").click(function() {
    	  var projectHeader = $("#projectHeader").val(); 
          var projectHeaderId = $("#projectHeaderId").val(); //选中的文本
          var projectId = $("#projectId").val();
          
          var param = new Object();
          param.projectHeader = projectHeader;
          param.projectHeaderId = projectHeaderId;
          param.projectId  = projectId;
          
          $.ajax({
      		type : "POST",
      		url :  "../project/update",
      		data : param,
      		dataType : "json",
      		contentType: "application/x-www-form-urlencoded",
      		success : function(data) {
      			 console.log(data);
      			 alert("更新成功");
      		}
      	});
    });
});


function edit(){
	 $("#edit").click(function() {
		 $("input[id=projectHeaderId]").removeAttr("readonly");
		 $("input[id=projectHeader]").removeAttr("readonly");
		 $("input[id=editerEmployeeId]").removeAttr("readonly");
		 $("button[id=update]").removeAttr("disabled");
	    });
}


function getdata(){
	var data = new Object();
	data =store.get("data");
	console.log(data);
    $("#projectId").val(data.projectId);
    $("#projectName").val(data.projectName);
    $('#department').val(data.department);
    $("#projectHeader").val(data.projectHeader); 
    $("#projectHeaderId").val(data.projectHeaderId); //选中的文本
    $("#editerEmployeeId").val(data.editerEmployeeId);
}
