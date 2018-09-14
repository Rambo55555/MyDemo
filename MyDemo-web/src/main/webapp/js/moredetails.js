$(document).ready(function() {
	getdata();
	edit();
    $("#update").click(function() {
    	  var detailId=$("#detailId").val();
          var projectId = $("#projectId").val();
		  var department=$("#department").val();
		  var projectName=$("#projectName").val();
		  var projectHeader=$("#projectHeader").val();
		  var projectHeaderId=$("#projectHeaderId").val();
		  var position=$("#position").val();
	      var level =$("#level option:selected").text();
	      var manDayNumberTotal=$("#manDayNumberTotal").val();
	      var manDayNumberApplied=$("#manDayNumberApplied").val(); 
	      var companyId=$("#companyId").val(); //选中的文本
	      var comoany=$("#company").val();
	      var bidWinnerUnitPrice=$("#bidWinnerUnitPrice").val();
	      var bidWinnerTotalPrice=$("#bidWinnerTotalPrice").val();
	      var section=$("#section").val(); //选中的文本
	      var purchaseCode=$("#purchaseCode").val();
	      var contractCode=$("#contractCode").val();
	      //var contractName=$("#contractName").val();
	      
          var param = new Object();
          param.detailId = detailId;
          param.projectId = projectId;
          param.projectName = projectName;
          param.department = department;
          param.projectHeader = projectHeader;
          param.projectHeaderId = projectHeaderId;
          param.position = position;
          param.level = level;
          param.manDayNumberTotal = manDayNumberTotal;
          param.manDayNumberApplied = manDayNumberApplied;
          param.companyId = companyId;
          param.company = comoany;
          param.bidWinnerUnitPrice = bidWinnerUnitPrice;
          param.bidWinnerTotalPrice = bidWinnerTotalPrice;
          param.section = section;
          param.purchaseCode = purchaseCode;
          param.contractCode = contractCode;
         // param.contractName = contractName;
          
          $.ajax({
      		type : "POST",
      		url :  "../project/updateDetail",
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
		 $("input[id=position]").removeAttr("readonly");
		 $("select[id=level]").removeAttr("disabled");
		 $("input[id=manDayNumberTotal]").removeAttr("readonly");
		 $("input[id=manDayNumberApplied]").removeAttr("readonly");
		 $("input[id=company]").removeAttr("readonly");
		 $("input[id=bidWinnerUnitPrice]").removeAttr("readonly");
		 $("input[id=bidWinnerTotalPrice]").removeAttr("readonly");
		 $("input[id=section]").removeAttr("readonly");
		 $("input[id=purchaseCode]").removeAttr("readonly");
		 $("input[id=contractCode]").removeAttr("readonly");
		 $("input[id=contractName]").removeAttr("readonly");
		 $("button[id=update]").removeAttr("disabled");
	    });
}


function getdata(){
	var detailId =store.get("detailId");
	var param = new Object();
	param.detailId = detailId;
	$.ajax({
  		type : "GET",
  		url :  "../project/getDetailByDetailId",
  		data : param,
  		dataType : "json",
  		contentType: "application/x-www-form-urlencoded",
  		success : function(data) {
  			 console.log(data);
  			$("#detailId").val(data.detailId);
  			$("#projectId").val(data.projectId);
  			$("#department").val(data.department);
  			$("#projectName").val(data.projectName);
  			$("#projectHeader").val(data.projectHeader);
  			$("#projectHeaderId").val(data.projectHeaderId);
  			$("#position").val(data.position);
  	        //$('#level').val(data.level);
  	        $('#level').find('option[text="'+data.level+'"]').attr("selected",true);
  	        $("#manDayNumberTotal").val(data.manDayNumberTotal);
  	        $("#manDayNumberApplied").val(data.manDayNumberApplied); 
  	        $("#companyId").val(data.companyId); //选中的文本
  	        $("#company").val(data.company);
  	        $("#bidWinnerUnitPrice").val(data.bidWinnerUnitPrice);
  	        $("#bidWinnerTotalPrice").val(data.bidWinnerTotalPrice);
  	        $("#section").val(data.section); //选中的文本
  	        $("#purchaseCode").val(data.purchaseCode);
  	        $("#contractCode").val(data.contractCode);
  	        $("#contractName").val(data.contractName);
  		}
  	});
}

