//ajax
var ajaxRequest=function(obj){
	if(obj.loaderContainer){
		if(obj.loaderContainer!="noloader"){
			obj.loaderContainer.showLoading();
		}		
	}else{
//		 $('body').showLoading();//显示load对话框
	}
    var timeout=30 * 10000; //设置请求超时时间,默认为：30 * 10000
    if(obj.timeout){
        timeout=obj.timeout;
    }  
    var type="POST";//设置请求方式，默认为“GET”
    if(obj.type){
        type=obj.type;
    }
    var options = {    
    		contentType:"application/json",
            dataType : "json",
            traditional:true,
            cache:false,
            timeout: timeout,
            type: type,  
            url: obj.url,
            data: JSON.stringify(obj.param), 
            success: function(data, textStatus, jqXHR){              	     
                if(data.success){
                	 obj.success(data.returnObject, textStatus, jqXHR);
                }else if(data.success==false){
                	obj.success(data.returnObject, textStatus, jqXHR);
                	outputObj(data);
                	if(null!=data.exceptionStack){
                		if(data.exceptionStack=="unauthorized"){
                			window.location.reload();
                		}else if(data.exceptionMessage !="Index: 0, Size: 0"&&data.exceptionMessage.split("###")[1].split(". ")[1].split(": ")[2].split(" ")[0]=="Duplicate"&& data.exceptionMessage.split("###")[4].split(" ")[4]=="user"){
                			alert("该用户已存在");//
                		}else if(data.exceptionMessage !="Index: 0, Size: 0"&&data.exceptionMessage.split("###")[1].split(". ")[1].split(": ")[2].split(" ")[0]=="Column"){
                			alert("信息不合法"/*,BootstrapDialog.TYPE_DANGER*/);//
                		}else if(data.exceptionMessage !="Index: 0, Size: 0"&&data.exceptionMessage.split("###")[1].split(". ")[1].split(": ")[2].split(" ")[0]=="Duplicate"&& data.exceptionMessage.split("###")[4].split(" ")[4]=="stock"){
                			//console.log("data:"+data);
                			//console.log("textStatus:"+textStatus);
                			//console.log("jqXHR:"+jqXHR);
                			alert("该商品已存在");//
                		}else if(data.exceptionMessage =="Index: 0, Size: 0"){
                			alert("用户名或密码错误");//
                			//alert("returnObject==",data.returnObject);//
                		}
                		
                	}else{//null
                		alert(data.exceptionMessage);//
                	}
                } //else
                if(obj.loaderContainer){
                	if(obj.loaderContainer!="noloader"){
            			obj.loaderContainer.hideLoading();
            		}	
            	}else{
//            		$('body').hideLoading();//关闭load对话框
            	}  
            },
            error: function(e, xhr, type){
            	console.log("e:"+e);
            	console.log("xhr:"+xhr);
            	console.log("type:"+type);
            	if(obj.loaderContainer){
            		if(obj.loaderContainer!="noloader"){
            			obj.loaderContainer.hideLoading();
            		}	
              	}else{
//              		$('body').hideLoading();//关闭load对话框
              	}
                if(obj.error) {
                    obj.error(e, xhr, type);
                }else{
                	console.log("e:"+e);
                	console.log("xhr:"+xhr);
                	console.log("type:"+type);
                	alert("系统错误，请联系管理员");  
                }
            }
        };
    $.ajax(options);
}; 
var urlEncode = function (param, key, encode) {
	  if(param==null) return '';
	  var paramStr = '';
	  var t = typeof (param);
	  if (t == 'string' || t == 'number' || t == 'boolean') {
	    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
	  } else {
	    for (var i in param) {
	      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
	      paramStr += urlEncode(param[i], k, encode);
	    }
	  }
	  return paramStr;
};

function outputObj(obj) {  
	    var description = "";
        var arr = Object.keys(obj);
        console.log("arr:"+arr); 
        var len = arr.length;
        console.log("len:"+len);
        //console.log("exceptionMessage:"+obj.exceptionMessage.split("###")[4].split(" ")[4]);
        /*var exceptionMessage = obj.exceptionMessage;
        var  exception = exceptionMessage.split("###");
        var except = exception[1].split(". ")[1].split(": ")[2].split(" ")[0];
        console.log("except:"+except)
        return except;*/
	  for (var i in obj) {  //obj.exceptionMessage.split("###")[1].split(". ")[1].split(": ")[2].split(" ")[0];
		if(i==2){
			 description += i + " = " + obj[i] + "\n";
			}
	description += i + " = " + obj[i] + "\n";
	}  
	    console.log(description); 
};
