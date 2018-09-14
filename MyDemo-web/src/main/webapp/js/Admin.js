$(document).ready(function() {
	 $("#add").click(function() {
		    var id= $("#id").val();
			var password= $("#password").val();
			var name= $("#name").val();
			var sex= $("#sex option:selected").text();
			var phoneNumber= $("#phoneNumber").val();
			var email= $("#email").val();
			var position= $("#position option:selected").text();
			var department= $("#department option:selected").text();
			if(id ==""|| password==""||name==""||position=="请选择职位"||department=="请选择部门"){
				alert("请填写完整信息！"); 
			 }else{
				 
				 
				 
				 var param =  new Object();
				 param.employeeId = id;
				 param.password = password;
				 param.name = name;
				 param.sex = sex;
				 param.phoneNumber = phoneNumber;
				 param.email = email;
				 param.position = position;
				 param.department = department;
				 $.ajax({
						type : "POST",
						url : "../Administrator/addAd",
						data :param,
						dataType : "json",
						contentType : "application/x-www-form-urlencoded",
						success : function(data) {
							console.log(data);
							alert("管理员添加成功");
							location.reload();
						}
					});
				 
			 }
	});
	 
});